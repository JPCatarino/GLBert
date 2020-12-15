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
    
    document.getElementById("default").onclick = function(){		
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

    document.getElementById("reset").onclick = function(){
        reset_game();
        globalAngleXX = -21;
        globalAngleYY = 0;
        globalAngleZZ = 0;
        globalTx = 0;
        globalTy = 0.5;
        globalTz = -2.0;	
    }

    var sliderX = document.getElementById("rotateXLight");
    var outputX = document.getElementById("valX");
    outputX.innerHTML = sliderX.value;
    
    sliderX.oninput = function(){
        outputX.innerHTML = this.value;
        to_radians = this.value * (Math.PI/180);
        lightArray[0] = o_lightArray[0];
        lightArray[1] = o_lightArray[1] * Math.cos(to_radians) + o_lightArray[2] * (-Math.sin(to_radians));
        lightArray[2] = o_lightArray[1] * Math.sin(to_radians) + o_lightArray[2] * Math.cos(to_radians);
    }

	var sliderY = document.getElementById("rotateYLight");
    var outputY = document.getElementById("valY");
    outputY.innerHTML = sliderY.value;
    
    sliderY.oninput = function(){
        outputY.innerHTML = this.value;
        to_radians = this.value * (Math.PI/180);
        lightArray[0] = o_lightArray[0] * Math.cos(to_radians) + o_lightArray[2] * Math.sin(to_radians);
        lightArray[1] = o_lightArray[1];
        lightArray[2] = o_lightArray[2] * Math.cos(to_radians) + o_lightArray[0] * (-Math.sin(to_radians));
    }

    var sliderZ = document.getElementById("rotateZLight");
    var outputZ = document.getElementById("valZ");
    outputZ.innerHTML = sliderZ.value;
    
    sliderZ.oninput = function(){
        outputZ.innerHTML = this.value;
        to_radians = this.value * (Math.PI/180);
        lightArray[0] = o_lightArray[0] * Math.cos(to_radians) + o_lightArray[1] * (-Math.sin(to_radians));
        lightArray[1] = o_lightArray[1] * Math.cos(to_radians) + o_lightArray[0] * Math.sin(to_radians);
        lightArray[2] = o_lightArray[2];
    }
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

    if (currentlyPressedKeys[13]) {
        if(!blockedKeys[13] && !qbert.dead) {   
            menuSound.play();         
            startGame = true; 
        }
    }
}