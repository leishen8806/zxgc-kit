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

createRoot(document.getElementById('root')!).render(<Demo />);
