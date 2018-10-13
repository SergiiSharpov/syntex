const {SyntaxNode} = require("./syntaxNode");
const {DefaultNodeTypes} = require("../");

/**
 * Syntax analyzer is used to build AST from token list
 */
class SyntaxAnalyzer {
    /**
     * @param defaultNodes {Array}
     */
    constructor(defaultNodes = []) {
        this.tree = new SyntaxNode();
        this.defaultNodeProps = defaultNodes;
        this.program = '';
    }

    /**
     * Analyzes token list using parent and analyzer nodes
     * @param tokenList {Array}
     * @param parent {SyntaxNode}
     * @param analyzerNodes {Array}
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
                } else {
                    errorNode = node;
                }
            }
            i += step;

            if (!valid && errorNode) {
                errorNode.getError();
            }
        }
    }

    /**
     * Parses token list block starting from current position using opener and closer symbols
     * @param list {Array}
     * @param pos {Number}
     * @param opener {String}
     * @param closer {String}
     * @returns {Object|null}
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
                }
            }
        }

        return null;
    }

    /**
     * Returns reduced value from token list using start position, count and key
     * @param arr {Array}
     * @param i {Number}
     * @param count {Number}
     * @param key {String}
     */
    static getReducedValue(arr, i, count, key) {
        return arr.slice(i, i + count).reduce((a, b) => {
            return a + b[key];
        }, '');
    }

    /**
     * Parses token list block starting from current position using openers and closers symbols
     * @param list {Array}
     * @param pos {Number}
     * @param openers {String}
     * @param closers {String}
     * @returns {Object|null}
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
                }
            }
        }

        return null;
    }
}

/**
 * Analyzer node helps to build AST
 */
class AnalyzerNode {
    /**
     *
     * @param tokenType {String}
     * @param type {String}
     * @param subNodes {Array|undefined}
     */
    constructor({tokenType, type = DefaultNodeTypes.UNKNOWN, subNodes = undefined}) {
        this.tokenType = tokenType;
        this.type = type;
        this.subNodes = subNodes;
    }

    /**
     * This method must return true if token list contain current node starting from current position
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
     * This method must update syntax tree if token list contain current node starting from current position
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
     */
    static getContentFromRange(content, list, start, end) {
        return content.slice(list[start].range[0], list[end].range[1]);
    }
}

/**
 * Sequence node helps to parse groups of tokens from token list
 */
class SequenceNode extends AnalyzerNode {
    /**
     * @param props.sequence {Array}
     * @param props.onError {Function}
     */
    constructor(props = {sequence: [], onError: null}) {
        super(props);
        this.sequence = props.sequence || [];
        this.onError = props.onError;
        this.error = null;
    }

    /**
     *
     * @param tokenList {Array}
     * @param start {Number}
     * @param end {Number}
     * @param analyzer {SyntaxAnalyzer}
     * @returns {boolean}
     * @private
     */
    __pushError(tokenList, start, end, analyzer) {
        if (!this.onError) {
            return false;
        }

        let type = tokenList[end].type;
        let content = AnalyzerNode.getContentFromRange(analyzer.program, tokenList, start, end);
        let _fullContent = analyzer.program.slice(0, tokenList[end].range[1]);
        let _splited = _fullContent.split('\n');

        let index = _splited[_splited.length - 1].length;
        let row = _splited.length;

        let error = `Unexpected ${type} '${tokenList[end].value}' in "${content}" ${row}:${index}`;

        this.error = {
            row,
            index,
            content,
            error,
            type,
            analyzerType: this.type
        };
    }

    /**
     *
     * @returns {boolean}
     * @private
     */
    __emitErrors() {
        if (!this.onError) {
            return false;
        }
        this.error && this.onError(this.error);
        this.error = null;
        return true;
    }

    getError() {
        this.__emitErrors();
        return true;
    }

