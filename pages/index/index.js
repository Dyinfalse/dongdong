//index.js
import { http } from '../../utils/util';
Page({
    data: {
        deskList: [],
        showDeskList: [],
        filterType: '',
        timer: null
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
                _this.setData({showDeskList: _this.data.deskList.map(d => {
                    d.consumptionShowTime = d.consumptionTime;
                    d.remainingShowTime = d.remainingTime;
                    d.startTime = new Date().getTime();
                    return d;
                }), filterType: ''});
                _this.setTime()
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
                console.log(res)
                let targetDesk = showDeskList.find(d => d.deskId == deskinfo.deskId);
                targetDesk.status = status;

                if(status == 2){
                    targetDesk['appUser'] = null;
                    targetDesk['consumptionTime'] = null;
                    targetDesk['id'] = null;
                    targetDesk['pauseTime'] = null;
                    targetDesk['pauseTotalTime'] = null;
                    targetDesk['recordTime'] = null;
                    targetDesk['remainingTime'] = null;
                    targetDesk['status'] = null;
                    targetDesk['used'] = false;
                    targetDesk['userId'] = null;
                    targetDesk['userInfo'] = null;
                    targetDesk['consumptionShowTime'] = null;
                    targetDesk['remainingShowTime'] = null;
                } else {
                    targetDesk['consumptionTime'] = res.consumptionTime;
                    targetDesk['remainingTime'] = res.totalTime - res.consumptionTime;
                    targetDesk['startTime'] = new Date().getTime();
                }
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
    /**
     * 启动定时器
     */
    setTime() {
        let { timer, showDeskList } = this.data;
        clearInterval(timer);
        this.setData({timer: setInterval(() => {
            showDeskList.map(d => {
                if(d.id && d.status == 1) {
                    let now = new Date().getTime();
                    d.consumptionShowTime = parseInt(d.consumptionTime + ((now - d.startTime) / 1000 / 60));
                    d.remainingShowTime = d.appUser.totalTime - d.consumptionShowTime;
                }
            })
            this.setData({ showDeskList });
        }, 900)})
    },
    onLoad: function () {
        
    },
    onShow() {
        this.getDeskList();
    }
})