"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryNode = void 0;
var DirectoryNode = /** @class */ (function () {
    function DirectoryNode(key, parent) {
        if (parent === void 0) { parent = null; }
        this.key = key;
        this.parent = parent;
        this.children = [];
    }
    return DirectoryNode;
}());
exports.DirectoryNode = DirectoryNode;
