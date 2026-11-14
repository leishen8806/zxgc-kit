# DESIGN.md 模板

项目：
页面/组件：
界面类型：网页与大屏 / Mini App 与 H5 / 司机端
主题：浅色 / 深色 / 跟随系统

## 生成前指令

先读 `docs/界面通用规则.md` 和本节对应端规则。说明主要任务、信息层级、输入方式、观看距离（大屏必填）、状态和失败路径。优先复用标准框架已有控件，不为单个页面新造控件；使用语义颜色令牌和相对字号；考虑深色模式、动态字号、键盘/无障碍和减少动效。

## 网页与大屏

- 点击热区：网页触控目标 44 CSS px；桌面密集布局的可点击热区不小于32px，并说明输入设备；大屏按观看距离提高字号和间距。
- 正文：网页默认 `1.0625rem`（17 CSS px）；大屏使用字号令牌，不把17px固定值当作远距可读标准。
- 颜色：使用 light/dark 语义令牌，不直接写业务色。
- 布局：默认16px间距，200%字号不截断、不覆盖、不丢操作。

## Mini App 与 H5

- 触控目标按44 CSS px；底部操作优先，悬停行为改为点击。
- 正文默认 `1.0625rem`，长文自然换行；主题跟随系统或页面设置。
- 反馈不能只靠颜色；弹层、抽屉和表单错误提供可达关闭与文本说明。

## 司机端

- 触控目标按48dp，关键动作保持明显间距；使用 Android/React Native 的平台语义。
- 字号使用可缩放单位，控件提供无障碍标签；驾驶流程保持单列和短反馈。
- 不把 Apple 专有标签栏、SF Pro 或 iOS 手势作为 Android 默认要求。

## 生成后自查

完成 `docs/HIG-自查清单.md`，附最小点击热区、正文最低对比度、深色模式、200%字号和未达标项的实际读数。

## Glass Ledger design context

### Direction

“夜航玻璃账本”：深海蓝画布承托三种可读的信号色（薄荷、蓝紫、珊瑚），玻璃卡片像隔着舷窗读取安静的数据。唯一的视觉冒险是用大面积留白和衬线斜体短语把财务趋势从“报表”拉回“个人计划”。

### Tokens

- Canvas `#08101f`; text `#eef4ff`; muted `#8f9cb2`.
- Glass `rgba(255,255,255,.08–.09)`; border `rgba(255,255,255,.11)`; blur `20px`.
- Signal: mint `#8debd2`, iris `#8aa6ff`, coral `#ffb38a`.
- Radius: 12px controls, 18–22px cards. Hover lift: `2px`.

### Behavior

The three views share one header, one active-nav contract, visible keyboard focus, an always-visible “示例数据” marker, semantic buttons, chart hover/focus details, a table-owned horizontal scroller, and a reduced-motion fallback. All values are synthetic and the UI is a static demo.
