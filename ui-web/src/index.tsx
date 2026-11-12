import { Alert, Button as AntButton, Input as AntInput, Select as AntSelect, Switch as AntSwitch } from 'antd';
import type { ButtonProps, InputProps, SelectProps, SwitchProps } from 'antd';
import type { ReactNode } from 'react';

type AccessibleSwitchProps = SwitchProps & { 'aria-label'?: string };

export const ZButton = ({ disabled, loading, type = 'primary', ...props }: ButtonProps) => <AntButton className="zxgc-button" type={type} disabled={disabled} loading={loading} {...props} />;
export const ZInput = ({ disabled, ...props }: InputProps) => <AntInput className="zxgc-input" disabled={disabled} aria-label={props['aria-label']} {...props} />;
export const ZSelect = ({ disabled, ...props }: SelectProps) => <AntSelect className="zxgc-select" disabled={disabled} aria-label={props['aria-label']} {...props} />;
export const ZSwitch = ({ disabled, ...props }: AccessibleSwitchProps) => <AntSwitch className="zxgc-switch" disabled={disabled} aria-label={props['aria-label']} {...props} />;
export const ZToast = ({ message, type = 'info' }: { message: ReactNode; type?: 'success' | 'info' | 'warning' | 'error' }) => <Alert role="status" title={message} type={type} showIcon />;
