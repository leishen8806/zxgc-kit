import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tokens/dist/tokens.css';
import * as Web from '../ui-web/src/index';
import * as H5 from '../ui-h5/src/index';
import * as Native from '../ui-native/src/index';
import './showcase.css';
import './materials.css';

const ActivityPage = React.lazy(() => import('./activity'));
const GlassPage = React.lazy(() => import('./glass'));
function Navigation() { React.useEffect(() => { document.querySelectorAll<HTMLElement>('.page-nav').forEach(nav => { if (!nav.querySelector('[href="./ui-kit.html?page=glass"]')) nav.insertAdjacentHTML('beforeend', '<a href="./ui-kit.html?page=glass">玻璃数据看板</a>'); }); }, []); return null; }

const TOKENS = { duration: '280ms', fast: '200ms', ease: 'cubic-bezier(.2,.8,.2,1)', spring: 'cubic-bezier(.34,1.56,.64,1)' };
const params = new URLSearchParams(location.search);
document.documentElement.dataset.theme = params.get('theme') === 'dark' ? 'dark' : 'light';
type Target = 'web' | 'h5' | 'native';
const target = (params.get('target') as Target) || 'web';
const Controls = { web: Web, h5: H5, native: Native }[target] || Web;
const native = target === 'native';

const ControlsPage = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [message, setMessage] = React.useState('等待操作');
  const buttonProps = native ? { onPress: () => setMessage('操作已提交'), accessibilityLabel: '主要操作' } : { onClick: () => setMessage('操作已提交'), 'aria-label': '主要操作' };
  const disabledProps = native ? { disabled: true, accessibilityLabel: '禁用操作' } : { disabled: true, 'aria-label': '禁用操作' };
  const switchProps = native ? { value: enabled, onValueChange: setEnabled, accessibilityLabel: '启用通知' } : { checked: enabled, onChange: (event: React.ChangeEvent<HTMLInputElement> | boolean) => setEnabled(typeof event === 'boolean' ? event : event.target.checked), 'aria-label': '启用通知' };
  const inputProps = native ? { accessibilityLabel: '名称' } : { 'aria-label': '名称' };
  const selectProps = native ? { accessibilityLabel: '类型' } : { 'aria-label': '类型' };

  return <main><header><h1>智序前端控件</h1><p>{target.toUpperCase()} 真实控件渲染 · <a href="?target=web">Web</a> · <a href="?target=h5">H5</a> · <a href="?target=native">Native Web</a></p><nav className="page-nav" aria-label="展示页导航"><a className="is-current" href="./ui-kit.html">原有控件</a><a href="./ui-kit.html?page=micro">微交互 12 条</a><a href="./ui-kit.html?page=materials">材质与光效 11 条</a></nav></header>
    <section><h2>Button</h2><p>什么时候用：提交当前步骤的主要动作。引用：<code>{`ui-${target}/src`}</code> 的 <code>ZButton</code></p><Controls.ZButton {...buttonProps}>主要操作</Controls.ZButton><Controls.ZButton {...disabledProps}>禁用</Controls.ZButton><Controls.ZButton {...disabledProps} loading>加载中</Controls.ZButton></section>
    <section><h2>Input</h2><p>什么时候用：收集短文本，标签和占位文字必须说明内容。引用：<code>ZInput</code></p><Controls.ZInput {...inputProps} placeholder="请输入名称" /></section>
    <section><h2>Select</h2><p>什么时候用：从有限选项中选择一个值。引用：<code>ZSelect</code></p><Controls.ZSelect {...selectProps} placeholder="选择端" options={[{ label: 'Web', value: 'web' }, { label: 'H5', value: 'h5' }, { label: 'Native', value: 'native' }]} /></section>
    <section><h2>Switch</h2><p>什么时候用：即时切换一个独立开关。引用：<code>ZSwitch</code></p><Controls.ZSwitch {...switchProps} /></section>
    <section><h2>Toast</h2><p>什么时候用：反馈已完成或需要注意的结果，不承载下一步操作。引用：<code>ZToast</code></p><Controls.ZToast message={message} type="success" /></section>
  </main>;
};
const prompts = [
  '按压回弹：按钮按下时缩小到96%；松手时用弹簧动画先放大到略超过原尺寸，再回到100%', '弹性开关：开关切换时，圆点在移动过程中横向拉长为胶囊形，到达终点后恢复为圆形，带轻微回弹',
  '波纹跟手：点击按钮时，从手指按下的位置生成圆形波纹向外扩散，而不是从按钮中心开始', '点赞炸一下：只给点赞和收藏按钮加成功动画：图标放大回弹，同时向四周散开一圈小粒子；其他按钮不加',
  '勾选画出来：复选框选中时，对勾用描边动画从左下画到右上，时长约200毫秒', '液态滑块：拖动滑块时，轨道填充色、滑钮位置和上方数值同步更新，三者使用同一个动画时长和曲线',
  '数字滚动：数字从旧值滚动到新值，使用减速曲线，接近目标值时逐渐变慢后停下', '骨架屏：骨架屏中每个占位条的宽高与真实内容一致；数据到达后在原位置替换，页面布局不发生跳动',
  '卡片翻面：卡片沿Y轴翻转，正反两面都设置隐藏背面，翻转过程中看不到另一面的反向内容', '汉堡变叉：菜单按钮的三条横线在打开时变形为叉号：上下两条旋转交叉，中间一条淡出；关闭时反向变回',
  '卡片堆叠：卡片以堆叠方式显示，下面的卡片向下错开并略微缩小，露出边缘；划走顶部卡片后，下一张移到顶部', '底部抽屉：底部抽屉设置半屏和全屏两个停靠点：上拉时先停在半屏，继续上拉到全屏，下拉超过一半时关闭',
];

