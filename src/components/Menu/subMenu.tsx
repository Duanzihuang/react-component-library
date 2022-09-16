import React, { useState, useContext } from 'react'
import classNames from "classnames"
import { MenuContext } from './menu'
import Icon from '../Icon/icon'
// import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string
    title: string
    className?: string
    children: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
    const context = useContext(MenuContext)
    const defaultOpenSubMenus = context.defaultOpenSubMenus as Array<string>
    // 判断mode为vertical下，默认展开的子menu
    const isOpen = context.mode === 'vertical' ? defaultOpenSubMenus.includes(index!) : false
    const [open, setOpen] = useState(isOpen)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': open,
        'is-vertical': context.mode === 'vertical'
    })


    // 处理点击事件（mode为vertical时起作用）
    const handleClick = (e: React.MouseEvent) => {
        console.log('--handleClick---')
        e.preventDefault()
        setOpen(!open)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    // 处理hover事件（mode为horizontal时起作用）
    let timer: any
    const handleHover = (e: React.MouseEvent, open: boolean) => {
        // e.preventDefault()
        clearTimeout(timer)
        timer = setTimeout(() => {

            setOpen(open)
        }, 300);
    }
    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleHover(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleHover(e, false) }
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('dzh-submenu', {
            'menu-opened': open
        })

        const childElementComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<SubMenuProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                // return childElement
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })

        // return <ul className={subMenuClasses}>
        //     {childElementComponent}
        // </ul>

        // return (
        //     <CSSTransition in={open} timeout={300} classNames='zoom-in-top' appear unmountOnExit>
        //         <ul className={subMenuClasses}>
        //             {childElementComponent}
        //         </ul>
        //     </CSSTransition>
        // )

        return <Transition in={open} timeout={300} animation='zoom-in-top'>
            <ul className={subMenuClasses}>
                {childElementComponent}
            </ul>
        </Transition>
    }

    return <li key={index} className={classes} {...hoverEvents}>
        {/* 标题部分 */}
        <div className='submenu-title' {...clickEvents}>{title}
            <Icon icon='angle-down' className='arrow-icon' />
        </div>
        {/* 子menu部分 */}
        {renderChildren()}
    </li>
}

SubMenu.displayName = 'SubMenu'

export default SubMenu