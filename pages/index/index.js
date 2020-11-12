//index.js
import { http } from '../../utils/util';
Page({
    data: {
        deskList: []
    },
    onPullDownRefresh() {
        this.getDeskList();
    },
    getDeskList() {
        let _this = this;
        http({
            url: '/desk/list',
            data: {},
            success(res) {
                wx.stopPullDownRefresh();
                _this.setData({deskList: res.map(d => {
                    d.recordTimeSplit = d.recordTime ? d.recordTime.split(' ')[1] : '';
                    return d;
                })});
            }
        })
    },
    /**
     * 开始游戏
     */
    toStart(e) {
        let { deskinfo } = e.target.dataset;
        if(deskinfo.status == 0){
            return this.updateDeskStatus(deskinfo, 1)
        }
        console.log(deskinfo)
        wx.navigateTo({
            url: '../start/start?deskId=' + deskinfo.deskId + '&deskName=' + deskinfo.name
        });
    },
    updateDeskStatus(deskinfo, status) {
        let _this = this;
        let { deskList } = this.data;
        http({
            url: '/desk/updateStatus',
            method: 'POST',
            data: {id: deskinfo.id, status },
            success(res) {
                deskList.find(d => d.deskId == deskinfo.deskId).status = status;
                _this.setData({ deskList });
            }
        })
    },
    /**
     * 暂停
     */
    toPause(e){
        let { deskinfo } = e.target.dataset;
        this.updateDeskStatus(deskinfo, 0);
    },
    /**
     * 结束
     */
    toEnd(e) {
        let { deskinfo } = e.target.dataset;
        this.updateDeskStatus(deskinfo, 2);
    },
    onLoad: function () {
        
    },
    onShow() {
        this.getDeskList();
    }
})