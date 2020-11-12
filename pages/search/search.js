// pages/search/search.js
import { http } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error:null,
    formData:{mobile:123},
    rules: [{
        name: 'mobile',
        rules: [{required: true, message: '请输入手机号或名称'}, {maxlength: 11, message: '请检查手机号或名称'}],
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDeskList()
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        'formData.mobile': e.detail.value
    })
    console.log(this.data)
  },
  getSearchList() {
    let _this = this;
    http({
      url: '/app-user/keyword',
      data: {keyword:_this.data.formData.mobile},
        success(res) {
          if (res.length == 0) {
              wx.showToast({
                  title: '暂无数据',
                  icon: 'none',
              })
          } else {
              _this.setData({
                  dataList: res.map(u => {
                      u.active = false;
                      return u;
                  })
              });
          }
        }
    })
  },
  search(){
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
        this.getSearchList()
      }
    })
  },
  activeUser(e) {
    // console.log(e.target.dataset)
    wx.navigateTo({
      url: `/pages/vipDetails/vipDetails?user=${JSON.stringify(e.target.dataset.user)}`,
    })
    // let { user } = e.target.dataset;
    // let { dataList } = this.data;
    // dataList.map(u => u.active = false);
    // dataList.find(u => u.id == user.id).active = true;
    // this.setData({ dataList, userId: user.id });
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