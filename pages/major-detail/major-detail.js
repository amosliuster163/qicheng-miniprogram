/**
 * 专业详情页面
 * 功能：展示专业详细信息
 */

Page({
  data: {
    major: null,
    loading: true
  },

  onLoad(options) {
    const name = options.name || '计算机科学与技术';
    this.loadMajorDetail(name);
  },

  async loadMajorDetail(name) {
    try {
      // 从API获取专业列表，找到匹配的专业
      const res = await wx.request({
        url: 'https://qicheng-api.vercel.app/api/majors',
        method: 'GET'
      });
      
      const major = res.data.data.find(m => m.name === name);
      
      if (major) {
        this.setData({ major, loading: false });
      } else {
        this.setData({
          major: { name, description: '暂无详细信息' },
          loading: false
        });
      }
    } catch (err) {
      console.error('加载失败:', err);
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败', icon: 'error' });
    }
  },

  onAskAI() {
    const major = this.data.major;
    if (major) {
      wx.navigateTo({
        url: '/pages/chat/chat?q=' + encodeURIComponent(major.name + '专业详细介绍和就业前景')
      });
    }
  }
});