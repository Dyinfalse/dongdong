const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 *  公共请求方法
 */
function http (config) {
  wx.showLoading({title: '加载中…'})
  if(/** 检查登录状态如果没登录 */false){
    // redirect to login
  }
  //https://www.dongdong.design
  wx.request({
    url: 'http://localhost:8080' + config.url,
    method: config.method || 'GET',
    header: {
      // Cookie: "JSESSIONID=AA190A17C1840E5766B7DA341B6B98F8"
    },
    data: config.data,
    success (res) {
      console.log(res)
      wx.hideLoading();
      if(res.statusCode === 200 && res.data.code === '200'){
        config.success && config.success(res.data.data);
      } else {
        wx.showToast({title: res.data.message || '网络错误', icon: 'none'});
      }
    },
    error (err) {
      console.log(err);
      wx.hideLoading();
    }
  })
}

module.exports = {
  formatTime: formatTime,
  http
}
