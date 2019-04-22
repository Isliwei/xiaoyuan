const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    findArray:[],//保存搜索到的信息
    ifshow:'none',//查询结果提示信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if(options.type=='find'){
    db.collection('ReleaseMess')
      .where({
        goodsName: options.findthing,
        ifdel: '1'
      })
      .get({
        success(res) {
          if(res.data.length>0){
            that.setData({
              findArray: res.data
            })
          }else{
            that.setData({
              ifshow: 'block'
            })
          } 
        }
        })
    } else if (options.type == 'book'){
      db.collection('ReleaseMess')
        .where({
          type: options.type,
          ifdel: '1'
        })
        .get({
          success(res) {
            if (res.data.length > 0) {
              that.setData({
                findArray: res.data
              })
            } else {
              that.setData({
                ifshow: 'block'
              })
            }
          }
        })
    }else{
      db.collection('ReleaseMess')
        .where({
          type: options.type,
          ifdel: '1'
        })
        .get({
          success(res) {
            if (res.data.length > 0) {
              that.setData({
                findArray: res.data
              })
            } else {
              that.setData({
                ifshow: 'block'
              })
            }
          }
        })
    }
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
   * 点击按钮‘去看看’，跳转到详情页面
   */
  showDetail: function (e) {
    var ownId = e.currentTarget.dataset.ownid;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: "../showDetail/showDetail?type="+type + "&ownId=" + ownId
    })
  }
})