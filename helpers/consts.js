/**
 * List of defaults token types
 * @type {{KEYWORD: string, IDENTIFIER: string, OPERATOR: string, DELIMITER: string, LINEBREAK: string, STRING: string, NUMERIC: string, UNKNOWN: string}}
 */
const DefaultTokenTypes = {
    KEYWORD: "Keyword",
    IDENTIFIER: "Identifier",
    OPERATOR: "Operator",
    DELIMITER: "Delimiter",
    LINEBREAK: "Linebreak",
    STRING: "String",
    NUMERIC: "Numeric",
    UNKNOWN: 'Unknown'
};

/**
 * List of defaults node types
 * @type {{UNKNOWN: string, METHOD_CALLING: string, BLOCK: string, ARGUMENTS: string, DECLARATION: string, COMMENT_MULTIPLE: string}}
 */
const DefaultNodeTypes = {
    UNKNOWN: "UnknownIdentifier",
    METHOD_CALLING: "MethodCalling",
    BLOCK: "BlockDefinition",
    ARGUMENTS: "ArgumentsDefinition",
    DECLARATION: "Declaration",
    COMMENT_MULTIPLE: "CommentMultiple"
};

/**
 * Merges provided token types with defaults
 * @param types
 * @returns {{KEYWORD: string, IDENTIFIER: string, OPERATOR: string, DELIMITER: string, LINEBREAK: string, STRING: string, NUMERIC: string, UNKNOWN: string} & any}
 */
const tokenTypesMerge = (...types) => {
    return Object.assign(DefaultTokenTypes, ...types);
};

/**
 * Merges provided node types with defaults
 * @param types
 * @returns {{UNKNOWN: string, METHOD_CALLING: string, BLOCK: string, ARGUMENTS: string, DECLARATION: string, COMMENT_MULTIPLE: string} & any}
 */
const nodeTypesMerge = (...types) => {
    return Object.assign(DefaultNodeTypes, ...types);
};

module.exports = {
    DefaultTokenTypes,
    DefaultNodeTypes,
    tokenTypesMerge,
    nodeTypesMerge
};