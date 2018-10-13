const {DefaultTokenTypes} = require("./../helpers/consts");

/**
 * Base class for solving tokens
 */
class TokenSolver {
    constructor() {
        this.include = [];
        this.regexp = null;
    }

    /**
     * Solves token in token list
     * @param token {Object}
     * @param target {Number}
     * @param tokenList {Array}
     * @param program {String}
     * @returns {Object|null}
     */
    solve(token, target, tokenList, program) {
        if (this.include.length && this.include.indexOf(token) >= 0) {
            return {
                value: token,
                offset: 1
            };
        }
        if (this.regexp && token.search(this.regexp) >= 0) {
            return {
                value: token,
                offset: 1
            }
        }

        return null;
    }
}

/**
 * Helps to solve strings
 */
class StringSolver extends TokenSolver {
    constructor() {
        super();
        this.delimiters = [];
    }
    /**
     * Solves token in token list
     * @param token {Object}
     * @param position {Number}
     * @param tokenList {Array}
     * @param program {String}
     * @returns {Object|null}
     */
    solve(token, position, tokenList, program) {
        if (this.delimiters.indexOf(token) >= 0) {
            let next = position + 1;
            while(next < tokenList.length) {

                if (token === tokenList[next].value && tokenList[next - 1].value !== '\\') {
                    let value = program.slice(tokenList[position].range[0], tokenList[next].range[1]).replace(/\\/g,'');

                    return {
                        value: value,
                        offset: next - position + 1
                    }
                }

                next++;
            }

            return null;
        }

        return null;
    }
}

/**
 * Group that collect solvers and can be used to solve array of tokens
 */
class TokenGroup {
    /**
     * @param solvers {Object}
     * @param defaultSolverId {String}
     */
    constructor(solvers = {}, defaultSolverId = DefaultTokenTypes.UNKNOWN) {
        this.solvers = solvers;
        this.defaultSolver = defaultSolverId;
    }

    /**
     * @param list {Object}
     * @param props {Object}
     * @returns {Object}
     * @private
     */
    __getTokenInfo(list, props) {
        for (let solverKey in this.solvers) {
            let solver = this.solvers[solverKey];
            let info = solver.solve(list[props.target].value, props.target, list, props.program);
            if (info) {
                return {
                    type: solverKey,
                    value: info.value,
                    offset: info.offset,
                    range: [list[props.target].range[0], list[props.target].range[0] + info.value.length]
                }
            }
        }

        return {
            type: this.defaultSolver,
            value: list[props.target].value,
            range: list[props.target].range,
            offset: 1
        };
    }

    /**
     * Solves array of tokens
     * @param tokenList {Object}
     * @returns {Array}
     */
    solve(tokenList) {
        let tokens = [];
        let target = 0;
        let program = tokenList.program;
        let list = tokenList.data;
        while (target < list.length) {
            let info = this.__getTokenInfo(list, {target, program});
            tokens.push({
                type: info.type,
                value: info.value,
                range: info.range
            });
            target += info.offset;
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