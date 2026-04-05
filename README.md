# 启程小程序

高考志愿填报问答系统 - 小程序前端

## 技术栈

- **框架**: 微信小程序原生
- **UI**: WeUI 组件库
- **API**: https://qicheng-api.vercel.app

## 目录结构

```
qicheng-miniprogram/
├── pages/
│   ├── index/        # 首页（问答入口）
│   ├── chat/         # AI问答页面
│   ├── recommend/    # 择校推荐页面
│   └── majors/       # 专业列表页面
├── components/
│   ├── chat-input/   # 聊天输入组件
│   ├── message-list/ # 消息列表组件
│   └── school-card/  # 学校卡片组件
├── utils/
│   ├── api.js        # API请求封装
│   └── auth.js       # 用户认证
├── app.js
├── app.json
└── app.wxss
```

## MVP功能（3-4周）

1. **专业问答** - 学生问"计算机学什么？" → AI回答
2. **择校推荐** - 输入分数/兴趣 → AI推荐学校

## 目标上线

- **日期**: 2026-06-09（高考结束当天）
- **用户**: 2026届高考生

---

**创建时间**: 2026-04-05