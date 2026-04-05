/**
 * AI问答页面
 * 功能：学生提问，AI回答
 */

const api = require('../../utils/api');

Page({
  data: {
    messages: [],      // 消息列表
    inputText: '',     // 输入框内容
    loading: false,    // 是否正在加载
    context: ''        // 对话上下文
  },

  onLoad() {
    // 添加欢迎消息
    this.setData({
      messages: [{
        role: 'assistant',
        content: '你好！我是启程助手，专门帮你解答高考志愿填报问题。你可以问我：\n\n• 计算机专业学什么？\n• 600分能报哪些学校？\n• 理工科和文科有什么区别？'
      }]
    });
  },

  // 输入框变化
  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  // 发送消息
  async onSend() {
    const text = this.data.inputText.trim();
    if (!text || this.data.loading) return;

    // 添加用户消息
    const userMsg = { role: 'user', content: text };
    this.setData({
      messages: [...this.data.messages, userMsg],
      inputText: '',
      loading: true
    });

    try {
      // 调用API
      const res = await api.chat(text, this.data.context);
      
      // 添加AI回复
      const aiMsg = { role: 'assistant', content: res.reply };
      this.setData({
        messages: [...this.data.messages, aiMsg],
        context: res.context || '',
        loading: false
      });

    } catch (err) {
      console.error('API调用失败:', err);
      this.setData({
        messages: [...this.data.messages, {
          role: 'assistant',
          content: '抱歉，网络出了点问题，请稍后再试。'
        }],
        loading: false
      });
    }
  },

  // 清空对话
  onClear() {
    this.setData({
      messages: [{
        role: 'assistant',
        content: '对话已清空。有什么新问题？'
      }],
      context: ''
    });
  }
});