    /**
     * This method must return true if token list contain current node starting from current position
     * @param tokenList {Array}
     * @param index {Number}
     * @param parent {SyntaxNode}
     * @param analyzer {SyntaxAnalyzer}
     * @returns {Object|null}
     */
    test(tokenList, index, parent, analyzer) {
        if (tokenList[index].type === this.tokenType) {
            let valid = true;
            this.error = null;
            let count = 0;
            let target = 0;
            let ranges = [];

            for (let i = 0; i < this.sequence.length; i++) {

                if (this.sequence[i] instanceof AnalyzerNode) {
                    target = this.sequence[i].test(tokenList, index + count, parent, analyzer);
                    if (!target) {
                        (count > 0 && valid) && this.__pushError(tokenList, index, index + count, analyzer);
                        valid = false;
                    } else {
                        ranges.push([index + count, index + count + target.count - 1]);
                        count += target.count;
                    }
                } else if (typeof this.sequence[i] === 'string') {
                    if (tokenList[index + count].value.indexOf(this.sequence[i]) === -1) {
                        (count > 0 && valid) && this.__pushError(tokenList, index, index + count, analyzer);
                        valid = false;
                    } else {
                        ranges.push([index + count, index + count + 1]);
                        count++;
                    }
                } else if (typeof this.sequence[i] === 'object') {
                    if (this.sequence[i].type.indexOf(tokenList[index + count].type) === -1) {
                        (count > 0 && valid) && this.__pushError(tokenList, index, index + count, analyzer);
                        valid = false;
                    } else {
                        ranges.push([index + count, index + count + 1]);
                        count++;
                    }
                }
            }

            if (!valid) {
                //this.__emitErrors();
                return null;
            }

            return {
                count,
                ranges,
                error: this.error
            };
        }
        
        return null;
    }

    /**
     * This method must update syntax tree if token list contain current node starting from current position
     * @param tokenList {Array}
     * @param index {Number}
     * @param parent {SyntaxNode}
     * @param analyzer {SyntaxAnalyzer}
     * @returns {Number|null}
     */
    run(tokenList, index, parent, analyzer) {
        let test = this.test(tokenList, index, parent, analyzer);
        if (test) {
            let length = test.count;
            let node = new SyntaxNode();

            node.type = this.type;
            node.value = tokenList.slice(index, index + length);
            node.valueAsString = AnalyzerNode.getContentFromRange(analyzer.program, tokenList, index, index + length - 1);

            parent.append(node);

            for(let i=0; i<this.sequence.length; i++) {
                if (this.sequence[i] instanceof AnalyzerNode) {
                    analyzer.analyze(tokenList.slice(test.ranges[i][0], test.ranges[i][1] + 1), node, this.subNodes);
                }
            }

            return length;
        }

        return null;
    }
}

/**
 * Block node helps to parse block inside token list
 */
class BlockNode extends AnalyzerNode {
    /**
     * @param props.values {Array}
     */
    constructor(props = {values: []}) {
        super(props);

        this.openers = props.values[0];
        this.closers = props.values[1] || props.values[0];
    }

    /**
     * This method must return true if token list contain current node starting from current position
     * @param tokenList {Array}
     * @param index {Number}
     * @param parent {SyntaxNode}
     * @param analyzer {SyntaxAnalyzer}
     * @returns {null}
     */
    test(tokenList, index, parent, analyzer) {
        if (tokenList[index].type === this.tokenType) {
            if (SyntaxAnalyzer.getReducedValue(tokenList, index, this.openers.length, 'value') === this.openers) {
                let data = SyntaxAnalyzer.parseMultipleBlock(tokenList, index, this.openers, this.closers).length;
                return {
                    count: data,
                    ranges: [index, index + data]
                };
            }
        }

        return null;
    }

    /**
     * This method must update syntax tree if token list contain current node starting from current position
     * @param tokenList {Array}
     * @param index {Number}
     * @param parent {SyntaxNode}
     * @param analyzer {SyntaxAnalyzer}
     * @returns {null}
     */
    run(tokenList, index, parent, analyzer) {
        let test = this.test(tokenList, index, parent, analyzer);
        if (test) {
            let length = test.count;
            let node = new SyntaxNode();

            node.type = this.type;
            node.value = tokenList.slice(index + 1, index + length - 1);
            node.valueAsString = AnalyzerNode.getContentFromRange(analyzer.program, tokenList, index, index + length - 1);

            parent.append(node);
            analyzer.analyze(node.value, node, this.subNodes);

            return length;
        }

        return null;
    }
}

module.exports = {
    SyntaxAnalyzer,
    AnalyzerNode,
    SequenceNode,
    BlockNode
};