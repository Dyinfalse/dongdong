// pages/sendUserMsg/sendUserMsg.js
import {
  http
} from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      comboPicker: 0,
      error: "",
      typeList: [
        {
            name: "消费结束短信",
            id: 0
        },
        {
            name: "会员开通短信",
            id: 1
        }
      ],
      comboList: [],
      rules: [
        {
        name: 'name',
        rules: [
            {
                required: true,
                message: '请输入姓名'
            }
        ],
      }, {
          name: 'mobile',
          rules: [{
              required: true,
              message: '请输入手机号'
          }, {
              mobile: true,
              message: '手机号格式错误'
          }],
      }],
      msg: {
          "mobile": '',
          "name": "",
          "usedTime": "",
          "surplusTime": "",
          "type": 0,
          "vipName": "",
          "vipTime": "",
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindSexChange: function (e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);

      this.setData({
          'msg.type': e.detail.value
      })
  },
  formInputChange(e) {
      const {
          field
      } = e.currentTarget.dataset
      this.setData({
          [`msg.${field}`]: e.detail.value
      })
  },
  bindcomboIdChange(e) {
      this.setData({
          comboPicker: e.detail.value
      })
  },
  presentTimeInput(e) {
      this.data.user.presentTime = e.detail.value;
  },
  send() {
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
              let { msg } = this.data;
              let param = {};
              param['mobile'] = msg.mobile;
              param['type'] = msg.type;
              if (param['type'] == 1) {
                param['params'] = [
                    msg.name,
                    msg.vipName.replace("会员", ""),
                    msg.vipTime
                ]
              } else {
                param['params'] = [
                    msg.name,
                    msg.usedTime,
                    msg.surplusTime
                ]
              }
              http({
                  url: '/app-user/sendUserMsg',
                  method: 'POST',
                  data: param,
                  success(res) {
                      wx.showToast({title: '发送成功', icon: 'none', duration: 1000});
                      setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/center/center',
                        })
                      }, 1000)
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
              _this.setData({
                  comboList: res
              });
          }
      });
  },

  resetUser() {
      this.setData({
        msg: {
            "mobile": '',
            "name": "",
            "usedTime": "",
            "surplusTime": "",
            "type": 0,
            "vipName": "",
            "vipTime": "",
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
      this.resetUser();
      this.getCombo();
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