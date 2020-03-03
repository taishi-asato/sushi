//=========================================================
/*
	寿司
*/
//=========================================================
function cSushi( _SushiType, _PosX, _PosY ){
	
	// メンバ変数
	this.mSushiType		= _SushiType;
	
	this.mPosX			= _PosX;
	this.mPosY			= _PosY;

	this.SushiImageHashKey	= "";
	this.SaraImageHashKey	= "";

	this.RemoveSushinetaFlag	= false;

	this.mSushiOffsetX_1	= 0;
	this.mSushiOffsetX_2	= 0;
	this.mSushiOffsetY_1	= 0;
	this.mSushiOffsetY_2	= 0;

	this.mShakeAnimFlag		= false;
	this.mShakeTimer		= 0;
	this.mCannotPressFrames	= 0;

	this.mSushiKingaku		= 0;

	this.SetSushiPrameter( this.mSushiType );

	this.mSushiImage1	= new cImageObj( this.SushiImageHashKey, this.mPosX+this.mSushiOffsetX_1, this.mPosY+this.mSushiOffsetY_1, 157, 118);
	this.mSushiImage2	= new cImageObj( this.SushiImageHashKey, this.mPosX+this.mSushiOffsetX_2, this.mPosY+this.mSushiOffsetY_2, 157, 118);
	this.mSaraImage		= new cImageObj( this.SaraImageHashKey, this.mPosX, this.mPosY, 266, 97);
}


//---------------------------------------------------------
//	ネタの種別ごとに、各種パラメータを初期化
//---------------------------------------------------------
cSushi.prototype.SetSushiPrameter	= function( _SushiType ){
	switch( _SushiType ){
		case 1:
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI1_TAMAGO";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA1_TAMAGO";
			this.mSushiOffsetX_1	= 25;
			this.mSushiOffsetY_1	= -50;
			this.mSushiOffsetX_2	= 90;
			this.mSushiOffsetY_2	= -40;
			this.mSushiKingaku		= 100;
			break;

		case 2:	
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI2_FUTOMAKI";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA2_FUTOMAKI";
			this.mSushiOffsetX_1	= 25;
			this.mSushiOffsetY_1	= -55;
			this.mSushiOffsetX_2	= 85;
			this.mSushiOffsetY_2	= -30;
			this.mSushiKingaku		= 200;
			break;

		case 3:
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI3_IKA";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA3_IKA";
			this.mSushiOffsetX_1	= 25;
			this.mSushiOffsetY_1	= -40;
			this.mSushiOffsetX_2	= 90;
			this.mSushiOffsetY_2	= -30;
			this.mSushiKingaku		= 250;
			break;

		case 4:
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI4_TAKO";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA4_TAKO";
			this.mSushiOffsetX_1	= 25;
			this.mSushiOffsetY_1	= -60;
			this.mSushiOffsetX_2	= 90;
			this.mSushiOffsetY_2	= -50;
			this.mSushiKingaku		= 300;
			break;

		case 5:
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI5_SALMON";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA5_SALMON";
			this.mSushiOffsetX_1	= 25;
			this.mSushiOffsetY_1	= -40;
			this.mSushiOffsetX_2	= 90;
			this.mSushiOffsetY_2	= -30;
			this.mSushiKingaku		= 400;
			break;

		case 6:
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI6_EMI";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA6_EMI";
			this.mSushiOffsetX_1	= 25;
			this.mSushiOffsetY_1	= -55;
			this.mSushiOffsetX_2	= 90;
			this.mSushiOffsetY_2	= -40;
			this.mSushiKingaku		= 500;
			break;

		case 7:
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI7_MAGURO";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA7_MAGURO";
			this.mSushiOffsetX_1	= 25;
			this.mSushiOffsetY_1	= -40;
			this.mSushiOffsetX_2	= 90;
			this.mSushiOffsetY_2	= -30;
			this.mSushiKingaku		= 700;
			break;

		case 8:
			this.SushiImageHashKey	= "IMAGE_INDEX_SUSHI8_IKURA";
			this.SaraImageHashKey	= "IMAGE_INDEX_SARA8_IKURA";
			this.mSushiOffsetX_1	= 30;
			this.mSushiOffsetY_1	= -50;
			this.mSushiOffsetX_2	= 95;
			this.mSushiOffsetY_2	= -33;
			this.mSushiKingaku		= 1000;
			break;
		
			default:
//@				Debug.writeln("GetSushiImageHashKeyで不正");
				break;
	}

}

//---------------------------------------------------------
//	寿司画像のポジション更新
//	寿司は、皿画像とネタ画像二つの、画像三つで一つのデータ扱いとなっている
//---------------------------------------------------------
cSushi.prototype.pUpdateSushiImagePos	= function( ){

	var ShakeOffset	= 0;
	if( this.mShakeAnimFlag == true){
		ShakeOffset	=  Math.sin(360/this.mCannotPressFrames * this.mShakeTimer / 180 * Math.PI) * 30;
		this.mShakeTimer++;
		if( this.mShakeTimer >= this.mCannotPressFrames ){
			this.mShakeAnimFlag	= false;
			this.mShakeTimer	= 0;
		}
	}

	this.mSushiImage1.mPosX	= this.mPosX+this.mSushiOffsetX_1 + ShakeOffset;
	this.mSushiImage2.mPosX	= this.mPosX+this.mSushiOffsetX_2 + ShakeOffset;
	this.mSaraImage.mPosX	= this.mPosX;
}

