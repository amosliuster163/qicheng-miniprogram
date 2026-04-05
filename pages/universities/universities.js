/**
 * 学校列表页面
 * 功能：展示985/211/天津高校列表
 */

Page({
  data: {
    universities: [],
    loading: true,
    currentType: '985',
    types: ['985', '211', '天津']
  },

  onLoad() {
    this.loadUniversities('985');
  },

  async loadUniversities(type) {
    this.setData({ loading: true, currentType: type });
    
    try {
      let url = 'https://qicheng-api.vercel.app/api/universities';
      
      if (type === '985') {
        url += '?level=985';
      } else if (type === '211') {
        url += '?level=211';
      } else if (type === '天津') {
        url += '?province=天津';
      }

      const res = await wx.request({
        url: url,
        method: 'GET'
      });

      this.setData({
        universities: res.data.data || [],
        loading: false
      });
    } catch (err) {
      console.error('加载失败:', err);
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败', icon: 'error' });
    }
  },

  onTypeChange(e) {
    const type = e.currentTarget.dataset.type;
    this.loadUniversities(type);
  },

  onUniversityTap(e) {
    const name = e.currentTarget.dataset.name;
    const province = this.data.currentType === '天津' ? '天津' : '';
    wx.navigateTo({
      url: `/pages/university-detail/university-detail?name=${encodeURIComponent(name)}&province=${province}`
    });
  }
});