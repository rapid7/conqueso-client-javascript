"use strict";

var _ = require('lodash'),
    Q = require('q'),
    request = require('request'),
    debug = require('debug')('conqueso'),

    PropertySet = require('./propertySet');

// Conqueso is self-signed. Sorry. :(
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Conqueso is an object responsible for interacting with the Conqueso server to load properties
function Conqueso(server) {
    this.properties = {};
    this.server = server;
    if(this.server && this.server.slice(-1) === '/'){
        this.server = this.server.slice(0, -1);
    }
}

Conqueso.prototype.getServer = function(){
    return this.server;
}

// Promise-based call to fetch all properties of a certain role from the
// Conqueso server this instance was initialized with.  Once loaded,
// the response will remain cached and returned without querying the
// Conqueso server again.
Conqueso.prototype.getProperties = function(role){
    var query = this.server+'/api/roles/'+role+'/properties-web',
        deferred = Q.defer(),
        self = this;

    // Only go load the properties from the server if they haven't been
    // populated yet.
    if(this.properties[role] !== undefined){
        deferred.resolve(this.properties[role]);
    } else {
        // Go out to the Conqueso server to get our properties
        request.get(query, function (error, response, body) {
            var newSet;

            if (error || response.statusCode !== 200) {
                deferred.reject(new Error(error));
            }
            else {
                // The response is a JSON object we'll want to cache for future
                // requests
                newSet = new PropertySet(body);
                self.properties[role] = newSet;

                deferred.resolve(newSet);
            }
        });
    }

    return deferred.promise;
};

module.exports = Conqueso;