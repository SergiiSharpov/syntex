const assert = require('assert');
const fs = require('fs');
const {generateTokenGroup, Solvers, Const} = require('./../index');
const {StringSolver} = Solvers;
const {DefaultTokenTypes} = Const;

const program = fs.readFileSync('./test/codeExample');

let solvers = {};

solvers[DefaultTokenTypes.KEYWORD] = {
    include: [
        'const',
        'let',
        'var',
        'function',
        'get',
        'this',
        'class',
        'new'
    ],
    regexp: /\@[a-zA-Z_0-9]+/gm
};

/**
 * (\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)
 * RegExp for comments
 */

solvers[DefaultTokenTypes.DELIMITER] = {
    default: true
};

solvers[DefaultTokenTypes.OPERATOR] = {
    include: [
        '(', ')',
        '}', '{',
        '[', ']',
        '=', '*',
        '<', '>',
        '&', '|',
        '/',
        '+', '-',
        ';', ':',
        ',', '.',
        '?', '!'
    ]
};

solvers[DefaultTokenTypes.LINEBREAK] = {
    include: ['\n']
};

solvers[DefaultTokenTypes.IDENTIFIER] = {
    regexp: /[a-zA-Z_][a-zA-Z_0-9]+/gm,
    priority: 0
};

solvers[DefaultTokenTypes.NUMERIC] = {
    regexp: /[0-9.]+/gm,
    priority: 0
};

solvers[DefaultTokenTypes.STRING] = {
    type: StringSolver,
    delimiters: ['"', "'", '`'],
    priority: 99
};


describe('Performance test', () => {
    let group = generateTokenGroup(DefaultTokenTypes, solvers);

    let tokens;

    let lines = program.toString().split('\n').length;

    it('Speed test', function(done) {
        setTimeout(() => {
            console.time('Time');
            tokens = group.solve(program);
            console.timeEnd('Time');

            console.log(`${lines} lines of code = ${tokens.length} tokens`);

            assert.ok(true);

            done();
        }, 0);
        this.timeout(5000);
    });
});

