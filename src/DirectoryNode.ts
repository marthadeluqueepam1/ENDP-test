export class DirectoryNode {
    key: string;
    parent: DirectoryNode | null;
    children: DirectoryNode[];
  
    constructor(key: string, parent = null) {
      this.key = key;
      this.parent = parent;
      this.children = [];
    }
    
    sortChildren(children: DirectoryNode[]){
      children.sort((a, b) => {
        const keyA = a.key.toUpperCase(); 
        const keyB = b.key.toUpperCase();
        if (keyA < keyB) {
          return -1;
        }
        if (keyA > keyB) {
          return 1;
        }
        return 0;
      });
    }
}