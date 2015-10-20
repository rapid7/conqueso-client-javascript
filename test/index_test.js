"use strict";

var expect = require('chai').expect;

var Conqueso = require('../src/index');

describe("the main module", function() {
    it("should export a Conqueso constructor function", function() {
        expect(Conqueso).to.be.a('function');
        expect(new Conqueso()).to.be.an('object');
    });
});



