// gameEntities.js 
// Jorge Catarino, Óscar Pimentel - 2020 

class MapPiece{

    constructor(){
        this.vertices = [

            -1.000000, -1.000000,  1.000000, 
             1.000000,  1.000000,  1.000000, 
            -1.000000,  1.000000,  1.000000, 
            -1.000000, -1.000000,  1.000000,
             1.000000, -1.000000,  1.000000, 
             1.000000,  1.000000,  1.000000, 
             1.000000, -1.000000,  1.000000, 
             1.000000, -1.000000, -1.000000, 
             1.000000,  1.000000, -1.000000, 
             1.000000, -1.000000,  1.000000, 
             1.000000,  1.000000, -1.000000, 
             1.000000,  1.000000,  1.000000, 
            -1.000000, -1.000000, -1.000000, 
            -1.000000,  1.000000, -1.000000,
             1.000000,  1.000000, -1.000000, 
            -1.000000, -1.000000, -1.000000, 
             1.000000,  1.000000, -1.000000, 
             1.000000, -1.000000, -1.000000, 
            -1.000000, -1.000000, -1.000000, 
            -1.000000, -1.000000,  1.000000, 
            -1.000000,  1.000000, -1.000000, 
            -1.000000, -1.000000,  1.000000, 
            -1.000000,  1.000000,  1.000000, 
            -1.000000,  1.000000, -1.000000, 
            -1.000000,  1.000000, -1.000000, 
            -1.000000,  1.000000,  1.000000, 
             1.000000,  1.000000, -1.000000, 
            -1.000000,  1.000000,  1.000000, 
             1.000000,  1.000000,  1.000000, 
             1.000000,  1.000000, -1.000000, 
            -1.000000, -1.000000,  1.000000, 
            -1.000000, -1.000000, -1.000000,
             1.000000, -1.000000, -1.000000, 
            -1.000000, -1.000000,  1.000000, 
             1.000000, -1.000000, -1.000000, 
             1.000000, -1.000000,  1.000000, 	 
        ];

        this.indices = [
            0,  1,  2,    0,  2,  3,    // front face
            4,  5,  6,    4,  6,  7,    // back face 
            8,  9,  10,   8,  10, 11,   // top face
            12, 13, 14,   12, 14, 15,   // bottom
            16, 17, 18,   16, 18, 19,   // right
            20, 21, 22,   20, 22, 23,   // left
        ];

        this.normals = [];

        computeVertexNormals(this.vertices, this.normals);
        
        this.tx = 0.0;
	    this.ty = 0.0;
        this.tz = 0.0;
        
        this.sx = 0.15;
        this.sy = 0.15;
        this.sz = 0.15;

        this.hasBeenTouched = false;
    }

    getVertices(){
        return this.vertices;
    }

    getIndices(){
        return this.indices;
    }
}

class Map{

    constructor(){
        this.mapPieces = [];
        for(var i = 0; i < 28; i++){
            this.mapPieces.push(new MapPiece());
        }
    }

    getMapPieces(){
        return this.mapPieces;
    }
}