const SyntaxAnalyzer = require('./../SyntaxAnalyzer');
const AnalyzerNode = require('./AnalyzerNode');
const SyntaxNode = require("./../SyntaxNode");

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
                if (data) {
                    return {
                        count: data.length,
                        ranges: [index, index + data]
                    };
                }
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

module.exports = BlockNode;
