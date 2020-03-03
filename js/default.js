//=========================================================
/*
	メイン制御
*/
//=========================================================
var CANVAS_WIDTH	= 960;
var CANVAS_HEIGHT	= 640;

var FRAME_RATE		= 35;
var DRAW_INTERVAL	= 1000/FRAME_RATE;

var IMAGE_LIST;

// 変数の定義
var gApplication;
var gCanvas;
var gContext;

var gFirstPlayFlag;

var gCurrentTime	= 0;

var gImagesArray	= new Array();
var gBgImage;
var gOldDrawTime	= 0;

var gGameMainObj;
var gSoundMgr;

var gImagesObjStacs	= new Array();
var gTextDateStacs	= new Array();


var gDisplayWidth	= 0;
var gDisplayHeight	= 0;

var gMousePosX	= 0;
var gMousePosY	= 0;
var gMousePosX_Old	= 0;
var gMousePosY_Old	= 0;

var gMouseDown	= false;
var gMouseUp	= false;

var gFrameRate	= 0;

var gMaisuuRecord		= 0;
var gKingakuRecord		= 0;


var gImagesArrayLength	= 0;

//=========================================================
// 一番最初に呼ばれる
// 初期化系の処理(画像系データのローディング等)
//=========================================================
function onload(){

	// ディスプレイサイズの保存(
	gDisplayWidth = document.documentElement.offsetWidth;
	gDisplayHeight = document.documentElement.offsetHeight;

	// クラスの実体化
	gSoundMgr		= new cSoundMgr();
	gGameMainObj	= new cGameMain();

	gImagesObjStacs	= [];
	gTextDateStacs	= [];

	gFirstPlayFlag	= false;

	CreateImageHashList();

	AppStart();
}

function AppStart() {
		// コンテキストの取得	document.getElementById(id);
//		gCanvas		= $("canvas");
		gCanvas		= document.getElementById("canvas");
		gContext	= gCanvas.getContext("2d");

		gSoundMgr.Init();

		// イメージの読み込み
		for( var key in IMAGE_LIST ){
			var tempImage		= new Image();
			tempImage.src		= IMAGE_LIST[key];
			gImagesArray[key]	 = tempImage;
			tempImage.onerror	= onImageError;
			gImagesArrayLength++;
		}

		gCanvas.onmousedown	= MouseDown;
		gCanvas.onmouseup	= MouseUp;
		gCanvas.onmousemove = MouseMove;

		//イメージのローディング状況のチェック
		Preload(gImagesArray,LoopMgr);

}

 //イメージ読み込み待ち
function Preload(images,onComplete) {
	var loadImages=function() {
		var count=0;
//		for(var i=0;i<gImagesArrayLength;i++) {
//			if(images[i].complete) count++;
//		}
		for(var key in images){
			if(images[key].complete) count++;
		}
		if (count<gImagesArrayLength) {
			setTimeout(loadImages,100);
		} else {
			onComplete();
		}
	};
	loadImages();
}

