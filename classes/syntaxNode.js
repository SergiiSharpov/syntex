/**
 * Base node of AST
 * @property childs {Array} Array of child nodes
 * @property range {Array} Start & End point of the Node in the source code
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

    get(key) {
        return this.userData[key] || null;
    }

    /**
     * Finds a node with target type going through each parent node
     * @param nodeType {String} Type of the node to search
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
     * @param nodeType {String} Type of the node to search
     * @returns {SyntaxNode|null}
     */
    findDown(nodeType) {
        if (this.childs.length) {
            for (let child of this.childs) {
                if (child.type === nodeType) {
                    return child;
                }
                let childNode = child.findDown(nodeType);
                if (childNode) {
                    return childNode;
                }
            }
        }

        return null;
    }

    /**
     * Returns index of passed node through the parent node, returns -1 if Node doesn't exist
     * @param node {SyntaxNode} SyntaxNode to search
     * @returns {Number}
     */
    findIndex(node) {
        if (this.parent) {
            for(let key in this.parent.childs) {
                if (this.parent.childs[key] === node) {
                    return Number(key);
                }
            }
        }

        return -1;
    }

    /**
     * Returns next sibling Node or null
     * @returns {SyntaxNode|null}
     */
    nextSibling() {
        let index = this.findIndex(this);

        if (index > -1 && this.parent.childs[index + 1]) {
            return this.parent.childs[index + 1];
        }

        return null;
    }

    /**
     * Returns previous sibling Node or null
     * @returns {SyntaxNode|null}
     */
    prevSibling() {
        let index = this.findIndex(this);

        if (index > 0) {
            return this.parent.childs[index - 1];
        }

        return null;
    }

    /**
     * Execute a callback for each child node
     * @param callback {Function} Callback function
     */
    traverse(callback) {
        callback(this);
        for (let child of this.childs) {
            child.traverse(callback);
        }
    }

    /**
     * Execute a callback for each parent node
     * @param callback {Function} Callback function
     */
    traverseAncestor(callback) {
        callback(this);
        if (this.parent) {
            this.parent.traverseAncestor(callback);
        }
    }

    /**
     * Appends node to the target
     * @param node {SyntaxNode} Node that will be attached to this
     */
    append(node) {
        this.childs.push(node);
        node.parent = this;
    }
}

module.exports = {
    SyntaxNode
};
