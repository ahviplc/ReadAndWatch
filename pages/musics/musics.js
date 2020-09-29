var util = require('../../utils/util.js')
var app = getApp();
Page({
  // RESTFul API JSON
  // SOAP XML
  //粒度 不是 力度
  data: {
    oumei: {},
    huayu: {},
    riben: {},
    message: 'Hello MINA!',
    searchData:"",
  },

  onLoad: function (event) {
    var oumeiUrl = app.globalData.doubanBase + "/top/song?type=96";
    var huayunUrl = app.globalData.doubanBase + "/top/song?type=7";
    var ribenUrl = app.globalData.doubanBase  + "/top/song?type=8";
    console.log(oumeiUrl)
    console.log(huayunUrl)
    console.log(ribenUrl)
    // 改变message的值
    this.data.message = "我变了..."
    this.setData({
      message:  this.data.message
    })
    // this.getMusicListData(oumeiUrl, "oumei", "欧美新歌");
    // this.getMusicListData(huayunUrl, "huayu", "华语新歌");
    // this.getMusicListData(ribenUrl, "riben", "日本新歌");
  },

  // 先处理搜索
  getMusicListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
        console.log(res)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },

  // 搜索
  onBindBlur: function (event) {
    // var text = event.detail.value;
    console.log(this.data.searchData)
    var text = this.data.searchData;
    // 如果值为空 先写死 "海阔天空"
    if (text == ""){
      text = "海阔天空"
    }
    var searchUrl = app.globalData.doubanBase + "/search?keywords=" + text;
    console.log(searchUrl)
    this.data.message = '搜索成功'
    this.getMusicListData(searchUrl, "searchResult", "网易云音乐搜索");
  },

  //获取用户输入的搜索值 并写入 this.data.searchData
  searchDataInput: function (e) {
    this.setData({
      searchData: e.detail.value
    })
  },

  // 其实是网易云音乐 拿到的是音乐
  processDoubanData: function (MusicsDouban, settedKey, categoryTitle) {
    var musics = [];
    for (var idx in MusicsDouban.result.songs) {
      var subject =MusicsDouban.result.songs[idx];
      // title就是name
      var title = subject.name;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        mark: subject.mark,
        title: title,
        name: subject.name,
        artist: subject.artists[0].name,
        artistImg: subject.artists[0].img1v1Url,
        MusicId: subject.id
      }
      musics.push(temp)
    }
    console.log("==========================================")
    console.log(musics)
    console.log("==========================================")
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      Musics: musics
    }
    this.setData(readyData);
  }
})