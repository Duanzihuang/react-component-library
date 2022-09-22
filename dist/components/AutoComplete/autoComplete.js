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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Input } from '../Input/input';
import Icon from '../Icon/icon';
import { useDebounce, useClickOutside } from './hook';
import classNames from 'classnames';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    // 键盘事件中高亮索引
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var _e = useState(false), isEnter = _e[0], setIsEnter = _e[1];
    // 点击组件外部关闭搜索结果列表
    var target = useRef(null);
    useClickOutside(target, function () {
        setSuggestions([]);
    });
    var handleSelect = function (item) {
        setInputValue(item.name);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.name;
    };
    var generateDropdown = function () {
        return (_jsx("ul", __assign({ className: "viking-suggestion-list" }, { children: suggestions.map(function (item, index) {
                var cnames = classNames('suggestion-item', {
                    'is-active': index === highlightIndex
                });
                return (_jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
            }) })));
    };
    var debounceValue = useDebounce(inputValue, 500);
    useEffect(function () {
        if (debounceValue && !isEnter) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    console.log('---triggered---', data);
                    setHighlightIndex(-1);
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
    }, [setIsEnter, debounceValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setIsEnter(false);
        setInputValue(value);
    };
    // 设置高亮的索引
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    // 键盘处理事件
    var onKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: // 回车
                setIsEnter(true);
                handleSelect(suggestions[highlightIndex]);
                break;
            case 38: // 向上
                highlight(highlightIndex - 1);
                break;
            case 40: // 向下
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    return (_jsxs("div", __assign({ className: 'viking-auto-complete', ref: target }, { children: [_jsx(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: onKeyDown }, restProps)), loading && (_jsx("ul", { children: _jsx(Icon, { icon: 'spinner', spin: true }) })), suggestions.length > 0 && generateDropdown()] })));
};
