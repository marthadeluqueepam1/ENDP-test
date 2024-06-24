"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var DirectoryNode_1 = require("./DirectoryNode");
var Directory_1 = require("./Directory");
var Action;
(function (Action) {
    Action["CREATE"] = "CREATE";
    Action["LIST"] = "LIST";
    Action["DELETE"] = "DELETE";
    Action["MOVE"] = "MOVE";
})(Action || (Action = {}));
var REQUIRES_ARGS = new Set([
    Action.CREATE,
    Action.DELETE,
    Action.MOVE
]);
//Read commands file
function _readCommandsFile(fileName) {
    var commandsFile = fs.readFileSync("./commands/".concat(fileName), 'utf-8');
    return commandsFile.split('\n');
}
//Create list of commands
function _createCommandsList(commandsLines) {
    return commandsLines.map(function (value) {
        var values = value.split(' ');
        var commandAction = Action[values[0]];
        if (REQUIRES_ARGS.has(commandAction)) {
            values.shift();
            return { action: commandAction, args: values };
        }
        else {
            return { action: commandAction };
        }
    });
}
function _getCommandFunction(action, directory) {
    switch (action) {
        case Action.CREATE:
            return directory.create.bind(directory);
            break;
        case Action.LIST:
            return directory.list.bind(directory);
            break;
        case Action.DELETE:
            return directory.delete.bind(directory);
            break;
        case Action.MOVE: return directory.move.bind(directory);
    }
}
var directory = new Directory_1.Directory(new DirectoryNode_1.DirectoryNode('root'));
var fileName = process.argv.slice(2)[0];
var commandsLines = _readCommandsFile(fileName);
var commandsList = _createCommandsList(commandsLines);
commandsList.map(function (command) {
    var argsPrint = command.args ? command.args.join(" ") : '';
    console.log(command.action + ' ' + argsPrint);
    var commandFunction = _getCommandFunction(command.action, directory);
    commandFunction(command.args);
});
