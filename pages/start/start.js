// pages/search/search.js
import {
    http
} from '../../utils/util';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        deskId: '',
        userId: '',
        deskName: '',
        dataList: [],
        error: null,
        formData: {
            mobile: ''
        },
        rules: [{
            name: 'mobile',
            rules: [{
                required: true,
                message: '手机号或名称'
            }, {
                maxlength: 11,
                message: '请检查手机号或名称'
            }],
        }]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        let { deskId, deskName } = option;
        this.setData({ deskId, deskName })
    },

    formInputChange(e) {
        this.setData({
            'formData.mobile': e.detail.value
        })
    },
    getSearchList() {
        let _this = this;
        http({
            url: '/app-user/keyword',
            data: {
                keyword: _this.data.formData.mobile
            },
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
    star() {
        let _this = this;
        let {
            deskId,
            userId
        } = this.data;
        console.log(deskId, userId);
        if(!deskId || !userId) return;
        http({
            url: '/desk/add',
            method: 'POST',
            data: {
                deskId,
                userId
            },
            success(res) {
                console.log(res)
                wx.showToast({title: '操作成功!', icon: 'none'});
                wx.navigateBack();
            }
        })
    },
    search() {
        if (this.data.formData.mobile == '') {
            this.setData({
                error: '请输入手机号或用户名'
            })
        } else {
            this.getSearchList()
        }
    },

    activeUser(e) {
        let { user } = e.target.dataset;
        let { dataList } = this.data;
        dataList.map(u => u.active = false);
        dataList.find(u => u.id == user.id).active = true;
        this.setData({ dataList, userId: user.id });
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