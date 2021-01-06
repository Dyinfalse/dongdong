// pages/payRecord/payRecord.js
import { http } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    userRecordList: [],
    recordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.user){
      this.setData({ user: JSON.parse(options.user) })
    }
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
      let { user } = this.data;
      if(user) {
        this.getRecordListByUserId(user.id);
      } else {
        this.getRecordList();
      }
  },
  /**
   *  获取单个用户的消费记录
   */
  getRecordListByUserId(userId) {
    let _this = this;
    http({
        url: '/desk/statistics-by-user',
        data: { userId },
        success(res) {
            wx.stopPullDownRefresh();
            let userRecordList = [];
            res.reverse().map(r => {
              let date = r.createTime.split('-')[0] + r.createTime.split('-')[1];
              let target = userRecordList.find(o => o.date == date);
              if(target) {
                target.record.push(r)
              } else {
                userRecordList.push({
                  date,
                  record: []
                })
              }
            })
            _this.setData({userRecordList})
            wx.setNavigationBarTitle({
              title: _this.data.user.name + '的消费记录'
            })
        }
    })
  },
  /**
   * 获取所有套餐记录
   */
  getRecordList() {
    let _this = this;
    http({
        url: '/app-user/statistics',
        data: {},
        success(res) {
            wx.stopPullDownRefresh();
            _this.setData({recordList: res.reverse()});
            wx.setNavigationBarTitle({
              title: '消费记录'
            })
        }
    })
  },
  onPullDownRefresh() {
    let { user } = this.data;
    if(user) {
      this.getRecordListByUserId(user.id);
    } else {
      this.getRecordList();
    }
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