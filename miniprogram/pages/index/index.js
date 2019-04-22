var app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageWidth:'',//图片宽度
    imageHeight: '',//图片高度
    imgUrls:[
      '../../images/aaa.jpg',
      '../../images/aaa.jpg',
      '../../images/aaa.jpg'
    ],
    theid: null, //用户_id
    showMsg:[],//保存查询到的信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var abc = app.appdata.theid
    db.collection('ReleaseMess')
      .orderBy('time', 'desc')
      .where({
          type:'book',
          ifdel: '1'
      })
      .get({
          success(res) {
            console.log(res)
            console.log(res.data[0].goodsName)
            that.setData({
              theid: abc,
              showMsg:res.data
            })
          }
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    var that = this;
    var abc = app.appdata.theid
    console.log("下拉刷新")
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    db.collection('ReleaseMess').where({
      type: 'book',
      ifdel: '1'
    })
      .orderBy('time', 'desc')
      .get({
        success(res) {
          console.log(res)
          that.setData({
            theid: abc,
            showMsg: res.data 
          })
          // 停止下拉动作  
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
        }
      }) 
   
  },
  /***
   * 查询物品
   */
  getfind:function(e){
      var that = this;
      var findthing = e.detail.value;
      that.setData({
        findthing: e.detail.value
      });   
  },
  /***
   * 搜索物品
   */
  findThings:function(e){
    var that = this;
    if (that.data.findthing) {
      wx.navigateTo({
        url: '../search/search?type=find&findthing=' + that.data.findthing
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  imageLoad:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var winHei = wx.getSystemInfoSync().windowHeight; //获取当前屏幕的高度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px";
    //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度 
      imageHeight: swiperH//设置高度
    })
  },
  /**
   * 点击按钮‘去看看’，跳转到详情页面
   */
  showDetail:function(e){
    console.log(e)
    var ownId = e.currentTarget.dataset.ownid;
    var type = e.currentTarget.dataset.type;
    
    wx.navigateTo({
      url: "../showDetail/showDetail?ownId=" + ownId+"&type=" + type
    })
  },
  /**
   * 点击按钮‘物品’
   */
  searchbook:function (e) {
    var that = this;
    db.collection('ReleaseMess')
      .orderBy('time', 'desc')
      .where({
        type: 'good',
        ifdel:1
      })
      .get({
        success(res) {
          console.log(res)
          that.setData({
            theid: abc,
            showMsg: res.data
          })
        },
      })
  }
})