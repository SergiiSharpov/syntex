const EventEmitter = require("./EventEmitter");
const {SyntaxNode} = require("./syntaxNode");
const {DefaultNodeTypes} = require("../");

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
                if(!node) continue;
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
                errorNode.emit('syntax-error', {...errorNode.error});
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
                }
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
                }
            }
        }

        return null;
    }
}

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
    constructor({tokenType, type = DefaultNodeTypes.UNKNOWN, subNodes = undefined, important = true}) {
        super();
        this.tokenType = tokenType;
        this.type = type;
        this.subNodes = subNodes;
        this.lastNode = null;
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

/**
 * Helps to build AST using user functions
 * @property onTest {Function} Used to test if array of the tokens contains current Node
 * @property onRun {Function} Used to create a child Node if array of the tokens contains current Node
 */
class FunctionNode extends AnalyzerNode {
    /**
     * @param props.onTest {Function} Used to test if array of the tokens contains current Node
     * @param props.onRun {Function} Used to create a child Node if array of the tokens contains current Node
     */
    constructor(props = {onTest: null, onRun: null}) {
        super(props);
        this.onTest = props.onTest;
        this.onRun = props.onRun;
    }

    test(tokenList, index, parent, analyzer) {
        return (this.onTest) ? this.onTest.call(this, tokenList, index, parent, analyzer) : null;
    }

    run(tokenList, index, parent, analyzer) {
        let test = this.test(tokenList, index, parent, analyzer);
        if (test) {
            if (this.onRun) {
                this.onRun.call(this, test.count, tokenList, index, parent, analyzer);
            }
            return test.count;
        }
        return null;
    }
}

/**
 * Helps to build AST using sequence of symbols
 * @property boundaries {Array} Array of symbols that should be used to stop parsing
 */
class CombinedNode extends AnalyzerNode {
    /**
     * @param props.boundaries {Array} Array of symbols that should be used to stop parsing
     */
    constructor(props = {boundaries: []}) {
        super(props);
        this.boundaries = props.boundaries;
    }

    test(tokenList, index, parent, analyzer) {
        let count = 0;
        let MAX_COUNT = 999;
        let breaked = false;

        while (tokenList[index + count] && !breaked && count < MAX_COUNT) {
            if (this.boundaries instanceof Array && this.boundaries.indexOf(tokenList[index + count].value) === -1) {
                breaked = true;
            } else if (this.boundaries instanceof RegExp && !this.boundaries.test(tokenList[index + count].value)) {
                breaked = true;
            }
            count++;
        }

        if (count > 1) {
            return {
                count: count,
                ranges: [index, index + count]
            };
        }

        return null;
    }

    run(tokenList, index, parent, analyzer) {
        let test = this.test(tokenList, index, parent, analyzer);
        if (test) {
            let length = test.count;

            let node = new SyntaxNode();

            node.type = this.type;
            node.value = tokenList.slice(index, index + length);
            node.valueAsString = AnalyzerNode.getContentFromRange(analyzer.program, tokenList, index, index + length - 1);

            parent.append(node);

            this.lastNode = node;

            return length;
        }
        return null;
    }
}



/**
 * Sequence node helps to parse groups of tokens from token list
 */
class SequenceNode extends AnalyzerNode {
    /**
     * @param props.sequence {Array} The sequence of Node's, Tokens, Regular expressions, Objects
     * @param props.onError {Function} The Syntax error callback
     */
    constructor(props = {sequence: [], onError: null}) {
        super(props);
        this.sequence = props.sequence || [];
        this.sequenceValid = [];
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

    /**
     * Emit's the syntax error if it present
     * @returns {boolean}
     */
    getError() {
        this.__emitErrors();
        return true;
    }

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
                    if (!target && this.sequence[i].important) {
                        (count > 0 && valid) && this.__pushError(tokenList, index, index + count, analyzer);
                        valid = false;
                    } else if (!target) {
                        this.sequenceValid[i] = false;
                        ranges.push([0, 0]);
                    } else if (target) {
                        ranges.push([index + count, index + count + target.count - 1]);
                        count += target.count;
                        this.sequenceValid[i] = true;
                    }
                } else if (typeof this.sequence[i] === 'string' || this.sequence[i] instanceof RegExp) {
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

    run(tokenList, index, parent, analyzer) {
        let test = this.test(tokenList, index, parent, analyzer);
        if (test) {
            let length = test.count;
            let node = new SyntaxNode();

            node.type = this.type;
            node.value = tokenList.slice(index, index + length);
            node.valueAsString = AnalyzerNode.getContentFromRange(analyzer.program, tokenList, index, index + length - 1);

            parent.append(node);

            this.lastNode = node;

            for(let i=0; i<this.sequence.length; i++) {
                if (this.sequence[i] instanceof AnalyzerNode && this.sequenceValid[i]) {
                    analyzer.analyze(tokenList.slice(test.ranges[i][0], test.ranges[i][1] + 1), node, [this.sequence[i]]);
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
     * @param props.values {Array} Array that contains opener and closer symbols
     */
    constructor(props = {values: []}) {
        super(props);

        this.openers = props.values[0];
        this.closers = props.values[1] || props.values[0];
    }

    test(tokenList, index, parent, analyzer) {
        if (tokenList[index].type === this.tokenType) {
            if (SyntaxAnalyzer.getReducedValue(tokenList, index, this.openers.length, 'value') === this.openers) {
                let data = SyntaxAnalyzer.parseMultipleBlock(tokenList, index, this.openers, this.closers);
                if (data)
                return {
                    count: data.length,
                    ranges: [index, index + data]
                };
            }
        }

        return null;
    }

    run(tokenList, index, parent, analyzer) {
        let test = this.test(tokenList, index, parent, analyzer);
        if (test) {
            let length = test.count;
            let node = new SyntaxNode();

            node.type = this.type;
            node.value = tokenList.slice(index + 1, index + length - 1);
            node.valueAsString = AnalyzerNode.getContentFromRange(analyzer.program, tokenList, index, index + length - 1);

            parent.append(node);
            this.lastNode = node;

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
    CombinedNode,
    FunctionNode,
    BlockNode
};