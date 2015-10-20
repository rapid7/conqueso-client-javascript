"use strict";

var _ = require('lodash');

// Object to handle getting a whole set of properties from Conqueso and
// managing individual properties within the set.
function PropertySet(content){

    // The content for the set should be a JSON object
    if(!content || content.constructor !== String){ // instanceof doesn't work for string literals
        throw new SyntaxError('PropertySet must be initialized with a string-based JSON object');
    }
    this.properties = JSON.parse(content);
    if(!(this.properties instanceof Object)){
        throw new SyntaxError('PropertySet must be initialized with a string-based JSON object');
    }

    // Support getting passed in both the outer and inner 'properties' value
    // from Conqueso.
    if(this.properties.properties){
        this.properties = this.properties.properties;
    }

}

// Return the specific property value from the Conqueso properties set, if any.
// If no property with the name provided is in the set, returns 'default' if a default
// was provided, otherwise returns 'null'.  Property is returned in string form, no
// attempt is made at type conversion for this release.
PropertySet.prototype.getProperty = function(name, defaultResult){
    var result = defaultResult ? defaultResult : null;

    // "properties" is a bunch of objects with literal 'name' and 'value' fields.
    // Hunt for a match.
    _.forEach(this.properties, function(property){
        if(property.name === name){
            result = property.value;
            return false;
        }
    });

    return result;
};

module.exports = PropertySet;