function CreateImageHashList(){
	IMAGE_LIST	= new Array();

	IMAGE_LIST["IMAGE_INDEX_BG"]				= "images/bg.png";
	IMAGE_LIST["IMAGE_INDEX_BG_HOME"]			= "images/bg_home.png";
	IMAGE_LIST["IMAGE_INDEX_BOARD_HELP"]		= "images/board_help.png";

	IMAGE_LIST["IMAGE_INDEX_BTN_HOME_SOUND"]	= "images/btn_home_sound.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_HOME_HOWTO"]	= "images/btn_home_howto.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_HOME_TWITTER"]	= "images/btn_home_twitter.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_HOME_FACEBOOK"]	= "images/btn_home_facebook.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_START"]			= "images/btn_start.png";

	IMAGE_LIST["IMAGE_INDEX_BTN_HOME"]			= "images/btn_home.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_RETRY"]			= "images/btn_retry.png";

	IMAGE_LIST["IMAGE_INDEX_LOGO"]			= "images/logo.png";

	IMAGE_LIST["IMAGE_INDEX_BTN_ITA1_TAMAGO"]	= "images/btn_ita1.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_ITA2_FUTOMAKI"]	= "images/btn_ita2.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_ITA3_IKA"]		= "images/btn_ita3.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_ITA4_TAKO"]		= "images/btn_ita4.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_ITA5_SALMON"]	= "images/btn_ita5.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_ITA6_EBI"]		= "images/btn_ita6.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_ITA7_MAGURO"]	= "images/btn_ita7.png";
	IMAGE_LIST["IMAGE_INDEX_BTN_ITA8_IKURA"]	= "images/btn_ita8.png";

	IMAGE_LIST["IMAGE_INDEX_CONVEYOR"]	= "images/conveyor.png";
	IMAGE_LIST["IMAGE_INDEX_ICON_TIME"]	= "images/icon_time.png";

	IMAGE_LIST["IMAGE_INDEX_BG_KEKKA"]			= "images/bg_kekka.png";
	IMAGE_LIST["IMAGE_INDEX_OKAIKEI_BORD"]		= "images/okaikei.png";
	IMAGE_LIST["IMAGE_INDEX_TXT_KEKKA"]			= "images/txt_kekka.png";
	IMAGE_LIST["IMAGE_INDEX_EFFEDT_KIRAKIRA"]	= "images/kirakira.png";
	IMAGE_LIST["IMAGE_INDEX_KIROKU_KOUSIN"]		= "images/lvup.png";
	IMAGE_LIST["IMAGE_INDEX_BOARD_STOP"]		= "images/board_stop.png";

	IMAGE_LIST["IMAGE_INDEX_SARA1_TAMAGO"]	= "images/sara1.png";
	IMAGE_LIST["IMAGE_INDEX_SARA2_FUTOMAKI"]= "images/sara2.png";
	IMAGE_LIST["IMAGE_INDEX_SARA3_IKA"]		= "images/sara3.png";
	IMAGE_LIST["IMAGE_INDEX_SARA4_TAKO"]	= "images/sara4.png";
	IMAGE_LIST["IMAGE_INDEX_SARA5_SALMON"]	= "images/sara5.png";
	IMAGE_LIST["IMAGE_INDEX_SARA6_EMI"]		= "images/sara6.png";
	IMAGE_LIST["IMAGE_INDEX_SARA7_MAGURO"]	= "images/sara7.png";
	IMAGE_LIST["IMAGE_INDEX_SARA8_IKURA"]	= "images/sara8.png";

	IMAGE_LIST["IMAGE_INDEX_SUSHI1_TAMAGO"]	= "images/sushi1.png";
	IMAGE_LIST["IMAGE_INDEX_SUSHI2_FUTOMAKI"]= "images/sushi2.png";
	IMAGE_LIST["IMAGE_INDEX_SUSHI3_IKA"]	= "images/sushi3.png";
	IMAGE_LIST["IMAGE_INDEX_SUSHI4_TAKO"]	= "images/sushi4.png";
	IMAGE_LIST["IMAGE_INDEX_SUSHI5_SALMON"]	= "images/sushi5.png";
	IMAGE_LIST["IMAGE_INDEX_SUSHI6_EMI"]	= "images/sushi6.png";
	IMAGE_LIST["IMAGE_INDEX_SUSHI7_MAGURO"]	= "images/sushi7.png";
	IMAGE_LIST["IMAGE_INDEX_SUSHI8_IKURA"]	= "images/sushi8.png";

	IMAGE_LIST["IMAGE_INDEX_AD_ICON1"]	= "http://app.iwww.jp/apps/hayaguisushi_android/img/homeicon1.png";
	IMAGE_LIST["IMAGE_INDEX_AD_ICON2"]	= "http://app.iwww.jp/apps/hayaguisushi_android/img/homeicon2.png";
	IMAGE_LIST["IMAGE_INDEX_AD_ICON3"]	= "http://app.iwww.jp/apps/hayaguisushi_android/img/homeicon3.png";
	IMAGE_LIST["IMAGE_INDEX_AD_ICON4"]	= "http://app.iwww.jp/apps/hayaguisushi_android/img/homeicon4.png";
	IMAGE_LIST["IMAGE_INDEX_AD_ICON5"]	= "http://app.iwww.jp/apps/hayaguisushi_android/img/homeicon5.png";
	IMAGE_LIST["IMAGE_INDEX_AD_ICON6"]	= "http://app.iwww.jp/apps/hayaguisushi_android/img/homeicon6.png";
	
	
	IMAGE_LIST["IMAGE_INDEX_HELP"]	="images/help.png";
}



