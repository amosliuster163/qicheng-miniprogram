/**
 * 首页
 */

Page({
  data: {},
  
  onLoad(options) {
    // 如果带参数q，跳转到问答页面
    if (options.q) {
      wx.navigateTo({
        url: '/pages/chat/chat?q=' + encodeURIComponent(options.q)
      });
    }
  }
});