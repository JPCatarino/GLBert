var lastTime = 0;

function animateQBert(elapsed){
    var currentQBertX = qbert.getTx();
	var finalQBertX = qbert.getfinalPosX();

	var currentQBertY = qbert.getTy();
	var finalQBertY = qbert.getfinalPosY();

	var currentQBertZ = qbert.getTz();
	var finalQBertZ = qbert.getfinalPosZ();
	var direction = qbert.getDirection();	

	var qbertSpeedx = 0.006;
	var qbertSpeedy = 0.006;

    if(qbert.getMoving()){
        if((currentQBertX.toFixed(2) == finalQBertX.toFixed(2)) && (currentQBertY.toFixed(2) == finalQBertY.toFixed(2))){
            qbert.setMoving(false); 
            var stompedPiece = map.getPiece(qbert.getRow(), qbert.getCollumn());
            stompedPiece.setHasBeenTouched();
            changeMapPieceColorBuffer(stompedPiece);			
        }
        
        currentQBertX += direction[0] * qbertSpeedx * (elapsed)/30; 
        currentQBertY += direction[1] * qbertSpeedy * (elapsed)/30;
        

        qbert.setTx(currentQBertX);
        qbert.setTy(currentQBertY);
        }
}

function animate(){
	var timeNow = new Date().getTime();		
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		
		//todo truncar valores na comparaçao
		animateQBert(elapsed);
			
		}
	lastTime = timeNow;
}