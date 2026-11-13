import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tokens/dist/tokens.css';
import './showcase.css';
import './materials.css';

const TOKENS = { duration: '280ms', fast: '200ms', ease: 'cubic-bezier(.2,.8,.2,1)', spring: 'cubic-bezier(.34,1.56,.64,1)' };
const params = new URLSearchParams(location.search);
document.documentElement.dataset.theme = params.get('theme') === 'dark' ? 'dark' : 'light';
const prompts = [
  '给按钮加入按压 96% 缩放、松手过冲后回到 100% 的弹簧反馈。', '让开关圆点移动时横向拉长，到达终点后恢复圆形并轻微回弹。',
  '让点击波纹从指针按下坐标向外扩散，而不是固定从按钮中心开始。', '只给点赞和收藏按钮加入图标回弹与一圈粒子成功动画。',
  '用约 200ms 的描边动画把复选框对勾从左下画到右上。', '让滑块的填充、滑钮和数值使用相同的时长与缓动同步更新。',
  '让数字从旧值滚动到新值，使用减速曲线并在目标值附近停稳。', '让骨架占位与真实内容保持同样尺寸，替换时布局位移为零。',
  '让卡片绕 Y 轴翻面，正反面都隐藏背面，过程中不露反向内容。', '让汉堡三横线在打开时变成叉号，关闭时反向还原。',
  '让卡片堆叠露出下层边缘，划走顶部后下一张平滑移到顶部。', '让底部抽屉支持关闭、半屏、全屏三个停靠点与手指拖动。',
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
const NumberDemo = () => { const [value, setValue] = React.useState(128); return <div className="number-demo"><span key={value} className="rolling-number">{value}</span><button type="button" onClick={() => setValue(v => v + 37)}>增加 37</button></div>; };
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
  '做一张 20px 背景模糊、15% 白色透明度和半透明白边的毛玻璃卡片。', '做一张厚玻璃卡片，用边缘高光和局部缩放阴影近似折射，并注明近似限制。',
  '只给成就徽章和限量会员卡加随指针变化的彩虹全息反光与细闪颗粒。', '做深灰拉丝金属卡片，横向细纹、斜向高光和压印文字保持克制。',
  '只给推荐价格卡使用 1px 品牌色到透明的渐变描边，其他卡片保留灰边。', '给卡片加一圈 8 秒匀速旋转、无闪烁的渐变流光边框。',
  '给暗灰卡片加一段约占周长十分之一的亮光沿边框循环跑马。', '让一排卡片的聚光灯圆心跟随指针，边框靠近指针的位置同步变亮。',
  '在深色页面给卡片背后加品牌色大范围模糊光晕，让卡片像浮在光上。', '用中间最亮、两端渐隐的同色柔光分割线替代普通灰线。',
  '让卡片随指针做不超过 10 度的 3D 倾斜，表面高光同步，离开后平滑回正。',
];
const MaterialCard = ({ index, title, summary, children, className = '' }: { index: number; title: string; summary: string; children: React.ReactNode; className?: string }) => { const [copied, setCopied] = React.useState(false); const copy = async () => { try { await navigator.clipboard.writeText(materialPrompts[index - 1]); } catch { /* clipboard is optional */ } setCopied(true); window.setTimeout(() => setCopied(false), 1200); }; return <article id={`demo-${index}`} className={`material-card ${className}`}><div className="demo-heading"><span className="demo-number">{String(index).padStart(2, '0')}</span><div><h2>{title}</h2><p>{summary}</p></div></div><div className="material-stage">{children}</div><div className="prompt-row"><code>{materialPrompts[index - 1]}</code><button className="copy-button" type="button" onClick={copy}>{copied ? '已复制' : '复制提示词'}</button></div></article>; };
const Spotlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => { const ref = React.useRef<HTMLDivElement>(null); const move = (e: React.PointerEvent) => { const node = ref.current; const r = node?.getBoundingClientRect(); if (r && node) { node.style.setProperty('--spot-x', `${e.clientX - r.left}px`); node.style.setProperty('--spot-y', `${e.clientY - r.top}px`); } }; return <div ref={ref} className={`spotlight-card ${className}`} onPointerMove={move} onPointerDown={move}>{children}</div>; };
const Tilt = ({ children }: { children: React.ReactNode }) => { const ref = React.useRef<HTMLDivElement>(null); const move = (e: React.PointerEvent) => { const node = ref.current; const r = node?.getBoundingClientRect(); if (!r || !node) return; const x = ((e.clientX - r.left) / r.width - .5) * 2; const y = ((e.clientY - r.top) / r.height - .5) * 2; node.style.setProperty('--tilt-x', `${Math.max(-10, Math.min(10, y * -10))}deg`); node.style.setProperty('--tilt-y', `${Math.max(-10, Math.min(10, x * 10))}deg`); node.style.setProperty('--spot-x', `${e.clientX - r.left}px`); node.style.setProperty('--spot-y', `${e.clientY - r.top}px`); }; const leave = () => { ref.current?.style.setProperty('--tilt-x', '0deg'); ref.current?.style.setProperty('--tilt-y', '0deg'); }; return <div ref={ref} className="tilt-card" onPointerMove={move} onPointerDown={move} onPointerLeave={leave}>{children}</div>; };
const MaterialsPage = () => <main className="materials-page" style={{ '--motion-duration': TOKENS.duration, '--motion-fast': TOKENS.fast, '--motion-ease': TOKENS.ease, '--motion-spring': TOKENS.spring } as React.CSSProperties}>
  <header className="materials-hero"><div><p className="eyebrow">SURFACE & LIGHT · V0.1</p><h1>材质定气质，<br /><em>光效抓眼球。</em></h1><p className="hero-copy">11 个卡片材质与光效样本。每一张都能直接感受、复制、带走。</p></div><nav className="page-nav" aria-label="展示页导航"><a href="./ui-kit.html">微交互 12 条</a><a className="is-current" href="./ui-kit.html?page=materials">材质与光效 11 条</a></nav></header>
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

const App = () => <main style={{ '--motion-duration': TOKENS.duration, '--motion-fast': TOKENS.fast, '--motion-ease': TOKENS.ease, '--motion-spring': TOKENS.spring } as React.CSSProperties}>
  <header className="hero"><div><p className="eyebrow">MICRO-INTERACTIONS · V0.1</p><h1>让每一次点击<br /><em>都有回应。</em></h1><p className="hero-copy">12 个可反复操作的微交互样本。用手指、鼠标或键盘试试看。</p><nav className="page-nav" aria-label="展示页导航"><a className="is-current" href="./ui-kit.html">微交互 12 条</a><a href="./ui-kit.html?page=materials">材质与光效 11 条</a></nav></div><div className="hero-orbit" aria-hidden="true"><i /><i /><i /></div></header>
  <div className="demo-grid">{demos.map(([index, title, summary, child]) => <DemoCard key={index} index={index} title={title} summary={summary}>{child}</DemoCard>)}</div>
  <footer>原生 CSS + JavaScript · 支持浅色 / 深色、触摸、键盘与减少动态效果</footer>
</main>;

createRoot(document.getElementById('root')!).render(params.get('page') === 'materials' ? <MaterialsPage /> : <App />);
