var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useContext } from 'react';
import classNames from "classnames";
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
// import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition/transition';
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, className = _a.className, children = _a.children;
    var context = useContext(MenuContext);
    var defaultOpenSubMenus = context.defaultOpenSubMenus;
    // 判断mode为vertical下，默认展开的子menu
    var isOpen = context.mode === 'vertical' ? defaultOpenSubMenus.includes(index) : false;
    var _b = useState(isOpen), open = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': open,
        'is-vertical': context.mode === 'vertical'
    });
    // 处理点击事件（mode为vertical时起作用）
    var handleClick = function (e) {
        console.log('--handleClick---');
        e.preventDefault();
        setOpen(!open);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    // 处理hover事件（mode为horizontal时起作用）
    var timer;
    var handleHover = function (e, open) {
        // e.preventDefault()
        clearTimeout(timer);
        timer = setTimeout(function () {
            setOpen(open);
        }, 300);
    };
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleHover(e, true); },
        onMouseLeave: function (e) { handleHover(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('dzh-submenu', {
            'menu-opened': open
        });
        var childElementComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                // return childElement
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
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
        return _jsx(Transition, __assign({ in: open, timeout: 300, animation: 'zoom-in-top' }, { children: _jsx("ul", __assign({ className: subMenuClasses }, { children: childElementComponent })) }));
    };
    return _jsxs("li", __assign({ className: classes }, hoverEvents, { children: [_jsxs("div", __assign({ className: 'submenu-title' }, clickEvents, { children: [title, _jsx(Icon, { icon: 'angle-down', className: 'arrow-icon' })] })), renderChildren()] }), index);
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
