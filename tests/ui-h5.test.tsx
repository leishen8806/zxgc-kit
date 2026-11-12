import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ZButton, ZInput, ZSelect, ZSwitch, ZToast } from '../ui-h5/src/index';

describe('ui-h5 controls', () => {
  it('renders all controls with accessible names', () => {
    render(<><ZButton aria-label="提交">提交</ZButton><ZInput aria-label="名称" /><ZSelect aria-label="类型" options={[]} /><ZSwitch aria-label="通知" /><ZToast message="已保存" /></>);
    for (const name of ['提交', '名称', '类型', '通知']) expect(screen.getByLabelText(name)).toBeTruthy();
    expect(screen.getByRole('status').textContent).toContain('已保存');
  });
  it('blocks disabled and loading button repeats', () => {
    const onClick = vi.fn();
    render(<><ZButton disabled aria-label="禁用" onClick={onClick}>禁用</ZButton><ZButton loading aria-label="加载" onClick={onClick}>加载</ZButton></>);
    fireEvent.click(screen.getByLabelText('禁用')); fireEvent.click(screen.getByLabelText('加载'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
