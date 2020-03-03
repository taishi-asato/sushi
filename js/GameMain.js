//=========================================================
/*
	ゲームのメイン処理
*/
//=========================================================

var GAMEMAIN_SCENE_0_TOP		= 0;
var GAMEMAIN_SCENE_0_MOVE		= 1;
var GAMEMAIN_SCENE_0_RETRY		= 2;
var GAMEMAIN_SCENE_0_BACKTOHOME	= 3;
var GAMEMAIN_SCENE_0_RESULT		= 4;
var GAMEMAIN_SCENE_0_HELP		= 5;

var GAMEMAIN_SCENE_1_TOP_INIT	= 0;
var GAMEMAIN_SCENE_1_TOP_WAIT	= 1;
var GAMEMAIN_SCENE_1_TOP_END	= 2;

var GAMEMAIN_SCENE_1_MOVE_INIT		= 0;
var GAMEMAIN_SCENE_1_MOVE_MAIN		= 1;
var GAMEMAIN_SCENE_1_MOVE_DISP_HELP	= 2;

var GAMEMAIN_SCENE_1_RETRY_INIT	= 0;
var GAMEMAIN_SCENE_1_RETRY_WAIT	= 1;
var GAMEMAIN_SCENE_1_RETRY_EXIT	= 2;

var GAMEMAIN_SCENE_1_BACKTOHOME_INIT	= 0;
var GAMEMAIN_SCENE_1_BACKTOHOME_WAIT	= 1;
var GAMEMAIN_SCENE_1_BACKTOHOME_EXIT	= 2;

var GAMEMAIN_SCENE_1_RESULT_INIT		= 0;
var GAMEMAIN_SCENE_1_RESULT_CALC		= 1;
var GAMEMAIN_SCENE_1_RESULT_WAIT		= 2;
var GAMEMAIN_SCENE_1_RESULT_PRESS_RETRY	= 3;
var GAMEMAIN_SCENE_1_RESULT_PRESS_TOP	= 4;

var CONBYOR_SPEED_MIN	= -8;
var CONBYOR_SPEED_MAX	= -55;

var GAME_PLAY_TIME		= 31000;	// 単位はミリセカンド
//var GAME_PLAY_TIME		= 10000;	// 単位はミリセカンド

var PENALTY_OTETSUKI_1	= 7;		// 単位はフレーム
var PENALTY_OTETSUKI_5	= 3000;		// 単位はミリセカンド

var KIRAKIRA_EFFECT_NUM	= 50;

var OUT_OF_DISPLAY_X	= 10000;

function cGameMain(){

	// メンバ変数
	this.mSceneNo0	= 0;
	this.mSceneNo1	= 0;
	this.mSceneNo2	= 0;
	this.mSceneNo3	= 0;

	this.mOldSceneNo0	= 0;

	this.mTouchBtnType	= "";

	this.mCoveyorSpeedX	= CONBYOR_SPEED_MIN;
	this.mCoveyorPosX	= 0;

	this.mTweenMgr;


	this.mBGLayout;
	this.mBtnLayout;
	this.mSpriteLayout;

	this.mBtnImageArray;
	this.mBgImageArray;
	this.mSpriteImageArray;
	this.mCommonSpriteImageArray;


	this.mSushiArray;
	this.mGetSushiArray;

	this.RemoveNetaAnimRequest;

	this.mGameStartTime	= 0;
	this.mGameTimer		= 0;
	this.mRemainingTime	= 0;

	this.mCreateSushiTimer	= 0;

	this.mOtetsukiTimer				= 0;
	this.mFiveTimesOtetsukiTimer	= 0;
	this.mMissCount			= 0;

	this.mTimer					= 0;
	this.mResultMaisuuCounter	= 0;
	this.mResultKingakuCounter	= 0;

	this.mMaisuuRecord		= 0;
	this.mKingakuRecord		= 0;

	this.mMousePressFlag	= false;

	this.mPointOfReference			= 0;
	this.mHelpImage_StartPosY		= 0;
	this.mHelpStartSlideActionTime	= 0;
	this.mSlideSpeed				= 0;

	this.mResultKekkaTextImageObj;
	this.mResultBordImageObj;

	this.GameMainInit();
}

