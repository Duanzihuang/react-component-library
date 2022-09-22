import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
export declare enum ButtonSize {
    Large = "lg",
    Small = "sm"
}
export declare enum ButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link"
}
interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: 'lg' | 'sm';
    /**设置 Button 的类型 */
    btnType?: 'primary' | 'default' | 'danger' | 'link';
    children: ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * ~~~js
 * import { CustomButton } from 'dzh-react-ui'
 * ~~~
 */
export declare const CustomButton: FC<ButtonProps>;
export default CustomButton;
