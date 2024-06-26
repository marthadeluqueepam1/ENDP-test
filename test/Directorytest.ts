import { describe, it } from "node:test";
import { Directory } from "../src/Directory";
import { DirectoryNode } from "../src/DirectoryNode";
var assert = require('assert');

describe('Directory', () => {
    it('Test create', () => {
        const directory = new Directory(new DirectoryNode('root'))
        const nameChild = "testchild"
        directory.create([nameChild])
        assert.equal(directory.root.children[0].key, nameChild);
    });
    it('Test delete', () => {
        const directory = new Directory(new DirectoryNode('root'))
        const nameChild = "testchild"
        directory.create([nameChild])
        assert.strictEqual(directory.root.children[0].key, nameChild);
        directory.delete([nameChild])
        assert.equal(typeof directory.root.children[0], 'undefined');
    });
    it.skip('Test move', () => {
        const directory = new Directory(new DirectoryNode('root'))
        const nameChild1 = "testchild1"
        directory.create([nameChild1])
        assert.equal(directory.root.children[0].key, nameChild1);
        const nameChild2 = "testchild2/asd"
        directory.create([nameChild2])
        assert.equal(directory.root.children[1].key, nameChild2);
        directory.move([nameChild2, nameChild1])
        assert.equal(directory.root.children[1].children[0], 'asd');
        const nameChild3 = "testchild3"
        directory.create([nameChild3])
        assert.equal(directory.root.children[2].key, nameChild3);
        directory.move([nameChild1, nameChild3])
        assert.equal(directory.root.children[2].children[0].key, nameChild1);
    });
});
