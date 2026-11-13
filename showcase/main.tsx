import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tokens/dist/tokens.css';
import './showcase.css';

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

const App = () => <main style={{ '--motion-duration': TOKENS.duration, '--motion-fast': TOKENS.fast, '--motion-ease': TOKENS.ease, '--motion-spring': TOKENS.spring } as React.CSSProperties}>
  <header className="hero"><div><p className="eyebrow">MICRO-INTERACTIONS · V0.1</p><h1>让每一次点击<br /><em>都有回应。</em></h1><p className="hero-copy">12 个可反复操作的微交互样本。用手指、鼠标或键盘试试看。</p></div><div className="hero-orbit" aria-hidden="true"><i /><i /><i /></div></header>
  <div className="demo-grid">{demos.map(([index, title, summary, child]) => <DemoCard key={index} index={index} title={title} summary={summary}>{child}</DemoCard>)}</div>
  <footer>原生 CSS + JavaScript · 支持浅色 / 深色、触摸、键盘与减少动态效果</footer>
</main>;

createRoot(document.getElementById('root')!).render(<App />);
