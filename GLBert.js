// GLBert.JS
// Jorge Catarino, Óscar Pimentel - 2020 


var gl = null; // WebGL context
var shaderProgram = null;

// Game Entities
var map = new Map();

// Buffers
var mapVertexPositionBuffer = [];
var mapVertexIndexBuffer = [];
var mapVertexColorBuffer = [];

// Global Variables 
var pos_Viewer = [ 0.0, 0.0, 0.0, 1.0 ];

// Global Transformation Variables 
var globalTz = 0.0;

var primitiveType = null;
var projectionType = 0;


function initBuffers(){
    initMapBuffers();
}

function drawModel( model,
                    modelVertexPositionBuffer,
					modelVertexIndexBuffer,
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
	gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexColorBuffer)
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, modelVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0); 
    // Drawing 
	
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelVertexIndexBuffer);
	gl.drawArrays(primitiveType, 0, modelVertexPositionBuffer.numItems)
	
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
		
		// Global transformation !!
		
		globalTz = -2.5;

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

    // Models 

	// Map
	drawModel(map.getMapPieces()[0], mapVertexPositionBuffer[0], mapVertexIndexBuffer[0], mapVertexColorBuffer[0], mvMatrix, primitiveType);

}

function tick() {
	
	requestAnimationFrame(tick);
	
    drawScene();
    
    //countFrames();
	
	//animate();
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
	
	tick();		// A timer controls the rendering / animation    

	outputInfos();
}
