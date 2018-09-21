class CommandManager {
    constructor() {
        this.commands = [];
    }

    addCommand(command) {
        this.commands.push(command);
    }

    handleClick() {
        console.log(mouseX, mouseY, game.board.clickedCell);
        if ( game.withinCanevas(mouseX, mouseY) ) {
            game.board.getClickedCell();
            this.addCommand(new MouseCommand(mouseButton, createVector(mouseX,mouseY)));
            this.lastCommand().execute();
        }
    }

    handleKey() {
        if ( game.withinCanevas(mouseX, mouseY) ) {
            this.addCommand(new KeyCommand((keyCode)));
        }
    }

    lastCommand() {
        return this.commands[this.commands.length - 1];
    }
}

class Command {
    constructor() {
        this.executed = false;
        this.success = false;
    }
}

class KeyCommand extends Command {
    constructor(keyCode = null) {
        super();
        this.keyCode = keyCode;
    }
}

class MouseCommand extends  Command {
    constructor(pButton, pPosition = null) {
        super();
        this.button = pButton;
        this.position = pPosition;
    }

    execute() {
        let current = game.board.clickedCell;
        let movingPiece = game.board.movingPiece;

        if(this.button === LEFT) {
            if ( movingPiece !== null) {
                if(current.isValidTarget(movingPiece)) {
                    // On met en mouvement la piece de la case cliquée
                    movingPiece.move(current);
                    game.board.setNextPlayer();
                    game.board.movingPiece = null;
                } else {
                    // On annule le mouvement
                    game.board.movingPiece = null;
                }
            } else {
                if (current.hasPiece()) {
                    game.board.movingPiece = current.piece;
                }
            }
        } else if (this.button === CENTER) {
            if(current.hasPiece()) {
                current.piece.orientation.rotateClock();
                game.board.setNextPlayer();
            }
        }
    }
}