const DemoCard = ({ index, title, summary, children }: { index: number; title: string; summary: string; children: React.ReactNode }) => {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(prompts[index - 1]); } catch { /* clipboard is optional */ } setCopied(true); window.setTimeout(() => setCopied(false), 1200); };
  return <article className="demo-card" id={`demo-${index}`}>
    <div className="demo-heading"><span className="demo-number">{String(index).padStart(2, '0')}</span><div><h2>{title}</h2><p>{summary}</p></div></div>
    <div className="demo-stage">{children}</div>
    <div className="prompt-row"><code>{prompts[index - 1]}</code><button className="copy-button" type="button" onClick={copy}>{copied ? '已复制' : '复制提示词'}</button></div>
  </article>;
};

const PressDemo = () => { const [down, setDown] = React.useState(false); return <button className={`press-demo ${down ? 'is-down' : ''}`} type="button" onPointerDown={() => setDown(true)} onPointerUp={() => setDown(false)} onPointerLeave={() => setDown(false)} onKeyDown={e => { if (e.key === ' ') setDown(true); }} onKeyUp={() => setDown(false)}>按住我</button>; };
const ElasticSwitch = () => { const [on, setOn] = React.useState(false); const [moving, setMoving] = React.useState(false); const toggle = () => { setOn(v => !v); setMoving(true); window.setTimeout(() => setMoving(false), 320); }; return <button className={`elastic-switch ${on ? 'is-on' : ''}`} type="button" role="switch" aria-checked={on} onClick={toggle}><span className={`elastic-knob ${moving ? 'is-moving' : ''}`} /><span>{on ? '开启' : '关闭'}</span></button>; };
const RippleDemo = () => { const [ripple, setRipple] = React.useState<{ x: number; y: number; key: number } | null>(null); const down = (e: React.PointerEvent<HTMLButtonElement>) => { const r = e.currentTarget.getBoundingClientRect(); setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, key: Date.now() }); }; return <button className="ripple-demo" type="button" onPointerDown={down}><span>点击任意位置</span>{ripple && <i key={ripple.key} className="ripple" style={{ '--x': `${ripple.x}px`, '--y': `${ripple.y}px` } as React.CSSProperties} />}</button>; };
const BurstButton = ({ label, burst }: { label: string; burst: boolean }) => { const [key, setKey] = React.useState(0); return <button className={`burst-demo ${burst && key ? 'has-burst' : ''}`} type="button" onClick={() => setKey(v => v + 1)}><span className="burst-icon">{burst ? '♥' : '☆'}</span>{label}{burst && key > 0 && <span className="particles" key={key}>{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}</span>}</button>; };
const CheckDemo = () => { const [checked, setChecked] = React.useState(false); return <label className="check-demo"><input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} /><span className={`check-box ${checked ? 'is-checked' : ''}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17l9-10" /></svg></span><span>我已确认这条微交互</span></label>; };
const SliderDemo = () => { const [value, setValue] = React.useState(42); return <div className="slider-demo"><div className="slider-label"><span>液态进度</span><strong>{value}%</strong></div><input aria-label="液态进度" type="range" min="0" max="100" value={value} onChange={e => setValue(Number(e.target.value))} style={{ '--value': `${value}%` } as React.CSSProperties} /></div>; };
const NumberDemo = () => { const [value, setValue] = React.useState(128); const rolling = React.useRef(false); const roll = () => { if (rolling.current) return; rolling.current = true; const start = value; const end = start + 37; const started = performance.now(); const tick = (now: number) => { const progress = Math.min(1, (now - started) / 900); const eased = 1 - Math.pow(1 - progress, 3); setValue(Math.round(start + (end - start) * eased)); if (progress < 1) requestAnimationFrame(tick); else rolling.current = false; }; requestAnimationFrame(tick); }; return <div className="number-demo"><span className="rolling-number">{value}</span><button type="button" onClick={roll}>增加 37</button></div>; };
const SkeletonDemo = () => { const [loaded, setLoaded] = React.useState(false); return <div className="skeleton-demo"><div className={`skeleton-content ${loaded ? 'is-loaded' : ''}`}><div className="avatar" /><div className="content-lines"><b>{loaded ? '一份稳定的内容卡片' : ''}</b><span>{loaded ? '数据到达后，原位置替换，不发生布局跳动。' : ''}</span><span>{loaded ? '宽高与骨架保持一致。' : ''}</span></div></div><button type="button" onClick={() => setLoaded(v => !v)}>{loaded ? '重置骨架' : '加载内容'}</button></div>; };
const FlipDemo = () => { const [flipped, setFlipped] = React.useState(false); return <button className={`flip-scene ${flipped ? 'is-flipped' : ''}`} type="button" aria-pressed={flipped} onClick={() => setFlipped(v => !v)}><span className="flip-card"><span className="flip-face flip-front">正面<br /><small>点击翻转</small></span><span className="flip-face flip-back">背面<br /><small>再次翻回</small></span></span></button>; };
const MenuDemo = () => { const [open, setOpen] = React.useState(false); return <button className={`menu-demo ${open ? 'is-open' : ''}`} type="button" aria-expanded={open} onClick={() => setOpen(v => !v)}><span /><span /><span /><b>{open ? '关闭菜单' : '打开菜单'}</b></button>; };
const StackDemo = () => { const stack = ['第一张卡片', '第二张卡片', '第三张卡片']; const [top, setTop] = React.useState(0); const [dx, setDx] = React.useState(0); const start = React.useRef<number | null>(null); const cards = stack.map((_, i) => stack[(top + i) % stack.length]); const down = (e: React.PointerEvent) => { start.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }; const move = (e: React.PointerEvent) => { if (start.current !== null) setDx(e.clientX - start.current); }; const up = () => { if (Math.abs(dx) > 70) setTop(v => (v + 1) % stack.length); start.current = null; setDx(0); }; return <div className="stack-demo" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>{cards.map((label, i) => <div key={`${label}-${i}`} className="stack-card" style={{ '--stack': i, '--drag': i === 0 ? `${dx}px` : '0px' } as React.CSSProperties} onPointerDown={i === 0 ? down : undefined}>{label}<small>{i === 0 ? '向左或向右划走' : '下一张'}</small></div>)}</div>; };
const DrawerDemo = () => { const [state, setState] = React.useState<'closed' | 'half' | 'full'>('closed'); const start = React.useRef<number | null>(null); const down = (e: React.PointerEvent) => { start.current = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); }; const move = (e: React.PointerEvent) => { if (start.current === null) return; const delta = start.current - e.clientY; if (delta > 80) setState('full'); else if (delta > 20) setState('half'); else if (delta < -40) setState('closed'); }; return <div className={`drawer-demo state-${state}`}><div className="drawer-panel"><button className="drawer-handle" type="button" aria-label="拖动底部抽屉" onPointerDown={down} onPointerMove={move} onPointerUp={() => { start.current = null; }}><i /></button><strong>底部抽屉</strong><p>半屏查看摘要，全屏查看完整内容。</p><div className="drawer-actions"><button type="button" onClick={() => setState('half')}>半屏</button><button type="button" onClick={() => setState('full')}>全屏</button><button type="button" onClick={() => setState('closed')}>关闭</button></div></div></div>; };

const demos = [
  [1, '按压回弹', '按下缩小，松手过冲后回到原尺寸。', <PressDemo />], [2, '弹性开关', '圆点移动时拉长，到位后回弹成圆。', <ElasticSwitch />], [3, '波纹跟手', '波纹从指针按下的位置开始扩散。', <RippleDemo />],
  [4, '点赞炸一下', '只有点赞与收藏触发粒子成功反馈。', <div className="burst-group"><BurstButton label="点赞" burst /><BurstButton label="收藏" burst /><BurstButton label="普通按钮" burst={false} /></div>], [5, '勾选画出来', '对勾用约 200ms 描边动画画出。', <CheckDemo />], [6, '液态滑块', '填充、滑钮和数值同步变化。', <SliderDemo />],
  [7, '数字滚动', '数字以减速曲线滚动到新值。', <NumberDemo />], [8, '骨架屏', '真实内容替换骨架，尺寸保持不变。', <SkeletonDemo />], [9, '卡片翻面', '沿 Y 轴翻转，正反面隐藏背面。', <FlipDemo />], [10, '汉堡变叉', '三条横线变形为叉号，再反向还原。', <MenuDemo />], [11, '卡片堆叠', '划走顶部卡片，下一张移到顶部。', <StackDemo />], [12, '底部抽屉', '关闭、半屏、全屏与手指拖动。', <DrawerDemo />],
] as const;

const materialPrompts = [
  '[材质] 毛玻璃：卡片背景模糊20像素，白色15%透明，加一圈白色半透明细边；卡片背后放几团柔和的彩色光斑，让模糊有东西可透', '[材质] 液态玻璃：卡片做成厚玻璃质感，边缘像透镜一样把背后的内容轻微弯折、放大，中间保持清晰，边上加一道细高光',
  '[材质] 全息卡片：卡片表面加一层彩虹色反光，随鼠标位置改变角度和颜色，叠一点细闪颗粒；只用在成就徽章和限量会员卡上', '[材质] 拉丝金属：卡片底色做成深灰金属，表面加横向细密的拉丝纹理和一道斜向高光，文字做成压印效果',
  '[光效] 渐变描边：推荐的那张价格卡加1-2像素的渐变边框，从品牌色过渡到透明，其他卡片保持普通灰边', '[光效] 流光边框：卡片边框用一圈渐变色，沿边框匀速旋转，8秒转一圈，不要闪烁',
  '[光效] 跑马灯描边：边框保持暗灰色，只有一小段亮光沿边框循环绕行，亮的那段约占边框长度的十分之一', '[光效] 聚光灯卡片：鼠标在卡片上移动时，鼠标位置亮起一团柔和的圆形光，边框靠近鼠标的部分也跟着变亮；一排卡片都加这个效果',
  '[光效] 光晕：深色页面上，卡片背后放一团品牌色的大范围模糊光晕，从卡片边缘透出来，像卡片浮在光上', '[光效] 发光分割线：分割线中间亮、两端渐隐到透明，中间带一点同色柔光，代替普通灰线',
  '[光效] 3D倾斜：卡片随鼠标位置做3D倾斜，最大不超过10度，表面高光跟着倾斜方向移动，鼠标离开后平滑回正',
];
const MaterialCard = ({ index, title, summary, children, className = '' }: { index: number; title: string; summary: string; children: React.ReactNode; className?: string }) => { const [copied, setCopied] = React.useState(false); const copy = async () => { try { await navigator.clipboard.writeText(materialPrompts[index - 1]); } catch { /* clipboard is optional */ } setCopied(true); window.setTimeout(() => setCopied(false), 1200); }; return <article id={`demo-${index}`} className={`material-card ${className}`}><div className="demo-heading"><span className="demo-number">{String(index).padStart(2, '0')}</span><div><h2>{title}</h2><p>{summary}</p></div></div><div className="material-stage">{children}</div><div className="prompt-row"><code>{materialPrompts[index - 1]}</code><button className="copy-button" type="button" onClick={copy}>{copied ? '已复制' : '复制提示词'}</button></div></article>; };
const Spotlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => { const ref = React.useRef<HTMLDivElement>(null); const move = (e: React.PointerEvent) => { const node = ref.current; const r = node?.getBoundingClientRect(); if (r && node) { node.style.setProperty('--spot-x', `${e.clientX - r.left}px`); node.style.setProperty('--spot-y', `${e.clientY - r.top}px`); } }; return <div ref={ref} className={`spotlight-card ${className}`} onPointerMove={move} onPointerDown={move}>{children}</div>; };
const Tilt = ({ children }: { children: React.ReactNode }) => { const ref = React.useRef<HTMLDivElement>(null); const move = (e: React.PointerEvent) => { const node = ref.current; const r = node?.getBoundingClientRect(); if (!r || !node) return; const x = ((e.clientX - r.left) / r.width - .5) * 2; const y = ((e.clientY - r.top) / r.height - .5) * 2; node.style.setProperty('--tilt-x', `${Math.max(-10, Math.min(10, y * -10))}deg`); node.style.setProperty('--tilt-y', `${Math.max(-10, Math.min(10, x * 10))}deg`); node.style.setProperty('--spot-x', `${e.clientX - r.left}px`); node.style.setProperty('--spot-y', `${e.clientY - r.top}px`); }; const leave = () => { ref.current?.style.setProperty('--tilt-x', '0deg'); ref.current?.style.setProperty('--tilt-y', '0deg'); }; return <div ref={ref} className="tilt-card" onPointerMove={move} onPointerDown={move} onPointerLeave={leave}>{children}</div>; };
const MaterialsPage = () => <main className="materials-page" style={{ '--motion-duration': TOKENS.duration, '--motion-fast': TOKENS.fast, '--motion-ease': TOKENS.ease, '--motion-spring': TOKENS.spring } as React.CSSProperties}>
  <header className="materials-hero"><div><p className="eyebrow">SURFACE & LIGHT · V0.1</p><h1>材质定气质，<br /><em>光效抓眼球。</em></h1><p className="hero-copy">11 个卡片材质与光效样本。每一张都能直接感受、复制、带走。</p></div><nav className="page-nav" aria-label="展示页导航"><a href="./ui-kit.html">原有控件</a><a href="./ui-kit.html?page=micro">微交互 12 条</a><a className="is-current" href="./ui-kit.html?page=materials">材质与光效 11 条</a></nav></header>
  <section className="material-group"><div className="group-label"><span>01 — 04</span><h2>材质定气质</h2><p>先让卡片拥有触感，再让内容获得层次。</p></div><div className="material-grid">
    <MaterialCard index={1} title="毛玻璃" summary="模糊背景，让信息浮在柔和的环境上。"><div className="blob-scene"><i /><i /><div className="frosted-surface"><b>透明感</b><span>20px blur · 15% white</span></div></div></MaterialCard>
    <MaterialCard index={2} title="液态玻璃" summary="厚玻璃边缘高光；CSS 近似，不是真实折射。"><div className="liquid-surface"><b>LIQUID</b><span>CSS approximation · edge lens</span></div></MaterialCard>
    <MaterialCard index={3} title="全息卡片" summary="只给成就徽章和限量会员卡使用彩虹反光。"><div className="holo-row"><div className="holo-card" onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--hx', `${(e.clientX-r.left)/r.width*100}%`); e.currentTarget.style.setProperty('--hy', `${(e.clientY-r.top)/r.height*100}%`); }}><b>✦ 成就</b><small>ACHIEVEMENT</small></div><div className="holo-card" onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--hx', `${(e.clientX-r.left)/r.width*100}%`); e.currentTarget.style.setProperty('--hy', `${(e.clientY-r.top)/r.height*100}%`); }}><b>NO. 0088</b><small>LIMITED MEMBER</small></div></div></MaterialCard>
    <MaterialCard index={4} title="拉丝金属" summary="深灰横纹、斜向高光与压印文字，冷静但有重量。"><div className="metal-surface"><b>STEEL / 04</b><span>BRUSHED MATERIAL</span></div></MaterialCard>
  </div></section>
  <section className="material-group"><div className="group-label"><span>05 — 11</span><h2>光效抓眼球</h2><p>用光线引导视线，不让装饰抢走内容。</p></div><div className="material-grid">
    <MaterialCard index={5} title="渐变描边" summary="只有推荐价格卡拥有品牌色渐变边框。"><div className="price-row"><div className="price-card"><span>基础</span><b>$12</b></div><div className="price-card recommended"><span>推荐</span><b>$24</b></div><div className="price-card"><span>团队</span><b>$48</b></div></div></MaterialCard>
    <MaterialCard index={6} title="流光边框" summary="渐变沿边框匀速旋转，8 秒一圈，不闪烁。"><div className="glow-border"><b>8 SECOND LOOP</b><span>steady light</span></div></MaterialCard>
    <MaterialCard index={7} title="跑马灯描边" summary="暗灰底边框，只有十分之一长度的亮段绕行。"><div className="marquee-border"><b>10% BRIGHT SEGMENT</b></div></MaterialCard>
    <MaterialCard index={8} title="聚光灯卡片" summary="一排卡片都响应指针或手指位置。"><div className="spotlight-row"><Spotlight>01 <small>跟随</small></Spotlight><Spotlight>02 <small>跟随</small></Spotlight><Spotlight>03 <small>跟随</small></Spotlight></div></MaterialCard>
    <MaterialCard index={9} title="光晕" summary="深色展示区里，卡片像浮在品牌色光上。" className="dark-material"><div className="aura-card"><b>FLOATING</b><span>BRAND AURA</span></div></MaterialCard>
    <MaterialCard index={10} title="发光分割线" summary="中间最亮，两端渐隐，柔光替代普通灰线。"><div className="divider-demo"><span /><b>SECTION</b><span /></div></MaterialCard>
    <MaterialCard index={11} title="3D 倾斜" summary="最大 10°，离开后回正；触摸按住也能感受。"><Tilt><b>MOVE YOUR POINTER</b><span>MAX ±10° · SMOOTH RESET</span></Tilt></MaterialCard>
  </div></section>
  <footer>原生 CSS + JavaScript · <a href="./ui-kit.html">回到微交互展示页</a></footer>
</main>;

const MicroInteractionsPage = () => <main style={{ '--motion-duration': TOKENS.duration, '--motion-fast': TOKENS.fast, '--motion-ease': TOKENS.ease, '--motion-spring': TOKENS.spring } as React.CSSProperties}>
  <header className="hero"><div><p className="eyebrow">MICRO-INTERACTIONS · V0.1</p><h1>让每一次点击<br /><em>都有回应。</em></h1><p className="hero-copy">12 个可反复操作的微交互样本。用手指、鼠标或键盘试试看。</p><nav className="page-nav" aria-label="展示页导航"><a href="./ui-kit.html">原有控件</a><a className="is-current" href="./ui-kit.html?page=micro">微交互 12 条</a><a href="./ui-kit.html?page=materials">材质与光效 11 条</a></nav></div><div className="hero-orbit" aria-hidden="true"><i /><i /><i /></div></header>
  <div className="demo-grid">{demos.map(([index, title, summary, child]) => <DemoCard key={index} index={index} title={title} summary={summary}>{child}</DemoCard>)}</div>
  <footer>原生 CSS + JavaScript · 支持浅色 / 深色、触摸、键盘与减少动态效果</footer>
</main>;

createRoot(document.getElementById('root')!).render(<><Navigation />{params.get('page') === 'activity' ? <React.Suspense fallback={null}><ActivityPage /></React.Suspense> : params.get('page') === 'glass' ? <React.Suspense fallback={null}><GlassPage /></React.Suspense> : params.get('page') === 'micro' ? <MicroInteractionsPage /> : params.get('page') === 'materials' ? <MaterialsPage /> : <ControlsPage />}</>);
