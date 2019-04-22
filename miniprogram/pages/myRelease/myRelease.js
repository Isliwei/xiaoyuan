const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myRelArray:[],//保存我的发布
    ifshow:'none',//没有时的提示信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    db.collection('ReleaseMess')
      .where({
        theid: app.appdata.theid,
        ifdel: '1'
      })
      .get({
        success(res) {
          if (res.data.length > 0) {
            that.setData({
              myRelArray: res.data
            })
          } else {
            that.setData({
              ifshow: 'block'
            })
          }
        }
      }) 
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    console.log("下拉刷新")
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    db.collection('ReleaseMess')
      .where({
        theid: app.appdata.theid,
        ifdel: '1'
      })
      .get({
        success(res) {
          if (res.data.length > 0) {
            that.setData({
              myRelArray: res.data
            })
          } else {
            that.setData({
              ifshow: 'block'
            })
          }
          // 停止下拉动作  
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
        }
      }) 
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
   * 点击查看详情
   */
   /**
   * 点击按钮‘去看看’，跳转到详情页面
   */
  showDetail: function (e) {
    var ownId = e.currentTarget.dataset.ownid;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: "../showDetail/showDetail?type=" + type + "&ownId=" + ownId
    })
  },
  delThisMsg:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除后不可恢复哦',
      success(res) {
        if (res.confirm) {
          var index = e.currentTarget.dataset.index;
          var myRelArray = that.data.myRelArray;
          //移除列表中下标为index的项
          myRelArray.splice(index, 1);
          //更新列表的状态
          that.setData({
            myRelArray: myRelArray
          });
          //更新数据库显示状态
          db.collection('ReleaseMess').doc(e.currentTarget.dataset.doc_id).update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 ifdel 字段置为0
              ifdel: '0'
            },
            success(res) {
              wx.showToast({
                title: '已删除',
                duration:500
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})