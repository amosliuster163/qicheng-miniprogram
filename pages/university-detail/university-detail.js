/**
 * 学校详情页面
 * 功能：展示学校详细信息
 */

Page({
  data: {
    university: null,
    loading: true
  },

  onLoad(options) {
    const name = options.name || '南开大学';
    const province = options.province || '天津';
    this.loadUniversityDetail(name, province);
  },

  async loadUniversityDetail(name, province) {
    try {
      const res = await wx.request({
        url: `https://qicheng-api.vercel.app/api/universities?province=${province}`,
        method: 'GET'
      });
      
      const university = res.data.data.find(u => u.name === name);
      
      if (university) {
        this.setData({ university, loading: false });
      } else {
        this.setData({
          university: { name, description: '暂无详细信息' },
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
    const uni = this.data.university;
    if (uni) {
      wx.navigateTo({
        url: '/pages/chat/chat?q=' + encodeURIComponent(uni.name + '详细介绍和报考建议')
      });
    }
  }
});