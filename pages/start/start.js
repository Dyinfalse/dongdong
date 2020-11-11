// pages/search/search.js
import { http } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    dto:1,
    dataList:[],
    error:null,
    formData:{mobile:''},
    rules: [{
        name: 'mobile',
        rules: [{required: true, message: '手机号或名称'}, {maxlength: 11, message: '请检查手机号或名称'}],
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option.query)
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        'formData.mobile': e.detail.value
    })
    console.log(this.data)
  },
  getSearchList() {
    let _this = this;
    http({
      url: '/app-user/keyword',
      data: {keyword:_this.data.formData.mobile},
        success(res) {
          // console.log(res)
          if(res.length == 0){
            wx.showToast({
              title: '暂无数据',
              icon: 'none',
            })
          }else{
            _this.setData({dataList: res.data});
          } 
          
           
        }
    })
  },
  star(){
    let _this = this;
    http({
      url: '/desk/updateStatus',
      method:'POST',
      data: {id:_this.data.id,dto:_this.data.dto},
        success(res) {
          console.log(res)
          // if(res.length == 0){
          //   wx.showToast({
          //     title: '暂无数据',
          //     icon: 'none',
          //   })
          // }else{
          //   _this.setData({dataList: res.data});
          // } 
          
           
        }
    })
  },
  search(){
    // if(this.data.formData.mobile.length >11){
    //   this.setData({
    //       error: '请检查手机号或用户名'
    //   })
    // }else{
      if(this.data.formData.mobile == ''){
        this.setData({
          error: '请输入手机号或用户名'
        })
      }else{
        this.getSearchList()
      }
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