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
import { jsx as _jsx } from "react/jsx-runtime";
import axios from 'axios';
var Index = function () {
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            var file = files[0];
            var formData = new FormData();
            formData.append(file.name, file);
            axios
                .post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (res) {
                console.log(res);
            });
        }
    };
    return (_jsx("div", __assign({ style: { marginTop: '100px', marginLeft: '100px' } }, { children: _jsx("input", { type: 'file', onChange: handleFileChange }) })));
};
export default Index;
