//=========================================================
/*
	ÉTÉEÉìÉhån
*/
//=========================================================
function cSoundMgr( ){
	this.GetSeCounter			= 0;
	this.PressBtnCounter		= 0;
	this.SoundEnableFlag	= true;
	
	this.SoundsArray	= new Array();
}

cSoundMgr.prototype.Init	= function( ){
	this.SoundsArray["SE_PRESS_BTN0"]	= document.getElementById("SE_PressButton0");
	this.SoundsArray["SE_PRESS_BTN1"]	= document.getElementById("SE_PressButton1");
	this.SoundsArray["SE_MISS"]	= document.getElementById("SE_Miss");
	this.SoundsArray["SE_GET0"]	= document.getElementById("SE_Get0");	
	this.SoundsArray["SE_GET1"]	= document.getElementById("SE_Get1");
	this.SoundsArray["SE_GET2"]	= document.getElementById("SE_Get2");
	this.SoundsArray["SE_COUNTING"]	= document.getElementById("SE_Counting");
	this.SoundsArray["SE_RESULT"]	= document.getElementById("SE_Result");
}

//---------------------------------------------------------
//	
//---------------------------------------------------------
cSoundMgr.prototype.GetSoundFlag	= function( ){
	return( this.SoundEnableFlag );
}

//---------------------------------------------------------
//	
//---------------------------------------------------------
cSoundMgr.prototype.ChangeSoundFlag	= function( ){
	if( this.SoundEnableFlag == true){
		this.SoundEnableFlag	= false;
	}else{
		this.SoundEnableFlag	= true;
		this.PlayPressBtnSE( );
	}
}

//---------------------------------------------------------
//	
//---------------------------------------------------------
cSoundMgr.prototype.SetSoundFlag	= function( _Bool ){
	if( _Bool == true){
		this.SoundEnableFlag	= true;
	}else{
		this.SoundEnableFlag	= false;
	}
}


//---------------------------------------------------------
//	
//---------------------------------------------------------
cSoundMgr.prototype.PlaySE	= function( _SEType){
	if( this.SoundEnableFlag == false){
		return;
	}
	this.SoundsArray[_SEType].play();
}


//---------------------------------------------------------
//	
//---------------------------------------------------------
cSoundMgr.prototype.PlayPressBtnSE	= function( ){
	if( this.SoundEnableFlag == false){
		return;
	}
	this.PressBtnCounter++;
	var tempHashKey	= "SE_PRESS_BTN" + String(this.PressBtnCounter%2);
	this.SoundsArray[tempHashKey].play();
}

//---------------------------------------------------------
//	éıéiälìæéûÇÃSEÇÕÅAèdÇÀÇƒñ¬ÇÈèÍçáÇ™Ç†ÇÈÇΩÇﬂÅA
//	SE_GET1Å`SE_GET3Çèáî‘Ç≈ñ¬ÇÁÇ∑
//---------------------------------------------------------
cSoundMgr.prototype.PlayGetSE	= function( ){
	if( this.SoundEnableFlag == false){
		return;
	}
	this.GetSeCounter++;
	var tempHashKey	= "SE_GET" + String(this.GetSeCounter%3);
	this.SoundsArray[tempHashKey].play();
}

//---------------------------------------------------------
//	SEÇé~ÇﬂÇÈÅB
//	pauseÇÕàÍéûí‚é~Ç»ÇÃÇ≈ÅAé~ÇﬂÇÈÇ∆ìØéûÇ…currentTimeÇ0Ç…ÇµÇƒÅA
//	éüâÒçƒê∂éûÇ…ç≈èâÇ©ÇÁñ¬ÇÈÇÊÇ§Ç…Ç∑ÇÈ
//---------------------------------------------------------
cSoundMgr.prototype.StopSE	= function( _SEType ){
	return;

	this.SoundsArray[_SEType].pause();
	this.SoundsArray[_SEType].currentTime	= 0;
}


//---------------------------------------------------------
//	
//---------------------------------------------------------
cSoundMgr.prototype.StopAllSE	= function( ){

}

//=========================================================
//	EOF
//=========================================================

