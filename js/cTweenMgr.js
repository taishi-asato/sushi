//=========================================================
/*
	各種アニメーションのマネージャ
*/
//=========================================================
function cTweenMgr( ){
	this.mTweenItems	= new Array();
}


//---------------------------------------------------------
//	
//---------------------------------------------------------
cTweenMgr.prototype.LoopMgr	= function( ){

	var ItemNum	= this.mTweenItems.length;
	var CurrentTime	= Date.now();

	if( ItemNum >= 1){
		while(ItemNum--){
			if(this.mTweenItems[ItemNum].ItemAni( CurrentTime )){
				this.mTweenItems.splice(ItemNum, 1);
			}
		}
	}
}


//---------------------------------------------------------
//	現在再生しているアニメーションをすべてキャンセル
//---------------------------------------------------------
cTweenMgr.prototype.pCancelAllAnimation	= function( ){
	this.mTweenItems	= [];
}

//---------------------------------------------------------
//	座標移動系のアニメーションのセット
//---------------------------------------------------------
cTweenMgr.prototype.pEntryPosAnim	= function( _ImageObj, _StartPosX, _StartPosY, _GoalPosX, _GoalPosY, _Time ){
	this.mTweenItems.push( new  cPosAnimItem( _ImageObj, _StartPosX, _StartPosY, _GoalPosX, _GoalPosY, _Time ) )
}

//---------------------------------------------------------
//	拡大縮小系のアニメーションのセット
//---------------------------------------------------------
cTweenMgr.prototype.pEntryScaleAnim	= function( _ImageObj, _StartScale, _EndScale, _Time ){
	this.mTweenItems.push( new  cScaleAnimItem( _ImageObj, _StartScale, _EndScale, _Time ) )
}

//---------------------------------------------------------
//	透明度変更系のアニメーションのセット
//---------------------------------------------------------
cTweenMgr.prototype.pEntryOpacityAnim	= function( _ImageObj, _StartOpacity, _EndOpacity, _Time ){
	this.mTweenItems.push( new  cOpacityAnimItem( _ImageObj, _StartOpacity, _EndOpacity, _Time ) )
}



/*--------------------------------------------------------------
	管理対象
	ポジション移動のアニメーション
--------------------------------------------------------------*/
function cPosAnimItem( _ImageObj, _StartPosX, _StartPosY, _GoalPosX, _GoalPosY, _Time ){
	this.mImageObj	= _ImageObj;
	this.mStartPosX	= _StartPosX;
	this.mStartPosY	= _StartPosY;
	this.mGoalPosX	= _GoalPosX;
	this.mGoalPosY	= _GoalPosY;
	this.mTime		= _Time;

	this.mSpeedX		= (this.mGoalPosX - this.mStartPosX) / this.mTime;
	this.mSpeedY		= (this.mGoalPosY - this.mStartPosY) / this.mTime;

	this.mImageObj.mPosX	= this.mStartPosX;
	this.mImageObj.mPosY	= this.mStartPosY;


	this.mStartTime	= Date.now();
	this.mEndTime	= this.mStartTime + this.mTime;
	
	this.mOldTime	= this.mStartTime;
}

cPosAnimItem.prototype.ItemAni	= function( _CurrentTime ){
	if( this.mEndTime <= _CurrentTime){
		this.mImageObj.mPosX	= this.mGoalPosX;
		this.mImageObj.mPosY	= this.mGoalPosY;
		
		return( true );
		
	}else{
		var Diff	= _CurrentTime - this.mOldTime;

		this.mImageObj.mPosX	+= this.mSpeedX * Diff;
		this.mImageObj.mPosY	+= this.mSpeedY * Diff;
	
		this.mOldTime	= _CurrentTime;
		
		return( false );
	}

}

/*--------------------------------------------------------------
	管理対象
	拡大縮小のアニメーション
--------------------------------------------------------------*/
function cScaleAnimItem( _ImageObj, _StartScale, _EndScale, _Time ){

	this.mImageObj		= _ImageObj;
	this.mStartScale	= _StartScale;
	this.mEndScale		= _EndScale;
	this.mTime			= _Time;
	
	this.mScaleAnimSpeed	= (this.mEndScale - this.mStartScale) / this.mTime;

	this.mStartTime	= Date.now();
	this.mEndTime	= this.mStartTime + this.mTime;
	
	this.mOldTime	= this.mStartTime;

	this.mImageObj.mScale	= this.mStartScale;
}

cScaleAnimItem.prototype.ItemAni	= function( _CurrentTime ){
	if( this.mEndTime <= _CurrentTime){
		this.mImageObj.mScale	= this.mEndScale;
		return( true );
		
	}else{
		var Diff	= _CurrentTime - this.mOldTime;

		this.mImageObj.mScale	+= this.mScaleAnimSpeed * Diff;
	
		this.mOldTime	= _CurrentTime;
		
		return( false );
	}
}



/*--------------------------------------------------------------
	管理対象
	透明度変更のアニメーション
--------------------------------------------------------------*/
function cOpacityAnimItem( _ImageObj, _StartOpacity, _EndOpacity, _Time ){

	this.mImageObj		= _ImageObj;
	this.mStartOpacity	= _StartOpacity;
	this.mEndOpacity		= _EndOpacity;
	this.mTime			= _Time;
	
	this.mOpacityAnimSpeed	= (this.mEndOpacity - this.mStartOpacity) / this.mTime;

	this.mStartTime	= Date.now();
	this.mEndTime	= this.mStartTime + this.mTime;
	
	this.mOldTime	= this.mStartTime;

	this.mImageObj.mOpacity	= this.mStartOpacity;
}

cOpacityAnimItem.prototype.ItemAni	= function( _CurrentTime ){
	if( this.mEndTime <= _CurrentTime){
		this.mImageObj.mOpacity	= this.mEndOpacity;
		return( true );
		
	}else{
		var Diff	= _CurrentTime - this.mOldTime;

		this.mImageObj.mOpacity	+= this.mOpacityAnimSpeed * Diff;
	
		this.mOldTime	= _CurrentTime;
		
		return( false );
	}

}

//=========================================================
//	EOF
//=========================================================
