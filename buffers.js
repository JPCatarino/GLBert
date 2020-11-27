// buffers.js 
// Jorge Catarino, Óscar Pimentel 

function initMapBuffers(){
    var map_pieces = map.getMapPieces();

    for (var cubeIndex = 0; cubeIndex < 28; cubeIndex++){
        var current_cube = map_pieces[cubeIndex];
        var vertices = current_cube.getVertices();
        var indices = current_cube.getIndices();
        

        mapPieceVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mapPieceVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        mapPieceVertexPositionBuffer.itemSize = 3;
        mapPieceVertexPositionBuffer.numItems = 24;
        
        // TODO : Add color buffer later 

        mapPieceIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mapPieceIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        mapPieceIndexBuffer.itemSize = 1;
        mapPieceIndexBuffer.numItems = 36;

        mapVertexPositionBuffer.push(mapPieceVertexPositionBuffer);
        mapVertexIndexBuffer.push(mapPieceIndexBuffer);
    }
}