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
    DirectoryNode.prototype.sortChildren = function (children) {
        children.sort(function (a, b) {
            var keyA = a.key.toUpperCase();
            var keyB = b.key.toUpperCase();
            if (keyA < keyB) {
                return -1;
            }
            if (keyA > keyB) {
                return 1;
            }
            return 0;
        });
    };
    return DirectoryNode;
}());
exports.DirectoryNode = DirectoryNode;
