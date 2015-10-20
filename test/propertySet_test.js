"use strict";

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),

    PropertySet = require('../src/propertySet');

//jshint multistr: true
var PROPERTIES_SAMPLE = '{\
        "name":"global",\
        "properties":[\
            {\
                "id":1,\
                "name":"Test",\
                "value":"42",\
                "type":"INT",\
                "description":"A test property",\
                "createdAt":"2015-01-01T00:00:00.000Z",\
                "updatedAt":"2015-01-01T00:00:00.000Z",\
                "roleId":1\
            }\
        ]\
    }',
    PROPERTIES_DEEP_SAMPLE = '{\
        "name":"global",\
        "properties": {\
            "properties": {\
                "id":1,\
                "name":"Test",\
                "value":"42",\
                "type":"INT",\
                "description":"A test property",\
                "createdAt":"2015-01-01T00:00:00.000Z",\
                "updatedAt":"2015-01-01T00:00:00.000Z",\
                "roleId":1\
            }\
        }\
    }';

describe('PropertySet', function(){
    describe('the constructor function', function(){
        it('should accept a well-formed JSON string', function(){
            var newPropertySet = new PropertySet(PROPERTIES_SAMPLE);
            expect(newPropertySet).to.be.an.instanceof(PropertySet);
        });

        it('should NOT accept an empty constructor', function(){
            var emptyConstructor = function(){
                new PropertySet();
            };
            expect(emptyConstructor).to.throw(SyntaxError);
        });

        it('should NOT accept a constructor that takes an int', function(){
            var intConstructor = function(){
                new PropertySet(666);
            }
            expect(intConstructor).to.throw(SyntaxError);
        });

        it('should NOT accept a constructor that takes a non-JSON string', function(){
            var nonJSONConstructor = function(){
                new PropertySet("666");
            }
            expect(nonJSONConstructor).to.throw(SyntaxError);
        });
    });

    describe('getProperty', function(){
        it('should work for top-level properties from Conqueso', function(){
            var properties = new PropertySet(PROPERTIES_SAMPLE);
            expect(properties.getProperty("Test")).to.equal('42');
        });

        it('should work for a nested properties response from Conqueso', function(){
            var properties = new PropertySet(PROPERTIES_DEEP_SAMPLE);
            expect(properties.getProperty("Test")).to.equal('42');
        });

        it('returns "null" if no property is found and no default is given', function(){
            var properties = new PropertySet(PROPERTIES_SAMPLE);
            expect(properties.getProperty("DoesNotExist")).to.be.null;
        });

        it('returns the default value if no property is found and a default is given', function(){
            var properties = new PropertySet(PROPERTIES_SAMPLE);
            expect(properties.getProperty("DoesNotExist", "defaultResult")).to.equal('defaultResult');
        });

    });
});
