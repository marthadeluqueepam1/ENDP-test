import { DirectoryNode } from './DirectoryNode';

export class Directory {
    root: DirectoryNode;
    constructor(key) {
      this.root = new DirectoryNode(key);
    }

    _log(spaces: number, state: DirectoryNode){
      console.log(' '.repeat(spaces)+state.key)
      if (state.children.length > 0){
        state.children.forEach((child)=>{
          this._log(spaces+1, child)
        })        
      }
    }

    list(){
      if (this.root.children.length > 0){
        this.root.children.forEach((child)=>{
          this._log(0, child)
        })  
      }
    }

    create(args: string[]) {
      const path: string[] = args[0].split('/');
      if (path.length == 1){
        const newNode = new DirectoryNode(path[0], this.root)
        this.root.children.push(newNode)
      } else{
        let state = this.root
        path.forEach((value)=>{
          const newNode = new DirectoryNode(value, state)
          const childIncluded: boolean = state.children.map(child => child.key).includes(newNode.key);
          if(!childIncluded) {
            state.children.push(newNode)
          }
          state = state.children.find((child) => {
            return child.key === value
          });
        });
      }
    }
  
    delete(args: string[]) {
      const path: string[] = args[0].split('/');
      let state = this.root
      for(let i = 0; i < path.length ; ++i) {
        const dir = path[i];
        const childIncluded: boolean = state.children.map(child => child.key).includes(dir);
        if(childIncluded) {
            if(i < path.length - 1) {
              state = state.children.find((child) => {
                return child.key === dir
              })!;
            } else {
              const deletedChildIndex = state.children.findIndex((child) => child.key === dir)
              state.children = state.children.filter((_, index) => index !== deletedChildIndex);
            }
        } else {
            console.log(`Cannot delete ${args[0]} - ${dir} does not exist`);
            return;
        }
      }
    }

    move(args: string[]) {
      //Delete child
      const oldPath: string = args[0]
      const oldPathValues: string[] = oldPath.split('/');
      let oldState = this.root
      let movingChild: DirectoryNode;
      for(let i = 0; i < oldPathValues.length ; ++i) {
        const oldDir = oldPathValues[i];
        const childIncluded: boolean = oldState.children.map(child => child.key).includes(oldDir);
        if(childIncluded) {
            if(i < oldPathValues.length - 1) {
              oldState = oldState.children.find((child) => {
                return child.key === oldDir
              });
            } else {
              const deletedChildIndex = oldState.children.findIndex((child) => child.key === oldDir)
              movingChild = oldState.children[deletedChildIndex]
              oldState.children = oldState.children.filter((_, index) => index !== deletedChildIndex);
            }
        } else {
            console.log(`Cannot move ${oldPath} - ${oldDir} does not exist`);
            return;
        }
      }

      
      //Add deleted child if exists
      const newPath: string = args[1]
      const newPathValues: string[] = newPath.split('/');
      let newState = this.root;
      if (movingChild){
        newPathValues.push(movingChild.key)
        for(let i = 0; i < newPathValues.length ; ++i) {
          const newDir = newPathValues[i];
          if(i < newPathValues.length - 1) {
            const childIncluded: boolean = newState.children.map(child => child.key).includes(newDir);
            if(childIncluded) {
              newState = newState.children.find((child) => {
                return child.key === newDir
              });
            } else {
              console.log(`Cannot move ${newPath} - ${newDir} does not exist`);
              return;
            } 
          } else {
            newState.children.push(movingChild)
          }
        }  
      }
    }
}
