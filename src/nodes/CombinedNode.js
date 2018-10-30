const AnalyzerNode = require('./AnalyzerNode');
const SyntaxNode = require("./../SyntaxNode");

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
                count,
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

module.exports = CombinedNode;
