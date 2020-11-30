// gameEntities.js 
// Jorge Catarino, Óscar Pimentel - 2020 

class Qbert{

    constructor(tx=0.0, ty=0.0, tz=0.0){
        this.vertices = new MapPiece().getVertices();
        this.normals = [];
        this.colors = [];
        midPointRefinement(this.vertices, 2);
        moveToSphericalSurface(this.vertices);
        computeVertexNormals(this.vertices, this.normals);

        this.tx = tx;
	    this.ty = ty;
        this.tz = tz;

        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
        
        this.sx = 0.3;
        this.sy = 0.3;
        this.sz = 0.3;
    }

    getVertices(){
        return this.vertices;
    }

    getColors(){
        return this.colors;
    }
}

class MapPiece{

    constructor(tx=0.0, ty=0.0, tz=0.0){
        this.vertices = [

            // FRONT FACE
             
            -0.25, -0.25,  0.25,
             
             0.25, -0.25,  0.25,
             
             0.25,  0.25,  0.25,
    
             
             0.25,  0.25,  0.25,
             
            -0.25,  0.25,  0.25,
             
            -0.25, -0.25,  0.25,
            
            // TOP FACE
            
            -0.25,  0.25,  0.25,
             
             0.25,  0.25,  0.25,
             
             0.25,  0.25, -0.25,
    
             
             0.25,  0.25, -0.25,
             
            -0.25,  0.25, -0.25,
             
            -0.25,  0.25,  0.25,
            
            // BOTTOM FACE 
            
            -0.25, -0.25, -0.25,
             
             0.25, -0.25, -0.25,
             
             0.25, -0.25,  0.25,
    
             
             0.25, -0.25,  0.25,
             
            -0.25, -0.25,  0.25,
             
            -0.25, -0.25, -0.25,
            
            // LEFT FACE 
            
            -0.25,  0.25,  0.25,
             
            -0.25, -0.25, -0.25,
    
            -0.25, -0.25,  0.25,
             
             
            -0.25,  0.25,  0.25,
             
            -0.25,  0.25, -0.25,
             
            -0.25, -0.25, -0.25,
            
            // RIGHT FACE 
            
             0.25,  0.25, -0.25,
             
             0.25, -0.25,  0.25,
    
             0.25, -0.25, -0.25,
             
             
             0.25,  0.25, -0.25,
             
             0.25,  0.25,  0.25,
             
             0.25, -0.25,  0.25,
            
            // BACK FACE 
            
            -0.25,  0.25, -0.25,
             
             0.25, -0.25, -0.25,
    
            -0.25, -0.25, -0.25,
             
             
            -0.25,  0.25, -0.25,
             
             0.25,  0.25, -0.25,
             
             0.25, -0.25, -0.25,			 
    ];

        this.indices = [
            0,  1,  2,    0,  2,  3,    // front face
            4,  5,  6,    4,  6,  7,    // back face 
            8,  9,  10,   8,  10, 11,   // top face
            12, 13, 14,   12, 14, 15,   // bottom
            16, 17, 18,   16, 18, 19,   // right
            20, 21, 22,   20, 22, 23,   // left
        ];
        
        this.colors = [

            // FRONT FACE
                
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
   
                
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
                         
            // TOP FACE
                
            31/255,  97/255,  141/255,
            
            31/255,  97/255,  141/255,
            
            31/255,  97/255,  141/255,
   
                
            31/255,  97/255,  141/255,
            
            31/255,  97/255,  141/255,
            
            31/255,  97/255,  141/255,
                         
            // BOTTOM FACE
                
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
   
                
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
                         
            // LEFT FACE
            
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
   
                
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
            
            23/255,  165/255,  137/255,
            
                         
            // RIGHT FACE
                
            0.25,  0.50,  0.50,
            
            0.25,  0.50,  0.50,
            
            0.25,  0.50,  0.50,
   
                
            0.50,  0.25,  0.00,
            
            0.50,  0.25,  0.00,
            
            0.50,  0.25,  0.00,
                         
                         
            // BACK FACE
                
            0.25,  0.00,  0.75,
            
            0.25,  0.00,  0.75,
            
            0.25,  0.00,  0.75,
   
                
            0.50,  0.35,  0.35,
            
            0.50,  0.35,  0.35,
            
            0.50,  0.35,  0.35,			 			 
        ];

        this.normals = [];

        computeVertexNormals(this.vertices, this.normals);
        
        this.tx = tx;
	    this.ty = ty;
        this.tz = tz;

        this.rx = 60;
        this.ry = 30;
        this.rz = 40;
        
        this.sx = 0.3;
        this.sy = 0.3;
        this.sz = 0.3;

        this.hasBeenTouched = false;
    }

    getVertices(){
        return this.vertices;
    }

    getIndices(){
        return this.indices;
    }

    getColors(){
        return this.colors;
    }
}

class Map{

    constructor(){
        this.mapPieces = [];
        var coordx = -0.75;
        var coordy = -0.75;
        var magicNumber = 0.2111;
  
        for(var i = 0; i<7; i++){
            this.mapPieces.push(new MapPiece(coordx , -0.75, -0.75));
            coordx = coordx + magicNumber;
        }
        
        coordx = -0.75+(magicNumber/2);
        coordy = coordy + (2.39*0.075);
        for(var i=0; i<6; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75));
            coordx = coordx + magicNumber;
            
        }
        coordx = -0.75+magicNumber;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<5; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75));
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber/2;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<4; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75));
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<3; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75));
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber+ magicNumber/2;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<2; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75));
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber+ magicNumber;
        coordy = coordy + ((2.39*0.075));
        this.mapPieces.push(new MapPiece(coordx , coordy, -0.75));
           
        
        

        
    }

    getMapPieces(){
        return this.mapPieces;
    }
}