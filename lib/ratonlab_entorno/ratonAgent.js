const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        this.last = "null";
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0,0": "UP",
            "0,0,0,1,0": "UP",
            "0,0,1,0,0": "UP",
            "0,0,1,1,0": "UP",
            "0,1,0,0,0": "LEFT",
            "0,1,0,1,0": "RIGHT",
            "0,1,1,0,0": "LEFT",
            "0,1,1,1,0": "LEFT",
            "1,0,0,0,0": "UP",
            "1,0,0,1,0": "RIGHT",
            "1,0,1,0,0": "DOWN",
            "1,0,1,1,0": "UP",
            "1,1,0,0,0": "RIGHT",
            "1,1,0,1,0": "RIGHT",
            "1,1,1,0,0": "DOWN",
            "default": "TAKE"
        };
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        let lasact = this.last;
        let auxper = this.perception.join().split(",");
        if (lasact == "DOWN") {
            auxper[1] = 1;
        } else if (lasact == "UP") {
            auxper[3] = 1;
        } else if (lasact == "LEFT") {
            auxper[2] = 1;
        } else if (lasact == "RIGHT") {
            auxper[0] = 1;
        } else {}
        let viewKey = null;
        let aux = auxper.join();
        if (aux == "1,1,1,1,0") {
            viewKey = this.perception.join();
            console.log("punto muerto");
        } else {
            viewKey = auxper.join();
        }

        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;

        if (this.table[viewKey]) {
            console.log(viewKey);
            let ret = this.table[viewKey];
            this.last = ret;
            return ret;
        } else {
            console.log(viewKey);
            return this.table["default"];
        }
    }

}

module.exports = CleanerAgent;