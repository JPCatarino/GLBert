// gameEntities.js 
// Jorge Catarino, Óscar Pimentel - 2020 

class Qbert{

    constructor(tx=0.0, ty=0.0, tz=0.0){
        this.vertices = new MapPiece().getVertices();
        this.normals = [];
        this.lives = 3;
        this.points = 0;
        this.magicNumber = 0.205;
        this.isMoving = false;
        this.dead = false;
        this.colors = [

            // FRONT FACE
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
   
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
                         
            // TOP FACE
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
   
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
                         
            // BOTTOM FACE
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
   
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
                         
            // LEFT FACE
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
   
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
                         
            // RIGHT FACE
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
   
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
                         
                         
            // BACK FACE
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
   
                
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,
            
            243/255, 156/255, 10/255,		 			 
        ];
        
        midPointRefinementWithColor(this.vertices, this.colors, 2);
        moveToSphericalSurface(this.vertices);
        computeVertexNormals(this.vertices, this.normals);

        this.tx = tx;
	    this.ty = ty;
        this.tz = tz;

        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
        
        this.sx = 0.05;
        this.sy = 0.07;
        this.sz = 0.07;

        this.finalPosx = this.tx;
        this.finalPosy = this.ty;
        this.finalPosz = this.tz;

        this.direction = vec3(0,0,0);
        this.row = 1;
        this.collumn = 1;      
        
    }

    moveLeftUp(){
        var rowTemp = this.row - 1;
        var collumnTemp = this.collumn - 1;
        
        if(collumnTemp !=0) {
            this.finalPosx -= (this.magicNumber/2);
            this.finalPosy += (2.39*0.075);
            this.direction = vec3(this.finalPosx-this.tx, this.finalPosy-this.ty, 0);
            normalize(this.direction);                
            this.row = rowTemp;
            this.collumn = collumnTemp;
            this.isMoving = true;
        }
        else{
            this.isMoving = false;
            qbert.isDead();            
        }
        console.log("tx: " + this.tx + " ty: " + this.ty);
        
    }

    moveRightUp(){
        var rowTemp = this.row - 1;
        var collumnTemp = this.collumn;
        
        if(rowTemp>=collumnTemp){
            this.finalPosx += (this.magicNumber/2);
            this.finalPosy += (2.39*0.075);
            this.direction = vec3(this.finalPosx-this.tx, this.finalPosy-this.ty, 0);
            normalize(this.direction);
            this.row = rowTemp;
            this.collumn = collumnTemp; 
            this.isMoving = true;
        }else{
            this.isMoving = false;
            qbert.isDead();    
        }
        
        console.log("tx: " + this.tx + " ty: " + this.ty);
    }

    moveLeftDown(){
        var rowTemp = this.row + 1;
        var collumnTemp = this.collumn;
        
        if(rowTemp<=7){
            this.finalPosx -= (this.magicNumber/2);
            this.finalPosy -= (2.39*0.075);       
            this.direction = vec3(this.finalPosx-this.tx, this.finalPosy-this.ty, 0);
            normalize(this.direction);
            this.row = rowTemp;
            this.collumn = collumnTemp; 
            this.isMoving = true;

        }else{
            this.isMoving = false;
            qbert.isDead();    
        }
        

        console.log("tx: " + this.tx + "ty: " + this.ty)
    }

    moveRightDown(){
        var rowTemp = this.row + 1;
        var collumnTemp = this.collumn + 1;
        if (rowTemp <= 7){
            this.finalPosx += (this.magicNumber/2);
            this.finalPosy -= (2.39*0.075);
            console.log("tx: " + this.tx + "ty: " + this.ty)
            this.direction = vec3(this.finalPosx-this.tx, this.finalPosy-this.ty, 0);
            normalize(this.direction);
            this.row = rowTemp;
            this.collumn = collumnTemp;
            this.isMoving = true;
        }
        else{
            this.isMoving = false;
            qbert.isDead();   
        } 
    }

    getVertices(){
        return this.vertices;
    }

    getColors(){
        return this.colors;
    }

