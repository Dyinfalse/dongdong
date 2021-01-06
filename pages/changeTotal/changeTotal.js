// pages/changeTotal/changeTotal.js
import { http } from '../../utils/util';
Page({

        /**
         * 页面的初始数据
         */
        data: {
            user: {}
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
            this.setData({ user: JSON.parse(options.user) });
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
        formInputChange(e) {
            let { user } = this.data;
            user.totalTime = e.detail.value;
            this.setData({ user });
        },
        /**
         * 保存剩余时长
         */
        save() {
            let { user } = this.data;
            http({
                url: '/app-user/update-total-time',
                method: 'POST',
                data: {
                    id: user.id,
                    totalTime: user.totalTime
                },
                success(res) {
                    let pages = getCurrentPages();
                    let prevPage = pages[pages.length - 2];
                    prevPage.setData({
                        totalTime: res.totalTime
                    })
                    wx.navigateBack({
                      delta: 1,
                    })
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