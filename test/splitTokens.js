let assert = require('assert');
let {splitTokens} = require('./../helpers/splitTokens');

const program = 'let \nhello = \t"world";';

describe('splitTokens', function() {
    it('Simple split: should return 7', function() {
        assert.equal(splitTokens(program).length, 7);
    });

    it('Split with newlines: should return 8', function() {
        assert.equal(splitTokens(program, {newline: true}).length, 8);
    });

    it('Split with tabs: should return 8', function() {
        assert.equal(splitTokens(program, {tab: true}).length, 8);
    });

    it('Split with tabs and newlines: should return 9', function() {
        assert.equal(splitTokens(program, {tab: true, newline: true}).length, 9);
    });

    it('Split with tabs, whitespaces and newlines: should return 12', function() {
        assert.equal(splitTokens(program, {tab: true, newline: true, whitespace: true}).length, 12);
    });

    it('Split with whitespaces: should return 12', function() {
        assert.equal(splitTokens(program, {whitespace: true}).length, 12);
    });
});