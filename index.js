
const {TokenGroup, generateTokenGroup, TokenSolver, StringSolver} = require("./classes/tokens");
const {SyntaxAnalyzer} = require("./classes/syntaxAnalyzer");
const {DefaultTokenTypes, tokenTypesMerge, DefaultNodeTypes} = require('./helpers/consts');
const {splitTokens} = require("./helpers/splitTokens");


module.exports = {
    splitTokens,
    TokenGroup,
    TokenSolver,
    generateTokenGroup,
    DefaultTokenTypes,
    tokenTypesMerge,
    StringSolver,
    DefaultNodeTypes,
    SyntaxAnalyzer
};
