import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tokens/dist/tokens.css';
import * as Web from '../ui-web/src/index';
import * as H5 from '../ui-h5/src/index';
import * as Native from '../ui-native/src/index';
import './showcase.css';

type Target = 'web' | 'h5' | 'native';
const target = (new URLSearchParams(location.search).get('target') as Target) || 'web';
document.documentElement.dataset.theme = new URLSearchParams(location.search).get('theme') === 'dark' ? 'dark' : 'light';
const Controls = { web: Web, h5: H5, native: Native }[target] || Web;
const native = target === 'native';

const Demo = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [message, setMessage] = React.useState('等待操作');
  const buttonProps = native ? { onPress: () => setMessage('操作已提交'), accessibilityLabel: '主要操作' } : { onClick: () => setMessage('操作已提交'), 'aria-label': '主要操作' };
  const disabledProps = native ? { disabled: true, accessibilityLabel: '禁用操作' } : { disabled: true, 'aria-label': '禁用操作' };
  const switchProps = native ? { value: enabled, onValueChange: setEnabled, accessibilityLabel: '启用通知' } : { checked: enabled, onChange: (event: React.ChangeEvent<HTMLInputElement> | boolean) => setEnabled(typeof event === 'boolean' ? event : event.target.checked), 'aria-label': '启用通知' };
  const inputProps = native ? { accessibilityLabel: '名称' } : { 'aria-label': '名称' };
  const selectProps = native ? { accessibilityLabel: '类型' } : { 'aria-label': '类型' };

  return <main>
    <header><h1>智序前端控件</h1><p>{target.toUpperCase()} 真实控件渲染 · <a href="?target=web">Web</a> · <a href="?target=h5">H5</a> · <a href="?target=native">Native Web</a></p></header>
    <section><h2>Button</h2><p>什么时候用：提交当前步骤的主要动作。引用：<code>{`ui-${target}/src`}</code> 的 <code>ZButton</code></p><Controls.ZButton {...buttonProps}>主要操作</Controls.ZButton><Controls.ZButton {...disabledProps}>禁用</Controls.ZButton><Controls.ZButton {...disabledProps} loading>加载中</Controls.ZButton></section>
    <section><h2>Input</h2><p>什么时候用：收集短文本，标签和占位文字必须说明内容。引用：<code>ZInput</code></p><Controls.ZInput {...inputProps} placeholder="请输入名称" /></section>
    <section><h2>Select</h2><p>什么时候用：从有限选项中选择一个值。引用：<code>ZSelect</code></p><Controls.ZSelect {...selectProps} placeholder="选择端" options={[{ label: 'Web', value: 'web' }, { label: 'H5', value: 'h5' }, { label: 'Native', value: 'native' }]} /></section>
    <section><h2>Switch</h2><p>什么时候用：即时切换一个独立开关。引用：<code>ZSwitch</code></p><Controls.ZSwitch {...switchProps} /></section>
    <section><h2>Toast</h2><p>什么时候用：反馈已完成或需要注意的结果，不承载下一步操作。引用：<code>ZToast</code></p><Controls.ZToast message={message} type="success" /></section>
  </main>;
};

type ActivityKind = 'find' | 'write' | 'build' | 'analyze' | 'run';
type ActivityEvent = { id: number; kind: ActivityKind; title: string; detail: string; seconds: number; tokens: number; status?: 'ok' | 'fail' };

const activityMap: Record<ActivityKind, { label: string; scene: string; action: string; color: string }> = {
  find: { label: '找和读', scene: '检索车间', action: '机械臂翻找并取件', color: '#2b7fff' },
  write: { label: '写和改', scene: '织造车间', action: '织机走梭，布面长出一行', color: '#8d5cff' },
  build: { label: '构建和验证', scene: '装配线', action: '传送带过检，点亮一盏灯', color: '#00a878' },
  analyze: { label: '分析', scene: '芯片台', action: '电路走线，波形稳定', color: '#f08c46' },
  run: { label: '运行和反馈', scene: '节拍台', action: '节拍落点，反馈已返回', color: '#d34d70' },
};
const events: ActivityEvent[] = [
  { id: 1, kind: 'find', title: '搜索 createOrder', detail: '在 3 个文件里找 createOrder', seconds: 2.4, tokens: 182 },
  { id: 2, kind: 'find', title: '读取调用方', detail: '打开订单服务与测试夹具', seconds: 1.6, tokens: 96 },
  { id: 3, kind: 'write', title: '改造校验', detail: '补上输入边界与错误文案', seconds: 3.2, tokens: 418 },
  { id: 4, kind: 'build', title: '运行检查', detail: '编译通过，测试灯全部点亮', seconds: 4.1, tokens: 235 },
  { id: 5, kind: 'analyze', title: '审查结果', detail: '发现一次慢查询，正在标记', seconds: 2.8, tokens: 301, status: 'fail' },
  { id: 6, kind: 'run', title: '重试反馈', detail: '修正后重试，结果已返回', seconds: 1.9, tokens: 144 },
];

