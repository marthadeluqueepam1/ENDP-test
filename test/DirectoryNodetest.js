"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var Directory_1 = require("../src/Directory");
var DirectoryNode_1 = require("../src/DirectoryNode");
var assert = require('assert');
(0, node_test_1.describe)('DirectoryNode', function () {
    (0, node_test_1.it)('Test sort', function () {
        var directory = new Directory_1.Directory(new DirectoryNode_1.DirectoryNode('root'));
        var nameChild2 = "testchild2";
        directory.create([nameChild2]);
        var nameChild1 = "testchild1";
        directory.create([nameChild1]);
        directory.root.sortChildren(directory.root.children);
        assert.equal(directory.root.children[0].key, nameChild1);
    });
});
