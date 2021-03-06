const assert = require('assert');
const {generateTokenGroup, Solvers} = require('./../index');
const {StringSolver} = Solvers;

const program = 'let place = "world"; const hi = "hello" + place;';

const MyTokenTypes = {
    KEYWORD: 'Keyword',
    DELIMITER: 'Delimiter',
    OPERATOR: 'Operator',
    STRING: 'String',
    VARIABLE: 'Variable'
};

let solvers = {};

solvers[MyTokenTypes.KEYWORD] = {
    include: ['const', 'let']
};

solvers[MyTokenTypes.DELIMITER] = {
    default: true
};

solvers[MyTokenTypes.OPERATOR] = {
    symbols: ['=', '+']
};

solvers[MyTokenTypes.VARIABLE] = {
    regexp: /[a-zA-Z_][a-zA-Z_0-9]+/gm
};

solvers[MyTokenTypes.STRING] = {
    type: StringSolver,
    delimiters: ['"']
};

function countTokens(list, type) {
    return list.filter((item) => item.type === type).length;
}


describe('tokenTypes', () => {
    describe(`program: ${program}`, () => {

        let group = generateTokenGroup(MyTokenTypes, solvers);
        let tokens = group.solve(program);

        it('Keywords: should return 2', () => {
            assert.equal(countTokens(tokens, MyTokenTypes.KEYWORD), 2);
        });

        it('Strings: should return 2', () => {
            assert.equal(countTokens(tokens, MyTokenTypes.STRING), 2);
        });

        it('Operators: should return 3', () => {
            assert.equal(countTokens(tokens, MyTokenTypes.OPERATOR), 3);
        });

        it('Delimiters: should return 2', () => {
            assert.equal(countTokens(tokens, MyTokenTypes.DELIMITER), 2);
        });

        it('Variables: should return 2', () => {
            assert.equal(countTokens(tokens, MyTokenTypes.VARIABLE), 3);
        });
    });
});