    getMoving(){
        return this.isMoving;
    }

    getTx(){
        return this.tx;
    }

    getTy(){
        return this.ty;
    }

    getTz(){
        return this.tz;
    }

    getfinalPosX(){
        return this.finalPosx;
    }

    getNormals(){
        return this.normals;
    }

    getfinalPosY(){
        return this.finalPosy;
    }

    getfinalPosZ(){
        return this.finalPosz;
    }

    getDirection(){
        return this.direction;
    }

    getRow(){
        return this.row;
    }

    getCollumn(){
        return this.collumn;
    }

    setMoving(movement){
        this.isMoving = movement; 
    }

    setTx(tx){
        this.tx = tx;
    }

    setTy(ty){
        this.ty = ty;
    }

    setTz(tz){
        this.tz = tz;
    }

    goToStartingPos(){
        this.row = 1;
        this.collumn = 1;
        this.tx = rootPiece.tx+0.003;
        this.ty = 0.4255;
        this.finalPosx = this.tx;
        this.finalPosy = this.ty;
        this.finalPosz = this.tz;
        this.direction = vec3(0,0,0);
        this.setMoving(false);
    }

    isDead(){
        qbert.lives -= 1;
        this.goToStartingPos();
        if(qbert.lives == -1){
            this.dead = true;            
        }
        console.log(this.dead);
    }

    hasCollidedWithEnemy(enemy){
        if(this.row == enemy.getRow() && this.collumn == enemy.getCollumn()){
            this.isDead();
            collideSound.play();
        }
    } 
}

class MapPiece{

    constructor(tx=0.0, ty=0.0, tz=0.0, row=0, collumn=0, pieceIndex = 0){
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

        this.colorsTouched = [
            // FRONT FACE
                
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
   
                
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
            
            20/255,  143/255,  119/255,
                         
            // TOP FACE
                
            255/255,  239/255,  0,
            
            255/255,  239/255,  0,
            
            255/255,  239/255,  0,
   
                
            255/255,  239/255,  0,
            
            255/255,  239/255,  0,
            
            255/255,  239/255,  0,
                         
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
        this.row = row;
        this.collumn = collumn;
        this.pieceIndex = pieceIndex;
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

    getHasBeenTouched(){
        return this.hasBeenTouched;
    }

    getNormals(){
        return this.normals;
    }

    setHasBeenTouched(){
        if(!this.hasBeenTouched){
            this.hasBeenTouched = true;
            this.colors = this.colorsTouched;
            map.incrementStompPieceCounter();
            map.checkIfLevelComplete();
            qbert.points+=25;
        }
    }
}

class Map{

    constructor(){
        this.mapPieces = [];
        this.rowCol = [[],[],[],[],[],[],[]];
        this.stompedPieceCounter = 0;
        this.levelComplete = 0;
        var coordx = -0.75;
        var coordy = -0.75;
        var magicNumber = 0.205;
  
        for(var i = 0; i<7; i++){
            this.mapPieces.push(new MapPiece(coordx , -0.75, -0.75, 7, i+1, i));
            this.rowCol[6].push([i+1,this.mapPieces[this.mapPieces.length-1]]);
            coordx = coordx + magicNumber;
        }
        
        coordx = -0.75+(magicNumber/2);
        coordy = coordy + (2.39*0.075);
        for(var i=0; i<6; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75, 6, i+1, 7+i));
            this.rowCol[5].push([i+1,this.mapPieces[this.mapPieces.length-1]]);
            coordx = coordx + magicNumber;
            
        }
        coordx = -0.75+magicNumber;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<5; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75, 5, i+1, 13+i));
            this.rowCol[4].push([i+1,this.mapPieces[this.mapPieces.length-1]]);
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber/2;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<4; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75, 4, i+1, 18+i));
            this.rowCol[3].push([i+1,this.mapPieces[this.mapPieces.length-1]]);
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<3; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75, 3, i+1, 22+i));
            this.rowCol[2].push([i+1,this.mapPieces[this.mapPieces.length-1]]);
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber+ magicNumber/2;
        coordy = coordy + ((2.39*0.075));
        for(var i=0; i<2; i++){
            this.mapPieces.push(new MapPiece(coordx , coordy, -0.75, 2, i+1, 25+i));
            this.rowCol[1].push([i+1,this.mapPieces[this.mapPieces.length-1]]);
            coordx = coordx + magicNumber;
            
        }

        coordx = -0.75+(magicNumber)+magicNumber+ magicNumber;
        coordy = coordy + ((2.39*0.075));
        this.mapPieces.push(new MapPiece(coordx , coordy, -0.75, 1, 1, 27));
        this.rowCol[0].push([1,this.mapPieces[this.mapPieces.length-1]]);
    }

    getMapPieces(){
        return this.mapPieces;
    }

    getPiece(row, collumn){
        var currentRow = this.rowCol[row-1];
        for(var i=0; i<currentRow.length; i++){
            if(collumn == currentRow[i][0]){
                return currentRow[i][1]
            }
        }

    }

    checkIfLevelComplete(){
        if(this.stompedPieceCounter == this.mapPieces.length){
            this.levelComplete = true;
            winSound.play();
            console.log("YAY!");
        }
    }

    incrementStompPieceCounter(){
        this.stompedPieceCounter+=1;
    }
}

