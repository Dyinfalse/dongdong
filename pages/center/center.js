// pages/center/center.js
import { http } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    message: true,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({key: 'userInfo', success(userInfo) {
      _this.setData({userInfo: userInfo.data});
    }})
  },
  /**
   * 获取短信功能状态
   */
  getMessage() {
    let _this = this;
    this.setData({loading: true})
    http({
        url: '/desk/get-message',
        data: {},
        success(res) {
          _this.setData({message: res, loading: false});
            console.log(res)
        }
    })
  },
  setMessage(message) {
    let _this = this;
    this.setData({loading: true});
    http({
        url: '/desk/set-message',
        data: { messageEnable: message },
        method: 'POST',
        success(res) {
          console.log(res)
          _this.setData({message: res, loading: false});
        }
    })
  },
  changeSwitch(e){
    this.setMessage(e.detail.value);
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
    this.getMessage();
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

  },
  /**
   * 发送短信页面
   */
  sendUserMsg() {
    wx.navigateTo({
      url: '../sendUserMsg/sendUserMsg',
    })
  },
  /**
   * 消费记录
   */
  toPayRecord() {
    wx.navigateTo({
      url: '../payRecord/payRecord',
    })
  },

  toVipList() {
    wx.navigateTo({
      url: '../vipList/vipList',
    })
  },

  /**
   * 退出
   */
  logout() {
    wx.clearStorage({
      success: (res) => {
        wx.redirectTo({
          url: '../login/login'
        })
      },
    })
  }
})