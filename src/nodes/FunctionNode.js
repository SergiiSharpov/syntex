const AnalyzerNode = require('./AnalyzerNode');

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
        if (this.onTest) {
            return Reflect.apply(this.onTest, this, [tokenList, index, parent, analyzer]);
        }

        return null;
    }

    run(tokenList, index, parent, analyzer) {
        let test = this.test(tokenList, index, parent, analyzer);
        if (test) {
            if (this.onRun) {
                Reflect.apply(this.onRun, this, [test.count, tokenList, index, parent, analyzer]);
            }

            return test.count;
        }

        return null;
    }
}

module.exports = FunctionNode;
