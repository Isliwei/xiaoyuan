//获取应用实例
const app = getApp()
Page({
  data: {
    windowHeight: '',//屏幕高度
    windowWidth: '',//屏幕宽度
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    //判断登陆状态
    var password = wx.getStorageSync('password');
    if (!password) {
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
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 退出登陆
   */
  quit:function(){
    wx.showModal({
      title: '提示',
      content: '是否退出当前账号',
      success(res) {
        if (res.confirm) {
          app.appdata.thename = null;
          app.appdata.theid = null;
          wx.removeStorage({
            key: 'password',
          })
          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})
