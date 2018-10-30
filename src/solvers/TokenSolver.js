
/**
 * Base class for solving tokens
 * @property include {Array} Array of words that can be used to parse token
 * @property symbols {Array} Array of symbols that can be used to parse token
 * @property regexp {RegExp} Regular expression to parse token
 * @property priority {Number} Priority for this token
 */
class TokenSolver {
    constructor() {
        this.include = [];
        this.symbols = [];
        this.regexp = null;
        this.priority = 1;
    }

    /**
     * Used to build regexp from self properties
     * @returns {*}
     */
    build() {
        return null;
    }
}

module.exports = TokenSolver;
