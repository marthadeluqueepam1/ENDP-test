import * as fs from 'fs';
import { DirectoryNode } from './DirectoryNode';
import { Directory } from './Directory';

interface CommandFunc {
  (args?: string[]): void;
}

enum Action {
  CREATE = "CREATE",
  LIST = "LIST",
  DELETE = "DELETE",
  MOVE = "MOVE"
}

interface command {
    action: Action
    args?: string[]
}

const REQUIRES_ARGS = new Set([
  Action.CREATE,
  Action.DELETE,
  Action.MOVE
])

//Read commands file
function _readCommandsFile(fileName: string){
  const commandsFile = fs.readFileSync(`./commands/${fileName}`, 'utf-8');
  return commandsFile.split('\n');  
}

//Create list of commands
function _createCommandsList(commandsLines: string[]): command[]{
  return commandsLines.map(function (value){
    const values = value.split(' ')
    const commandAction = Action[values[0]]
    if (REQUIRES_ARGS.has(commandAction)) {
      values.shift()
      return {action: commandAction, args: values} as command
    }else{
      return {action: commandAction} as command
    }
  })  
}

function _getCommandFunction(action: Action, directory: Directory): CommandFunc{
  switch (action) {
    case Action.CREATE: return directory.create.bind(directory); break;
    case Action.LIST: return directory.list.bind(directory); break;
    case Action.DELETE: return directory.delete.bind(directory); break;
    case Action.MOVE: return directory.move.bind(directory)
  }
}

let directory = new Directory(new DirectoryNode('root'))
var fileName = process.argv.slice(2)[0];
const commandsLines = _readCommandsFile(fileName)
const commandsList = _createCommandsList(commandsLines)
commandsList.map(function(command){
  const argsPrint = command.args? command.args : ''
  console.log(command.action +' '+ argsPrint)
  const commandFunction = _getCommandFunction(command.action, directory);
  commandFunction(command.args);
})