//=========================================================
// ゲームのメイン 初期化
//=========================================================
cGameMain.prototype.GameMainInit	= function(){

	public_SetSoundFlag( true );

	// シーンごとのBGデータの定義
	this.mBGLayout	= new Array();
	this.mBGLayout[GAMEMAIN_SCENE_0_TOP]	= new Array(
		new cImageObj( "IMAGE_INDEX_BG", 0, 0, 960, 640),
		new cImageObj( "IMAGE_INDEX_BG_HOME", 0, 0, 960, 640)
	);

	this.mBGLayout[GAMEMAIN_SCENE_0_MOVE]	= new Array(
		new cImageObj( "IMAGE_INDEX_BG", 0, 0, 960, 640),
		new cImageObj( "IMAGE_INDEX_ICON_TIME", 840, 0, 115, 122)
	);

	this.mBGLayout[GAMEMAIN_SCENE_0_RESULT]	= new Array(
		new cImageObj( "IMAGE_INDEX_BG", 0, 0, 960, 640),
		new cImageObj( "IMAGE_INDEX_BG_KEKKA", 0, 0, 960, 230)
	);

	this.mBGLayout[GAMEMAIN_SCENE_0_HELP]	= new Array(
		new cImageObj( "IMAGE_INDEX_HELP", 0, 0, 960, 2880)
	);



	// シーンごとのボタンデータの定義
	this.mBtnLayout	= new Array();
	this.mBtnLayout[GAMEMAIN_SCENE_0_TOP]	= new Array(
		new cImageObj( "IMAGE_INDEX_BTN_HOME_SOUND", 180, 10, 97, 97),
		new cImageObj( "IMAGE_INDEX_BTN_HOME_HOWTO", 180+163*1, 10, 97, 116),
		new cImageObj( "IMAGE_INDEX_BTN_HOME_TWITTER", 180+163*2, 10, 97, 116),
		new cImageObj( "IMAGE_INDEX_BTN_HOME_FACEBOOK", 180+163*3, 10, 97, 116),
		new cImageObj( "IMAGE_INDEX_BTN_START", 520, 160, 414, 105),
		
		new cImageObj( "IMAGE_INDEX_AD_ICON1", 12+(146+12)*0, 330, 146, 146),
		new cImageObj( "IMAGE_INDEX_AD_ICON2", 12+(146+12)*1, 330, 146, 146),
		new cImageObj( "IMAGE_INDEX_AD_ICON3", 12+(146+12)*2, 330, 146, 146),
		new cImageObj( "IMAGE_INDEX_AD_ICON4", 12+(146+12)*3, 330, 146, 146),
		new cImageObj( "IMAGE_INDEX_AD_ICON5", 12+(146+12)*4, 330, 146, 146),
		new cImageObj( "IMAGE_INDEX_AD_ICON6", 12+(146+12)*5, 330, 146, 146)
	);

	this.mBtnLayout[GAMEMAIN_SCENE_0_MOVE]	= new Array(
		new cImageObj( "IMAGE_INDEX_BTN_HOME", 420, 5, 205, 65),
		new cImageObj( "IMAGE_INDEX_BTN_RETRY", 630, 5, 205, 65),

		new cImageObj( "IMAGE_INDEX_BTN_ITA1_TAMAGO", 880-80*7, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA2_FUTOMAKI", 880-80*6, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA3_IKA", 880-80*5, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA4_TAKO", 880-80*4, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA5_SALMON", 880-80*3, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA6_EBI", 880-80*2, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA7_MAGURO", 880-80*1, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA8_IKURA", 880, 330, 80, 211)
	);

	this.mBtnLayout[GAMEMAIN_SCENE_0_RESULT]	= new Array(
		new cImageObj( "IMAGE_INDEX_BTN_HOME", 420, 5, 205, 65),
		new cImageObj( "IMAGE_INDEX_BTN_RETRY", 630, 5, 205, 65)
	);

	this.mBtnLayout[GAMEMAIN_SCENE_0_HELP]	= new Array(
		new cImageObj( "IMAGE_INDEX_BTN_HOME", 0, 0, 205, 65)
	);

	// シーンごとのスプライトの定義
	this.mSpriteLayout	= new Array();
	this.mSpriteLayout[GAMEMAIN_SCENE_0_TOP]	= new Array();
	this.mSpriteLayout[GAMEMAIN_SCENE_0_MOVE]	= new Array(
		new cImageObj( "IMAGE_INDEX_BOARD_STOP", 880, 330, 639, 211),
		new cImageObj( "IMAGE_INDEX_BOARD_HELP", 880, 330, 639, 211)
	);
	this.mSpriteLayout[GAMEMAIN_SCENE_0_RESULT]	= new Array(
		new cImageObj( "IMAGE_INDEX_BTN_ITA1_TAMAGO", 880-80*7, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA2_FUTOMAKI", 880-80*6, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA3_IKA", 880-80*5, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA4_TAKO", 880-80*4, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA5_SALMON", 880-80*3, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA6_EBI", 880-80*2, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA7_MAGURO", 880-80*1, 330, 80, 211),
		new cImageObj( "IMAGE_INDEX_BTN_ITA8_IKURA", 880, 330, 80, 211),

		new cImageObj( "IMAGE_INDEX_OKAIKEI_BORD", 321, 330, 639, 211),
		new cImageObj( "IMAGE_INDEX_TXT_KEKKA", 275, 150, 431, 109),
		new cImageObj( "IMAGE_INDEX_KIROKU_KOUSIN", -500, 0, 142, 136),
		new cImageObj( "IMAGE_INDEX_KIROKU_KOUSIN", -500, 0, 142, 136)
	);

	this.mSpriteLayout[GAMEMAIN_SCENE_0_HELP]	= new Array(
		new cImageObj( "IMAGE_INDEX_HELP", 0, 0, 960, 2880),
		new cImageObj( "IMAGE_INDEX_BTN_HOME", 0, 0, 205, 65)
	);

	for( var i=0; i<KIRAKIRA_EFFECT_NUM; i++){
		this.mSpriteLayout[GAMEMAIN_SCENE_0_RESULT].push( new cImageObj( "IMAGE_INDEX_EFFEDT_KIRAKIRA", 0, 0, 100, 100) );
	}


	// ずっと画面に出てる画像(コンベアとゲームロゴ)は別途管理
	this.mCommonSpriteImageArray	= new Array(
		new cImageObj( "IMAGE_INDEX_CONVEYOR", 0, 230, 960, 84),
		new cImageObj( "IMAGE_INDEX_CONVEYOR", 960, 230, 960, 84),
		
		new cImageObj( "IMAGE_INDEX_LOGO", 15, 150, 485, 129)
	);

	this.mSushiArray	= new Array();
	this.mSushiArray	= [];

	this.mGetSushiArray	= new Array();
	this.mGetSushiArray	= [];

	this.RemoveNetaAnimRequest	= new Array();
	this.RemoveNetaAnimRequest	= [];

	this.mTweenMgr		= new cTweenMgr();

	this.ChangeScenNo0( GAMEMAIN_SCENE_0_TOP );
	this.ChangeImageAsset( GAMEMAIN_SCENE_0_TOP );
}



//=========================================================
// ゲームのメインループ
// define.jsのループ制御部分から呼ばれる
//=========================================================
cGameMain.prototype.GameMainLoop	= function(){
	
	this.CheckButtnTap();

	switch( this.mSceneNo0 ){
		case GAMEMAIN_SCENE_0_TOP:			this.GameMain_Scene0_Top();			break;
		case GAMEMAIN_SCENE_0_MOVE:			this.GameMain_Scene0_Move();		break;
		case GAMEMAIN_SCENE_0_RETRY:		this.GameMain_Scene0_Retry();		break;
		case GAMEMAIN_SCENE_0_BACKTOHOME:	this.GameMain_Scene0_BackToHome();	break;
		case GAMEMAIN_SCENE_0_RESULT:		this.GameMain_Scene0_Result();		break;
		case GAMEMAIN_SCENE_0_HELP:			this.GameMain_Scene0_Help();		break;
	}

	this.mTweenMgr.LoopMgr();

	this.ConveyorAnim();

	this.GameMainDrawProcess();
}

//=========================================================
//	押されたボタンのハッシュキーを返す
//=========================================================
cGameMain.prototype.CheckButtnTap	= function( ){

	this.mTouchBtnType	= "NONE";

	// タッチイベントの処理
	if( public_GetMouseDownFlag() == true){
		this.mMousePressFlag	= true;
	
		for( var i=0; i<this.mBtnImageArray.length; i++){
			if( (this.mBtnImageArray[i].mPosX<=gMousePosX) &&
				(gMousePosX <= this.mBtnImageArray[i].mPosX+this.mBtnImageArray[i].mWidth) &&
				(this.mBtnImageArray[i].mPosY<=gMousePosY) &&
				(gMousePosY <= this.mBtnImageArray[i].mPosY+this.mBtnImageArray[i].mHeight)	)
			{
//@				Debug.writeln("ボタンが押された..."+this.mBtnImageArray[i].mImageHashKey);
				this.mTouchBtnType	= this.mBtnImageArray[i].mImageHashKey;
			}
		}
	}else if( public_GetMouseUpFlag() == true){
		this.mMousePressFlag	= false;
	}

	// タッチ系フラグの後始末
	public_ResetInputFlag();
}

//=========================================================
//	ベルトコンベヤーのアニメーション回り
//	基本ずっと画面に出っ放しなので、GameMainLoopに置く
//=========================================================
cGameMain.prototype.ConveyorAnim	= function( ){

	this.mCoveyorPosX += this.mCoveyorSpeedX*public_GetFrameRate()/FRAME_RATE;
	if( this.mCoveyorPosX <= -960 ){this.mCoveyorPosX	= 0;};
	this.mCommonSpriteImageArray[0].mPosX	= this.mCoveyorPosX;
	this.mCommonSpriteImageArray[1].mPosX	= this.mCoveyorPosX+960;
}

//=========================================================
//	描画したい画像データを登録。後に登録するほど、優先度が高い
//=========================================================
cGameMain.prototype.GameMainDrawProcess	= function( ){
	// 仮
	for( var i=0; i<this.mBgImageArray.length; i++){
		public_StackImageObj( this.mBgImageArray[i] );
	}
	
	for( var i=0; i<this.mCommonSpriteImageArray.length; i++){
		public_StackImageObj( this.mCommonSpriteImageArray[i] );
	}
	
	for( var i=0; i<this.mBtnImageArray.length; i++){
		public_StackImageObj( this.mBtnImageArray[i] );
	}
	
	for(var i=0; i<this.mSushiArray.length;i++){
		public_StackImageObj( this.mSushiArray[i].mSaraImage );
		public_StackImageObj( this.mSushiArray[i].mSushiImage1 );
		public_StackImageObj( this.mSushiArray[i].mSushiImage2 );
	}

	for(var i=0; i<this.mGetSushiArray.length;i++){
		public_StackImageObj( this.mGetSushiArray[i].mSaraImage );
		public_StackImageObj( this.mGetSushiArray[i].mSushiImage1 );
		public_StackImageObj( this.mGetSushiArray[i].mSushiImage2 );
	}

	for(var i=0; i<this.mSpriteImageArray.length;i++){
		public_StackImageObj( this.mSpriteImageArray[i] );
	}

}



//=========================================================
// ゲームトップ画面
//=========================================================
cGameMain.prototype.GameMain_Scene0_Top	= function( ){

	switch( this.mSceneNo1 ){
		case GAMEMAIN_SCENE_1_TOP_INIT:	this.GameMain_Top_Init();	break;
		case GAMEMAIN_SCENE_1_TOP_WAIT:	this.GameMain_Top_Wait();	break;
		case GAMEMAIN_SCENE_1_TOP_END:	this.GameMain_Top_End();	break;
	}
}

//---------------------------------------------------------
// ゲームトップ画面 初期化
//---------------------------------------------------------
cGameMain.prototype.GameMain_Top_Init	= function( ){
	this.ChangeImageAsset( this.mSceneNo0 );
	this.mMaisuuRecord		= public_GetMaisuuRecord();
	this.mKingakuRecord		= public_GetKingakuRecord();
	
	for(var i=0; i<this.mBtnImageArray.length; i++){
		this.SetFadeInFadeOutAnim( this.mBtnImageArray[i], true);
	}
	this.SetFadeInFadeOutAnim( this.mBgImageArray[1], true);

//@	document.getElementById('AdFrameHome').style.visibility = "visible";
//@	document.getElementById('AdFrameGame').style.visibility = "hidden";

	this.ChangeScenNo1( GAMEMAIN_SCENE_1_TOP_WAIT );
}

//---------------------------------------------------------
//	ゲームトップ画面
//	何かのボタンが押されるの待ち
//---------------------------------------------------------
cGameMain.prototype.GameMain_Top_Wait	= function( ){

	if( public_GetSoundFlag() == true){
		public_StackTextImage( "ON", 212, 125, 20, "black", "hogehoge" );
	}else{
		public_StackTextImage( "OFF", 210, 125, 20, "black", "hogehoge" );
	}

	// ゲーム画面からトップ画面に戻った際の、
	// ロゴの移動アニメーションが終わるまでは、ボタンは押せない
	if( this.mCommonSpriteImageArray[2].mPosX != 15){
		return;
	}

	// レコード記録の表示
	var tempSaikoumaisuu	= String(this.mMaisuuRecord);
	var tempSaikoukingaku	= this.AddComma( String(this.mKingakuRecord) );
	var tempSaikoumaisuuString	= "最高枚数：" + tempSaikoumaisuu + "枚";
	var tempSaikoukinngakuString	= "最高金額：" + tempSaikoukingaku + "円";
	public_StackTextImage( tempSaikoumaisuuString, 360, 520, 25, "black", "hogehoge" );
	public_StackTextImage( tempSaikoukinngakuString, 640, 520, 25, "black", "hogehoge" );

	switch( this.mTouchBtnType ){
		case "IMAGE_INDEX_BTN_START":
			this.ChangeScenNo1(GAMEMAIN_SCENE_1_TOP_END);
			this.mTweenMgr.pEntryPosAnim( this.mCommonSpriteImageArray[2], 15, 150, 5, 10, 200);
			this.mTweenMgr.pEntryScaleAnim( this.mCommonSpriteImageArray[2], 1, 0.7, 200);
			for(var i=0; i<this.mBtnImageArray.length; i++){
				this.SetFadeInFadeOutAnim( this.mBtnImageArray[i], false);
			}
			this.SetFadeInFadeOutAnim( this.mBgImageArray[1], false);

			public_PlaySE("SE_PRESS_BTN");
			break;
		
		case "IMAGE_INDEX_BTN_HOME_SOUND":
			public_ChangeSoundFlag();
			break;

		case "IMAGE_INDEX_BTN_HOME_HOWTO":
			public_PlaySE("SE_PRESS_BTN");
			this.ChangeScenNo0(GAMEMAIN_SCENE_0_HELP);
			break;


		case "IMAGE_INDEX_BTN_HOME_FACEBOOK":
			public_OpenFacebookPage();
			break;

		case "IMAGE_INDEX_BTN_HOME_TWITTER":
			public_OpenTwitterPage();
			break;
			
		case "IMAGE_INDEX_AD_ICON1":public_OpenAddLinkPage(1);	break;
		case "IMAGE_INDEX_AD_ICON2":public_OpenAddLinkPage(2);	break;
		case "IMAGE_INDEX_AD_ICON3":public_OpenAddLinkPage(3);	break;
		case "IMAGE_INDEX_AD_ICON4":public_OpenAddLinkPage(4);	break;
		case "IMAGE_INDEX_AD_ICON5":public_OpenAddLinkPage(5);	break;
		case "IMAGE_INDEX_AD_ICON6":public_OpenAddLinkPage(6);	break;
	}
}

//---------------------------------------------------------
//	ゲームスタートボタンを押された後の、
//	アニメーション終了待ち
//---------------------------------------------------------
cGameMain.prototype.GameMain_Top_End	= function( ){

	// BGやボタンが消えたら、ゲームメインへ移る
	// ここでは、ボタン画像の1個だけに注目して判定処理
	if( this.mBtnImageArray[0].mOpacity == 0){
		this.ChangeScenNo0(GAMEMAIN_SCENE_0_MOVE);
	}
}


//=========================================================
//	寿司取りゲーム ゲーム部分メイン処理
//=========================================================
cGameMain.prototype.GameMain_Scene0_Move	= function( ){

	switch( this.mSceneNo1 ){
		case GAMEMAIN_SCENE_1_MOVE_INIT:		this.GameMain_Move_Init();		break;
		case GAMEMAIN_SCENE_1_MOVE_MAIN:		this.GameMain_Move_Main();		break;
		case GAMEMAIN_SCENE_1_MOVE_DISP_HELP:	this.GameMain_Move_DispHelp();	break;
	}
}


//---------------------------------------------------------
//	早食い回転寿司 ゲーム部分 初期化
//---------------------------------------------------------
cGameMain.prototype.GameMain_Move_Init	= function( ){

	this.ChangeImageAsset( this.mSceneNo0 );

	// トップ画面から遷移したときのみ、フェードインのアニメーションは実行
	// (リトライボタンを押されてここに来た場合は、アニメーションしない)
	if( this.mOldSceneNo0 == GAMEMAIN_SCENE_0_TOP){
		for(var i=0; i<this.mBtnImageArray.length; i++){
			this.SetFadeInFadeOutAnim( this.mBtnImageArray[i], true);
		}
	}


	this.mCoveyorSpeedX	= CONBYOR_SPEED_MIN;
	this.mRemainingTime	= GAME_PLAY_TIME - this.mGameTimer;

	this.mGameStartTime	= public_GetCurrentTime();

	this.mSushiArray	= [];
	this.mGetSushiArray	= [];
	this.RemoveNetaAnimRequest	= [];

	this.mCreateSushiTimer	= 0;
	this.mMissCount			= 0;
	this.mOtetsukiTimer				= 0;
	this.mFiveTimesOtetsukiTimer	= 0;


	this.mSpriteImageArray[0].mPosX	= OUT_OF_DISPLAY_X;	// 御手付きのボード。画面外に飛ばしておく

	// 広告枠
//@	document.getElementById('AdFrameHome').style.visibility = "hidden";
//@	document.getElementById('AdFrameGame').style.visibility = "visible";


	if( public_GetFirstPlayFlag() == true){
		this.ChangeScenNo1(GAMEMAIN_SCENE_1_MOVE_DISP_HELP);
	}else{
		this.mSpriteImageArray[1].mPosX	= OUT_OF_DISPLAY_X;
		this.ChangeScenNo1(GAMEMAIN_SCENE_1_MOVE_MAIN);
	}
}


//---------------------------------------------------------
//	早食い回転寿司 ゲーム部分 メイン処理
//---------------------------------------------------------
cGameMain.prototype.GameMain_Move_Main	= function( ){

	this.CheckCreateSushiInterval();

	this.GameMainMove_BtnProcess();

	this.MoveSushi();

	this.CheckGameTimer();
}


//-------------------------------
// 寿司の生成チェック
//-------------------------------
cGameMain.prototype.CheckCreateSushiInterval	= function( ){

	// 残り1秒以下の時は、作らない
	if( (GAME_PLAY_TIME - this.mGameTimer) < 1000 ){
		return;
	}

	this.mCreateSushiTimer++;
	if( (this.mCreateSushiTimer*this.mCoveyorSpeedX) < -280 ){
		if( (Math.floor(Math.random()*10) >= 9) || ((this.mCreateSushiTimer*this.mCoveyorSpeedX) < -700) ){
			this.mCreateSushiTimer	= 0;
			this.CreateSushi();
		}
	}
}

//-------------------------------
//	寿司の生成
//	完全ランダム(値段による出やすさの重みづけとかは特にしない)
//-------------------------------
cGameMain.prototype.CreateSushi	= function( ){

	// 1～8でランダム
	var SushiType	= Math.floor(Math.random()*8+1);
	if( SushiType < 1){
		SushiType	= 1;
//@		Debug.writeln("要確認 cGameMain.prototype.CreateSushi  SushiTypeが1以下");
	}else if( SushiType > 8){
		SushiType	= 8;
//@		Debug.writeln("要確認 cGameMain.prototype.CreateSushi  SushiTypeが8以上");
	}

	// 要確認 デバッグ用
//	SushiType	= 2;

	this.mSushiArray.push( new cSushi(SushiType, 960, 210) );
}


//-------------------------------
//	ゲームメイン部分 ボタン処理
//-------------------------------
cGameMain.prototype.GameMainMove_BtnProcess	= function( ){

	this.mOtetsukiTimer--;
	this.mFiveTimesOtetsukiTimer	-= 1000/public_GetFrameRate();
	if(this.mFiveTimesOtetsukiTimer > 0 ){
		return;
	}
	this.mSpriteImageArray[0].mPosX	= 1000;

	if( this.mOtetsukiTimer > 0){
		return;
	}

	if( this.mTouchBtnType == "NONE"){
		return;
	}

	// アニメーションの整合性とかの都合により、残り0.5秒以下の時は、押せない
	if( (GAME_PLAY_TIME - this.mGameTimer) < 500 ){
		return;
	}

	switch( this.mTouchBtnType ){
		case "IMAGE_INDEX_BTN_ITA1_TAMAGO":
		case "IMAGE_INDEX_BTN_ITA2_FUTOMAKI":
		case "IMAGE_INDEX_BTN_ITA3_IKA":
		case "IMAGE_INDEX_BTN_ITA4_TAKO":
		case "IMAGE_INDEX_BTN_ITA5_SALMON":
		case "IMAGE_INDEX_BTN_ITA6_EBI":
		case "IMAGE_INDEX_BTN_ITA7_MAGURO":
		case "IMAGE_INDEX_BTN_ITA8_IKURA":
			this.SushiGet( this.mTouchBtnType );
			break;
			
		case "IMAGE_INDEX_BTN_HOME":
			this.ChangeScenNo0( GAMEMAIN_SCENE_0_BACKTOHOME );
			public_PlaySE("SE_PRESS_BTN");
			break;

		case "IMAGE_INDEX_BTN_RETRY":
			this.ChangeScenNo0( GAMEMAIN_SCENE_0_RETRY );
			public_PlaySE("SE_PRESS_BTN");
			break;
	}
}


//-------------------------------
//	寿司がとれたかどうかの判定処理
//-------------------------------
cGameMain.prototype.SushiGet	= function( _SushiImageHashKey ){
	var tempSushiType	= 0;


	if( this.mSushiArray.length == 0){
		return;
	}

	switch( _SushiImageHashKey ){
		case "IMAGE_INDEX_BTN_ITA1_TAMAGO":		tempSushiType	= 1;	break;
		case "IMAGE_INDEX_BTN_ITA2_FUTOMAKI":	tempSushiType	= 2;	break;
		case "IMAGE_INDEX_BTN_ITA3_IKA":		tempSushiType	= 3;	break;
		case "IMAGE_INDEX_BTN_ITA4_TAKO":		tempSushiType	= 4;	break;
		case "IMAGE_INDEX_BTN_ITA5_SALMON":		tempSushiType	= 5;	break;
		case "IMAGE_INDEX_BTN_ITA6_EBI":		tempSushiType	= 6;	break;
		case "IMAGE_INDEX_BTN_ITA7_MAGURO":		tempSushiType	= 7;	break;
		case "IMAGE_INDEX_BTN_ITA8_IKURA":		tempSushiType	= 8;	break;
	}


	var GetSushiFlag	= false;
	for( var i=0; i < this.mSushiArray.length; i++){
		if( this.mSushiArray[i].mSushiType == tempSushiType){

			this.mGetSushiArray.push( new cSushi(this.mSushiArray[i].mSushiType, this.mSushiArray[i].mPosX, this.mSushiArray[i].mPosY) );
			this.mGetSushiArray[this.mGetSushiArray.length-1].pSetSushiAnim( this.mGetSushiArray.length );
			if( this.mGetSushiArray.length >= 2){
				this.RemoveNetaAnimRequest.push( this.mGetSushiArray.length-2 );
			}

			this.mSushiArray.splice(i, 1);
			GetSushiFlag	= true;
			this.mMissCount	= 0;
			public_PlaySE("SE_GET");
			break;
		}
	}

	if( GetSushiFlag == false){
		public_PlaySE("SE_MISS");
		this.mOtetsukiTimer	= PENALTY_OTETSUKI_1;
		for(var i=0; i<this.mSushiArray.length; i++){
			this.mSushiArray[i].pSetShakeAnim( PENALTY_OTETSUKI_1 );
		}
		this.mMissCount++;
		if( this.mMissCount == 5){
			this.mFiveTimesOtetsukiTimer	= PENALTY_OTETSUKI_5;
			this.mSpriteImageArray[0].mPosX	= 320;
			this.mMissCount		= 0;
			this.mOtetsukiTimer	= 0;
		}
	}
}


//-------------------------------
//	ゲームの残り時間チェック
//-------------------------------
cGameMain.prototype.CheckGameTimer	= function( ){

	this.mGameTimer		= public_GetCurrentTime() - this.mGameStartTime;
	this.mRemainingTime	= GAME_PLAY_TIME - this.mGameTimer;
	this.mRemainingTime		= Math.floor(this.mRemainingTime/ 1000);

	var TimerPosX	= 868;
	if( this.mRemainingTime < 10){	TimerPosX	= 882;}
	
	if( this.mGameTimer > GAME_PLAY_TIME){
		public_StackTextImage( 0, TimerPosX, 75, 60, "black", "hogehoge" );
		this.ChangeScenNo0( GAMEMAIN_SCENE_0_RESULT );
	}else{
		public_StackTextImage( this.mRemainingTime, TimerPosX, 75, 60, "black", "hogehoge" );
	}

	// ベルトコンベアの速度変化もこっちでやる
	// とりあえず徐々に線形で加速することにする
	this.mCoveyorSpeedX	= CONBYOR_SPEED_MIN+(CONBYOR_SPEED_MAX-CONBYOR_SPEED_MIN)*(this.mGameTimer/GAME_PLAY_TIME);

}

//---------------------------------------------------------
//	早食い回転寿司 ゲーム部分 初回起動時ヘルプ表示
//---------------------------------------------------------
cGameMain.prototype.GameMain_Move_DispHelp	= function( ){

	switch(this.mSceneNo2){
		case 0: 
			public_ChangeFirstPlayFlag( );
			this.mSpriteImageArray[1].mPosX	= 320;
			this.mSceneNo2++;
			this.mTimer		= 0;
			//break;	// そのまま次のステップに進む
		
		case 1:
			this.mTimer++;
			if( this.mTimer >= 150){
				this.mTweenMgr.pEntryPosAnim( this.mSpriteImageArray[1], this.mSpriteImageArray[1].mPosX, this.mSpriteImageArray[1].mPosY, OUT_OF_DISPLAY_X, this.mSpriteImageArray[1].mPosY, 200);
				this.mSceneNo2++;
			}
			break;
		case 2:
			if( this.mSpriteImageArray[1].mPosX == OUT_OF_DISPLAY_X){
				this.mGameStartTime	= public_GetCurrentTime();	// 再度初期化
				this.ChangeScenNo1(GAMEMAIN_SCENE_1_MOVE_MAIN);
			}

			break;
	}

}


//=========================================================
//	リトライ
//=========================================================
cGameMain.prototype.GameMain_Scene0_Retry	= function( ){
	switch( this.mSceneNo1 ){
		case GAMEMAIN_SCENE_1_RETRY_INIT:	this.GameMain_Retry_Init();	break;
		case GAMEMAIN_SCENE_1_RETRY_WAIT:	this.GameMain_Retry_Wait();	break;
		case GAMEMAIN_SCENE_1_RETRY_EXIT:	this.GameMain_Retry_Exit();	break;
	}
}

//---------------------------------------------------------
//	リトライ 初期化
//---------------------------------------------------------
cGameMain.prototype.GameMain_Retry_Init	= function( ){
	this.mCoveyorSpeedX	= CONBYOR_SPEED_MAX;
	this.ChangeScenNo1( GAMEMAIN_SCENE_1_RETRY_WAIT );
}

//---------------------------------------------------------
//	リトライ
//	寿司が画面外に掃けるの待ち
//---------------------------------------------------------
cGameMain.prototype.GameMain_Retry_Wait	= function( ){

	this.MoveSushi();

	if( this.mSushiArray.length == 0){
		this.mCoveyorSpeedX	= CONBYOR_SPEED_MIN;
		this.ChangeScenNo1( GAMEMAIN_SCENE_1_RETRY_EXIT );
	}
}

//---------------------------------------------------------
//	リトライ MOVEへ
//---------------------------------------------------------
cGameMain.prototype.GameMain_Retry_Exit	= function( ){
	this.ChangeScenNo0( GAMEMAIN_SCENE_0_MOVE );
}



//=========================================================
//	トップ画面に戻る
//=========================================================
cGameMain.prototype.GameMain_Scene0_BackToHome	= function( ){
	switch( this.mSceneNo1 ){
		case GAMEMAIN_SCENE_1_BACKTOHOME_INIT:	this.GameMain_BackToHome_Init();	break;
		case GAMEMAIN_SCENE_1_BACKTOHOME_WAIT:	this.GameMain_BackToHome_Wait();	break;
		case GAMEMAIN_SCENE_1_BACKTOHOME_EXIT:	this.GameMain_BackToHome_Exit();	break;
	}
}

//---------------------------------------------------------
//	トップ画面に戻る 初期化
//---------------------------------------------------------
cGameMain.prototype.GameMain_BackToHome_Init	= function( ){
	this.mTweenMgr.pEntryPosAnim( this.mCommonSpriteImageArray[2], 5, 10, 15, 150, 200);
	this.mTweenMgr.pEntryScaleAnim( this.mCommonSpriteImageArray[2], 0.7, 1, 200);
	this.ChangeScenNo1( GAMEMAIN_SCENE_1_BACKTOHOME_WAIT );
}

//---------------------------------------------------------
//	トップ画面に戻る(何か演出がある場合、ここで演出終わるの待ち)
//---------------------------------------------------------
cGameMain.prototype.GameMain_BackToHome_Wait	= function( ){

	this.mSushiArray	= [];
	this.mGetSushiArray	= [];
	this.mCoveyorSpeedX	= 0;
	this.ChangeScenNo1( GAMEMAIN_SCENE_1_BACKTOHOME_EXIT );
}

//---------------------------------------------------------
//	トップ画面に戻る トップ画面へ
//---------------------------------------------------------
cGameMain.prototype.GameMain_BackToHome_Exit	= function( ){
	this.ChangeScenNo0( GAMEMAIN_SCENE_0_TOP );
}


//=========================================================
//	リザルト画面
//=========================================================
cGameMain.prototype.GameMain_Scene0_Result	= function( ){
	switch( this.mSceneNo1 ){
		case GAMEMAIN_SCENE_1_RESULT_INIT:	this.GameMain_Result_Init();		break;
		case GAMEMAIN_SCENE_1_RESULT_CALC:	this.GameMain_Result_CalcResult();	break;
		case GAMEMAIN_SCENE_1_RESULT_WAIT:	this.GameMain_Result_Wait();		break;
		case GAMEMAIN_SCENE_1_RESULT_PRESS_RETRY:	this.GameMain_Result_PressRetryBtn();	break;
		case GAMEMAIN_SCENE_1_RESULT_PRESS_TOP:		this.GameMain_Result_PressHomeBtn();	break;
	}
}


//---------------------------------------------------------
//	リザルト画面 初期化
//---------------------------------------------------------
cGameMain.prototype.GameMain_Result_Init	= function( ){
	this.ChangeImageAsset( this.mSceneNo0 );
	this.SetFadeInFadeOutAnim( this.mBgImageArray[1], true);	// IMAGE_INDEX_BG_KEKKAをフェードイン

	this.mResultBordImageObj		= this.mSpriteImageArray[8];
	this.mResultKekkaTextImageObj	= this.mSpriteImageArray[9];

	// 「記録更新」のスタンプ画像は画面外に出しておく
	this.mSpriteImageArray[10].mPosX	= OUT_OF_DISPLAY_X;
	this.mSpriteImageArray[11].mPosX	= OUT_OF_DISPLAY_X;

	// きらきらエフェクトも画面の外に出しておく
	for( var i=12; i<this.mSpriteImageArray.length; i++){
		this.mSpriteImageArray[i].mPosX	= OUT_OF_DISPLAY_X;
	}

	this.mCoveyorSpeedX	= -15;
	this.mTweenMgr.pEntryPosAnim( this.mResultBordImageObj, 960+639, 330, 321, 330, 300);
	this.mTweenMgr.pEntryPosAnim( this.mResultKekkaTextImageObj, 960+431, 150, 275, 150, 800);

	this.mMaisuuRecord		= public_GetMaisuuRecord();
	this.mKingakuRecord		= public_GetKingakuRecord();

	// ゲットした寿司の一番上(一番最新)のネタを取り除いて皿だけにする
	if( this.mGetSushiArray.length >= 1){
		this.mGetSushiArray[this.mGetSushiArray.length-1].pRemoveSushiNetaAnim( this.mGetSushiArray.length );
	}
	this.mTimer		= 0;
	this.mResultMaisuuCounter		= 0;
	this.mResultKingakuCounter		= 0;

	if( this.mGetSushiArray.length == 0){
		// 一枚も寿司を取ってなかったら、特に演出なく終了
		this.ChangeScenNo1( GAMEMAIN_SCENE_1_RESULT_WAIT );
	}else{
		public_PlaySE("SE_COUNTING");
		this.ChangeScenNo1( GAMEMAIN_SCENE_1_RESULT_CALC );
	}
		
}


//---------------------------------------------------------
//	リザルト画面 計算中
//---------------------------------------------------------
cGameMain.prototype.GameMain_Result_CalcResult	= function( ){

	if( this.mResultKekkaTextImageObj.mPosX == 275 ){
		this.mCoveyorSpeedX	= 0;
	}

	this.mTimer++;
	if( this.mTimer %4 == 0){
		this.mGetSushiArray[this.mGetSushiArray.length-this.mResultMaisuuCounter-1].pSetResultSceneSaraAnim( );
		this.mResultKingakuCounter	+= this.mGetSushiArray[this.mGetSushiArray.length-this.mResultMaisuuCounter-1].pGetSushiKingaku();
		this.mResultMaisuuCounter++;
		if( this.mResultMaisuuCounter == this.mGetSushiArray.length){
			if( this.mMaisuuRecord < this.mResultMaisuuCounter){
				this.mSpriteImageArray[10].mPosX	= 600;
				this.mSpriteImageArray[10].mPosY	= 310;
				public_UpdateMaisuuRecord( this.mResultMaisuuCounter );
			}
			
			if( this.mKingakuRecord < this.mResultKingakuCounter){
				this.mSpriteImageArray[11].mPosX	= 580;
				this.mSpriteImageArray[11].mPosY	= 410;
				public_UpdateKingakuRecord( this.mResultKingakuCounter );
			}

			this.StartKiraKiraEffect();
			public_StopSE("SE_COUNTING");
			public_PlaySE("SE_RESULT");
			this.ChangeScenNo1( GAMEMAIN_SCENE_1_RESULT_WAIT );
		}
	}
	this.WriteResult( );

	this.GameMainResult_BtnProcess();
}

//---------------------------------------------------------
//	リザルト画面 合計枚数と金額のテキストを表示
//---------------------------------------------------------
cGameMain.prototype.WriteResult	= function( ){

	// リザルトの板が所定の位置に来るまでは、何も書かない
	if( this.mResultBordImageObj.mPosX	!= 321){
		return;
	}

	// 現在のゲームの結果を表示
	var ResultMaisuu_String	= String(this.mResultMaisuuCounter);
	var ResultKingaku_String= String(this.mResultKingakuCounter);
	var KingakuPosX			= 850-(ResultKingaku_String.length-1)*30 - Math.floor((ResultKingaku_String.length-1)/3)*15;
	ResultKingaku_String	= this.AddComma( ResultKingaku_String );

	public_StackTextImage( ResultMaisuu_String, 850-(ResultMaisuu_String.length-1)*30, 393, 65, "red", "hogehoge" );
	public_StackTextImage( ResultKingaku_String, KingakuPosX, 486, 65, "red", "hogehoge" );

	// 最高記録の表示
	var tempSaikoutMaisuu_String	= String(this.mMaisuuRecord);
	var tempSaikouKingaku_String	= String(this.mKingakuRecord);
	var SaikouKingakuPosX			= 880-(tempSaikouKingaku_String.length-1)*16 - Math.floor((tempSaikouKingaku_String.length-1)/3)*8;

	tempSaikouKingaku_String	= this.AddComma( tempSaikouKingaku_String );
	public_StackTextImage( tempSaikoutMaisuu_String, 880-(tempSaikoutMaisuu_String.length-1)*16, 426, 34, "black", "hogehoge" );
	public_StackTextImage( tempSaikouKingaku_String, SaikouKingakuPosX, 521, 34, "black", "hogehoge" );
}

//---------------------------------------------------------
//	金額に対して、3桁ごとにカンマを挿入
//---------------------------------------------------------
cGameMain.prototype.AddComma	= function( _String ){

	var ReturnValue = "";
	var tempCount	= 0;
	for(var i=_String.length-1; i>=0; i--){
		ReturnValue	= _String.charAt(i) + ReturnValue;
		tempCount++;
		if( ((tempCount%3)==0) && (i!=0) ){
			ReturnValue	= "," + ReturnValue;
		}
	}

	return( ReturnValue );
}

//---------------------------------------------------------
//	きらきらエフェクト
//---------------------------------------------------------
cGameMain.prototype.StartKiraKiraEffect	= function( ){

	for( var i=12; i<this.mSpriteImageArray.length; i++){
		this.mSpriteImageArray[i].mPosX		= 550;
		this.mSpriteImageArray[i].mPosY		= 350;
		this.mSpriteImageArray[i].mScale	= 0.5 + 3*Math.random();
		var tempPI	= Math.PI * 2 *(i-12)/KIRAKIRA_EFFECT_NUM;
		this.mTweenMgr.pEntryPosAnim( this.mSpriteImageArray[i], 550, 350, 550+Math.sin(tempPI)*1000, 350+Math.cos(tempPI)*1000, 2500+2500*Math.random());
	}
}

//---------------------------------------------------------
//	リザルト画面
//	ボタン押されるの待ち
//---------------------------------------------------------
cGameMain.prototype.GameMain_Result_Wait	= function( ){
	if( this.mResultKekkaTextImageObj.mPosX == 275 ){
		this.mCoveyorSpeedX	= 0;
	}

	this.GameMainResult_BtnProcess();

	this.WriteResult( );
}

//---------------------------------------------------------
//	リザルト画面 リトライボタンが押された
//---------------------------------------------------------
cGameMain.prototype.GameMain_Result_PressRetryBtn	= function( ){

	switch( this.mSceneNo2 ){
		case 0:
			// まだカウントされていなかった皿を、外に掃ける
			if(this.mResultMaisuuCounter <this.mGetSushiArray.length){
				for(var i=0; i<= (this.mGetSushiArray.length-this.mResultMaisuuCounter -1); i++ ){
					this.mGetSushiArray[i].pSetResultScenePressRetrySaraAnim();
				}
			}
			this.mTweenMgr.pEntryPosAnim( this.mResultBordImageObj, this.mResultBordImageObj.mPosX, this.mResultBordImageObj.mPosY, 960+639, this.mResultBordImageObj.mPosY, 300);
			this.mTweenMgr.pEntryPosAnim( this.mResultKekkaTextImageObj, this.mResultKekkaTextImageObj.mPosX, this.mResultKekkaTextImageObj.mPosY, -450, this.mResultKekkaTextImageObj.mPosY, 400);	
			this.mCoveyorSpeedX	= -50;
			// 「記録更新」のスタンプ画像は画面外に出しておく
			this.mSpriteImageArray[10].mPosX	= OUT_OF_DISPLAY_X;
			this.mSpriteImageArray[11].mPosX	= OUT_OF_DISPLAY_X;

			this.SetFadeInFadeOutAnim( this.mBgImageArray[1], false);	// IMAGE_INDEX_BG_KEKKAをフェードアウト
			this.mSceneNo2++;
			break;
	
		case 1:
			if( this.mResultKekkaTextImageObj.mPosX == -450){
				this.mSceneNo2++;
			}
			break;
		case 2:
			this.mTweenMgr.pCancelAllAnimation();
			this.mGetSushiArray	= [];
			this.ChangeScenNo0(GAMEMAIN_SCENE_0_MOVE);
			break;
	
	}
}

//---------------------------------------------------------
//	リザルト画面 「ホームへ」ボタンが押された
//---------------------------------------------------------
cGameMain.prototype.GameMain_Result_PressHomeBtn	= function( ){

	switch( this.mSceneNo2 ){
		case 0:
			this.mTweenMgr.pCancelAllAnimation();

			this.mTweenMgr.pEntryPosAnim( this.mCommonSpriteImageArray[2], 5, 10, 15, 150, 200);
			this.mTweenMgr.pEntryScaleAnim( this.mCommonSpriteImageArray[2], 0.7, 1, 200);
			this.SetFadeInFadeOutAnim( this.mBgImageArray[1], false);	// IMAGE_INDEX_BG_KEKKAをフェードアウト
			this.mSceneNo2++
			break;

		case 1:
			if( this.mBgImageArray[1].mOpacity == 0){
				this.mGetSushiArray	= [];
				this.ChangeScenNo0( GAMEMAIN_SCENE_0_TOP );
			}
			break;
	}


}

//---------------------------------------------------------
//	リザルト画面中のボタン処理
//---------------------------------------------------------
cGameMain.prototype.GameMainResult_BtnProcess	= function( ){

	if( this.mTouchBtnType == "NONE"){
		return;
	}

	// 「結果発表」の画像が動いている間は、ボタンは押せない
	if( this.mResultKekkaTextImageObj.mPosX != 275 ){
		return;
	}

	switch( this.mTouchBtnType ){
		case "IMAGE_INDEX_BTN_HOME":
			public_StopSE("SE_COUNTING");
			public_StopSE("SE_RESULT");
			public_PlaySE("SE_PRESS_BTN");
			this.ChangeScenNo1( GAMEMAIN_SCENE_1_RESULT_PRESS_TOP );
			break;

		case "IMAGE_INDEX_BTN_RETRY":
			public_StopSE("SE_COUNTING");
			public_StopSE("SE_RESULT");
			public_PlaySE("SE_PRESS_BTN");
			this.ChangeScenNo1( GAMEMAIN_SCENE_1_RESULT_PRESS_RETRY );
			break;
	}
}




//=========================================================
//	ヘルプ画面
//=========================================================
cGameMain.prototype.GameMain_Scene0_Help	= function( ){

	switch( this.mTouchBtnType ){
		case "IMAGE_INDEX_BTN_HOME":
			this.ChangeScenNo0( GAMEMAIN_SCENE_0_BACKTOHOME );
			public_PlaySE("SE_PRESS_BTN");
			return;
		break;
	}

	switch( this.mSceneNo1 ){
		case 0:	this.GameMain_Help_Init();		break;
		case 1:	this.GameMain_Help_Main();		break;
	}

}

//---------------------------------------------------------
//	ヘルプ画面	初期化
//---------------------------------------------------------
cGameMain.prototype.GameMain_Help_Init	= function( ){
	this.ChangeImageAsset( this.mSceneNo0 );
	this.mSpriteImageArray[0].mPosX	= 0;
	this.mSpriteImageArray[0].mPosY	= 0;
	this.mPointOfReference			= 0;
	this.mSlideSpeed				= 0;
	this.mMousePosY_Old				= gMousePosY;

	// 広告枠は消す
//@	document.getElementById('AdFrameHome').style.visibility = "hidden";
//@	document.getElementById('AdFrameGame').style.visibility = "hidden";

	
	this.ChangeScenNo1( 1 );
}

//---------------------------------------------------------
//	ヘルプ画面	
//	ヘルプ画像のスワイプ処理
//---------------------------------------------------------
cGameMain.prototype.GameMain_Help_Main	= function( ){

	switch( this.mSceneNo2 ){
		case 0:
			// 画面タップ待ち スワイプしてた場合、慣性で多少動く
			this.mSpriteImageArray[0].mPosY += this.mSlideSpeed;
			this.mSlideSpeed	= this.mSlideSpeed / 1.3;	// 速度は徐々に減速

			// タッチされた
			if( this.mMousePressFlag == true){
				this.mSceneNo2	= 1;
				this.mPointOfReference		= gMousePosY;
				this.mHelpImage_StartPosY	= this.mSpriteImageArray[0].mPosY;
				this.mHelpStartSlideActionTime	= public_GetCurrentTime();
			}
			break;
			
		case 1:
			// 画面リリース待ち
			var OffsetY	= gMousePosY - this.mPointOfReference;
			this.mSpriteImageArray[0].mPosY	= this.mHelpImage_StartPosY + OffsetY ;

			// 画面から指が離された
			if( this.mMousePressFlag == false){
				this.mSceneNo2	= 0;

				// スワイプ動作だったら、慣性をつけて動かす
				var MouseYMoveSpeed	= public_GetMouseY_MoveSpeed();
				if( Math.abs(MouseYMoveSpeed) > 1){
					var TouchedTime		= public_GetCurrentTime() - this.mHelpStartSlideActionTime;
					this.mSlideSpeed	= OffsetY /TouchedTime * 50;
				}else{
					this.mSlideSpeed	= 0;
				}

			}
			break;
	}

	// ヘルプ画像 画面端判定
	if( this.mSpriteImageArray[0].mPosY < -(2880-640)){
		this.mSpriteImageArray[0].mPosY	= -(2880-640);
	}else if( this.mSpriteImageArray[0].mPosY > 0 ){
		this.mSpriteImageArray[0].mPosY	= 0;
	}

}




//=========================================================
// 
//=========================================================
cGameMain.prototype.MoveSushi	= function( ){

	for(var i=this.mSushiArray.length-1; i>=0;i--){
		this.mSushiArray[i].mPosX	+= this.mCoveyorSpeedX * public_GetFrameRate()/FRAME_RATE;
		this.mSushiArray[i].pUpdateSushiImagePos();
		if( this.mSushiArray[i].mPosX <= -300){
			this.mSushiArray.splice(i, 1);
		}
	}

	for( var i=0; i<this.RemoveNetaAnimRequest.length; i++){
		var tempSushiObj	= this.mGetSushiArray[this.RemoveNetaAnimRequest[i]];
		if( tempSushiObj.pCheck_GetSushiAnim_Exit() == true ){
			tempSushiObj.pRemoveSushiNetaAnim(this.RemoveNetaAnimRequest[i]);
			this.RemoveNetaAnimRequest.splice(i, 1);
			break;
		}
	}
}

//=========================================================
//	シーンの変更
//=========================================================
cGameMain.prototype.ChangeScenNo0	= function( _ScenNo0 ){

	this.mOldSceneNo0	= this.mSceneNo0;
	
	this.mSceneNo0	= _ScenNo0;
	this.mSceneNo1	= 0;
	this.mSceneNo2	= 0;
	this.mSceneNo3	= 0;
}

cGameMain.prototype.ChangeScenNo1	= function( _ScenNo1 ){
	
	this.mSceneNo1	= _ScenNo1;
	this.mSceneNo2	= 0;
	this.mSceneNo3	= 0;
}


//=========================================================
//	各シーンごとの画像データをセット
//=========================================================
cGameMain.prototype.ChangeImageAsset	= function( _ScenNo ){
	this.mBtnImageArray		= this.mBtnLayout[_ScenNo];
	this.mBgImageArray		= this.mBGLayout[_ScenNo];
	this.mSpriteImageArray	= this.mSpriteLayout[_ScenNo];
}

//=========================================================
// 
//=========================================================
cGameMain.prototype.SetFadeInFadeOutAnim	= function( _ImageObj, _Bool ){
	var StartOpacity	= 0;
	var EndOpacity		= 1;

	if( _Bool == false){
		StartOpacity	= 1;
		EndOpacity		= 0;
	}

	this.mTweenMgr.pEntryOpacityAnim( _ImageObj, StartOpacity, EndOpacity, 150);

}


//=========================================================
//	EOF
//=========================================================
