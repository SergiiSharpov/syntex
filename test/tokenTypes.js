let assert = require('assert');
let {splitTokens, generateTokenGroup, StringSolver} = require('./../index');

const program = 'let place = "world"; const hi = "hello" + place';

const MyTokenTypes = {
    KEYWORD: 'Keyword',
    DELIMITER: 'Delimiter',
    OPERATOR: 'Operator',
    STRING: 'String'
};

let solvers = {};

solvers[MyTokenTypes.KEYWORD] = {
    include: ['const', 'let']
};

solvers[MyTokenTypes.DELIMITER] = {
    default: true
};

solvers[MyTokenTypes.OPERATOR] = {
    include: ['=', '+']
};

solvers[MyTokenTypes.STRING] = {
    type: StringSolver,
    delimiters: ['"']
};

function countTokens(list, type) {
    return list.filter((item) => item.type === type).length;
}


describe('tokenTypes', function() {
    describe('program: ' + program, function() {
        let preTokens = splitTokens(program);

        let group = generateTokenGroup(MyTokenTypes, solvers);
        let tokens = group.solve(preTokens);

        it('Keywords: should return 2', function() {
            assert.equal(countTokens(tokens, MyTokenTypes.KEYWORD), 2);
        });

        it('Strings: should return 2', function() {
            assert.equal(countTokens(tokens, MyTokenTypes.STRING), 2);
        });

        it('Operators: should return 3', function() {
            assert.equal(countTokens(tokens, MyTokenTypes.OPERATOR), 3);
        });

        it('Delimiters: should return 4', function() {
            assert.equal(countTokens(tokens, MyTokenTypes.DELIMITER), 4);
        });
    });
});

