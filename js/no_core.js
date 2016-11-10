//-------------------------------------------------------------------------------------游戏非核心脚本


  var username;
  var APP_ID = 'e2rLuu1INqllK9LDacETyAtk-gzGzoHsz';
  var APP_KEY = 'pgIsLV4lEp2JQ8riAJbIFnOm';

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY

  });

  var saveData = function(name, score) {
    var Range = AV.Object.extend('Range');
    var range = new Range();
    range.set('name', String(name));
    range.set('score', String(score));
    range.save().then(function(data) {
      console.log('New object created with objectId: ' + range.id);
    }, function(error) {
      console.error('Failed to create new object, with error message: ' + range.message);
    });
  }

  var getData = function() {
    document.getElementById('rank_title').innerHTML = "请稍等......";
    var query = new AV.Query('Range');

    function compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    }

    function nameInArr(name, arr) {
      for (var j = 0, length2 = arr.length; j < length2; j++) {
        if (arr[j].name == name) {
          return true;
        }
      }
    }
    query.find().then(function(data) {
      var finalAlluser = [];
      var allUser = [];
      var finalStr = "";
      data.forEach(function(item) {
        allUser.push({
          name: item.attributes.name,
          score: item.attributes.score
        })
      });
      allUser.sort(compare('score'));
      for (var i = 0, length1 = allUser.length; i < length1; i++) {
        if (i === 0) {
          finalAlluser.push(allUser[0]);
        } else {
          if (!nameInArr(allUser[i].name, finalAlluser)) {
            finalAlluser.push(allUser[i]);
          }
        }
      }
      var k = 0 ;//只取前10名
      finalAlluser.forEach(function(item) {
        if (k<10) {
        	if (k<3) {
        		finalStr += "<strong><li>" + item.name + ":" + item.score + "</li></strong>";
        	}
        	else{finalStr += "<li>" + item.name + ":" + item.score + "</li>";}
        }
        k++;
      })
      document.getElementById("rank_title").innerHTML = "排行榜";
      document.querySelector('#rank_list ol').innerHTML = finalStr;
    })
  }
//---------------------------------------------------------------------------以上是排名系统
var pushword = document.getElementById("pushword");
var pushword_word = document.getElementById("pushword_word");
var login = document.getElementById("login");
window.addEventListener('load', function () {
	FastClick.attach(document.body);
}, false);
document.getElementById("rank_title").onclick = function(){
	var rc = document.getElementById("rank_content");
	if (rc.style.display != "none") {
		rc.style.display = "none";
	}
	else{
		getData();
		rc.style.display = "block";
	}
};
document.getElementById("go").onclick = function(){
	var name = document.getElementById("name").value;
	//var qq = document.getElementById("qq").value;
	if ( /*qq != "" &&*/ name != "" ){
		username = name;
		login.style.opacity = "0";
    document.getElementById('arcade').style.background='rgb(171, 171, 171)';
		setTimeout("login.style.zIndex = '-1'; ",500);

    
	}
	else{
		pw("请完成表单后开始游戏~");
	}
}
document.getElementById("pushword_ok").onclick = function(){
	pushword.style.display = "none";
}
function pw(a){
	var txt = a;
	pushword_word.innerHTML = txt;
	pushword.style.display = "block";
}