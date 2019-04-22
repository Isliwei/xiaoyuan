const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pass:'',//新密码
    pass2: '',//确认密码
    warmtext:'',//错误提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  changePass:function(e){
    var that = this;
    console.log(e.detail.value)
    that.setData({
      pass:e.detail.value.pass,
      pass2:e.detail.value.pass2
    })
    if (e.detail.value.pass != e.detail.value.pass2){
      that.setData({
         warmtext:'密码不一致，请重新输入'
       })
    }else{
      that.setData({
        warmtext: '',
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'resetpass',
        // 传给云函数的参数
        data: {
          newpass: e.detail.value.pass2,
        },
        success: function (res) {
          if (res.result.stats.updated == 1){
             wx.showToast({
               title: '密码已更新',
               duration:2000
             })
          }
        },
        fail: console.error
      })
  }
  },
})