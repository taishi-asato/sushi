//=========================================================
/*
	画像データ
*/
//=========================================================

function cImageObj( _ImageHashKey, _PosX, _PosY, _Width, _Height ){
	
	// メンバ変数
	this.mImageHashKey	= _ImageHashKey;
	
	this.mPosX			= _PosX;
	this.mPosY			= _PosY;

	this.mWidth			= _Width;
	this.mHeight		= _Height;

	this.mScale			= 1;
	this.mOpacity		= 1;
}

//=========================================================
//	EOF
//=========================================================
