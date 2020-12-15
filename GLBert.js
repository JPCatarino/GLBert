// GLBert.JS
// Jorge Catarino, Óscar Pimentel - 2020 


var gl = null; // WebGL context
var shaderProgram = null;

// Game Entities
var map = new Map();
var rootPiece = map.getMapPieces()[27];
var spawnPiece1 = map.getMapPieces()[25];
var spawnPiece2 = map.getMapPieces()[24];
var spawnPiece3 = map.getMapPieces()[26];
var spawnPiece4 = map.getMapPieces()[22];
var diskPiece1 = map.getMapPieces()[13]; 
var diskPiece2 = map.getMapPieces()[17];
var spawnPieces = [spawnPiece1, spawnPiece2, spawnPiece3, spawnPiece4];
var qbert = new Qbert(rootPiece.tx+0.003, 0.4255, -0.65);
var enemies = [new Enemy(spawnPiece1.tx+0.003, spawnPiece1.ty+0.05, -0.65, 2, 1), new Enemy(spawnPiece2.tx+0.003, spawnPiece2.ty+0.05, -0.65, 3,3)];
var disks = [new Disk(diskPiece1.tx -0.12 ,diskPiece1.ty+0.1, -0.65, 5,0), new Disk(diskPiece2.tx +0.12 ,diskPiece2.ty+0.1, -0.65, 5,6)] //to continue
var startGame = false;
// Buffers
var mapVertexPositionBuffer = [];
var mapVertexIndexBuffer = [];
var mapVertexColorBuffer = [];
var mapVertexNormalBuffer = [];

var qbertVertexPositionBuffer = null;
var qbertVertexColorBuffer = null;
var qbertVertexNormalBuffer = null;

var enemiesVertexPositionBuffer = [];
var enemiesVertexColorBuffer = [];
var enemiesVertexNormalBuffer = [];

var disksVertexPositionBuffer = [];
var disksVertexNormalBuffer = [];
var disksVertexColorBuffer = [];

// Global Variables 
var pos_Viewer = [ 0.0, 0.0, 0.0, 1.0 ];
var o_lightArray = [0.7, 1.0, 1.5];
var lightArray = [0.7, 1.0, 1.5];
var lastValueX = 0;
var lastValueY = 0;

// Global Transformation Variables 
globalAngleXX = -21;
globalAngleYY = 0;
globalAngleZZ = 0;
globalTx = 0;
globalTy = 0.5;
globalTz = -2.0;

var primitiveType = null;
var projectionType = 1;

function initBuffers(){
	initMapBuffers();
	initQbertBuffers();
	initEnemyBuffers();
	initDiskBuffers()
	console.log(qbert.getVertices());
	console.log(qbertVertexPositionBuffer.numItems);
	console.log(qbertVertexColorBuffer.numItems);
}

