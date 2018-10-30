const SyntaxNode = require("./SyntaxNode");

/**
 * Syntax analyzer is used to build AST from token list
 * @property tree {SyntaxNode} Root node of the AST
 * @property defaultNodeProps {Array} Array of default nodes
 * @property program {String} Program source code
 */
class SyntaxAnalyzer {
    /**
     * @param defaultNodes {Array} Array of default nodes
     */
    constructor(defaultNodes = []) {
        this.tree = new SyntaxNode();
        this.defaultNodeProps = defaultNodes;
        this.program = '';
    }

    /**
     * Analyzes token list using parent and analyzer nodes
     * @param tokenList {Array} List of the tokens to parse
     * @param parent {SyntaxNode} Parent node
     * @param analyzerNodes {Array} Array of AnalyzerNodes
     */
    analyze(tokenList = [], parent = this.tree, analyzerNodes = this.defaultNodeProps) {
        let i = 0;
        let valid, errorNode;
        while (i < tokenList.length) {
            let step = 1;
            valid = false;
            for (let node of analyzerNodes) {
                let info = node.run(tokenList, i, parent, this);
                if (info) {
                    step = info;
                    valid = true;
                    node.emit('detect', node.lastNode);
                    break;
                } else {
                    errorNode = node;
                }
            }
            i += step;

            if (!valid && errorNode) {
                if (errorNode.error) {
                    errorNode.emit('syntax-error', {data: {...errorNode.error}});
                }
                errorNode.getError();
            }
        }
    }

    /**
     * Parses token list block starting from current position using opener and closer symbols
     * @param list {Array} Array of tokens
     * @param pos {Number} Start position
     * @param opener {String} Block opening symbol
     * @param closer {String} Block ending symbol
     * @returns {Object|null} Start and End positions of the block
     * @static
     */
    static parseBlock(list, pos, opener, closer) {
        let openedBlocks = 0;
        let closedBlocks = 0;

        for(let i = pos; i < list.length; i++) {
            if (list[i].value === opener) {
                openedBlocks++;
            }
            if (list[i].value === closer) {
                closedBlocks++;
            }
            if (openedBlocks && closedBlocks === openedBlocks) {
                return {
                    start: pos,
                    end: i
                };
            }
        }

        return null;
    }

    /**
     * Returns reduced value from token list using start position, count and key
     * @param arr {Array} Array of tokens
     * @param i {Number} Index to start from
     * @param count {Number} Count of tokens to reduce
     * @param key {String} Value should be reduced by this key
     * @static
     */
    static getReducedValue(arr, i, count, key) {
        return arr.slice(i, i + count).reduce((a, b) => {
            return a + b[key];
        }, '');
    }

    /**
     * Parses token list block starting from current position using openers and closers symbols
     * @param list {Array} Array of tokens
     * @param pos {Number} Start position
     * @param openers {String} Block opening symbols
     * @param closers {String} Block ending symbols
     * @returns {Object|null} Start and End positions of the block
     * @static
     */
    static parseMultipleBlock(list, pos, openers, closers) {
        let openedBlocks = 0;
        let closedBlocks = 0;

        let oLenght = openers.length;
        let cLenght = closers.length;

        for(let i = pos; i < list.length; i++) {
            if (SyntaxAnalyzer.getReducedValue(list, i, oLenght, 'value') === openers) {
                openedBlocks++;
            }
            if (SyntaxAnalyzer.getReducedValue(list, i, cLenght, 'value') === closers) {
                closedBlocks++;
            }
            if (openedBlocks && closedBlocks === openedBlocks) {
                return {
                    start: pos,
                    end: i + cLenght,
                    length: i + cLenght - pos
                };
            }
        }

        return null;
    }
}

module.exports = SyntaxAnalyzer;