class Enemy{
    constructor(tx=0.0, ty=0.0, tz=0.0, startingRow, startingCollumn){
        
        this.vertices = [

            //ONE FACE
            -1.0, 0.0, -0.707,
            0.0, 1.0, 0.707,
            1.0, 0.0, -0.707, 

            //ANOTHER FACE
            1.0, 0.0, -0.707,
            0.0, 1.0, 0.707,
            0.0, -1.0, 0.707,  

            //ANOTHER FACE
            -1.0, 0.0, -0.707,
            0.0, -1.0, 0.707,
            0.0, 1.0, 0.707,

            //ANOTHER FACE
            -1.0, 0.0, -0.707,
            1.0, 0.0, -0.707,
            0.0, -1.0, 0.707, 
        ];

        this.colors = [

            //ONE FACE
            195/255, 155/255, 211/255,
            195/255, 155/255, 211/255,
            195/255, 155/255, 211/255,

            //ANOTHER FACE
            136/255, 78/255, 160/255,
            136/255, 78/255, 160/255,
            136/255, 78/255, 160/255, 

            //ANOTHER FACE
            195/255, 155/255, 211/255,
            195/255, 155/255, 211/255,
            195/255, 155/255, 211/255,

            //ANOTHER FACE
            195/255, 155/255, 211/255,
            195/255, 155/255, 211/255,
            195/255, 155/255, 211/255,

        ];

        this.normals = [];

        computeVertexNormals(this.vertices, this.normals);

        this.tx = tx;
	    this.ty = ty;
        this.tz = tz;

        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
        
        this.sx = 0.05;
        this.sy = 0.07;
        this.sz = 0.07;

        this.isMoving = false;
        this.row = startingRow;
        this.collumn = startingCollumn; 
        this.direction = vec3(0,0,0); 
        
        this.finalPosx = this.tx;
        this.finalPosy = this.ty;
        this.finalPosz = this.tz; 
        this.magicNumber = 0.205;  
        this.spawn = false;       

            
    }

    getTx(){
        return this.tx;
    }

    getTy(){
        return this.ty;
    }

    getTz(){
        return this.tz;
    }

    getVertices(){
        return this.vertices;
    }

    getColors(){
        return this.colors;
    }

    getMoving(){
        return this.isMoving;
    }

    getRow(){
        return this.row;
    }

    getNormals(){
        return this.normals;
    }

    getCollumn(){
        return this.collumn;
    }

    getfinalPosX(){
        return this.finalPosx;
    }

    getfinalPosY(){
        return this.finalPosy;
    }

    getfinalPosZ(){
        return this.finalPosz;
    }

    getDirection(){
        return this.direction;
    }

    setMoving(movement){
        this.isMoving = movement; 
    }

    setTx(tx){
        this.tx = tx;
    }

