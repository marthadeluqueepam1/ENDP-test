"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directory = void 0;
var DirectoryNode_1 = require("./DirectoryNode");
var Directory = /** @class */ (function () {
    function Directory(key) {
        this.root = new DirectoryNode_1.DirectoryNode(key);
    }
    Directory.prototype._log = function (spaces, state) {
        var _this = this;
        console.log(' '.repeat(spaces) + state.key);
        if (state.children.length > 0) {
            state.children.forEach(function (child) {
                _this._log(spaces + 1, child);
            });
        }
    };
    Directory.prototype.list = function () {
        var _this = this;
        if (this.root.children.length > 0) {
            this.root.children.forEach(function (child) {
                _this._log(0, child);
            });
        }
    };
    Directory.prototype.create = function (args) {
        var path = args[0].split('/');
        if (path.length == 1) {
            var newNode = new DirectoryNode_1.DirectoryNode(path[0], this.root);
            this.root.children.push(newNode);
        }
        else {
            var state_1 = this.root;
            path.forEach(function (value) {
                var newNode = new DirectoryNode_1.DirectoryNode(value, state_1);
                var childIncluded = state_1.children.map(function (child) { return child.key; }).includes(newNode.key);
                if (!childIncluded) {
                    state_1.children.push(newNode);
                }
                state_1 = state_1.children.find(function (child) {
                    return child.key === value;
                });
            });
        }
    };
    Directory.prototype.delete = function (args) {
        var path = args[0].split('/');
        var state = this.root;
        var _loop_1 = function (i) {
            var dir = path[i];
            var childIncluded = state.children.map(function (child) { return child.key; }).includes(dir);
            if (childIncluded) {
                if (i < path.length - 1) {
                    state = state.children.find(function (child) {
                        return child.key === dir;
                    });
                }
                else {
                    var deletedChildIndex_1 = state.children.findIndex(function (child) { return child.key === dir; });
                    state.children = state.children.filter(function (_, index) { return index !== deletedChildIndex_1; });
                }
            }
            else {
                console.log("Cannot delete ".concat(args[0], " - ").concat(dir, " does not exist"));
                return { value: void 0 };
            }
        };
        for (var i = 0; i < path.length; ++i) {
            var state_2 = _loop_1(i);
            if (typeof state_2 === "object")
                return state_2.value;
        }
    };
    Directory.prototype.move = function (args) {
        //Delete child
        var oldPath = args[0];
        var oldPathValues = oldPath.split('/');
        var oldState = this.root;
        var movingChild;
        var _loop_2 = function (i) {
            var oldDir = oldPathValues[i];
            var childIncluded = oldState.children.map(function (child) { return child.key; }).includes(oldDir);
            if (childIncluded) {
                if (i < oldPathValues.length - 1) {
                    oldState = oldState.children.find(function (child) {
                        return child.key === oldDir;
                    });
                }
                else {
                    var deletedChildIndex_2 = oldState.children.findIndex(function (child) { return child.key === oldDir; });
                    movingChild = oldState.children[deletedChildIndex_2];
                    oldState.children = oldState.children.filter(function (_, index) { return index !== deletedChildIndex_2; });
                }
            }
            else {
                console.log("Cannot move ".concat(oldPath, " - ").concat(oldDir, " does not exist"));
                return { value: void 0 };
            }
        };
        for (var i = 0; i < oldPathValues.length; ++i) {
            var state_3 = _loop_2(i);
            if (typeof state_3 === "object")
                return state_3.value;
        }
        //Add deleted child if exists
        var newPath = args[1];
        var newPathValues = newPath.split('/');
        var newState = this.root;
        if (movingChild) {
            newPathValues.push(movingChild.key);
            var _loop_3 = function (i) {
                var newDir = newPathValues[i];
                if (i < newPathValues.length - 1) {
                    var childIncluded = newState.children.map(function (child) { return child.key; }).includes(newDir);
                    if (childIncluded) {
                        newState = newState.children.find(function (child) {
                            return child.key === newDir;
                        });
                    }
                    else {
                        console.log("Cannot move ".concat(newPath, " - ").concat(newDir, " does not exist"));
                        return { value: void 0 };
                    }
                }
                else {
                    newState.children.push(movingChild);
                }
            };
            for (var i = 0; i < newPathValues.length; ++i) {
                var state_4 = _loop_3(i);
                if (typeof state_4 === "object")
                    return state_4.value;
            }
        }
    };
    return Directory;
}());
exports.Directory = Directory;
