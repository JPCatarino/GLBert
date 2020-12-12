var lastTime = 0;
var timeToMove = [0,0];

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
	else{
		for(var diskIndex = 0; diskIndex < disks.length; diskIndex++){
			if((disks[diskIndex].getRow() == qbert.getRow() && disks[diskIndex].getCollumn() == qbert.getCollumn())){
				disks[diskIndex].setMoving(true);
				disks[diskIndex].setDiskDirection(rootPiece.tx+0.003, rootPiece.ty+0.1);	
				disks[diskIndex].setFinalPos(rootPiece.tx+0.003, rootPiece.ty+0.1);			
				qbert.setQbertDirection(rootPiece.tx+0.003, rootPiece.ty+0.2);	 
				qbert.setFinalPos(rootPiece.tx+0.003, rootPiece.ty+0.2);												
				qbert.setMoving(true);
			}
		} 
		
	}
}

function animateEnemy(elapsed, enemy, enemyIndex){
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
		if(timeToMove[enemyIndex] != 55){
			timeToMove[enemyIndex]++;
		}
		else{
			timeToMove[enemyIndex] = 0;	
			dir = Math.round(Math.random());
			
			if(dir == 0){
				enemy.moveLeftDown();	
				enemyJumpSound.play();			
			} 
			else{
				enemy.moveRightDown();
				enemyJumpSound.play();				
			}
		}
	}
}

function animateDisk(elapsed, disk){
	var currentDiskX = disk.getTx();
	var currentDiskY = disk.getTy();
	var finalPosX = disk.getfinalPosX();
	var finalPosY = disk.getfinalPosY();
	var direction = disk.getDirection();
	var SpeedX = 0.006;
	var SpeedY = 0.006;
	
	if(disk.getMoving()){
		if((currentDiskX.toFixed(2) == finalPosX.toFixed(2)) && (currentDiskY.toFixed(2) == finalPosY.toFixed(2))){
			disk.setMoving(false); 			
			qbert.goToStartingPos();   
			disk.setActive(false);  
			disk.setTz(1000000);      			
        }
		currentDiskX += direction[0] * SpeedX * (elapsed)/30;
		currentDiskY += direction[1] * SpeedY * (elapsed)/30;

		disk.setTx(currentDiskX);
		disk.setTy(currentDiskY);
	}

}

function animate(){
	var timeNow = new Date().getTime();		
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		
		
		animateQBert(elapsed);
		for(var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++){
			animateEnemy(elapsed, enemies[enemyIndex], enemyIndex);
		}	

		for(var diskIndex = 0; diskIndex < disks.length; diskIndex++){
			animateDisk(elapsed, disks[diskIndex]);
		}
			
	}
	lastTime = timeNow;
}