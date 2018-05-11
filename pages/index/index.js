//index.js
let getNowtime=require('../../utils/getNowDate.js');

Page({
  data: {
    
  },
 
  submitTest (e){
    let formId=e.detail.formId; //formId在真机上才能获取
    let accessToken = '9_q0ET_7PAf-kWdkNWz0RniQzO5kyq8YsftfNVBMiJN7F3TV85H8pAszGA-EE8CE3PrFuF_Z6PIp_fNV-oiYYcQ85fdkzD15b5FixMmJUjXTKAY5LAXHBAGeotMeAAAGZD'; //填写你自己的access_token，
    let accessTokenUrl = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${accessToken}`;
   
   let jsonData={
     touser: wx.getStorageSync('user').openid,
     template_id: 'dXmMWIB8234O8h12vZ6VGLwer54DB61zygatR-iul_nw', //填写你自己的模板ID
     form_id: formId, 
     page: 'pages/index/index',
     data: {
      "keyword1": { 
        "value": "33224541",
        "color": "#444" 
      },
      "keyword2": { 
        "value": "1000.00元", 
         "color": "#444" 
      },
      "keyword3": { 
        "value": getNowtime.formatTime(new Date()), 
        "color": "#444" 
      },
      "keyword4": { 
        "value": "聚怡花园7-10", 
        "color": "#444" 
      },
     },
     color: '#ccc', 
     emphasis_keyword: 'keyword1.DATA'  
   };


   wx.request({
     url: accessTokenUrl,
     data: jsonData,
     method: 'POST',  
     success(res) {
       console.log('成功', res);
     },
     fail (err) {
       console.log('失败 ', err);
     }

   })

  },


  onLoad () {
    
    let appId = 'wx465a7sdfwerqw31';  //填写你自己的AppID
    let appSecret = '711f2cafdbf1ae2246671105519924dd6c29';  //填写你自己的AppSecret 

    //获取openid  
    let user = wx.getStorageSync('user') || {};
    if (!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) { //不要在30天后才更换openid-尽量提前10分钟更新  
      wx.login({
        success: function (res) {
          var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${res.code}&grant_type=authorization_code`;
          wx.request({
            url: url,
            data: {},
            method: 'GET',
            // header: {}, // 设置请求的 header  
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid; //openid
              obj.expires_in = Date.now() + res.data.expires_in;

              wx.setStorageSync('user', obj);//存储openid  
            }
          });
        }
      });
    } else {
      console.log(user);
    }  
  }
})