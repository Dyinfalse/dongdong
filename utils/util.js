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
  let userInfo = wx.getStorageSync('userInfo');

  if(config.url != '/login' && !userInfo) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  } else {
    let { token } = userInfo;
    token = token || '';
    wx.showLoading({title: '加载中…'});
    wx.request({
      url: 'https://www.dongdong.design' + config.url,
      method: config.method || 'GET',
      header: { token },
      data: config.data,
      success (res) {
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
}

module.exports = {
  formatTime: formatTime,
  http
}