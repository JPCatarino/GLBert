var lastTime = 0;
var timeToMove = 0;

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

function animateEnemy(elapsed){
    var currentEnemyX = enemy.getTx();
	var finalEnemyX = enemy.getfinalPosX();

	var currentEnemyY = enemy.getTy();
	var finalEnemyY = enemy.getfinalPosY();

	var currentEnemyZ = enemy.getTz();
	var finalEnemyZ = enemy.getfinalPosZ();
	var direction = enemy.getDirection();	

	var enemySpeedx = 0.006;
	var enemySpeedy = 0.006;
	
	
    if(enemy.getMoving()){
        if((currentEnemyX.toFixed(2) == finalEnemyX.toFixed(2)) && (currentEnemyY.toFixed(2) == finalEnemyY.toFixed(2))){
            enemy.setMoving(false);             			
        }
        
        currentEnemyX += direction[0] * enemySpeedx * (elapsed)/30; 
		currentEnemyY += direction[1] * enemySpeedy * (elapsed)/30;
		
		enemy.setTx(currentEnemyX);
        enemy.setTy(currentEnemyY);
				
	}
	else{
		if(timeToMove != 120){
			timeToMove++;
		}
		else{
			timeToMove = 0;	
			dir = Math.round(Math.random());
			
			if(dir == 0){
				enemy.moveLeftDown();				
			} 
			else{
				enemy.moveRightDown();				
			}
		}
	}
}

function animate(){
	var timeNow = new Date().getTime();		
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		
		//todo truncar valores na comparaçao
		animateQBert(elapsed);
		animateEnemy(elapsed);
			
		}
	lastTime = timeNow;
}