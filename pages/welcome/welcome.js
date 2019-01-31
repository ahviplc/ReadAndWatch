Page({

  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    userInfo: {},
    genderSex:''
  },
    onTap: function (event) {
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        
        wx.switchTab({
            url: "../posts/post"
        });       
    } ,

    onLoad:function(event){ 
      var that = this;
      wx.getUserInfo({
        lang: "zh_CN",
        withCredentials:false,
        success: function (res) {

          var userInfo = res.userInfo

          // var nickName = userInfo.nickName
          // var avatarUrl = userInfo.avatarUrl
          // var gender = userInfo.gender //性别 0：未知、1：男、2：女
          // var province = userInfo.province
          // var city = userInfo.city
          // var country = userInfo.country

          console.log("---onLoad---")

          that.setData({
            userInfo: userInfo
          })

          switch (res.userInfo.gender) {
            case 0:
              that.setData({
                genderSex: '未知'
              })
              break;
            case 1:
              that.setData({
                genderSex: '男'
              })
              break;
            case 2:
              that.setData({
                genderSex: '女'
              })
              break;
          }  
         
        },
         fail: function () {
          // fail  
          console.log("获取用户信息失败！")
          that.setData({
            userInfo: null
          })
         },
          complete: function () {
          // complete  
          console.log("获取用户信息执行完成！")
        }  
      }
      )
         
     }


    ,
    onReady:function(event){
      console.log("---onReady---")
    }

})