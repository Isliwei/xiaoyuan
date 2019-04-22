var app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: null,//手机号
    password: null,//密码
    ifRegistered:'',//判断是否已注册1，否则0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tel = wx.getStorageSync('tel');
    var password = wx.getStorageSync('password');

    console.log(tel);
    console.log(password);
    if (tel) {
      this.setData({ tel: tel });
    }
    if (password) {
      this.setData({ password: password });
    }
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  /**
   * 登录验证
   */
  loginform: function (e) {
    var that = this;
    db.collection('UsersMess').where({
      tel:e.detail.value.tel
    }).count({
      success(res) {
        console.log(res)
        that.setData({
          ifRegistered: res.total,
          tel:e.detail.value.tel,
          password: e.detail.value.password
        })
        if (that.data.ifRegistered != 1) {
          wx.showToast({
            title: '该用户尚未注册\n请先注册',
            icon: 'none',
            duration: 2000
          })
        } else {
          db.collection('UsersMess').where({
            tel: that.data.tel
          }).get({
            success(res) {
              if (that.data.password != res.data[0].password){
                wx.showToast({
                  title: '密码错误',
                  icon: 'loading',
                  duration:1200
                })
              }else{
                //登陆成功则保存该用户的_id到全局
                app.appdata.theid = res.data[0]._id,
                app.appdata.thename = res.data[0].name

                wx.setStorageSync('tel', that.data.tel);
                wx.setStorageSync('password', that.data.password);

                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        }
      },
    })
  },
})