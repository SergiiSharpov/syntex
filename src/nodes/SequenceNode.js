const AnalyzerNode = require('./AnalyzerNode');
const SyntaxNode = require("./../SyntaxNode");

/**
 * Sequence node helps to parse groups of tokens from token list
 */
class SequenceNode extends AnalyzerNode {
    /**
     * @param props.sequence {Array} The sequence of Node's, Tokens, Regular expressions, Objects
     * @param props.onError {Function} The Syntax error callback
     */
    constructor(props = {sequence: [],
        onError: null}) {
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
            this.error = null;

            return false;
        }
        if (this.error) {
            this.onError(this.error);
        }
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

    __processTemplate(analyzer, tokenList, test) {
        if (this.template && this.lastNode) {
            let keys = Object.keys(this.template);
            let val;
            for(let key of keys) {
                val = this.template[key];
                this.lastNode.userData[key] = AnalyzerNode.getContentFromRange(analyzer.program, tokenList, test.ranges[val][0], test.ranges[val][1] - 1);
            }
        }
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
                        if (count > 0 && valid) {
                            this.__pushError(tokenList, index, index + count, analyzer);
                        }
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
                        if (count > 0 && valid) {
                            this.__pushError(tokenList, index, index + count, analyzer);
                        }
                        valid = false;
                    } else {
                        ranges.push([index + count, index + count + 1]);
                        count++;
                    }
                } else if (this.sequence[i] instanceof Array) {
                    if (this.sequence[i].indexOf(tokenList[index + count].value) === -1) {
                        if (count > 0 && valid) {
                            this.__pushError(tokenList, index, index + count, analyzer);
                        }
                        valid = false;
                    } else {
                        ranges.push([index + count, index + count + 1]);
                        count++;
                    }
                } else if (typeof this.sequence[i] === 'object') {
                    if (this.sequence[i].type.indexOf(tokenList[index + count].type) === -1) {
                        if (count > 0 && valid) {
                            this.__pushError(tokenList, index, index + count, analyzer);
                        }
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
            this.__processTemplate(analyzer, tokenList, test);

            for(let i = 0; i < this.sequence.length; i++) {
                if (this.sequence[i] instanceof AnalyzerNode && this.sequenceValid[i]) {
                    analyzer.analyze(tokenList.slice(test.ranges[i][0], test.ranges[i][1] + 1), node, [this.sequence[i]]);
                }
            }

            if (this.subNodes && this.subNodes.length) {
                analyzer.analyze(node.value, node, this.subNodes);
            }

            return length;
        }

        return null;
    }
}

module.exports = SequenceNode;
