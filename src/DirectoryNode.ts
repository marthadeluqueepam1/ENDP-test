export class DirectoryNode {
    key: string;
    parent: DirectoryNode | null;
    children: DirectoryNode[];
  
    constructor(key: string, parent = null) {
      this.key = key;
      this.parent = parent;
      this.children = [];
    }
}