    setTy(ty){
        this.ty = ty;
    }

    setTz(tz){
        this.tz = tz;
    }

    moveLeftDown(){
        var rowTemp = this.row + 1;
        var collumnTemp = this.collumn;
        
        if(rowTemp<=7){
            this.finalPosx -= (this.magicNumber/2);
            this.finalPosy -= (2.39*0.075);       
            this.direction = vec3(this.finalPosx-this.tx, this.finalPosy-this.ty, 0);
            normalize(this.direction);
            this.row = rowTemp;
            this.collumn = collumnTemp; 
            this.isMoving = true;

        }else{
            this.isMoving = false;
            this.goToStartingPos();
        }
        

        console.log("tx: " + this.tx + "ty: " + this.ty)
    }

    moveRightDown(){
        var rowTemp = this.row + 1;
        var collumnTemp = this.collumn + 1;
        if (rowTemp <= 7){
            this.finalPosx += (this.magicNumber/2);
            this.finalPosy -= (2.39*0.075);
            console.log("tx: " + this.tx + "ty: " + this.ty)
            this.direction = vec3(this.finalPosx-this.tx, this.finalPosy-this.ty, 0);
            normalize(this.direction);
            this.row = rowTemp;
            this.collumn = collumnTemp;
            this.isMoving = true;
        }
        else{
            this.isMoving = false;
            this.goToStartingPos();
        }
    }

    setSpawn(cond){
        this.spawn = cond;
    }

    goToStartingPos(){
        var randomSpawnPieceIndex = Math.round(Math.random());
        console.log(randomSpawnPieceIndex);
        var randomSpawnPiece = spawnPieces[randomSpawnPieceIndex];
        this.row = randomSpawnPiece.row;
        this.collumn = randomSpawnPiece.collumn;
        this.tx = randomSpawnPiece.tx+0.003;
        this.ty = randomSpawnPiece.ty+0.05;
        this.finalPosx = this.tx;
        this.finalPosy = this.ty;
        this.finalPosz = this.tz;
        this.direction = vec3(0,0,0);        
    }

}

