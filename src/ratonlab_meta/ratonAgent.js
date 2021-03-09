const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, SMELL, PrefiereLEFT, PrefiereUP, PrefiereRIGTH, PrefiereDOWN
        this.table = {
            "0,1,1,1,0,1,0,0,0": "LEFT",
            "1,0,1,1,0,0,1,0,0": "UP",
            "1,1,0,1,0,0,0,1,0": "RIGHT",
            "1,1,1,0,0,0,0,0,1": "DOWN",

            "0,0,1,1,0,1,0,0,0": "LEFT",
            "0,0,1,1,0,0,1,0,0": "UP",
            "0,1,0,1,0,1,0,0,0": "LEFT",
            "0,1,0,1,0,0,0,1,0": "RIGHT",
            "0,1,1,0,0,1,0,0,0": "LEFT",
            "0,1,1,0,0,0,0,0,1": "DOWN",
            "1,0,0,1,0,0,1,0,0": "UP",
            "1,0,0,1,0,0,0,1,0": "RIGHT",
            "1,0,1,0,0,0,1,0,0": "UP",
            "1,0,1,0,0,0,0,0,1": "DOWN",
            "1,1,0,0,0,0,0,1,0": "RIGHT",
            "1,1,0,0,0,0,0,0,1": "DOWN",

            "0,0,0,1,0,1,0,0,0": "LEFT",
            "0,0,0,1,0,0,1,0,0": "UP",
            "0,0,0,1,0,0,0,1,0": "RIGHT",
            "0,0,1,0,0,1,0,0,0": "LEFT",
            "0,0,1,0,0,0,1,0,0": "UP",
            "0,0,1,0,0,0,0,0,1": "DOWN",
            "0,1,0,0,0,1,0,0,0": "LEFT",
            "0,1,0,0,0,0,0,1,0": "RIGHT",
            "0,1,0,0,0,0,0,0,1": "DOWN",
            "1,0,0,0,0,0,1,0,0": "UP",
            "1,0,0,0,0,0,0,1,0": "RIGHT",
            "1,0,0,0,0,0,0,0,1": "DOWN",

            "0,0,0,0,0,1,0,0,0": "LEFT",
            "0,0,0,0,0,0,1,0,0": "UP",
            "0,0,0,0,0,0,0,1,0": "RIGHT",
            "0,0,0,0,0,0,0,0,1": "DOWN",

            "default": "TAKE"
        };
    }

    setup(state0) {
        this.x = state0.raton.x;
        this.y = state0.raton.y;
        this.quesox = state0.queso.x;
        this.quesoy = state0.queso.y;
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {

        let lasact = this.last;
        let auxper = this.perception.join().split(",");
        console.log(this.x + " , " + this.y);
        console.log(auxper);
        
        let distanciaLEFT = Math.abs(this.quesox - (this.x - 1)) + Math.abs(this.quesoy - this.y);
        let distanciaUP = Math.abs(this.quesoy - (this.y - 1)) + Math.abs(this.quesox - this.x);
        let distanciaRIGHT = Math.abs(this.quesox - (this.x + 1)) + Math.abs(this.quesoy - this.y);
        let distanciaDOWN = Math.abs(this.quesoy - (this.y + 1)) + Math.abs(this.quesox - this.x);

        auxper[6] = 0;

        console.log(distanciaLEFT + ", " + distanciaUP + ", " + distanciaRIGHT + ", " + distanciaDOWN)
        if (lasact == "DOWN"){
            auxper[1]=1;
        }else if (lasact == "UP"){
            auxper[3]=1;
        }else if (lasact == "LEFT"){
            auxper[2]=1;
        }else if (lasact == "RIGHT"){
            auxper[0]=1;
        }else {

        }

        if(((distanciaLEFT<=distanciaUP)|| (auxper[1]=='1')) & ((distanciaLEFT<=distanciaRIGHT) || (auxper[2]=='1')) & 
            ((distanciaLEFT<= distanciaDOWN)|| (auxper[3]=='1')) & ((auxper[0] == '-1') || (auxper[0] == '0'))){
            this.x = this.x-1;
            auxper[5] = '1';
            auxper[6] = '0';
            auxper[7] = '0';
            auxper[8] = '0';
            console.log("entro flet");
            console.log(auxper);
        }else if(((distanciaUP<=distanciaLEFT) || (auxper[0]=='1')) & ((distanciaUP<=distanciaRIGHT || (auxper[2]=='1'))) & 
                ((distanciaUP<= distanciaDOWN) || (auxper[3]=='1')) & ((auxper[1] == '-1') || (auxper[1] == '0'))){
            this.y = this.y-1;
            auxper[5] = '0';
            auxper[6] = '1';
            auxper[7] = '0';
            auxper[8] = '0';
            console.log("entro up");
            console.log(auxper);
        }else if(((distanciaRIGHT<=distanciaLEFT)|| (auxper[0]=='1')) & ((distanciaRIGHT<=distanciaUP)|| (auxper[1]=='1')) & 
                ((distanciaRIGHT<= distanciaDOWN)|| (auxper[3]=='1')) & ((auxper[2] == '-1') || (auxper[2] == '0'))){
            this.x = this.x+1;
            auxper[5] = '0';
            auxper[6] = '0';
            auxper[7] = '1';
            auxper[8] = '0';
            console.log("entro right");
            console.log(auxper);
        }else if (((distanciaDOWN<=distanciaUP) || (auxper[1]=='1')) & ((distanciaLEFT<=distanciaRIGHT) || (auxper[2]=='1')) & 
                ((distanciaDOWN<= distanciaLEFT) || (auxper[0]=='1')) & ((auxper[3] == '-1') || (auxper[3] == '0'))){
            this.y = this.y+1;
            auxper[5] = '0';
            auxper[6] = '0';
            auxper[7] = '0';
            auxper[8] = '1';
            console.log("entro down");
            console.log(auxper);
        }



        //this.perception = [LEFT, UP, DOWN, RIGTH, SMELL, ratonx, ratony, qx, qy]


        
        let viewKey = null;
        if (auxper  == "1,1,1,1,0,0,0,0,0"){
            viewKey = this.perception;
            console.log("punto muerto");
        }else{
            viewKey = auxper;
        }
        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;

        if (this.table[viewKey]) {
            let ret = this.table[viewKey];
            this.last = ret;
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }

    }

}

module.exports = CleanerAgent;