function drawModel( model,
					modelVertexPositionBuffer,
					modelVertexNormalBuffer,
					modelVertexColorBuffer,
					mvMatrix,
					primitiveType ) {
	
    // Pay attention to transformation order !!
    
	mvMatrix = mult( mvMatrix, translationMatrix( model.tx, model.ty, model.tz ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( model.rz ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( model.ry ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( model.rx ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( model.sx, model.sy, model.sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));
    
	// Associating the data to the vertex shader
	// Vertex Coordinates and Vertex Normal Vectors
	
    gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, modelVertexPositionBuffer.itemSize, gl.FLOAT, false, 0 , 0);

	// TODO add light, color stuff 
	
	gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, modelVertexNormalBuffer.itemSize, gl.FLOAT, false, 0 , 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexColorBuffer)
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, modelVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0); 
    // Drawing 
	
	gl.drawArrays(primitiveType, 0, modelVertexPositionBuffer.numItems);
	
}

function menu(){
	var textCanvas = document.querySelector("#text");
	var ctx = textCanvas.getContext("2d");
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "40px arcade";
    ctx.fillStyle = '#FFFFFF';
	ctx.fillText("PRESS ENTER TO START", 12, 450);
    ctx.drawImage(document.getElementById("glbertlogo"), 115 , 200);
}

function reset_game(){
	map = new Map();
	rootPiece = map.getMapPieces()[27];
	spawnPiece1 = map.getMapPieces()[25];
	spawnPiece2 = map.getMapPieces()[24];
	spawnPiece3 = map.getMapPieces()[26];
	spawnPiece4 = map.getMapPieces()[22];
	diskPiece1 = map.getMapPieces()[13]; 
	diskPiece2 = map.getMapPieces()[17];
	spawnPieces = [spawnPiece1, spawnPiece2, spawnPiece3, spawnPiece4];
	qbert = new Qbert(rootPiece.tx+0.003, 0.4255, -0.65);
	enemies = [new Enemy(spawnPiece1.tx+0.003, spawnPiece1.ty+0.05, -0.65, 2, 1), new Enemy(spawnPiece2.tx+0.003, spawnPiece2.ty+0.05, -0.65, 3,3)];
	disks = [new Disk(diskPiece1.tx -0.12 ,diskPiece1.ty+0.1, -0.65, 5,0), new Disk(diskPiece2.tx +0.12 ,diskPiece2.ty+0.1, -0.65, 5,6)] //to continue

	// Buffers
	mapVertexPositionBuffer = [];
	mapVertexIndexBuffer = [];
	mapVertexColorBuffer = [];
	mapVertexNormalBuffer = [];

	qbertVertexPositionBuffer = null;
	qbertVertexColorBuffer = null;
	qbertVertexNormalBuffer = null;

	enemiesVertexPositionBuffer = [];
	enemiesVertexColorBuffer = [];
	enemiesVertexNormalBuffer = [];

	disksVertexPositionBuffer = [];
	disksVertexNormalBuffer = [];
	disksVertexColorBuffer = [];

	initBuffers();
}

function gameInfoText(points, lives){
	var textCanvas = document.querySelector("#text");
	var ctx = textCanvas.getContext("2d");
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "15px arcade";
    ctx.fillStyle = '#FFFFFF';
	ctx.fillText("Player 1", 600, 90);
	ctx.fillText("Points:" + points, 600, 120);
	ctx.fillText("Lives:" + lives, 600, 150);
	ctx.fillText("Change To:", 600, 180);
    ctx.drawImage(document.getElementById("blockLevel1"),630, 180, 100, 100);

}

function drawScene(){

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
    var pMatrix;
	
	var mvMatrix = mat4();
	
	// Clearing the frame-buffer and the depth-buffer
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// Computing the Projection Matrix
	
	if( projectionType == 0 ) {
		
		// For now, the default orthogonal view volume
		
		pMatrix = ortho( -1.0, 1.0, -1.0, 1.0, -1.0, 1.0 );
		
		// Global transformation !!
		
		globalTz = 0.0;
		
		// NEW --- The viewer is on the ZZ axis at an indefinite distance
		
		pos_Viewer[0] = pos_Viewer[1] = pos_Viewer[3] = 0.0;
		
        pos_Viewer[2] = 1.0;  
        		
		// TO BE DONE !
		
		// Allow the user to control the size of the view volume
	}
	else {	

		// A standard view volume.
		
		// Viewer is at (0,0,0)
		
		// Ensure that the model is "inside" the view volume
		
		pMatrix = perspective( 45, 1, 0.05, 15 );
		
		

		// NEW --- The viewer is on (0,0,0)
		
		pos_Viewer[0] = pos_Viewer[1] = pos_Viewer[2] = 0.0;
		
		pos_Viewer[3] = 1.0;  
	}
	
	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	// NEW --- Passing the viewer position to the vertex shader
	
	gl.uniform4fv( gl.getUniformLocation(shaderProgram, "viewerPosition"),
		flatten(pos_Viewer) );


	mvMatrix = mult(mvMatrix ,translationMatrix(globalTx, globalTy, globalTz));	
	mvMatrix = mult(mvMatrix ,rotationXXMatrix(globalAngleXX));
	mvMatrix = mult(mvMatrix ,rotationYYMatrix(globalAngleYY));
	mvMatrix = mult(mvMatrix ,rotationZZMatrix(globalAngleZZ));

	mvMatrixInv =  inverse(mvMatrix);
	
	mvMatrixInvTrans = transpose(mvMatrixInv);

	gl.uniformMatrix4fv(
		gl.getUniformLocation(shaderProgram, "uMVMatrixInverseTranspose"), false,
		mvMatrixInvTrans);


	// set the light direction.	
	gl.uniform3fv(gl.getUniformLocation(shaderProgram, "u_reverseLightDirection"), new Float32Array(lightArray));

	// Models 
	
	//Qbert
	drawModel(qbert, qbertVertexPositionBuffer, qbertVertexNormalBuffer, qbertVertexColorBuffer, mvMatrix, primitiveType);

	//Enemies
	for(var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++){
		drawModel(enemies[enemyIndex], enemiesVertexPositionBuffer[enemyIndex], enemiesVertexNormalBuffer[enemyIndex], enemiesVertexColorBuffer[enemyIndex], mvMatrix, primitiveType);
	}

	//Disks
	for(var diskIndex = 0; diskIndex < disks.length; diskIndex++){
		drawModel(disks[diskIndex], disksVertexPositionBuffer[diskIndex], disksVertexNormalBuffer[diskIndex], disksVertexColorBuffer[diskIndex], mvMatrix, primitiveType);
	}

	// Map
	for(var i = 0; i < 28 ; i++){
		drawModel(map.getMapPieces()[i], mapVertexPositionBuffer[i], mapVertexNormalBuffer[i], mapVertexColorBuffer[i], mvMatrix, primitiveType);
	}
	
	if(startGame){
		gameInfoText(qbert.points, qbert.lives);
	}
}

function tick() {
	
	requestAnimationFrame(tick);

	handleKeys();
	
    drawScene();
    
	//countFrames();
	
	if(startGame){
		animate();
		for(var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++){
			qbert.hasCollidedWithEnemy(enemies[enemyIndex]);
		}
	}    
}

function outputInfos(){
}

function initWebGL( canvas ) {
	try {
		
		// Create the WebGL context
		
		// Some browsers still need "experimental-webgl"
		
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
		// NEW - Drawing the triangles defining the model
		
		primitiveType = gl.TRIANGLES;
		
		// Enable DEPTH-TEST
		
		gl.enable( gl.DEPTH_TEST );

		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
        
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas");
	
	initWebGL( canvas );

	shaderProgram = initShaders( gl );
	
    setEventListeners(canvas);
    
	initBuffers();
	
	menu();	
	
	tick();		// A timer controls the rendering / animation    

	outputInfos();
}

//----------------------------------------------------------------------------
