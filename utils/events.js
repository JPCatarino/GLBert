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
                qbert.moveLeftUp();
                
            }
        }
    }
    // Up key
    if (currentlyPressedKeys[38]) {
        if(!blockedKeys[38]) {
            if(!qbert.getMoving()){
                block(38);
                qbert.moveRightUp();
                
            }    
        }
    }
    // Right key
    if (currentlyPressedKeys[39]) {
        if(!blockedKeys[39]) {
            if(!qbert.getMoving()){
                block(39);
                qbert.moveRightDown();
                
            }    
        }
    }
    // Down key
    if (currentlyPressedKeys[40]) {
        if(!blockedKeys[40]) {
            if(!qbert.getMoving()){
                block(40);
                qbert.moveLeftDown();
                
            }    
        }
    }
}