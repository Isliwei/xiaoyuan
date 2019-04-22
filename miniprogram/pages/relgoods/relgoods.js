// pages/relgoods/relgoods.js
const app = getApp();
const db = wx.cloud.database();
//时间
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var h = now.getHours();
var m = now.getMinutes();
var s = now.getSeconds();
if (month < 10) {
  month = '0' + month;
};
if (day < 10) {
  day = '0' + day;
};
if (h < 10) {
  h = '0' + h;
};
if (m < 10) {
  m = '0' + m;
};
if (s < 10) {
  s = '0' + s;
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: '',//手机屏幕高度
    imgPath: '',//图片路径
    ifdel:1,//删除状态、0则为删除
    logs: '',//当前时间
    array: ['日用品', '其它'],//书本类型
    index: 0,
    theGood: null,//保存物品类型的值，而不是下标
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
    var logs = year + '-' + month + '-' + day + '' + h + ':' + m + ':' + s;//当前时间
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 高度 单位为px
        that.setData({
          windowHeight: res.windowHeight,
          logs:logs
        })
      }
    })
  },
  /**
  * 添加图片
  */
  addImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imgPath: tempFilePaths[0],
        })
      },
    })
  },
  /**
   * 物品种类选择
   */
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * form提交事件
   */
  resBook: function (e) {
    console.log(e)
    var that = this;
    var bk = that.data.array;//保存书本类型数组
    that.setData({
      theGood: bk[e.detail.value.goodsKinds],
    })
    db.collection('ReleaseMess').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        theid: app.appdata.theid,//用户数据库自动生成的_id
        thename: app.appdata.thename,//发布者昵称
        goodsName: e.detail.value.goodsName,//名称
        price: e.detail.value.price,//出售价格
        otherMsg: e.detail.value.otherMsg,//描述信息
        contact: e.detail.value.contact,//联系方式
        imgPath: that.data.imgPath,//图片路径
        type: 'good',
        theKinds: that.data.theGood,//种类
        time: that.data.logs,//时间
        ifdel:that.data.ifdel,//是否时删除状态
      },
      success: function (res) {
        wx.showToast({
          title: '已发出',
          duration: 1000
        })
      }
    })
  }
})