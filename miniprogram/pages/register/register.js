var app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var timestamp = Date.parse(new Date());
//返回当前时间毫秒数
timestamp = timestamp / 1000;
//获取当前时间
var n = timestamp * 1000;
var date = new Date(n);
//年
var Y = date.getFullYear();
//月
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
//时
var h = date.getHours();
if (h < 10) {
  h = '0' + h
}
//分
var m = date.getMinutes();
if (m < 10) {
  m = '0' + m
}
//秒
var s = date.getSeconds();
if (s < 10) {
  s = '0' + s
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    multiArray: [['竹园', '康园', '松园', '桂园', '梅园', '榕园'], ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '竹园'
        },
        {
          id: 1,
          name: '康园'
        },
        {
          id: 2,
          name: '松园'
        },
        {
          id: 3,
          name: '桂园'
        },
        {
          id: 4,
          name: '梅园'
        },
        {
          id: 5,
          name: '榕园'
        }
      ], [
        {
          id: 0,
          name: '1栋'
        },
        {
          id: 1,
          name: '2栋'
        },
        {
          id: 2,
          name: '3栋'
        },
        {
          id: 3,
          name: '4栋'
        },
        {
          id: 4,
          name: '5栋'
        },
        {
          id: 5,
          name: '6栋'
        },
        {
          id: 6,
          name: '7栋'
        },
        {
          id: 7,
          name: '8栋'
        },
        {
          id: 8,
          name: '9栋'
        },
        {
          id: 9,
          name: '10栋'
        },
        {
          id: 10,
          name: '11栋'
        },
        {
          id: 11,
          name: '12栋'
        },
        {
          id: 12,
          name: '13栋'
        },
        {
          id: 13,
          name: '14栋'
        }

      ]
    ],
    multiIndex: [0, 0], 
    logs:'',//保存当前时间
    password:'',//保存第一次密码
    password2: '',//保存确认密码
    nameIconIfShow: 'none',//输入不符合要求ICON隐藏，符合要求ICON显示
    telIconIfShow:'none',//同上
    passIconIfShow: 'none',//同上
    pass2IconIfShow: 'none',//同上
    addressIconIfShow: 'none',//同上
    passTips:'请再次填写密码',//密码提示
    passTipsStyle:'',//密码提示字体颜色
    addressFontStyle: '',//地址字体颜色
    addressTipsStyle: '',//地址提示字体颜色
    errMess:'',//错误提示
    ifsubmit:'submit',
    address:'',//住址
    name: '',//昵称
    tel:'',//手机号
    windowWidth: '',//屏幕宽度
    windowHeight:'',//屏幕高度
    phone: '',//手机型号
    ifchooseAddr:''//是否选择了地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(xyzz)
    var that = this;
    //获取手机屏幕的宽度和高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          phone: res.model,//手机型号
          windowWidth: res.windowWidth,//屏幕宽度
          windowHeight: res.windowHeight,//屏幕高度
        })  
      },
    })
    this.setData({
      logs: Y + "/" + M + "/" + D +' '+ h + ":" + m + ":" + s
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
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
  bindMultiPickerChange(e) {
    console.log('用户点击确定，picker选中值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      addressIconIfShow: 'block',//选择地址，显示
      addressTipsStyle: '',//地址提示字体灰色
      addressFontStyle: '#000000',//地址字体变为黑色
      ifchooseAddr: 1,//是否选择了地址
      errMess: '',//错误提示,无
      btncolor: '#32CD32',//按钮变为绿色
    })
  },
  bindMultiPickerCancel(e){
    console.log('用户点击取消！')
    this.setData({
      addressIconIfShow: 'none',//没选择地址，隐藏
      addressTipsStyle:'#FF0000',//地址提示字体变为红色
      ifchooseAddr: 0,//是否选择了地址
      btncolor: '#CCCCCC',//按钮变为灰色
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋', '7栋', '8栋', '9栋', '10栋']
            break
          case 1:
            data.multiArray[1] = ['1栋', '2栋']
            break
          case 2:
            data.multiArray[1] = ['1栋', '2栋', '3栋']
            break
          case 3:
            data.multiArray[1] = ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋']
            break
          case 4:
            data.multiArray[1] = ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋']
            break
          case 5:
            data.multiArray[1] = ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋', '7栋', '8栋', '9栋', '10栋', '11栋', '12栋', '13栋', '14栋']
            break
        }
        data.multiIndex[1] = 0
        break
    }
    console.log(data.multiIndex)
    this.setData(data)
  },
   /*
  *获取，验证昵称
  */
  getId:function(e){
    this.setData({
      theName: e.detail.value,
    })
    var nameLength = e.detail.value.length;//获取输入长度
    if (nameLength >= 3 && nameLength <= 5){
      this.setData({
        nameIconIfShow: 'block',//符合要求，显示
        errMess: '',//错误提示,无
        btncolor: '#32CD32',//按钮变为绿色
      })
    }else{
      this.setData({
        nameIconIfShow: 'none',//不符合要求，隐藏
      })
    }
  },
  /*
  *获取，验证手机号
  */
  getTel:function(e){
   var theTel = /^1[34578]\d{9}$/.test(e.detail.value)//判断手机号是否有效
   if(theTel) {
     this.setData({
        telIconIfShow: 'block',//符合要求，显示
        errMess: '',//错误提示,无
        btncolor: '#32CD32',//按钮变为绿色
      })
    }else{
     this.setData({
        telIconIfShow: 'none',//不符合要求，隐藏
      })
    }
  },
  /*
  *获取，验证密码，第1次
  */
  getPass: function (e) {
    var thePass = /^\d{6}$/.test(e.detail.value)//判断密码是否有效
    if (thePass) {
      this.setData({
        passIconIfShow: 'block',//符合要求，显示
        password: e.detail.value,//保存第一次密码
        errMess: '',//错误提示,无
        btncolor: '#32CD32',//按钮变为绿色
      })
    } else {
      this.setData({
        passIconIfShow: 'none',//不符合要求，隐藏
      })
    }
  },
  /*
  *获取，验证确认密码
  */
  getPass2: function (e) {
    //判断密码是否有效且与第一次输入是否相同
    if (/^\d{6}$/.test(e.detail.value) && e.detail.value == this.data.password) {
      this.setData({
        pass2IconIfShow: 'block',//符合要求，显示
        password2: e.detail.value,//保存确认密码
        passTips: '密码一致,请继续填写',//不显示提示信息
        passTipsStyle: '#32CD32',//字体颜色变为绿色
        errMess: '',//错误提示,无
        btncolor: '#32CD32',//按钮变为绿色
      })
    } else {
      this.setData({
        pass2IconIfShow: 'none',//不符合要求，隐藏
        passTips: '两次填写的密码不一致',
        passTipsStyle: '#FF0000',//字体颜色变为红色
      })
    }
  },
  formSubmit:function(e){
    console.log(e)
    var that = this;
    var name = e.detail.value.name;
    var tel = e.detail.value.tel;
    var password = e.detail.value.password;
    var password2 = e.detail.value.password2;
    var pick = that.data.ifchooseAddr;
    //判断号码是否被注册过
    db.collection('UsersMess').where({
      tel:tel
    })
    .get({
       success:function(res){
         if(res.data.length>=1){
           wx.showModal({
             title: '注册失败',
             content: '原因:该手机号已被注册',
             success(res) {
               if (res.confirm) {
                 console.log('用户点击确定')
               } else if (res.cancel) {
                 console.log('用户点击取消')
               }
             }
           })
         }else{
           if (!name || !tel || !password || !password2 || pick != 1) {
             this.setData({
               btncolor: '#CCCCCC',//按钮变为灰色
               errMess: '信息填写不完整或不符合要求',//错误提示
             })
           } else {
             //注册操作
             var a = that.data.multiArray
             that.setData({
               name: e.detail.value.name,
               tel: e.detail.value.tel,
               password: e.detail.value.password2,
               address: a[0][e.detail.value.pick[0]] + a[1][e.detail.value.pick[1]],
               date: that.data.logs,
             })
             db.collection('UsersMess').add({
               // data 字段表示需新增的 JSON 数据
               data: {
                 name: that.data.name,
                 tel: that.data.tel,
                 password: that.data.password2,
                 address: that.data.address,
                 date: that.data.logs,
                 phone: that.data.phone
               },
               success(res) {
                 console.log(res)
                 wx.showToast({
                   title: '注册成功',
                   duration: 2000,
                 })
               },
               fail(res) {
                 wx.showToast({
                   title: '注册失败',
                   duration: 1000,
                 })
               }
             })
           }
         }
       }
    })
  },
  /**
   * 返回首页
   */
  backToIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  }
})