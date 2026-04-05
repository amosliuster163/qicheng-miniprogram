/**
 * 择校推荐页面
 * 功能：输入分数和兴趣，AI推荐学校
 */

const api = require('../../utils/api');

Page({
  data: {
    score: '',
    province: '',
    interest: '',
    result: null,
    loading: false
  },

  onScoreChange(e) {
    this.setData({ score: e.detail.value });
  },

  onProvinceChange(e) {
    this.setData({ province: e.detail.value });
  },

  onInterestChange(e) {
    this.setData({ interest: e.detail.value });
  },

  async onSubmit() {
    const { score, province, interest } = this.data;
    
    if (!score) {
      wx.showToast({ title: '请输入分数', icon: 'error' });
      return;
    }

    this.setData({ loading: true, result: null });

    try {
      const res = await api.recommend({
        score: parseInt(score),
        province: province || '天津',
        interest: interest || ''
      });

      this.setData({ result: res, loading: false });

    } catch (err) {
      console.error('推荐失败:', err);
      wx.showToast({ title: '网络错误', icon: 'error' });
      this.setData({ loading: false });
    }
  },

  onReset() {
    this.setData({
      score: '',
      province: '',
      interest: '',
      result: null
    });
  }
});