//---------------------------------------------------------
//	寿司をゲットしたときのアニメーション設定
//	ベルトコンベアの位置から、画面左下まで移動
//---------------------------------------------------------
cSushi.prototype.pSetSushiAnim	= function( _GetSushiNum ){
	var AnimationTime	= 500;
	gGameMainObj.mTweenMgr.pEntryPosAnim( this.mSaraImage, this.mSaraImage.mPosX, this.mSaraImage.mPosY, -20, 510+_GetSushiNum*-12, AnimationTime);
	gGameMainObj.mTweenMgr.pEntryPosAnim( this.mSushiImage1, this.mSushiImage1.mPosX, this.mSushiImage1.mPosY, -20+this.mSushiOffsetX_1, 510+(_GetSushiNum*-12)+this.mSushiOffsetY_1, AnimationTime);
	gGameMainObj.mTweenMgr.pEntryPosAnim( this.mSushiImage2, this.mSushiImage2.mPosX, this.mSushiImage2.mPosY, -20+this.mSushiOffsetX_2, 510+(_GetSushiNum*-12)+this.mSushiOffsetY_2, AnimationTime);
}

//---------------------------------------------------------
//	pSetSushiAnimで設定したアニメーションが終わったかどうか
//---------------------------------------------------------
cSushi.prototype.pCheck_GetSushiAnim_Exit	= function( ){
	if( this.mSaraImage.mPosX == -20){
		return(true);
	}else{
		return(false);
	}
}

//---------------------------------------------------------
//	皿だけ残して、ネタだけ画面外に移動するアニメーション
//---------------------------------------------------------
cSushi.prototype.pRemoveSushiNetaAnim	= function( ){
	var AnimationTime	= 200;
	gGameMainObj.mTweenMgr.pEntryPosAnim( this.mSushiImage1, this.mSushiImage1.mPosX, this.mSushiImage1.mPosY, -300+this.mSushiOffsetX_1, this.mSushiImage1.mPosY, AnimationTime);
	gGameMainObj.mTweenMgr.pEntryPosAnim( this.mSushiImage2, this.mSushiImage2.mPosX, this.mSushiImage2.mPosY, -300+this.mSushiOffsetX_2, this.mSushiImage2.mPosY, AnimationTime);
}

//---------------------------------------------------------
//	リザルトシーンの皿が真ん中に吸い込まれていくアニメーション
//---------------------------------------------------------
cSushi.prototype.pSetResultSceneSaraAnim	= function( ){
	gGameMainObj.mTweenMgr.pEntryPosAnim( this.mSaraImage, this.mSaraImage.mPosX, this.mSaraImage.mPosY, 320, 400, 250);
}

//---------------------------------------------------------
//	リザルトシーンで、リトライを押された時の、画面外に皿が移動していくアニメーション
//---------------------------------------------------------
cSushi.prototype.pSetResultScenePressRetrySaraAnim	= function( ){
	gGameMainObj.mTweenMgr.pEntryPosAnim( this.mSaraImage, this.mSaraImage.mPosX, this.mSaraImage.mPosY, -270, this.mSaraImage.mPosY, 200);
}

//---------------------------------------------------------
//	ミスしたときの、寿司が揺れるアニメーションのリクエストを発行
//---------------------------------------------------------
cSushi.prototype.pSetShakeAnim	= function( _CannotPressFrame ){
	this.mCannotPressFrames	= _CannotPressFrame
	this.mShakeAnimFlag		= true;
	this.mShakeTimer			= 0;
}

//---------------------------------------------------------
//
//---------------------------------------------------------
cSushi.prototype.pGetSushiKingaku	= function( ){
	return( this.mSushiKingaku );
}


//---------------------------------------------------------
//
//---------------------------------------------------------
cSushi.prototype.GetSushiImageHashKey	= function( _SushiType ){
	var HashKey	= "";
	switch( _SushiType ){
		case 1:	HashKey	= "IMAGE_INDEX_SUSHI1_TAMAGO";	break;
		case 2:	HashKey	= "IMAGE_INDEX_SUSHI2_FUTOMAKI";break;
		case 3:	HashKey	= "IMAGE_INDEX_SUSHI3_IKA";		break;
		case 4:	HashKey	= "IMAGE_INDEX_SUSHI4_TAKO";	break;
		case 5:	HashKey	= "IMAGE_INDEX_SUSHI5_SALMON";	break;
		case 6:	HashKey	= "IMAGE_INDEX_SUSHI6_EMI";		break;
		case 7:	HashKey	= "IMAGE_INDEX_SUSHI7_MAGURO";	break;
		case 8:	HashKey	= "IMAGE_INDEX_SUSHI8_IKURA";	break;
		
			default:
//@				Debug.writeln("GetSushiImageHashKeyで不正");
				break;
	}
	
	return( HashKey );
}


//---------------------------------------------------------
//
//---------------------------------------------------------
cSushi.prototype.GetSaraImageHashKey	= function(_SushiType ){
	var HashKey	= "";
	switch( _SushiType ){
		case 1:	HashKey	= "IMAGE_INDEX_SARA1_TAMAGO";	break;
		case 2:	HashKey	= "IMAGE_INDEX_SARA2_FUTOMAKI";	break;
		case 3:	HashKey	= "IMAGE_INDEX_SARA3_IKA";		break;
		case 4:	HashKey	= "IMAGE_INDEX_SARA4_TAKO";		break;
		case 5:	HashKey	= "IMAGE_INDEX_SARA5_SALMON";	break;
		case 6:	HashKey	= "IMAGE_INDEX_SARA6_EMI";		break;
		case 7:	HashKey	= "IMAGE_INDEX_SARA7_MAGURO";	break;
		case 8:	HashKey	= "IMAGE_INDEX_SARA8_IKURA";	break;
		
			default:
//@				Debug.writeln("GetSaraImageHashKeyで不正");
				break;
	}
	
	return( HashKey );
	
}

//=========================================================
//	EOF
//=========================================================
