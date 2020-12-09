// buffers.js 
// Jorge Catarino, Óscar Pimentel 

function initMapBuffers(){
    var map_pieces = map.getMapPieces();

    for (var cubeIndex = 0; cubeIndex < 28; cubeIndex++){
        var current_cube = map_pieces[cubeIndex];
        var vertices = current_cube.getVertices();
        var indices = current_cube.getIndices();
        var colors = current_cube.getColors();
        var normals = current_cube.getNormals();
        

        mapPieceVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mapPieceVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        mapPieceVertexPositionBuffer.itemSize = 3;
        mapPieceVertexPositionBuffer.numItems = vertices.length / 3;

        mapPieceVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mapPieceVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        mapPieceVertexNormalBuffer.itemSize = 3;
        mapPieceVertexNormalBuffer.numItems = normals.length / 3;	
        
        mapPieceVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mapPieceVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        mapPieceVertexColorBuffer.itemSize = 3;
        mapPieceVertexColorBuffer.numItems = colors.length / 3;


        mapPieceIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mapPieceIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        mapPieceIndexBuffer.itemSize = 1;
        mapPieceIndexBuffer.numItems = indices.length;

        mapVertexPositionBuffer.push(mapPieceVertexPositionBuffer);
        mapVertexIndexBuffer.push(mapPieceIndexBuffer);
        mapVertexNormalBuffer.push(mapPieceVertexNormalBuffer);
        mapVertexColorBuffer.push(mapPieceVertexColorBuffer);
    }
}

function changeMapPieceColorBuffer(piece){
    var colors = piece.getColors();

    mapPieceVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mapPieceVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    mapPieceVertexColorBuffer.itemSize = 3;
    mapPieceVertexColorBuffer.numItems = colors.length / 3;

    mapVertexColorBuffer[piece.pieceIndex] = mapPieceVertexColorBuffer;
}

function initQbertBuffers(){
    var vertices = qbert.getVertices();
    var colors = qbert.getColors();
    

    qbertVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, qbertVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    qbertVertexPositionBuffer.itemSize = 3;
    qbertVertexPositionBuffer.numItems = vertices.length / 3;
    
    qbertVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, qbertVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    qbertVertexColorBuffer.itemSize = 3;
    qbertVertexColorBuffer.numItems = colors.length / 3;
   
}

function initEnemyBuffers(){
    var vertices = enemy.getVertices();
    var colors = enemy.getColors();
    
    enemyVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    enemyVertexPositionBuffer.itemSize = 3;
    enemyVertexPositionBuffer.numItems = vertices.length / 3;
    
    enemyVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, enemyVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    enemyVertexColorBuffer.itemSize = 3;
    enemyVertexColorBuffer.numItems = colors.length / 3;
   
}