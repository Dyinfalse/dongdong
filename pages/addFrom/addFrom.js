// pages/addFrom/addFrom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error:"",
    sexList:[
      { 
        name:"男",
        id:"0"
      },
      { 
        name:"女",
        id:"1"
      }
    ],
    comboList:[
      { 
        name:"A",
        id:"0"
      },
      { 
        name:"B",
        id:"1"
      }
    ],
    rules: [{
        name: 'mobile',
        rules: [{required: true, message: '请输入手机号'}, {mobile:true, message: '手机号格式错误'}],
      },{
      name: 'name',
      rules: [{required: true, message: '请输入姓名'}],
  },{
    name: 'phone',
    rules: [{required: true, message: '请输入手机号'}, {mobile:true, message: '手机号格式错误'}],
  }],
    // date:'2020-10-10',
    // age:'0',
    // ageData:["请选择","男","女"],
    // mealData:["套餐A","套餐B"],
    // meal:'0',

    user:{
      "mobile":'',
      "comboId": 0,
      "coupon": 0,
      "currentIntegral": 0,
      "id": 0,
      "member": true,
      "name": "",
      "password": "",
      "phone": "",
      "preComboId": 0,
      "sex": 0,
      "type": 0,
      "birthday":"1996-10-10",
      "presentTime": "",
      "preComboId": "",
      "validityVolume": ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindSexChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
        'user.sex': e.detail.value
    })
  },
  formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
          [`user.${field}`]: e.detail.value
      })
  },
  bindDateChange(e){
    this.setData({
        [`user.date`]: e.detail.value
    })
  },
  bindcomboIdChange(e){
    this.setData({
      [`user.comboId`]: e.detail.value
    })
  },
  add(){
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })

          }
      } else {
        let _this = this;
        let { user, comboPicker, comboList } = _this.data;
        
        console.log(_this.data.user)
        http({
          url: '/app-user/registry',
          method:'POST',
          data: _this.data.user,
            success(res) {
              console.log(res)
              _this.resetUser();
            }
        })
      }
    })
  },

  /**
   * 获取套餐list
   */
  getCombo: function () {
    let _this = this;
    http({
      url: '/app-combo/list',
      data: {},
        success(res) {
          console.log(res)
          _this.setData({comboList: res});
        }
    });
  },

  resetUser() {
    this.setData({
      user: {
        "phone":'',
        "comboId": 0,
        "coupon": 0,
        "currentIntegral": 0,
        "member": true,
        "name": "",
        "password": "",
        "sex": 0,
        "type": 0,
        "birthday":"1996-10-10",
        "presentTime": "",
        "preComboId": "",
        "validityVolume": ""
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

  }
})