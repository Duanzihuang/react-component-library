import React, { FC, CSSProperties, createContext, useState } from 'react'
import classNames from "classnames"
import { MenuItemProps } from './menuItem'

type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string
    className?: string
    /**菜单类型 横向或者纵向 */
    mode?: 'horizontal' | 'vertical'
    style?: CSSProperties
    /**点击菜单项触发的回掉函数 */
    onSelect?: SelectCallback
    children?: React.ReactNode,
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[]
}

interface IMenuContext {
    index: string
    onSelect?: SelectCallback,
    mode?: 'horizontal' | 'vertical',
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'dzh-react-ui'
 * ~~~
 */
export const Menu: FC<MenuProps> = props => {
    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('dzh-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    })
    const handleClick = (index: string) => {
        setActive(index)
        onSelect?.(index)
    }
    // 传递给子孙组件的内容
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    // 渲染子组件，并且规定，子组件必须是MenuItem
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            // console.log('---menu-item-index---', index)
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // return childElement
                // 利用React.cloneElement给每个MenuItem添加index属性
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return <ul className={classes} style={style} data-testid="test-menu">
        <MenuContext.Provider value={passedContext}>
            {/* {children} */}
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu