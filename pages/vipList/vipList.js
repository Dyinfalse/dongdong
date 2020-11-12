import { http } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onPullDownRefresh() {
    console.log(1)
    this.getVipList();
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
      this.getVipList();
  },

  getVipList() {
    let _this = this;
    http({
        url: '/app-user/members',
        data: {type: 1},
        success(res) {
            _this.setData({vipList: res});
            wx.stopPullDownRefresh();
        }
    })
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