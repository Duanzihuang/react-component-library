import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
// export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string
    /**设置 Button 的禁用 */
    disabled?: boolean
    // size?: ButtonSize
    /**设置 Button 的尺寸 */
    size?: 'lg' | 'sm'
    /**设置 Button 的类型 */
    btnType?: 'primary' | 'default' | 'danger' | 'link'
    children: ReactNode
    href?: string
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * ~~~js
 * import { CustomButton } from 'dzh-react-ui'
 * ~~~
 */
export const CustomButton: FC<ButtonProps> = props => {
    const { btnType, className, disabled, size, children, href, ...restProps } = props
    // btn btn-lg btn-primary
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })

    if (btnType === ButtonType.Link && href) {
        return (
            <a href={href} {...restProps} className={classes}>{children}</a>
        )
    } else {
        return <button {...restProps} className={classes} disabled={disabled}>{children}</button>
    }
}

CustomButton.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default CustomButton