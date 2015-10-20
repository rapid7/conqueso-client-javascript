"use strict";

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect,
    sinon = require('sinon'),
    asyncTest = require('./mocha_util').asyncTest,
    request = require('request'),

    Conqueso = require('../src/conqueso'),
    PropertySet = require('../src/propertySet'),

    DUMMY_CONQUESO_RESPONSE = {
        "name":"global",
        "properties":[
            {
                "id":1,
                "name":"Test",
                "value":"42",
                "type":"INT",
                "description":"A test property",
                "createdAt":"2015-01-01T00:00:00.000Z",
                "updatedAt":"2015-01-01T00:00:00.000Z",
                "roleId":1
            }
        ]
    };

chai.use(chaiAsPromised);

describe('Conqueso', function(){
    describe('the constructor function', function(){
        describe('the server param', function(){
            it('should not matter if the server has a slash at the end or not', function(){
                var conqueso1 = new Conqueso("https://127.0.0.1");
                var conqueso2 = new Conqueso("https://127.0.0.1/");

                expect(conqueso1.getServer()).to.equal(conqueso2.getServer());
            });
        });
    });

    describe('an instance', function(){
        var conqueso;

        beforeEach(function(){
            conqueso = new Conqueso("https://127.0.0.1");
        });

        it('should construct successfully', function(){
            expect(conqueso).to.be.an.instanceof(Conqueso);
        });

        describe('getting parameters', function(){
            beforeEach(function(){
                sinon.
                    stub(request, 'get').
                    yields(null, {statusCode: 200}, JSON.stringify(DUMMY_CONQUESO_RESPONSE));
            });

            afterEach(function(){
                request.get.restore();
            });

            it('should reach out to the server', function(done){
                conqueso.getProperties('global').
                    then(function() {
                        asyncTest(done, function(){
                            expect(request.get.callCount).to.equal(1);
                        });
                    });
            });

            it('should return a PropertySet that manages the result of a request in a Promise', function(){
                return expect(conqueso.getProperties('global')).to.eventually.be.an.instanceof(PropertySet);
            });

            it('should cache any params from Conqueso for multiple requests', function(done){
                conqueso.getProperties('global').
                    then(function() {
                        return conqueso.getProperties('global');
                    }).then(function(){
                        asyncTest(done, function(){
                            expect(request.get.callCount).to.equal(1);
                        });
                    });
            });

        });

    });
});
