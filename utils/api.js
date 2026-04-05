/**
 * API请求封装
 * 基础URL: https://qicheng-api.vercel.app
 */

const BASE_URL = 'https://qicheng-api.vercel.app';

/**
 * AI问答
 * @param {string} message 用户消息
 * @param {string} context 上下文（可选）
 */
function chat(message, context = '') {
  return request('/api/chat', {
    method: 'POST',
    data: { message, context }
  });
}

/**
 * 择校推荐
 * @param {object} params 推荐参数
 * @param {number} params.score 分数
 * @param {string} params.province 省份
 * @param {string} params.interest 兴趣方向
 */
function recommend(params) {
  return request('/api/recommend', {
    method: 'POST',
    data: params
  });
}

/**
 * 获取专业列表
 */
function getMajors() {
  return request('/api/majors', {
    method: 'GET'
  });
}

/**
 * 获取学校列表
 */
function getUniversities() {
  return request('/api/universities', {
    method: 'GET'
  });
}

/**
 * 通用请求方法
 */
function request(url, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error('请求失败: ' + res.statusCode));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

module.exports = {
  chat,
  recommend,
  getMajors,
  getUniversities
};