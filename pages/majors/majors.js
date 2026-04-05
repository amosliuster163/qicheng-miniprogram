/**
 * 专业列表页面
 * 功能：展示热门专业，点击查看详情
 */

const api = require('../../utils/api');

Page({
  data: {
    majors: [],
    loading: true,
    searchKey: ''
  },

  onLoad() {
    this.loadMajors();
  },

  async loadMajors() {
    try {
      const res = await api.getMajors();
      this.setData({
        majors: res.majors || [],
        loading: false
      });
    } catch (err) {
      console.error('加载失败:', err);
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败', icon: 'error' });
    }
  },

  onSearch(e) {
    const key = e.detail.value.toLowerCase();
    this.setData({ searchKey: key });
  },

  onMajorTap(e) {
    const major = e.currentTarget.dataset.major;
    wx.navigateTo({
      url: '/pages/major-detail/major-detail?name=' + encodeURIComponent(major)
    });
  }
});