import { Alert, Button as AntButton, Input as AntInput, Select as AntSelect, Switch as AntSwitch } from 'antd';
import type { ButtonProps, InputProps, SelectProps, SwitchProps } from 'antd';
import type { ReactNode } from 'react';

type AccessibleSwitchProps = SwitchProps & { 'aria-label'?: string };

export const ZButton = ({ disabled, loading, ...props }: ButtonProps) => <AntButton disabled={disabled} loading={loading} {...props} />;
export const ZInput = ({ disabled, ...props }: InputProps) => <AntInput disabled={disabled} aria-label={props['aria-label']} {...props} />;
export const ZSelect = ({ disabled, ...props }: SelectProps) => <AntSelect disabled={disabled} aria-label={props['aria-label']} {...props} />;
export const ZSwitch = ({ disabled, ...props }: AccessibleSwitchProps) => <AntSwitch disabled={disabled} aria-label={props['aria-label']} {...props} />;
export const ZToast = ({ message, type = 'info' }: { message: ReactNode; type?: 'success' | 'info' | 'warning' | 'error' }) => <Alert role="status" title={message} type={type} showIcon />;