class Disk{
    constructor(tx=0.0, ty=0.0, tz=0.0, startingRow, startingCollumn){
        this.vertices = [
            //TOP FACE
            0.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            0.5, 1.0, -0.866,

            0.0, 1.0, 0.0,
            0.5, 1.0, -0.866,
            -0.5, 1.0, -0.866,

            0.0, 1.0, 0.0,
            -0.5, 1.0, -0.866,
            -1.0, 1.0, 0.0,

            0.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            -0.5, 1.0, 0.866,

            0.0, 1.0, 0.0,
            -0.5, 1.0, 0.866,
            0.5, 1.0, 0.866,

            0.0, 1.0, 0.0,
            0.5, 1.0, 0.866,
            1.0, 1.0, 0.0,

            //BASE
            0.0, -1.0, 0.0,
            0.5, -1.0, -0.866,
            1.0, -1.0, 0.0,

            0.0, -1.0, 0.0,
            -0.5, -1.0, -0.866,
            0.5, -1.0, -0.866,

            0.0, -1.0, 0.0,
            -1.0, -1.0, 0.0,
            -0.5, -1.0, -0.866,

            0.0, -1.0, 0.0,
            -0.5, -1.0, 0.866,
            -1.0, -1.0, 0.0,

            0.0, -1.0, 0.0,
            0.5, -1.0, 0.866,
            -0.5, -1.0, 0.866,

            0.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            0.5, -1.0, 0.866,

            //SIDE FACES
            -0.5, 1.0, 0.866,
            0.5, -1.0, 0.866,
            0.5, 1.0, 0.866,

            -0.5, 1.0, 0.866,
            -0.5, -1.0, 0.866,
            0.5, -1.0, 0.866,

            0.5, 1.0, 0.866,
            0.5, -1.0, 0.866,
            1.0, -1.0, 0.0,

            0.5, 1.0, 0.866,
            1.0, -1.0, 0.0,
            1.0, 1.0, 0.0,

            1.0, -1.0, 0.0,
            0.5, 1.0, -0.866,
            1.0, 1.0, 0.0,

            0.5, -1.0, -0.866,
            0.5, 1.0, -0.866,
            1.0, -1.0, 0.0,

            0.5, -1.0, -0.866,
            -0.5, 1.0, -0.866,
            0.5, 1.0, -0.866,

            0.5, -1.0, -0.866,
            -0.5, -1.0, -0.866,
            -0.5, 1.0, -0.866,

            -0.5, -1.0, -0.866,
            -1.0, 1.0, 0.0,
            -0.5, 1.0, -0.866,

            -0.5, -1.0, -0.866,
            -1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,

            -0.5, -1.0, -0.866,
            -1.0, 1.0, 0.0,
            -0.5, 1.0, -0.866,

            -0.5, -1.0, -0.866,
            -1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,

            -1.0, -1.0, 0.0,
            -0.5, -1.0, 0.866,
            -1.0, 1.0, 0.0,

            -0.5, -1.0, 0.866,
            -0.5, 1.0, 0.866,
            -1.0, 1.0, 0.0,
        ];

        this.colors = [
            //TOP FACE
            203/255, 67/255, 53/255,
            203/255, 67/255, 53/255,
            203/255, 67/255, 53/255,

            40/255, 180/255, 99/255,
            40/255, 180/255, 99/255,
            40/255, 180/255, 99/255,

            244/255, 208/255, 63/255,
            244/255, 208/255, 63/255,
            244/255, 208/255, 63/255,

            40/255, 116/255, 166/255,
            40/255, 116/255, 166/255,
            40/255, 116/255, 166/255,

            211/255, 84/255, 0,
            211/255, 84/255, 0,
            211/255, 84/255, 0,

            108/255, 52/255, 131/255,
            108/255, 52/255, 131/255,
            108/255, 52/255, 131/255,

            //BASE
            203/255, 67/255, 53/255,
            203/255, 67/255, 53/255,
            203/255, 67/255, 53/255,

            40/255, 180/255, 99/255,
            40/255, 180/255, 99/255,
            40/255, 180/255, 99/255,

            244/255, 208/255, 63/255,
            244/255, 208/255, 63/255,
            244/255, 208/255, 63/255,

            40/255, 116/255, 166/255,
            40/255, 116/255, 166/255,
            40/255, 116/255, 166/255,

            211/255, 84/255, 0,
            211/255, 84/255, 0,
            211/255, 84/255, 0,

            108/255, 52/255, 131/255,
            108/255, 52/255, 131/255,
            108/255, 52/255, 131/255,

            //SIDES
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,

            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
            97/255, 106/255, 107/255,
        ];

        this.normals = [];

        computeVertexNormals(this.vertices, this.normals, startingRow, startingCollumn);

        this.tx = tx;
	    this.ty = ty;
        this.tz = tz;

        this.rx = 50;
        this.ry = 0;
        this.rz = 0;
        
        this.sx = 0.05;
        this.sy = 0.007;
        this.sz = 0.07;

        this.isMoving = false;
        this.row = startingRow;
        this.collumn = startingCollumn; 
        this.direction = vec3(0,0,0); 
        
        this.finalPosx = this.tx;
        this.finalPosy = this.ty;
        this.finalPosz = this.tz; 
        this.magicNumber = 0.205; 
        

    }
    getTx(){
        return this.tx;
    }

    getTy(){
        return this.ty;
    }

    getTz(){
        return this.tz;
    }

    getVertices(){
        return this.vertices;
    }

    getColors(){
        return this.colors;
    }

    getfinalPosX(){
        return this.finalPosx;
    }

    getfinalPosY(){
        return this.finalPosy;
    }

    getfinalPosZ(){
        return this.finalPosz;
    }

    getDirection(){
        return this.direction;
    }

    setMoving(movement){
        this.isMoving = movement; 
    }

    setTx(tx){
        this.tx = tx;
    }

    setTy(ty){
        this.ty = ty;
    }

    setTz(tz){
        this.tz = tz;
    }

}