//画像のローディングが失敗したときの処理(広告画像が読み込めなかった時の対策)
function onImageError(){
	// 失敗したときの処理
	this.src	= "/images/storelogo.png";
//@	Debug.writeln("onImageError");
}


//=========================================================
// ループの管理
// FRAME_RATEに応じた間隔でMainLoopを呼び出す
//=========================================================
function LoopMgr() {
	gCurrentTime=new Date().getTime();
	var DrawInterval	= gCurrentTime - gOldDrawTime;
//		Debug.writeln(DrawInterval);
	if ( DrawInterval >= DRAW_INTERVAL ) {
		gFrameRate	= 1000/DrawInterval;
		gOldDrawTime	= gCurrentTime;
		MainLoop();
	}
//@	window.msRequestAnimationFrame(LoopMgr);
	setTimeout("LoopMgr()",30);
}


//=========================================================
// ゲームのメインループ
//=========================================================
function MainLoop( ) {
	gGameMainObj.GameMainLoop();

	DrawProcess();
}


//=========================================================
// 画像データ 描画用のスタックに積む
//=========================================================
function public_StackImageObj( _ImageObj ) {
	gImagesObjStacs.push( _ImageObj );
}


//=========================================================
// テキストデータの描画用のスタックに積む
//=========================================================
function public_StackTextImage( _TextMassage, _PosX, _PosY, _Size, _Color, _Font ) {
	gTextDateStacs.push( new cTextDate( _TextMassage, _PosX, _PosY, _Size, _Color, _Font) );
}

//=========================================================
// 描画処理
//=========================================================
function DrawProcess( ) {

	// 画像データの描画
	// gImagesObjStacsの添字が大きいものほど、描画の優先順位が高い(必要があれば、z値を設定してソートする)
	for( var i=0; i<gImagesObjStacs.length; i++ ){
		gContext.globalAlpha	= gImagesObjStacs[i].mOpacity;
		gContext.drawImage(gImagesArray[gImagesObjStacs[i].mImageHashKey], Math.floor(gImagesObjStacs[i].mPosX), Math.floor(gImagesObjStacs[i].mPosY), Math.floor(gImagesObjStacs[i].mWidth*gImagesObjStacs[i].mScale), Math.floor(gImagesObjStacs[i].mHeight*gImagesObjStacs[i].mScale));	
	}

//	gContext.drawImage(gImagesArray["IMAGE_INDEX_BG"], 0, 0);

	// テキストの描画
	for( var i=0; i<gTextDateStacs.length; i++ ){
		gContext.font		= gTextDateStacs[i].mSize +"px 'ＭＳ Ｐゴシック'";
//		gContext.font		= gTextDateStacs[i].mSize +"px 'bold'";
		gContext.fillStyle	= gTextDateStacs[i].mColor;
		gContext.fillText(gTextDateStacs[i].mTextMassage, gTextDateStacs[i].mPosX, gTextDateStacs[i].mPosY);
	}


//	gContext.font		= tempSipze +"px 'ＭＳ Ｐゴシック'";
//	gContext.fillText("FPS.."+gFrameRate, 30, 500);

	// 次フレームのために空にしておく
	gImagesObjStacs	= [];
	gTextDateStacs	= [];

}

//=========================================================
//要素の取得
//=========================================================
function $(id) {
	return document.getElementById(id);
}

//=========================================================
//	マウスクリック(画面がタップ)された時の処理
//=========================================================
function MouseDown(event){

	UpdateMousePos( event );
//@	Debug.writeln("マウスが押された x="+gMousePosX, " y="+gMousePosY);

	gMouseDown	= true;

}
//=========================================================
//	マウスリリース(画面から指が離された)された時の処理
//=========================================================
function MouseUp(event){
	UpdateMousePos( event );
//@	Debug.writeln("マウスが離された x="+gMousePosX, " y="+gMousePosY);
	gMouseUp	= true;
}

//=========================================================
//	マウスが動いたときの処理
//=========================================================
function MouseMove(event){
	UpdateMousePos( event );
}


//=========================================================
//	マウスリリース(画面から指が離された)された時の処理
//=========================================================
function MSPointerUp(event){
	UpdateMousePos( event );
//@	Debug.writeln("マウスが離された x="+gMousePosX, " y="+gMousePosY);
	gMouseUp	= true;
}

//=========================================================
//	マウスが動いたときの処理
//=========================================================
function MSPointerMove(event){
	UpdateMousePos( event );
}


