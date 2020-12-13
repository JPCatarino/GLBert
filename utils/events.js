// events.js 
// Jorge Catarino, Óscar Pimentel - 2020 

var currentlyPressedKeys = {};
var blockedKeys = {};

function setEventListeners( canvas ){

    // NEW ---Handling the keyboard
	
    // From learningwebgl.com

    function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }

    function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
        delete blockedKeys[event.keyCode];
    }

	document.onkeydown = handleKeyDown;
    
    document.onkeyup = handleKeyUp;

    document.getElementById("rotate-left").onclick = function(){		
		globalAngleXX = -51;
        globalAngleYY = 33;
        globalAngleZZ = 43;
        globalTx = 0;
        globalTy = 0.5;
        globalTz = -2.5;	
		
    };
    
    document.getElementById("rotate-right").onclick = function(){		
		globalAngleXX = -51;
        globalAngleYY = -33;
        globalAngleZZ = -43;
        globalTx = 0;
        globalTy = 0.5;
        globalTz = -2.5;	
		
    };
    
    document.getElementById("reset").onclick = function(){		
		globalAngleXX = -21;
        globalAngleYY = 0;
        globalAngleZZ = 0;
        globalTx = 0;
        globalTy = 0.5;
        globalTz = -2.0;	
		
    };
    
    document.getElementById("inverted").onclick = function(){		
		globalAngleXX = 5;
		globalAngleYY = 0;
		globalAngleZZ = 180;
		globalTx = -0.2;
		globalTy = -0.2;
		globalTz = -2.0;	
		
    };
    
    document.getElementById("top-view").onclick = function(){		
		globalAngleXX = 20;
        globalAngleYY = 0;
        globalAngleZZ = 0;
        globalTx = 0;
        globalTy = -0.3;
        globalTz = -2.0;	
		
    };
    

}

function block(kCode) {
    blockedKeys[kCode] = true;
}

function handleKeys() {

    // Left key
    if (currentlyPressedKeys[37]) {
        if(!blockedKeys[37]) {
            if(!qbert.getMoving()){
                block(37);
                qbertJumpSound.play();
                qbert.moveLeftUp();
                
            }
        }
    }
    // Up key
    if (currentlyPressedKeys[38]) {
        if(!blockedKeys[38]) {
            if(!qbert.getMoving()){
                block(38);
                qbertJumpSound.play();
                qbert.moveRightUp();
                
            }    
        }
    }
    // Right key
    if (currentlyPressedKeys[39]) {
        if(!blockedKeys[39]) {
            if(!qbert.getMoving()){
                block(39);
                qbertJumpSound.play();
                qbert.moveRightDown();
                
            }    
        }
    }
    // Down key
    if (currentlyPressedKeys[40]) {
        if(!blockedKeys[40]) {
            if(!qbert.getMoving()){
                block(40);
                qbertJumpSound.play();
                qbert.moveLeftDown();
                
            }    
        }
    }
}