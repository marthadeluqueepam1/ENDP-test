import { describe, it } from "node:test";
import { Directory } from "../src/Directory";
import { DirectoryNode } from "../src/DirectoryNode";
var assert = require('assert');

describe('DirectoryNode', () => {
    it('Test sort', () => {
        const directory = new Directory(new DirectoryNode('root'))
        const nameChild2 = "testchild2"
        directory.create([nameChild2])
        const nameChild1 = "testchild1"
        directory.create([nameChild1])
        directory.root.sortChildren(directory.root.children)
        assert.equal(directory.root.children[0].key, nameChild1);
    });
})