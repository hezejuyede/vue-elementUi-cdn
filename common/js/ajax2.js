/* 获取value字节长度 getBytesLength() 字符编码数值对应的存储长度：
 * UCS-2编码(16进制) UTF-8 字节流(二进制)
 * 0000 - 007F 0xxxxxxx （1字节）
 * 0080 - 07FF 110xxxxx 10xxxxxx （2字节）
 * 0800 - FFFF 1110xxxx 10xxxxxx 10xxxxxx （3字节）
 */
String.prototype.getBytesLength = function () {
    var totalLength = 0;
    var charCode;
    for (var i = 0; i < this.length; i++) {
        charCode = this.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength++;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
        } else {
            totalLength += 4;
        }
    }
    return totalLength;
};

var AJAX2 = {
    /**
     * 获取公共编码
     * @param {String} codeType code编号
     * @param {Function} callback 回调
     */
    GetPubcode: function (codeType, callback) {
        $.ajax({
            url: encodeURI(CONFIG.serverUrl + CONFIG.pubcodeUrl + codeType + '.json'),
            dataType: 'json',
            async: false,
            success: function (data) {
                callback && callback(data);
            }
        });
    },
    /**
     * 数据获取
     * @param {String, Object} url 可接受地址和配置项目
     * @param {Object, Function} data 可接受传入数据和回调方法
     * @param {Function} callback
     */
    Async: function (url, data, callback) {
        var config = {},
            _data = {},
            _callback = callback || function () {
            };
        if (typeof url === 'string') {
            if (url.indexOf('oprator') > 0 || url.indexOf('operator') > 0) {
                // 业务接口
                config.url = CONFIG.serverUrl + '/' + CONFIG.serverName + CONFIG.checkPermission + url;
            } else {
                config.url = CONFIG.serverUrl + '/' + CONFIG.serverName + url;
            }
        } else {
            config = url;
            if (config.disabledEl && config.disabledEl.hasClass('disabled')) {
                return;
            }
            if (config.disabledEl) {
                config.disabledEl.addClass('disabled');
            }
            if (config.url.indexOf('oprator') > 0 || config.url.indexOf('operator') > 0) {
                // 业务接口
                config.url = CONFIG.serverUrl + '/' + CONFIG.serverName + CONFIG.checkPermission + config.url;
            } else if (config.url.indexOf('outer') > 0 || config.url.indexOf('outer') > 0) {
                // 业务接口
                config.url = CONFIG.serverUrl + '/' + CONFIG.serverName + CONFIG.checkPermission + config.url;
            } else {
                config.url = CONFIG.serverUrl + '/' + CONFIG.serverName + config.url;
            }
        }
        if (typeof data === 'object') {
            _data = data;
        }
        if (typeof data === 'function') {
            _callback = data;
        }
        var opt = $.extend({
                disabledEl: '',
                disabledElRecover: false,
                url: '',
                type: 'POST',
                data: _data,
                dataType: 'json',
                query: '',
                isLoading: false,
                isUpload: false,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'accessToken': AJAX2.GetToken(),
                    'wsgwType': 'html'
                },
                onend: function() {}
            },
            config
        );
        if (opt.isUpload) {
            opt.processData = false;
            opt.contentType = false;
            opt.headers = {
                'accessToken': AJAX2.GetToken()
            };
        }
        // 原方式form表单传值
        if ((opt.url.indexOf('operator') > 0 || opt.url.indexOf('oprator') > 0) && !opt.special) {
            opt.headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'accessToken': AJAX2.GetToken(),
                'wsgwType': 'html'
            };
        }
        // 加密
        if (opt.data){
            if (typeof opt.data === 'string') {
                // opt.data = JSON.stringify(AJAX2.Encrypt(AJAX2.GetToken(), JSON.parse(opt.data)));
            } else if (typeof opt.data === 'object') {
                opt.data = AJAX2.Encrypt(AJAX2.GetToken(), opt.data);
            }
        }

        opt.success = function (data) {            

            if(typeof data === 'string'){
                $.error(MSG.serverError);
            } else if (opt.url.indexOf('pubcode') > -1 ) {
                // 标准编码
                _callback(data);
                return;
            }
            data = AJAX2.Decrypt(data);
            if (data && (data.code === '1' || data.code === 1)) {

                // 补丁 增加对内容运营的base64转码
                if (opt.url.indexOf('/osg-omgmt1001/operator/cont001/f02') > -1 || opt.url.indexOf('/osg-omgmt1001/operator/cont001/f03') > -1) {
                    console.log('fix');
                    
                    for(var key in data.data) {
                        if ((data.data[key] + '').indexOf('BASE64:') > -1) {
                            var base64 = new Base64();
                            data.data[key] = base64.decode(data.data[key].substring(7));
                        } else {
                            data.data[key] = data.data[key];
                        }
                    }
                }

                _callback(data.data);
                return;
            } else if (data && data.aaData) {
                // 表格
                _callback(data);
                return;
            } else {
                // 移除禁用标识
                if (opt.disabledEl) {
                    opt.disabledEl.removeClass('disabled');
                }
            }
            if (data && (data.code === '-403' || data.code === -403)) {
                $.error(MSG.accessDenied, function () {
                    if(location.hostname.indexOf('local') < 0 && location.hostname.indexOf('127.') < 0){
                        location.href = '/login.html';
                    }
                });
            } else {
                $.error(MSG.serverError);
            }
        };
        opt.error = function (e) {
            // 移除禁用标识
            if (opt.disabledEl) {
                opt.disabledEl.removeClass('disabled');
            }
            $.error(MSG.serverError);
        };
        opt.complete = function () {
            opt.onend();
            if (opt.isLoading) {
                $.hideLoading();
            }
        };
        if (opt.isLoading) {
            $.loading();
        }
        $.ajax(opt);
    },
    /**
     * 获取登陆token, 加密时务必使用该方法获取token
     * @returns {String} token 或者  '_'
     */
    GetToken: function () {
        var _token = $.getCookie('accessToken');
        if (null == _token || '' === _token) {
            _token = '_';
        }
        return _token;
    },
    /**
     * 数据加密方法
     * @param token 登陆token
     * @param data 原始数据
     * @returns {Object} 加密过后的数据
     */
    Encrypt: function (token, data) {
        var obj = {};
        //存放所有的key,以"@"隔开
        var _sort = '';
        //存放要加密value以"~"为标识符
        var _valueSign = '';
        var _valueString = '';
        var format = function (key, value) {
            _valueString = '';
            if (value != undefined && value !== '' && value != null && String(value).getBytesLength() < 100) {
                // 加密后的值跟它的key相对应
                _valueString = '~' + SG_sm2Encrypt('' + value, ENCRYPT.PUB_KEY);
                obj[key] = _valueString;
                _valueSign += _valueString;
                // 以"@"拼接key值,存放在_sort中;
                _sort += key + '@';
            } else {
                obj[key] = value;
            }
        };
        if (data instanceof Array) {
            // 表格时为数组
            $.each(data, function (key, obj) {
                format(obj.name, obj.value);
            });
        } else {
            $.each(data, function (key, value) {
                format(key, value);
            });
        }

        //对所有加密的的value进行SM3运算
        obj._md5 = SG_sm3encrypt(_valueSign + token);
        obj._sort = _sort;

        // 加密解密控制
        return ENCRYPT.ON ? obj : data;
    },
    /**
     * 数据解密
     * @param {String} stringData 服务器返回的加密数据(string/null/object)
     * @returns {Object} 返回解密后的数据
     */
    Decrypt: function (stringData) {
        var result = stringData;
        try {
            if (typeof stringData === 'string') {
                result = JSON.parse(stringData);
            }
            // 兼容加密和非加密
            if (result !== null && typeof result === 'object' && result[ENCRYPT.RESPONSE]) {
                result = SM4.decode({input: result[ENCRYPT.RESPONSE], key: ENCRYPT.PRI_KEY});
            }
        } catch (e) {
            console.log(e);
        } finally {
            return result;
        }
    },
    String: function (url, data) {
        url = CONFIG.serverUrl + '/' + CONFIG.serverName + CONFIG.checkPermission + url;
        var token = AJAX2.GetToken();
        data = AJAX2.Encrypt(token, data);
        if (token == null) {
            $.error(MSG.accessDenied, function () {
                // 修改路径
                window.location.href = '/login.html';
            });
            return false;
        }
        var result = "";
        var urlPost = url.urlGetToPost(data);
        $.ajax({
            type: "POST",
            url: encodeURI(urlPost.url),
            headers: {
                'accessToken': AJAX2.GetToken(),
                'wsgwType': 'html'
            },
            data: urlPost.postData,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            dataType: 'html',
            traditional: true,
            error: function () {
                $.error(MSG.serverError);
            },
            success: function (msg) {
                var res = JSON.parse(msg);
                if (res.code) {
                    if (+res.code === -403) {
                        $.error(MSG.accessDenied, function () {
                            location.href = '/login.html';
                        });
                    } else if (+res.code === 1) {
                        result = AJAX2.Decrypt(res.data);
                    } else {
                        $.error(MSG.serverError);
                    }
                } else {
                    result = AJAX2.Decrypt(msg);
                }
            },
            complete: function(){
                // AJAX2._asyncUrls.shift();
            }
        });
        return result;
    }
};