//=========================================================
//	マウス(というかポインタ)座標を、コンテンツ座標に変換
//=========================================================
function UpdateMousePos(event){
	// 前のフレームのポジションを保存しておく
	gMousePosX_Old= gMousePosX;
	gMousePosY_Old= gMousePosY;

	var tempMousePosX	=event.clientX;
	var tempMousePosY	=event.clientY;
/*
	var tempRatio	= CANVAS_HEIGHT / gDisplayHeight;
	var offSetX		= (gDisplayWidth - CANVAS_WIDTH / tempRatio) /2;

	gMousePosX	= (tempMousePosX - offSetX) * tempRatio;
	gMousePosY	= tempMOusePosY * tempRatio;
*/
	gMousePosX	= tempMousePosX;
	gMousePosY	= tempMousePosY;
	

//	console.log("gMousePosX.."+tempMousePosX +" gMousePosY..."+tempMOusePosY);
}

//=========================================================
//	canvas側から呼び出されるタッチ系の処理
//=========================================================
function public_GetMouseDownFlag(){
	return(gMouseDown);
}

function public_GetMouseUpFlag(){
	return(gMouseUp);
}

function public_ResetInputFlag(){
	gMouseDown	= false;
	gMouseUp	= false;
}

//=========================================================
//
//=========================================================
function public_GetCurrentTime(){
	return(gCurrentTime);
}

function public_GetMousePosY(){
	return(gMousePosX);
}

function public_GetMouseY_MoveSpeed(){
	return(gMousePosY -gMousePosY_Old);
}

//=========================================================
//最高獲得枚数
//=========================================================
function public_GetMaisuuRecord(){
	return(gMaisuuRecord);
}
function public_UpdateMaisuuRecord( _Value ){
	return;
	
	gMaisuuRecord	= _Value;
//@	gApplication.local.writeText("MAISUU_RECORD", String(gMaisuuRecord));
}

//=========================================================
//最高金額
//=========================================================
function public_GetKingakuRecord(){
	return(gKingakuRecord);
}
function public_UpdateKingakuRecord( _Value ){
	return;
	gKingakuRecord	= _Value;
//@	gApplication.local.writeText("KINGAKU_RECORD", String(gKingakuRecord));
}

function public_GetFrameRate( ){
	return( gFrameRate );
}

//=========================================================
//	twitter、facebookのページを開く(AppURLは仮)
//=========================================================
function public_OpenTwitterPage(){
	var TextData="[最高枚数："+gMaisuuRecord+"枚[最高金額："+gKingakuRecord+"円]早食い回転寿司\r\n";
	var AppUrl="https://www.google.co.jp/";
	var Url	= "https://twitter.com/intent/tweet?text=" + encodeURI(TextData) + AppUrl;
	window.open(Url, null);
}

function public_OpenFacebookPage(){
	var Url	= "http://www.facebook.com/sharer.php?u=http://www.google.co.jp/&amp;t=abc"
	window.open(Url, null);
}

//=========================================================
//	トップページの６つの広告画像がクリックされた時の処理
//=========================================================
function public_OpenAddLinkPage( _Index ){
	// gAddLinkはaddLinks.jsで定義
	var Url	= gAddLink[_Index];		
	window.open(Url, null);
}



//=========================================================
//	SE系
//=========================================================
function public_PlaySE( _SEType){

	if( _SEType == "SE_GET"){
		gSoundMgr.PlayGetSE();
	}else if(_SEType == "SE_PRESS_BTN"){
		gSoundMgr.PlayPressBtnSE();
	}else{
		gSoundMgr.PlaySE( _SEType );
	}
}

function public_StopSE( _SEType ){
	gSoundMgr.StopSE(_SEType );

}

function public_StopAllSE( ){
	gSoundMgr.StopAllSE( );
}

function public_ChangeSoundFlag( ){
	gSoundMgr.ChangeSoundFlag( );
}

function public_SetSoundFlag( _Bool ){
	gSoundMgr.SetSoundFlag( _Bool );
}

function public_GetSoundFlag( ){
	return(gSoundMgr.GetSoundFlag());
}

//=========================================================
//	初回起動かどうか
//=========================================================
function public_GetFirstPlayFlag( ){
	return(gFirstPlayFlag);
}

function public_ChangeFirstPlayFlag( ){
	gFirstPlayFlag	= false;
}



//=========================================================
//	EOF
//=========================================================
