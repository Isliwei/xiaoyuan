const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theDetail_Id:null,//获取navigator传过来的_id
    detailArray:'',//该书本的详细信息
    type:'',//good、book
    windowHeight: '',//屏幕高度
    windowWidth: '',//屏幕宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断登陆状态
    var password = wx.getStorageSync('password');
    if(!password){
      wx.showModal({
        title: '提示',
        content: '请先登陆',
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../login/login',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,//屏幕高度
          windowWidth: res.windowWidth,//屏幕宽度
        })
      },
    })
    that.setData({
      theDetail_Id: options.ownId,
    })
    if (options.type=='book'){
      that.setData({
        ifshowgood:'none',
        ifshowbook:'inline-flex'
      })
    }else{
      that.setData({
        ifshowgood: 'inline-flex',
        ifshowbook: 'none'
      })
    }
    db.collection('ReleaseMess')
      .doc(that.data.theDetail_Id)
      .get({
          success:function(res){
            console.log(res)
            that.setData({
              detailArray:res.data
            })
          }
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
})