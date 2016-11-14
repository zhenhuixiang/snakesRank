//------------------------------------------------------------------------------------------------------------------------------游戏核心脚本
var s;
var score;
var headX = 15,headY = 15,headL = 10;//snakes 单个块体的边长
var nodirection;
var direction;
var t1; //变量写在这里就可以保证 被清除了
var c = document.getElementById('canvas');
var head = c.getContext("2d");  //头部
head.fillstyle = "#000";
/*function cnvs_getCoordinates(e)
{
x=e.clientX;
y=e.clientY;
document.getElementById("xycoordinates").innerHTML="Coordinates: (" + x + "," + y + ")";
}
 
function cnvs_clearCoordinates()
{
document.getElementById("xycoordinates").innerHTML="";
}
//获取鼠标坐标*/
var score_num = document.getElementById("score_num");
var up = document.getElementById('up');
var right = document.getElementById('right');
var down = document.getElementById('down');
var left = document.getElementById('left');
//获取控制元素
function draw(){
	window.setTimeout(function(){
		window.clearInterval(t1);
	},50); 
	s = new Array();//蛇的身体 数组snake
	var food = {
		x:0,
		y:0
	};
	var  x,y,l=10;
	s.push({
		x:15,
		y:15
	});
	score_num.innerHTML = 0;
	//游戏初始化
	function drawFood(){
		var mrx = Math.random()*25;
		var mry = Math.random()*20;
		food = {
			x:Math.floor(mrx)*l+l/2,
			y:Math.floor(mry)*l+l/2
		};
		var foodResult = true;
		for (var i = 0; i < s.length ; i++) {
			if ( s[i].x == food.x && s[i].y == food.y) {
				foodResult = false;
				break;
			}
		}
		if (foodResult){
			head.beginPath();
			head.strokeStyle = 'rgba(255,0,0,1)';
			head.arc(food.x,food.y,3,0,Math.PI*2,true);// 画食物
			head.stroke();
		}else{
			drawFood(); //递归
		}
	}//画食物
	food.x = 125;
	food.y = 105;
	head.beginPath();
	head.strokeStyle = 'rgba(255,0,0,1)';
	head.arc(food.x,food.y,3,0,Math.PI*2,true);// 画食物
	head.stroke();

	
	function clearRect(x,y,a){
	var b=a/2;
	head.clearRect (x-b, y-b, a, a);
	}//清除尾部

	function rect(x,y,a){
	var b=a/2;
	head.fillRect (x-b, y-b, a, a);
	}//画一个单个块体

	rect(headX,headY,headL);//画出初始块体

	document.onkeydown = function (event){
		
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if ((e && e.keyCode == nodirection )|| ( e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 37)) { return 0 ;}// 如果输入相反方向则直接跳出
		window.clearInterval(t1);
		function go()
		{	
			if (s.length-5>0) {
				score = s.length-5
			} else{
				score = 0;
			}
			if (e && e.keyCode == 38) {
				s.unshift({
					x:s[0].x,
					y:s[0].y - l
				});	
				direction = "38";
				nodirection = "40";				
			}
			if (e && e.keyCode == 39) {
				s.unshift({
					x:s[0].x + l,
					y:s[0].y
				});	
				direction = "39";
				nodirection = "37";
			}
			if (e && e.keyCode == 40) {
				s.unshift({
					x:s[0].x,
					y:s[0].y + l
				});	
				direction = "40";
				nodirection = "38";
			}
			if (e && e.keyCode == 37) {
				s.unshift({
					x:s[0].x - l,
					y:s[0].y
				});	
				direction = "37";
				nodirection = "39";
			}
			
			if (s.length > 5){
				if (s[0].x == food.x && s[0].y ==food.y){
					drawFood();
					eatm();
					score_num.innerHTML = s.length-5;
				}
				else{
					clearRect(s[s.length - 1].x,s[s.length - 1].y,l);
					s.pop();
				}
			}


			for (var i = 1; i < s.length; i++) {
				if(s[i].x ==s[0].x && s[i].y == s[0].y){
					head.clearRect(0,0,250,200);
					endm();
					pw("game over! 你的得分是："+score);
					saveData(username, score);
					draw();
					nodirection = null;
					window.clearInterval(t1);
				}
			}
						
			if (s[0].x<0 || s[0].x>250 || s[0].y<0 ||s[0].y>200){
				head.clearRect(0,0,250,200);
				endm();
				pw("game over! 你的得分是："+score);
				saveData(username, score);
				draw();
				nodirection = null;
			}
			rect(s[0].x,s[0].y,l);
		}
		go();
		t1 = window.setInterval(go,300-s.length);//加速功能


	} //键盘事件 上下左右

	//手机端点击触发移动
	function move(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if ((e == nodirection )|| ( e != 38 && e != 39 && e != 40 && e != 37)) { return 0 ;}// 如果输入相反方向则直接跳出
			window.clearInterval(t1);
			function go()
			{	
				if (s.length-5>0) {
					score = s.length-5
				} else{
					score = 0;
				}
				if (e == 38) {
					s.unshift({
						x:s[0].x,
						y:s[0].y - l
					});	
					direction = "38";
					nodirection = "40";			
				}
				if (e == 39) {
					s.unshift({
						x:s[0].x + l,
						y:s[0].y
					});	
					direction = "39";
					nodirection = "37";
				}
				if (e == 40) {
					s.unshift({
						x:s[0].x,
						y:s[0].y + l
					});	
					direction = "40";
					nodirection = "38";
				}
				if (e == 37) {
					s.unshift({
						x:s[0].x - l,
						y:s[0].y
					});	
					direction = "37";
					nodirection = "39";
				}
				if (s.length > 5){
					if (s[0].x == food.x && s[0].y ==food.y){
						drawFood();
						eatm();
						score_num.innerHTML = s.length - 5 ;
					}
					else{
						clearRect(s[s.length - 1].x,s[s.length - 1].y,l);
						s.pop();
					}
				}

				for (var i = 1; i < s.length; i++) {
					if(s[i].x ==s[0].x && s[i].y == s[0].y){
						head.clearRect(0,0,250,200);
						endm();
						pw("game over! 你的得分是："+score);
						saveData(username, score);
						draw();
						nodirection = null;
						window.clearInterval(t1);
					}
				}					
				if (s[0].x<0 || s[0].x>250 || s[0].y<0 ||s[0].y>200){
					head.clearRect(0,0,250,200);
					endm();
					pw("game over! 你的得分是："+score);
					saveData(username, score);
					draw();
					nodirection = null;
				}
				rect(s[0].x,s[0].y,l);
			}
			go();
			t1 = window.setInterval(go,300-s.length);//加速功能


		} //点击事件 上下左右

	up.onclick = function(){
		move(38);
	};
	right.onclick =function(){
		move(39);
	};
	down.onclick = function(){
		move(40);
	};
	left.onclick =function(){
		move(37);
	};

}
draw();//开始游戏