// events.js 
// Jorge Catarino, Óscar Pimentel - 2020 

function setEventListeners( canvas ){

    // NEW ---Handling the keyboard
	
    // From learningwebgl.com
    
    var currentlyPressedKeys = {};
    var blockedKeys = {};

    function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }

    function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
        delete blockedKeys[event.keyCode];
    }

    function block(kCode) {
        blocked[kCode] = true;
    }

	document.onkeydown = handleKeyDown;
    
    document.onkeyup = handleKeyUp;

    function handleKeys() {
        // Left key
        if (currentlyPressedKeys[37]) {
            if(!blockedKeys[37]) {
                block(37);
                qbert.moveLeftUp();
            }
        }
        // Up key
        if (currentlyPressedKeys[38]) {
            if(!blockedKeys[38]) {
                block(38);
                qbert.moveRightUp();
            }
        }
        // Right key
        if (currentlyPressedKeys[39]) {
            if(!blockedKeys[39]) {
                block(39);
                qbert.moveRightDown();
            }
        }
        // Down key
        if (currentlyPressedKeys[40]) {
            if(!blockedKeys[40]) {
                block(40);
                qbert.moveLeftDown();
            }
        }
    }

}