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

    findIndex(node) {
        if (this.parent) {
            for(let key in this.parent.childs) {
                if (this.parent.childs[key] === node) {
                    return +key;
                }
            }
        }

        return -1;
    }

    nextSibling() {
        let index = this.findIndex(this);

        if (index > -1 && this.parent.childs[index + 1]) {
            return this.parent.childs[index + 1];
        }

        return null
    }

    prevSibling() {
        let index = this.findIndex(this);

        if (index > 0) {
            return this.parent.childs[index - 1];
        }

        return null
    }

    traverse(callback) {
        callback(this);
        for (let child of this.childs) {
            child.traverse(callback);
        }
    }

    traverseAncestor(callback) {
        callback(this);
        if (this.parent) {
            this.parent.traverseAncestor(callback);
        }
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