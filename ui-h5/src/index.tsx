import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

type Base = { disabled?: boolean; loading?: boolean; 'aria-label'?: string };
export const ZButton = ({ children, disabled, loading, ...props }: Base & { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => <button type="button" disabled={disabled || loading} aria-busy={loading || undefined} {...props}>{children}</button>;
export const ZInput = (props: InputHTMLAttributes<HTMLInputElement>) => <input {...props} aria-label={props['aria-label']} />;
export const ZSelect = ({ options, ...props }: Base & { options: Array<{ label: string; value: string }> } & SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} aria-label={props['aria-label']}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>;
export const ZSwitch = ({ checked, onChange, disabled, ...props }: Base & { checked?: boolean; onChange?: (checked: boolean) => void }) => <button type="button" role="switch" aria-checked={checked} aria-label={props['aria-label']} disabled={disabled} onClick={() => onChange?.(!checked)}>{checked ? 'On' : 'Off'}</button>;
export const ZToast = ({ message, type = 'info' }: { message: ReactNode; type?: 'success' | 'info' | 'warning' | 'error' }) => <div role="status" data-type={type}>{message}</div>;
