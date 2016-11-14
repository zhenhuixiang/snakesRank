var game_launch_url = 'http://snake.cugapp.com/';
var game_url = game_launch_url + 'snakes.html';
var game_news_url = '';
var timeline_cover_thumbnail_url = 'https://placeholdit.imgix.net/~text?w=500&h=500';

var url_now = new Url;
var openid = url_now.query.openid;
var openid_from = url_now.query.openid_from;
var menu_from = url_now.query.menu_from;
var from = url_now.query.from;
var isappinstalled = url_now.query.isappinstalled;

var wxappid_token = '35ea8bf166f7395529b2876896c5bc26';
var current_url = window.location.href;
var current_url_encoded = encodeURIComponent(current_url);
var jssdk_url_base = 'http://thirdapp.pointstone.org/backend/wechattool/getJssdkConfiginfo';
var jssdk_url = jssdk_url_base + '?wxappid_token=' + wxappid_token + '&url=' + current_url_encoded;
var jssdk_with_user_url = jssdk_url + '&openid=' + openid + '&openid_from=' + openid_from;

var appname = 'snake';
var addOneFriendRelationship_url_base = 'http://thirdapp.pointstone.org/backend/wechattool/addOneFriendRelationship';
var addOneFriendRelationship_url = addOneFriendRelationship_url_base + '?wxappid_token=' + wxappid_token + '&appname=' + appname + '&openid=' + openid + '&openid_from=' + openid_from;

// ?wxappid_token=6d0c2144850c8825ce713c0f6d2633e0&appname=game&openid=or4ZNs6WYSbzU4xyF9hZzKcfgrIE
var listMyFriend_url_base = 'http://thirdapp.pointstone.org/backend/wechattool/listMyFriend';
var listMyFriend_url = listMyFriend_url_base + '?wxappid_token=' + wxappid_token + '&appname=' + appname + '&openid=' + openid;

var userinfo_url_base = 'http://thirdapp.pointstone.org/backend/wechattool/getUserinfoByOpenid';
var userinfo_url = userinfo_url_base + '?wxappid_token=' + wxappid_token + '&openid=' + openid;
var userinfo_from_url = userinfo_url_base + '?wxappid_token=' + wxappid_token + '&openid=' + openid_from;

var work_url = game_url + '?openid_from=' + openid;
var work_url_encoded = encodeURIComponent(work_url);
var game_from_url = game_launch_url + '?work_url=' + work_url_encoded;

var work_url_MenuShareAppMessage = game_url + '?openid_from=' + openid + '&menu_from=ShareAppMessage';
var work_url_MenuShareAppMessage_encoded = encodeURIComponent(work_url_MenuShareAppMessage);
var game_from_url_MenuShareAppMessage = game_launch_url + '?work_url=' + work_url_MenuShareAppMessage_encoded;

var work_url_MenuShareTimeline = game_url + '?openid_from=' + openid + '&menu_from=ShareTimeline';
var work_url_MenuShareTimeline_encoded = encodeURIComponent(work_url_MenuShareTimeline);
var game_from_url_MenuShareTimeline = game_launch_url + '?work_url=' + work_url_MenuShareTimeline_encoded;

function print_info(info) {
    var html_str = '<p>' + info + '</p>';
    $('#test_info').append(html_str);
}


$(document).ready(function() {

    $.ajax({
        url: jssdk_with_user_url,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        beforeSend: function(xhr) {
            // xhr.withCredentials = true;
        },
        success: function(data, status, xhr) {
            // alert(jssdk_with_user_url);
            // alert(JSON.stringify(data));
            //print_info('jssdk_load_ok');

            var jssdk_info_obj = data;

            wx.config({
                debug: false,
                appId: jssdk_info_obj.data.jssdk_config_info.appid,
                timestamp: jssdk_info_obj.data.jssdk_config_info.timestamp,
                nonceStr: jssdk_info_obj.data.jssdk_config_info.noncestr,
                signature: jssdk_info_obj.data.jssdk_config_info.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'hideOptionMenu',
                    'showMenuItems',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ]
            });
            // 保证是有openid信息的
            // 不保证有昵称
            if (jssdk_info_obj.data.all_data_userinfo.status == 'ok') {
                var userinfo = jssdk_info_obj.data.all_data_userinfo.data.userinfo;
                //print_info('load_userinfo_ok');
                var headimgurl = userinfo.headimgurl;
                var nickname = userinfo.nickname;
                // var title_1 = nickname + ' fromMenuShareAppMessage';
                // var title_2 = nickname + ' fromMenuShareTimeline';
                var title = nickname + '邀请您参加贪吃蛇争霸赛！';
                wx.ready(function() {

                    wx.hideOptionMenu();
                    wx.showMenuItems({
                      menuList: [
                        'menuItem:share:appMessage', //
                        'menuItem:share:timeline',// 分享到朋友圈
                    	'menuItem:share:weiboApp',
                 	    'menuItem:share:QZone',
                 	    'menuItem:share:qq'

                      ],
                      success: function (res) {
                      },
                      fail: function (res) {
                        alert(JSON.stringify(res));
                      }
                    });

                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: "嘿，快来和我一起争夺霸主,我可是夺冠热门哦~",
                        link: game_from_url_MenuShareAppMessage,
                        imgUrl: headimgurl,
                        trigger: function(res) {
                            // alert(game_from_url_MenuShareAppMessage);
                        },
                        success: function(res) {},
                        cancel: function(res) {},
                        fail: function(res) {}
                    });
                    
                    wx.onMenuShareTimeline({
                        title: title,
                        link: game_from_url_MenuShareTimeline,
                        imgUrl: headimgurl,
                        trigger: function(res) {
                            // alert(game_from_url_MenuShareTimeline);
                        },
                        success: function(res) {},
                        cancel: function(res) {},
                        fail: function(res) {}
                    });
                    wx.onMenuShareQQ({
					    title: title, // 分享标题
					    desc: '嘿，快来和我一起争夺霸主,我可是夺冠热门哦~', // 分享描述
					    link: 'http://snake.cugapp.com/snakes.html', // 分享链接
					    imgUrl: headimgurl, // 分享图标
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					       // 用户取消分享后执行的回调函数
					    }
					});
					wx.onMenuShareWeibo({
					    title: title, // 分享标题
					    desc: '嘿，快来和我一起争夺霸主,我可是夺冠热门哦~', // 分享描述
					    link: 'http://snake.cugapp.com/snakes.html', // 分享链接
					    imgUrl: headimgurl, // 分享图标
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
					});
					wx.onMenuShareQZone({
					    title: title, // 分享标题
					    desc: '嘿，快来和我一起争夺霸主,我可是夺冠热门哦~', // 分享描述
					    link: 'http://snake.cugapp.com/snakes.html', // 分享链接
					    imgUrl: headimgurl, // 分享图标
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
					});


                });
                
            }
        },
        error: function(xhr, status, error) {

        }
    });

});
