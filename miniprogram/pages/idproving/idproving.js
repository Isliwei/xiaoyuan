const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noPassWarm:'',//验证是否通过提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  idproving:function(e){
    if (e.detail.value.name == '' || e.detail.value.tel == ''){
      this.setData({
        noPassWarm: '信息填写不完整'
      })
    }else{
    wx.cloud.callFunction({
      // 云函数名称
      name: 'idproving',
      // 传给云函数的参数
      data: {
        name: e.detail.value.name,
        tel:e.detail.value.tel
      },
      success: function (res) {
        console.log(res.result)
        if (res.result.data.length == 0) {
          wx.showToast({
            title: '验证失败',
            icon:'loading',
            duration:1500
          })
        }else if (res.result.data[0].name == e.detail.value.name) {
           wx.navigateTo({
             url: '../resetPass/resetPass',
           })
        } else if (res.result.data[0].name != e.detail.value.name) {
          wx.showToast({
            title: '昵称错误',
            icon: 'loading',
            duration: 1500
          })
        } 
      },
      fail(res){
        console.log(res.error)
      }
    })
    }
  }
})