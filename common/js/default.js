/*----------------------------------------------
変数宣言 初期値設定
------------------------------------------------*/
var staffN = 0;
var staff = [
				"NAOTO TAKEUCHI",
				"AKINORI KATO",
				"JUNICHI FUJISAWA",
				"KOJI ITABA",
				"ARISA MUKAIDA",
				"RIEKO ERA",
				"ERIKA IGARASHI",
				"FUMIAKI YOKOI",
				"MARIKO HORIE",
				"YUTAKA MORIYA",
				"HIROTAKA ITO",
				"SACHIE SAKASAI",
				"YUICHI KOBAYASHI",
				"KEITARO ISHIYA",
				"YUMI OIKAWA",
				"TOMOAKI SATOYAMA",
				"KENTA KOUWAKI",
				"AKIKA UEHARA",
				"YUSUKE YAMASHITA",
				"KENTA SUGIYAMA",
				"RUMI SAKATA",
				"YUYA FUJISHIRO",
				"REIMI CHIBA"
				];

var colorNo = Math.floor(Math.random() * 2);
var colorAry = [
					["rgba(255, 255, 255, 1 )", "rgba(255, 88, 0, 1 )", "rgba(161, 211, 24, 1 )", "#2B2E00"],
					["rgba(255, 255, 255, 1 )", "rgba(138, 219, 255, 1 )", "rgba(2, 122, 187, 1 )", "#0C255C"]
				]
var canvas;
var ctx;
var size = 1300;
var rad = size * 0.38;
var rad2 = size * 0.25;
var lineW = 100;
var lineW2 = 80;

var centerX = size * 0.5;
var centerY = size * 0.5 + 40;

var count = 0;
var sec = 60;
var angle = 0;
var recordSec = 0;
var loop;
var isCount = false;
var start;
var now;
var pastMilli;
var staffN = 0;

var audioCheck;
var audioFinish;
var isHalf = false;
var isTen = false;
var isFinish = false;

/*----------------------------------------------
初期化処理
------------------------------------------------*/
$(document).ready(init);

function init(){
	var col = colorAry[colorNo][3];
	$("body").css({"background": col});
    $("#seconds").css({"background": col});
	canvas = document.getElementById("canvas");
	wrapper = document.getElementById("wrapper");
	start = new Date();
	
	if (canvas.getContext){
		ctx = canvas.getContext('2d');
		draw();
	}
	
	window.addEventListener("resize", resizeHandler, false); 
	resizeHandler();
	
	$("#start_btn").click(clickHandler);
	$("#reset_btn").click(resetHandler);
	
	$("#present_name").click(function(){
											staffN--;
											changeName();
										});
	$("#next_name").click(function(){
											staffN++;
											changeName();
										});
	
	resetHandler();
	changeName();
	audioCheck = document.getElementById("audioCheck");
	audioFinish = document.getElementById("audioFinish");
	//audioFinish.volume = 0.5;
	/*
	$("#seconds").change(function () {
									sec = Number($(this).val());
									alert("CHANGE");
								}).change();
								//*/
}


/*----------------------------------------------
Start / Stop 制御
------------------------------------------------*/
function clickHandler(){
	if(isCount){
		isCount = false;
		window.clearInterval(loop);
		$("#start_btn").text("START");
		//sec = Number($("#time").text());
		recordSec = pastMilli;
	}
	else{
		isCount = true;
		start = new Date();
		loop = window.setInterval(function() { draw(); }, 30);
		$("#start_btn").text("STOP");
		audioCheck.play();
	}
}

/*----------------------------------------------
Start / Stop 制御
------------------------------------------------*/
function resetHandler(){
	recordSec = 0;
	pastMilli = 0;
	isHalf = false;
	isTen = false;
	isFinish = false;
	isCount = true;
	clickHandler();
	start = new Date();
	draw();
	sec = Number($("#seconds").val());
	$("#time").text(String(sec));
}

/*----------------------------------------------
リサイズ時の処理
------------------------------------------------*/
function resizeHandler(){
	canvas.width = size;
	canvas.height = size;
//	centerX = $(wrapper).width() * 0.5;
//	centerY = $(wrapper).height() * 0.5;
	var half = -centerX;
	$(canvas).css({
				"margin-left": half,
				"margin-top": 0
				}
				);
	$("#time").css({
				"margin-top": centerY - 160
				}
				);
	start = new Date();
	draw();
}



/*----------------------------------------------
線の描画
------------------------------------------------*/
function draw(){
	secAngle();
		
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0, 0, $(wrapper).width(), $(wrapper).height());
	
	ctx.strokeStyle = colorAry[colorNo][0];
	ctx.lineWidth = lineW;
	ctx.beginPath();
	ctx.arc(centerX, centerY, rad, 0, 360 * Math.PI / 180, false);
	ctx.stroke();
	
	ctx.lineWidth = lineW2;
	ctx.beginPath();
	ctx.arc(centerX, centerY, rad2, 0, 360 * Math.PI / 180, false);
	ctx.stroke();
	
	/*--- 外円 ---*/
	ctx.strokeStyle = colorAry[colorNo][1];
	ctx.lineWidth = lineW;
	//_ctx.lineJoin = "round";
	//_ctx.lineCap = "round";
	
	ctx.beginPath();
	ctx.arc(centerX, centerY, rad, -90 * Math.PI / 180, angle, false);
	ctx.stroke();
	
	/*--- 内円 ---*/
	ctx.strokeStyle = colorAry[colorNo][2];
	ctx.lineWidth = lineW2;
	ctx.beginPath();
	ctx.arc(centerX, centerY, rad2, 0, 360 * Math.PI / 180, false);
	ctx.stroke();
	
	$("#debug").text("");
}

/*----------------------------------------------
秒数をカウントして角度を計算
------------------------------------------------*/
function secAngle(){
	now = new Date();
	pastMilli = recordSec + now.getTime() - start.getTime();
	var past = parseInt(pastMilli / 1000);
	
	var secText = sec - past;
	$("#time").text(String(secText));
	angle = (pastMilli / sec / 1000 - 0.25) * 2 * Math.PI;
	
	if(angle > Math.PI / 2){
		if(!isHalf){
			isHalf = true;
			audioCheck.play();
		}
	}
	if(secText == 10){
		if(!isTen){
			isTen = true;
			audioCheck.play();
		}
	}
	if(secText == 0){
		if(!isFinish){
			isFinish = true;
			audioFinish.play();
		}
	}
}


/*----------------------------------------------
スタッフの名前を変える
------------------------------------------------*/
function changeName(){
	if(staffN < 0){
		staffN = staff.length - 1;
	}
	else if(staffN > staff.length - 1){
		staffN = 0;
	}
	var nextN = staffN + 1;
	if(nextN > staff.length - 1){
		nextN = 0;
	}
	$("#present_name").text(staff[staffN]);
	$("#next_name").text(staff[nextN]);
}