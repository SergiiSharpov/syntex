const {generateTokenGroup} = require("./src/TokenGroup");
const SyntaxAnalyzer = require("./src/SyntaxAnalyzer");

const StringSolver = require("./src/solvers/StringSolver");
const TokenSolver = require("./src/solvers/TokenSolver");

const AnalyzerNode = require("./src/nodes/AnalyzerNode");
const BlockNode = require("./src/nodes/BlockNode");
const FunctionNode = require("./src/nodes/FunctionNode");
const CombinedNode = require("./src/nodes/CombinedNode");
const SequenceNode = require("./src/nodes/SequenceNode");

const {DefaultTokenTypes, tokenTypesMerge, DefaultNodeTypes} = require('./helpers/consts');


module.exports = {
    generateTokenGroup,
    SyntaxAnalyzer,
    Const: {
        DefaultTokenTypes,
        DefaultNodeTypes,
        tokenTypesMerge
    },
    Solvers: {
        TokenSolver,
        StringSolver
    },
    Nodes: {
        AnalyzerNode,
        BlockNode,
        FunctionNode,
        CombinedNode,
        SequenceNode
    }
};
