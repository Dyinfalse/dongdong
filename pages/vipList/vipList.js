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
            let userRecordList = [];
            res.reverse().map(r => {
              let date = r.createTime.split('-')[0] + r.createTime.split('-')[1];
              let target = userRecordList.find(o => o.date == date);
              console.log(target)
              if(target) {
                target.record.push(r)
              } else {
                userRecordList.push({
                  date,
                  record: [r]
                })
              }
            })
            console.log(userRecordList, res.length)
            _this.setData({vipList: userRecordList});
            wx.stopPullDownRefresh();
        }
    })
  },
  toDetails(e) {
    wx.navigateTo({
        url: `/pages/vipDetails/vipDetails?user=${JSON.stringify(e.currentTarget.dataset.user)}`,
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