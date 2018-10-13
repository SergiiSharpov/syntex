/**
 * Variants of splitting
 * @type {{newline: string, tab: string, whitespace: string}}
 */
const Subtokens = {
    newline: '|\\n',
    tab: '|\\t',
    whitespace: '|\\s+'
};

/**
 * Split program in to the array of tokens
 * @function
 * @param string {String}
 * @param sub {Object}
 * @returns {Object}
 */
const splitTokens = (string, sub = {}) => {
    let tokens = [];

    let reg = '\\S+';
    for(let key in sub) {
        if (sub[key])
        reg += Subtokens[key] || '';
    }
    let globalReg = new RegExp(reg, 'gm');
    let lastToken;

    while(lastToken = globalReg.exec(string)) {
        tokens.push({
            value: lastToken[0],
            index: lastToken.index - 1
        });
    }

    let result = [];
    for (let token of tokens) {
        let subtokens = token.value.match(/(\W)|(\w+)/gm);
        let pos = 0;
        let start = 0;
        subtokens.forEach((value) => {
            start = token.index + pos;
            result.push({
                value,
                range: [start + 1, start + value.length + 1]
            });
            pos += value.length;
        });
    }

    return {
        data: result,
        program: string
    };
};

module.exports = {
    splitTokens
};