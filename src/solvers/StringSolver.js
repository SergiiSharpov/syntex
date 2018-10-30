const TokenSolver = require("./TokenSolver");

/**
 * Helps to solve strings
 * @property delimiters {Array} Array of symbols that used to determine string
 */
class StringSolver extends TokenSolver {
    constructor() {
        super();
        this.delimiters = [];
    }

    build() {
        let regular = 'T(?:\\\\\.|[^\\T\\\\\])*T';

        let regexps = [];
        for(let delimiter of this.delimiters) {
            regexps.push(regular.slice(0).replace(/T/g, delimiter));
        }

        this.regexp = new RegExp(regexps.join('|'));
    }
}

module.exports = StringSolver;
