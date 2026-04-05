/**
 * 启程小程序
 * 高考志愿填报问答系统
 */

App({
  onLaunch() {
    console.log('启程小程序启动');
    
    // 检查登录状态
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },

  globalData: {
    userInfo: null,
    apiBase: 'https://qicheng-api.vercel.app'
  }
});