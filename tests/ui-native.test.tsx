import { act, create } from 'react-test-renderer';
import { describe, expect, it, vi } from 'vitest';
import { ZButton, ZInput, ZSelect, ZSwitch, ZToast } from '../ui-native/src/index';
import { nativeTheme } from '../tokens/dist/native-theme';

describe('ui-native controls', () => {
  it('renders all controls with accessibility labels', () => {
    let tree: ReturnType<typeof create>;
    act(() => { tree = create(<><ZButton accessibilityLabel="提交">提交</ZButton><ZInput accessibilityLabel="名称" /><ZSelect accessibilityLabel="类型" options={[]} /><ZSwitch accessibilityLabel="通知" /><ZToast message="已保存" /></>); });
    for (const name of ['提交', '名称', '类型', '通知']) expect(tree!.root.findAllByProps({ accessibilityLabel: name }).length).toBeGreaterThan(0);
    expect(tree!.toJSON()).toBeTruthy();
  });
  it('marks disabled and loading buttons unavailable before a press', () => {
    const onPress = vi.fn();
    let tree: ReturnType<typeof create>;
    act(() => { tree = create(<><ZButton disabled accessibilityLabel="禁用" onPress={onPress}>禁用</ZButton><ZButton loading accessibilityLabel="加载" onPress={onPress}>加载</ZButton></>); });
    for (const name of ['禁用', '加载']) expect(tree!.root.findAllByProps({ accessibilityLabel: name }).some((node) => node.props.disabled === true && node.props.style?.backgroundColor === nativeTheme.light.mutedText && node.props.style?.marginBottom === 8)).toBe(true);
    expect(onPress).not.toHaveBeenCalled();
  });
});
