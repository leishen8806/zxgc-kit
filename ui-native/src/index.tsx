import { Pressable, Switch, Text, TextInput, View } from 'react-native';
import type { ReactNode } from 'react';

type Base = { disabled?: boolean; loading?: boolean; accessibilityLabel?: string };
export const ZButton = ({ children, disabled, loading, onPress, accessibilityLabel }: Base & { children: ReactNode; onPress?: () => void }) => {
  const unavailable = disabled || loading;
  return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} accessibilityState={{ disabled: unavailable, busy: loading }} disabled={unavailable} onPress={onPress} style={{ opacity: unavailable ? 0.5 : 1 }}><Text>{children}</Text></Pressable>;
};
export const ZInput = (props: Base & { value?: string; onChangeText?: (value: string) => void }) => <TextInput accessibilityLabel={props.accessibilityLabel} editable={!props.disabled} value={props.value} onChangeText={props.onChangeText} />;
export const ZSelect = ({ options, value, onChange, accessibilityLabel }: Base & { options: Array<{ label: string; value: string }>; value?: string; onChange?: (value: string) => void }) => <View accessibilityLabel={accessibilityLabel}>{options.map((option) => <Pressable key={option.value} accessibilityRole="button" onPress={() => onChange?.(option.value)}><Text>{option.label}{option.value === value ? ' ✓' : ''}</Text></Pressable>)}</View>;
export const ZSwitch = ({ value, onValueChange, disabled, accessibilityLabel }: Base & { value?: boolean; onValueChange?: (value: boolean) => void }) => <Switch accessibilityLabel={accessibilityLabel} disabled={disabled} value={value} onValueChange={onValueChange} />;
export const ZToast = ({ message, accessibilityLabel = '提示' }: { message: ReactNode; accessibilityLabel?: string }) => <View accessibilityRole="alert" accessibilityLabel={accessibilityLabel}><Text>{message}</Text></View>;

