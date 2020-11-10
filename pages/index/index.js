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
    onLoad: function () {
        this.getDeskList();
    },
})