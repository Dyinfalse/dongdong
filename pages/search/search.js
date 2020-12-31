// pages/search/search.js
import { http } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
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
    this.data.formData.mobile = e.detail.value;
    this.getSearchList();
  },
  getSearchList() {
    let _this = this;
    if(_this.data.formData.mobile == '' || _this.data.formData.mobile == '1') return;
    http({
      url: '/app-user/keyword',
      data: { keyword:_this.data.formData.mobile },
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
    if (this.data.formData.mobile.length == 0) {
        return this.setData({ error: '请输入手机号或用户名'})
    }
    this.getSearchList()
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
    this.setData({dataList: [], 'formData.mobile': ''})
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