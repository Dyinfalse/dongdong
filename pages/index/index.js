//index.js
import { http } from '../../utils/util';
Page({
    data: {
        deskList: []
    },
    getDeskList() {
        let _this = this;
        http({
            url: '/desk/list',
            data: {},
            success(res) {
                _this.setData({deskList: res});
            }
        })
    },
    /**
     * 开始游戏
     */
    toStart(e) {
        let { deskinfo } = e.target.dataset;
        console.log(deskinfo)
        wx.navigateTo({
            url: '../start/start'
        })
    },
    onLoad: function () {
        
    },
    onShow() {
        this.getDeskList();
    }
})