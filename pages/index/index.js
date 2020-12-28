//index.js
import { http } from '../../utils/util';
Page({
    data: {
        deskList: [],
        showDeskList: [],
        filterType: ''
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
                _this.setData({showDeskList: _this.data.deskList, filterType: ''})
            }
        })
    },
    toDetails(e){
        if(!e.target.dataset.user) return;
        wx.navigateTo({
            url: `/pages/vipDetails/vipDetails?user=${JSON.stringify(e.target.dataset.user)}`,
        })
    },
    /**
     * 筛选
     */
    filterList(e){
        let { type } = e.target.dataset;
        let { deskList, filterType, showDeskList } = this.data;
        filterType = filterType == type ? '' : type;
        console.log(filterType)
        showDeskList = deskList.filter(d => {
            if(!filterType) {
                return  true;
            } else if (filterType == 'ing') {
                return (d.status == 1 && d.remainingTime > 400);
            } else if (filterType == 'pause') {
                return d.status == 0;
            } else if (filterType == 'lt400') {
                return (d.status == 1 && d.remainingTime < 400);
            } else {
                return d.status == 2 || d.status == null;
            }
        })
        this.setData({showDeskList, filterType})
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
        let { showDeskList } = this.data;
        http({
            url: '/desk/updateStatus',
            method: 'POST',
            data: {id: deskinfo.id, status },
            success(res) {
                showDeskList.find(d => d.deskId == deskinfo.deskId).status = status;
                _this.setData({ showDeskList });
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