// pages/login/login.js
import { http } from '../../utils/util';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

    inputPhone(e) {
        this.setData({phone: e.detail.value});
    },
    inputPassword(e) {
        this.setData({password: e.detail.value});
    },

    /**
     * 登录方法
     */
    login() {
        let { phone, password } = this.data;
        if(phone == '' || password == '') return wx.showToast({title: '请输入手机号和密码', icon: 'none'});
        if(phone.length !== 11) return wx.showToast({title: '请输入正确手机号', icon: 'none'});

        http({
            url: '/login',
            method: 'POST',
            data: { password, phone },
            success(res) {
                wx.switchTab({
                    url: '../index/index'
                });
            }
        })
    }
})