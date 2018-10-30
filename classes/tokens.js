const {DefaultTokenTypes} = require("./../helpers/consts");
const NamedRegExp = require('named-regexp-groups');
const NamedRegExpConstructor = NamedRegExp.default || NamedRegExp;

const escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

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

/**
 * Group that collect solvers and can be used to solve array of tokens
 * @property solvers {Object} Object that contains solvers as SolverName => SolverInstance
 * @property defaultSolver {String} Name of the default solver
 * @property regexp {RegExp} Final regular expression that created with solvers
 */
class TokenGroup {
    /**
     * @param solvers {Object} Object that contains solvers as SolverName => SolverInstance
     * @param defaultSolverId {String} Name of the default solver
     */
    constructor(solvers = {}, defaultSolverId = DefaultTokenTypes.UNKNOWN) {
        this.solvers = solvers;
        this.defaultSolver = defaultSolverId;

        this.regexp = null;

        this.build();
    }

    build() {
        let solver, key, include, regexp, item, symbols;

        let regexps = [];
        let resultRegexp;

        let solvers = [];
        for(key in this.solvers) {
            solvers.push({
                solver: this.solvers[key],
                name: key
            });
        }

        solvers = solvers.sort((a, b) => {
            return a.solver.priority < b.solver.priority;
        });

        for(item of solvers) {
            solver = item.solver;

            include = solver.include.map((item) => {
                return escapeRegExp(item);
            });

            symbols = solver.symbols.map((item) => {
                return escapeRegExp(item);
            });

            include = (solver.include.length) ? `(${include.join('|')})` : '';
            symbols = (solver.symbols.length) ? `(${symbols.join('|')})` : '';
            regexp = (solver.regexp) ? `(${solver.regexp.source})` : '';

            if (solver.regexp) {
                regexps.push(`(?<${item.name}>${regexp})`);
            } else if (solver.include.length) {
                regexps.push(`((\\W|^)(?<${item.name}>${include})\\W)`);
            } else if (solver.symbols.length) {
                regexps.push(`(?<${item.name}>${symbols})`);
            }
        }

        regexps.push(`(?<${this.defaultSolver}>\\S)`);

        resultRegexp = `(${regexps.join('|')})`;

        this.regexp = new NamedRegExpConstructor(resultRegexp, 'gm');

        let groups = {};
        for (let key in this.regexp.groups) {
            if (isNaN(key)) {
                groups[key] = this.regexp.groups[key];
            }
        }

        this.regexp.groups = groups;
    }

    /**
     * Solves array of tokens
     * @param program {String}
     * @returns {Array}
     */
    solve(program) {

        let tokens = [];
        let result, groupKey;

        while (result = this.regexp.exec(program)) {
            for (groupKey in result.groups) {
                if (result.groups[groupKey]) {
                    tokens.push({
                        type: groupKey,
                        value: result.groups[groupKey],
                        range: [result.index, result.index + result.groups[groupKey].length]
                    });
                }
            }
        }

        return tokens;
    }
}

/**
 * Generates TokenGroup using token types and token solvers
 * @param tokenTypes {Object}
 * @param tokenSolvers {Object}
 * @returns {TokenGroup}
 */
const generateTokenGroup = (tokenTypes = {}, tokenSolvers = {}) => {
    let solvers = {};
    let defaultSolver = null;

    for(let key in tokenTypes) {
        let className = tokenSolvers[tokenTypes[key]] && tokenSolvers[tokenTypes[key]].type || TokenSolver;
        solvers[tokenTypes[key]] = new className();
        Object.assign(solvers[tokenTypes[key]], tokenSolvers[tokenTypes[key]]);
        solvers[tokenTypes[key]].build();
        if (solvers[tokenTypes[key]].default) {
            defaultSolver = tokenTypes[key];
        }
    }

    return new TokenGroup(solvers, defaultSolver);
};


module.exports = {
    TokenSolver,
    StringSolver,
    TokenGroup,
    generateTokenGroup
};
