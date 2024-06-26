"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var Directory_1 = require("../src/Directory");
var DirectoryNode_1 = require("../src/DirectoryNode");
var assert = require('assert');
(0, node_test_1.describe)('Directory', function () {
    (0, node_test_1.it)('Test create', function () {
        var directory = new Directory_1.Directory(new DirectoryNode_1.DirectoryNode('root'));
        var nameChild = "testchild";
        directory.create([nameChild]);
        assert.equal(directory.root.children[0].key, nameChild);
    });
    (0, node_test_1.it)('Test delete', function () {
        var directory = new Directory_1.Directory(new DirectoryNode_1.DirectoryNode('root'));
        var nameChild = "testchild";
        directory.create([nameChild]);
        assert.strictEqual(directory.root.children[0].key, nameChild);
        directory.delete([nameChild]);
        assert.equal(typeof directory.root.children[0], 'undefined');
    });
    node_test_1.it.skip('Test move', function () {
        var directory = new Directory_1.Directory(new DirectoryNode_1.DirectoryNode('root'));
        var nameChild1 = "testchild1";
        directory.create([nameChild1]);
        assert.equal(directory.root.children[0].key, nameChild1);
        var nameChild2 = "testchild2/asd";
        directory.create([nameChild2]);
        assert.equal(directory.root.children[1].key, nameChild2);
        directory.move([nameChild2, nameChild1]);
        assert.equal(directory.root.children[1].children[0], 'asd');
        var nameChild3 = "testchild3";
        directory.create([nameChild3]);
        assert.equal(directory.root.children[2].key, nameChild3);
        directory.move([nameChild1, nameChild3]);
        assert.equal(directory.root.children[2].children[0].key, nameChild1);
    });
});
