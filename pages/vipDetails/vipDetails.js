// pages/addFrom/addFrom.js
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
        sexList: [{
                name: "男",
                id: "0"
            },
            {
                name: "女",
                id: "1"
            }
        ],
        comboList: [],
        rules: [{
            name: 'name',
            rules: [{
                required: true,
                message: '请输入姓名'
            }],
        }, {
            name: 'phone',
            rules: [{
                required: true,
                message: '请输入手机号'
            }, {
                mobile: true,
                message: '手机号格式错误'
            }],
        }],
        user: {
            "phone": '',
            "comboId": 0,
            "coupon": 0,
            "currentIntegral": 0,
            "member": true,
            "name": "",
            "sex": 0,
            "type": 0,
            "birthday": "1996-10-10",
            "presentTime": "",
            "preComboId": "0",
            "validityVolume": ""
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let user = JSON.parse(options.user)
      user.preComboId = user.comboId;
      this.setData({user})
    },
    bindSexChange: function (e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            'user.sex': e.detail.value
        })
    },
    formInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`user.${field}`]: e.detail.value
        })
    },
    bindDateChange(e) {
        console.log(e)
        this.setData({
            [`user.birthday`]: e.detail.value
        })
    },
    bindcomboIdChange(e) {
        this.setData({
            comboPicker: e.detail.value
        })
    },
    presentTimeInput(e) {
        let { user } = this.data;
        user.presentTime = e.detail.value;
        this.setData({ user })
    },
    save() {
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
                let _this = this;
                let {
                    user,
                    comboPicker,
                    comboList
                } = _this.data;
                console.log(user, comboPicker, comboList)
                if(comboPicker != 0 && !comboPicker) {
                    return wx.showToast({title: '请选择套餐', icon: 'none'});
                }
                user.presentTime = '';
                http({
                    url: '/app-user/update',
                    method: 'POST',
                    data: {
                        ...user,
                        comboId: comboList[comboPicker].id
                    },
                    success(res) {
                        console.log(res)
                        wx.navigateBack()
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
                let { user } = _this.data;
                let comboPicker = res.findIndex(c => c.id == user.comboId)
                console.log(comboPicker)
                _this.setData({
                    comboList: res,
                    comboPicker
                });
            }
        });
    },

    resetUser() {
        this.setData({
            user: {
                "phone": '',
                "comboId": 0,
                "coupon": 0,
                "currentIntegral": 0,
                "member": true,
                "name": "",
                "sex": 0,
                "type": 0,
                "birthday": "1996-10-10",
                "presentTime": "",
                "preComboId": "",
                "validityVolume": ""
            }
        })
    },
    /**
     * 查询单个会员的消费记录
     */
    payRecord() {
        let { user } = this.data;
        wx.navigateTo({
          url: '/pages/payRecord/payRecord?userId=' + user.id,
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