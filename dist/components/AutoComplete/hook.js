import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var timer = window.setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debounceValue;
}
function useClickOutside(targetRef, callback) {
    useEffect(function () {
        var onClick = function (e) {
            if (!targetRef.current || targetRef.current.contains(e.target))
                return;
            callback();
        };
        document.addEventListener('click', onClick);
        return function () {
            document.removeEventListener('click', onClick);
        };
    }, [targetRef, callback]);
}
export { useDebounce, useClickOutside };