const Scene = ({ kind, paused, failed }: { kind: ActivityKind; paused: boolean; failed: boolean }) => {
  const meta = activityMap[kind];
  return <div className={`activity-scene scene-${kind} ${paused ? 'is-paused' : ''} ${failed ? 'is-failed' : ''}`} role="img" aria-label={`${meta.scene}：${meta.action}`}>
    <svg viewBox="0 0 720 240" aria-hidden="true"><path className="scene-track" d="M50 178 H670" /><path className="scene-wave" d="M50 150 C110 70 150 210 220 130 S340 190 410 105 S530 195 670 90" /><circle className="scene-node node-a" cx="180" cy="150" r="24" /><circle className="scene-node node-b" cx="360" cy="140" r="18" /><circle className="scene-node node-c" cx="560" cy="120" r="28" /><path className="scene-arm" d="M180 150 L220 88 L275 150" /><path className="scene-loom" d="M330 65 V185 M390 65 V185 M330 78 H390 M330 110 H390 M330 142 H390" /><rect className="scene-chip" x="500" y="70" width="86" height="72" rx="12" /></svg>
    <div className="scene-caption"><strong>{meta.scene}</strong><span>{meta.action}</span>{failed && <b>这里卡住了：第 5 步需要复查慢查询</b>}</div>
  </div>;
};

const ActivityPage = () => {
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const [reduced, setReduced] = React.useState(false);
  const current = events[index];
  const meta = activityMap[current.kind];
  React.useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setPlaying(v => !v); } if (e.key === 'ArrowRight') setIndex(v => Math.min(events.length - 1, v + 1)); if (e.key === 'ArrowLeft') setIndex(v => Math.max(0, v - 1)); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, []);
  React.useEffect(() => { if (!playing || reduced) return; const timer = window.setTimeout(() => setIndex(v => v >= events.length - 1 ? 0 : v + 1), 1600 / speed); return () => window.clearTimeout(timer); }, [playing, speed, reduced, index]);
  return <main className="activity-page">
    <header className="activity-header"><div><p className="activity-kicker">AI ACTIVITY / DEMO DATA</p><h1>现在，<em>AI 在干什么？</em></h1><p>把工具调用变成看得懂的动作。数据为示例事件流，不接线上运行记录。</p></div><span className="demo-pill">示例数据</span></header>
    <section className="action-map" aria-label="动作对照表">{(Object.keys(activityMap) as ActivityKind[]).map(kind => <button key={kind} className={kind === current.kind ? 'map-item active' : 'map-item'} onClick={() => setIndex(events.findIndex(e => e.kind === kind))}><i style={{ background: activityMap[kind].color }} />{activityMap[kind].label}<small>{activityMap[kind].scene}</small></button>)}</section>
    <section className="activity-stage"><div className="stage-toolbar"><button type="button" onClick={() => setPlaying(v => !v)} aria-label={playing ? '暂停事件流' : '播放事件流'}>{playing ? '暂停' : '播放'}</button><label>速度 <select value={speed} onChange={e => setSpeed(Number(e.target.value))}><option value="0.5">0.5x</option><option value="1">1x</option><option value="2">2x</option></select></label><button type="button" onClick={() => setReduced(v => !v)} aria-pressed={reduced}>{reduced ? '已减少动效' : '减少动效'}</button></div>{reduced ? <ol className="reduced-list">{events.map((event, i) => <li className={i === index ? 'current' : ''} key={event.id}><b>{event.title}</b><span>{event.detail}</span></li>)}</ol> : <Scene kind={current.kind} paused={!playing} failed={current.status === 'fail'} />}</section>
    <section className="activity-status"><div><span>当前在做什么</span><strong>{current.detail}</strong></div><div><span>已用时间</span><strong>{events.slice(0, index + 1).reduce((sum, event) => sum + event.seconds, 0).toFixed(1)}s</strong></div><div><span>本轮步骤</span><strong>{index + 1} / {events.length}</strong></div><div><span>示例 token</span><strong>{events.slice(0, index + 1).reduce((sum, event) => sum + event.tokens, 0)}</strong></div></section>
    <section className="activity-evidence"><div><h2>步骤耗时</h2><div className="bars">{events.map((event, i) => <i key={event.id} className={i === index ? 'bar active' : 'bar'} style={{ height: `${event.seconds * 20 + 12}px` }} title={`${event.title} ${event.seconds}s`} />)}</div></div><div><h2>节奏波形</h2><svg className="mini-wave" viewBox="0 0 300 80" aria-label="步骤节奏波形"><path d="M0 44 L30 44 38 18 48 62 58 44 100 44 110 30 120 56 130 44 180 44 188 12 198 68 208 44 250 44 260 25 270 58 280 44 300 44" /></svg></div></section>
    <nav className="event-list" aria-label="事件回看">{events.map((event, i) => <button key={event.id} className={i === index ? 'event-row current' : 'event-row'} onClick={() => setIndex(i)}><span>{String(i + 1).padStart(2, '0')}</span><b>{event.title}</b><small>{event.detail}</small>{event.status === 'fail' ? <em>需复查</em> : <em className="ok">完成</em>}</button>)}</nav>
  </main>;
};

createRoot(document.getElementById('root')!).render(new URLSearchParams(location.search).get('page') === 'activity' ? <ActivityPage /> : <Demo />);
