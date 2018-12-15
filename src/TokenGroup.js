const {DefaultTokenTypes} = require("./helpers/consts");
const TokenSolver = require("./solvers/TokenSolver");

const NamedRegExp = require('named-regexp-groups');
const NamedRegExpConstructor = NamedRegExp.default || NamedRegExp;

const escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};


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

            include = (solver.include.length) ? `${include.join('|')}` : '';
            symbols = (solver.symbols.length) ? `(${symbols.join('|')})` : '';
            regexp = (solver.regexp) ? `(${solver.regexp.source})` : '';

            if (solver.regexp) {
                regexps.push(`(?<${item.name}>${regexp})`);
            } else if (solver.include.length) {
                regexps.push(`((?:^|\\b)(?<${item.name}>${include})(?=\\b|$))`);
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
        let groupKey;
        let result = this.regexp.exec(program);

        while (result) {
            for (groupKey in result.groups) {
                if (result.groups[groupKey]) {
                    tokens.push({
                        type: groupKey,
                        value: result.groups[groupKey],
                        range: [result.index, result.index + result.groups[groupKey].length]
                    });
                }
            }

            result = this.regexp.exec(program);
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
    TokenGroup,
    generateTokenGroup
};
