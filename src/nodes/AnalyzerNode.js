const EventEmitter = require("./../EventEmitter");
const {DefaultNodeTypes} = require("./../helpers/consts");

/**
 * Analyzer node helps to build AST
 * @property tokenType {String} Type of the token to start parse from
 * @property type {String} Type of the AnalyzerNode
 * @property subNodes {String} Sub nodes that will be used to parse children nodes, if not present - defaultNodes of SyntaxAnalyzer will be used
 * @property important {Boolean} If false then sequence will be parsed even that node is not exist in the array of tokens
 * @property lastNode {AnalyzerNode} Last created node
 */
class AnalyzerNode extends EventEmitter {
    /**
     * @param props.tokenType {String} Type of the token to start parse from
     * @param props.type {String} Type of the AnalyzerNode
     * @param props.subNodes {Array|undefined} Sub nodes that will be used to parse children nodes, if not present - defaultNodes of SyntaxAnalyzer will be used
     * @param props.important {Boolean} If false then sequence will be parsed even that node is not exist in the array of tokens
     */
    constructor({tokenType, type = DefaultNodeTypes.UNKNOWN, subNodes = undefined, important = true, template = null}) {
        super();
        this.tokenType = tokenType;
        this.type = type;
        this.subNodes = subNodes;
        this.lastNode = null;
        this.template = template;
        this.important = important;
    }

    /**
     * Returns true if token list contain current node starting from current position
     * @param tokenList {Array}
     * @param index {Number}
     * @param parent {SyntaxNode}
     * @param analyzer {SyntaxAnalyzer}
     * @returns {null}
     */
    test(tokenList, index, parent, analyzer) {
        return null;
    }

    /**
     * Updates syntax tree if token list contain current node starting from current position
     * @param tokenList {Array}
     * @param index {Number}
     * @param parent {SyntaxNode}
     * @param analyzer {SyntaxAnalyzer}
     * @returns {null}
     */
    run(tokenList, index, parent, analyzer) {
        return null;
    }

    /**
     * Returns syntax error
     * @returns {Object}
     */
    getError() {
        return null;
    }

    /**
     * Returns content from source code using start, end tokens
     * @param content {String}
     * @param list {Array}
     * @param start {Number}
     * @param end {Number}
     * @static
     */
    static getContentFromRange(content, list, start, end) {
        return content.slice(list[start].range[0], list[end].range[1]);
    }
}

module.exports = AnalyzerNode;
