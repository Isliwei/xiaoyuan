var app = getApp();
const db = wx.cloud.database();
const _ = db.command;
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
    tempPath: null,//保存图片路径
    theid:'',//数据库自动生成的该用户 _id
    array: ['教科书','课外书', '考证资料', '其它'],//书本类型
    index: 0,
    items: [
      { name: '有', value: '有' },
      { name: '无', value: '无', checked: 'true' },
    ],
    theBook: null,//保存书本类型的值，而不是下标
    logs:'',//当前时间
    imgPath:'',//图片路径
    haveNotes:'',//笔记
    ifdel:1,//删除状态
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
     var abc = app.appdata.theid
     var thename = app.appdata.theid
     this.setData({
       theid:abc,
       thename:thename,
       logs: logs
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
   * 书本种类选择
   */
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 是否有笔记选择
   */
  radioChange(e) {
    var that = this;
    that.setData({
      haveNotes:e.detail.value
    })
  },
  /**
   * form提交事件
   */
  resBook:function(e){
    console.log(e)
    var that = this;
    var bk = that.data.array;//保存书本类型数组
    that.setData({
      theBook:bk[e.detail.value.bookKinds],
    })

    db.collection('ReleaseMess').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        theid:app.appdata.theid,//用户数据库自动生成的_id
        thename:app.appdata.thename,//发布者昵称
        goodsName: e.detail.value.bookName,//书名
        bookAuthor: e.detail.value.bookAuthor,//作者
        bookVersion: e.detail.value.bookVersion,//版本
        theKinds:that.data.theBook,//书本类型
        haveNotes: that.data.haveNotes,//笔记
        price:e.detail.value.bookprice,//出售价格
        otherMsg: e.detail.value.otherMsg,//书本其他信息
        contact: e.detail.value.contact,//联系方式
        imgPath: that.data.imgPath,//图片路径
        ifdel: that.data.ifdel,//是否时删除状态
        type:'book',
        time:that.data.logs//时间
      },
      success:function(res){
        wx.showToast({
          title: '已发出',
          duration:1000
        })
      }
  })
  }
})