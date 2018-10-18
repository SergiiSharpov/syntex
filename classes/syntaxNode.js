/**
 * Base node of AST
 */
class SyntaxNode {
    constructor() {
        this.childs = [];
        this.range = [];
        this.value = null;
        this.type = null;
        this.parent = null;
        this.userData = {};
    }

    /**
     * Finds a node with target type going through each parent node
     * @param nodeType
     * @returns {SyntaxNode|null}
     */
    findUp(nodeType) {
        if (this.parent) {
            if (this.parent.type === nodeType) {
                return this.parent;
            }

            return this.parent.findUp(nodeType);
        }

        return null;
    }

    /**
     * Finds a node with target type going through each child node
     * @param nodeType
     * @returns {SyntaxNode|null}
     */
    findDown(nodeType) {
        if (this.childs.length) {
            for (let child of this.childs) {
                if (child.type === nodeType) {
                    return child;
                    let childNode = child.findDown(nodeType);
                    if (childNode) {
                        return childNode;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Appends node to the target
     * @param node {SyntaxNode}
     */
    append(node) {
        this.childs.push(node);
        node.parent = this;
    }
}

module.exports = {
    SyntaxNode
};