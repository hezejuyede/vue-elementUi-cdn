$.extend({
    /**
     * 获取连接参数
     */
    getUrlParms: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    },
    getUrlParams: function (name) {
        return this.getUrlParms.call(this, name);
    },
    loadingTime: null,
    /**
     * 加载动画
     */
    loading: function (config) {
        clearTimeout(this.loadingTime);
        var opt = $.extend({
            autoHide: 0, // 自动隐藏，0为不自动，大于0为自动隐藏的毫秒数
            isBg: true // 是否显示半透明黑色背景
        },
            config || {}
        );
        var appendContent = '<div id="loading"></div>';
        if (opt.isBg) {
            appendContent += '<div id="loading-bg"></div>';
        }
        $('body').append(appendContent);
        if (opt.autoHide > 0) {
            this.loadingTime = setTimeout(function () {
                $('#loading, #loading-bg').remove();
            }, opt.autoHide);
        }
    },
    hideLoading: function () {
        $('#loading, #loading-bg').remove();
    },
    tips: function (content, type, timer, callback) {
        var $div = $('<div id="tips" class="' + type + '"></div>');
        $('body').append($div);
        setTimeout(function () {
            $div.html(content).addClass('show');
        }, 10);
        setTimeout(function () {
            $div.removeClass('show');
            callback && callback();
            setTimeout(function () {
                $div.remove();
            }, 500);
        }, timer || 3000);
    },
    error: function (content, callback) {
        this.tips((typeof content === 'function' || content === undefined) ? MSG.actFailed : content, 'error', null, typeof content === 'function' ? content : callback);
    },
    warm: function (content, callback) {
        this.tips(content, 'warm', null, callback);
    },
    success: function (content, callback) {
        this.tips((typeof content === 'function' || content === undefined) ? MSG.actSuccess : content, 'success', null, typeof content === 'function' ? content : callback);
    },
    /**
     * 获取cookie
     */
    getCookie: function (objName) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) {
                return unescape(temp[1]);
            }
        }
    },
    /**
     * 添加cookie
     */
    addCookie: function (objName, objValue, objHours) {
        //添加cookie
        var str = objName + '=' + escape(objValue);
        if (objHours !== 0) {
            //为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours * 60 * 60 * 1000; //自己设置cookie时间
            date.setTime(date.getTime() + ms); //注意为毫秒值
            str += '; expires=' + date.toGMTString() + '; path=/';
        }
        document.cookie = str;
    },
    /**
     * 模板
     * @param {string} cont 模板字符串
     * @param {string, array} data 模板数据
     */
    tpl: function (cont, data) {
        return cont.replace(/\{\{([^}]*)\}\}/gim, (match, key) =>
            data[key] === undefined ? "" : data[key]
        );
    },

    /**
     * 弹窗
     * @param {Object} config 配置信息
     */
    pop: function (config) {
        const opt = $.extend({
            cont: '',
            isCenter: false,
            title: MSG.warmTitle,
            yesText: MSG.sureText,
            cancleText: MSG.cancelText,
            oneBtn: false,
            width: 600,
            btnType: 'primary',
            height: 'auto',
            onInit: function () { },
            yes: function () { },
            closed: function () { }
        }, config);
        const $pop = $(`
            <div class="cover-pop"></div>
            <div id="pop" style="width:${(opt.width + '').indexOf('%') > -1 ? opt.width : opt.width + 'px'}">
                <div class="pop">
                    <div class="header">
                        <div class="title">${opt.title}</div>
                        <a class="close js-pop-cancel">&times;</a>
                    </div>
                    <div class="cont${opt.isCenter ? ' center' : ''}"${opt.height !== 'auto' ? ` style="height:${opt.height - 120}px"` : ''}>
                        <div class="cont-inner">${opt.cont}</div>
                    </div>
                    <div class="footer">
                        <button class="btn btn-${opt.btnType} js-pop-ok js-pop-cancel">${opt.yesText}</button>
                        ${opt.oneBtn ? `` : `<button class="btn cancel js-pop-cancel">${opt.cancleText}</button>`}
                    </div>
                </div>
            </div>
        `);
        $pop.appendTo('body');
        opt.onInit($pop);
        setTimeout(() => {
            $pop.addClass('show');
        }, 20);
        setTimeout(() => {
            $pop.addClass('shown').removeClass('show');
        }, 800);
        $('.js-pop-cancel').off('click').on('click', function () {
            if ($(this).is('.js-pop-ok')) {
                if (opt.yes() === false) {
                    return false;
                }
            }
            $pop.toggleClass('shown hide');
            setTimeout(() => {
                opt.closed();
                $pop.remove();
            }, 500);
        });
    },


    pops: function (config) {
        const opt = $.extend({
            cont: '',
            isCenter: false,
            title: MSG.warmTitle,
            yesText: MSG.sureText,
            cancleText: MSG.cancelText,
            oneBtn: false,
            width: 600,
            btnType: 'primary',
            height: 'auto',
            onInit: function () { },
            yes: function () { },
            closed: function () { }
        }, config);
        const $pop = $(`
            <div class="cover-pop"></div>
            <div id="pop" style="width:${(opt.width + '').indexOf('%') > -1 ? opt.width : opt.width + 'px'}">
                <div class="pop">
                    <div class="header">
                        <div class="title">${opt.title}</div>
                        <a class="close js-pop-cancel">&times;</a>
                    </div>
                    <div class="cont${opt.isCenter ? ' center' : ''}"${opt.height !== 'auto' ? ` style="height:${opt.height - 120}px"` : ''}>
                        <div class="cont-inner">${opt.cont}</div>
                    </div>
                    <div class="footer">
                        <button class="btn btn-${opt.btnType} js-pop-ok js-pop-cancel">${opt.yesText}</button>
                        ${opt.oneBtn ? `` : `<button class="btn cancel js-pop-cancel">${opt.cancleText}</button>`}
                    </div>
                </div>
            </div>
        `);
        $pop.appendTo('body');
        opt.onInit($pop);
        setTimeout(() => {
            $pop.addClass('show');
        }, 20);
        setTimeout(() => {
            $pop.addClass('shown').removeClass('show');
        }, 800);
    },

    alert: function (content) {
        this.pop({
            cont: content,
            width: 350,
            isCenter: true,
            oneBtn: true
        });
    },

    confirm: function (config) {
        this.pop($.extend({
            isCenter: true,
            width: 350,
            btnType: 'danger'
        }, config));
    },

    approvalMsg: function (config) {
        var opt = $.extend({
            title: '审批意见',
            maxLength: 200,
            placeholder: '请输入审批意见（必填）',
            id: 'approval-msg',
            isRequire: true,
            yes: function () { }
        }, config);
        this.pop({
            title: opt.title,
            cont: `
                <div class="form"><textarea id="${opt.id}" rows="6" maxlength="${opt.maxLength}" placeholder="${opt.placeholder}"></textarea></div>
            `,
            onInit: function ($this) {
                setTimeout(() => {
                    $this.find('textarea').focus();
                }, 500);
            },
            yes: function () {
                if (opt.isRequire) {
                    if ($.trim($('#' + opt.id).val()) === '') {
                        $.formTips('该项不能为空', $('#' + opt.id), true);
                        return false;
                    } else {
                        opt.yes($.trim($('#' + opt.id).val()));
                    }
                }
            }
        });
        $('#' + opt.id).counter();
    }

});

/**
 * 分页
 * @param {object} config
 */
$.fn.table = function (config) {
    var opt = $.extend({
        header: [],
        data: [],
        isPageing: true,
        isIndex: true,
        indexName: MSG.tableIndex,
        emptyText: MSG.tableEmpty,
        firstPageText: MSG.pageFirstText,
        prevPageText: MSG.pagePrevText,
        nextPageText: MSG.pageNextText,
        lastPageText: MSG.pageLastText,
        listField: "aaData",
        totalField: "iTotalDisplayRecords",
        startField: "iDisplayStart",
        limitField: "iDisplayLength",
        limit: 10,
        currPage: 1,
        isOneLine: true,
        onInit: function () { },
        onPageChange: function () { },
        _beforePageChange: function (page) {
            opt.onPageChange(page, {
                'sEcho': '-1',
                'iDisplayStart': page * 10,
                'iDisplayLength': 10,
            });
        },
    },
        config || {}
    );

    $(this).each(function () {
        var totalRecord = opt.data[opt.totalField],
            list = opt[opt.listField] || opt.data[opt.listField] || opt.data.data[opt.listField] || [],
            limit = opt.limit,
            start = opt.data[opt.startField],
            currPage = opt.currPage,
            totalPage = Math.ceil(totalRecord / limit),
            pageContent = '<div class="pagination">';
        var $this = $(this);
        var tableContent =
            '<table cellspacing="0" class="table' + (opt.isOneLine ? " table-fixed" : "") + '">';
        var headerContent = "<thead>";
        var bodyContent = "<tbody>";
        var lineClass = opt.isOneLine ? "one-line" : "";
        if (opt.isIndex) {
            headerContent +=
                '<th align="center" width="30">' + opt.indexName + "</th>";
        }
        for (var i = 0; i < opt.header.length; i++) {
            if (opt.header[i].width === 0 || opt.header[i].width === '0' || opt.header[i].width === '0px') {
                continue;
            }
            headerContent +=
                '<th style="text-align:' + (opt.header[i].align || 'left') + '; width:' + (opt.header[i].width || 'auto') + '">' +
                opt.header[i].name +
                "</th>";
        }
        headerContent += "</tr></thead>";
        if (totalRecord === 0 || list.length < 1) {
            // 空
            const len = opt.header.reduce((a, b) => {
                if (b.width !== 0 && b.width !== '0' && b.width !== '0px') {
                    return a + 1;
                } else {
                    return a;
                }
            }, 0);
            bodyContent += `
                <tr>
                    <td colspan="${(len + (opt.isIndex ? 1 : 0))}" class="notips">
                        <div class="empty">${opt.emptyText}</div>
                    </td>
                </tr>
            `;
        } else {
            var _filedValue;
            // 遍历列表
            for (var key = 0; key < list.length; key++) {
                bodyContent += "<tr>";
                if (opt.isIndex) {
                    bodyContent +=
                        '<td align="center" class="notips"><div class="td-cont">' +
                        (+key + 1) +
                        "</div></td>";
                }
                for (var item = 0; item < opt.header.length; item++) {
                    if (opt.header[item].width === 0 || opt.header[item].width === '0' || opt.header[item].width === '0px') {
                        continue;
                    }
                    var _lineClass = lineClass + (opt.header[item].notips ? ' notips' : '');
                    if (typeof opt.header[item].field === 'function') {
                        _filedValue = opt.header[item].field(list[key]);
                    } else {
                        _filedValue = list[key][opt.header[item].field];
                        if (typeof (_filedValue) !== 'number' && _filedValue !== undefined && _filedValue !== null) {
                            _filedValue = _filedValue.replace(/\</g, '&lt;');
                        }
                    }
                    if (_filedValue === undefined || _filedValue === null) {
                        _filedValue = '';
                    }
                    // _filedValue = _filedValue || '';
                    var tips = list[key][opt.header[item].tips] || '';
                    bodyContent += `
                        <td data-tips="${tips}" align="${opt.header[item].align || 'left'}" class="${_lineClass}">
                            <div class="td-cont">${_filedValue}</div>
                        </td>
                    `;
                }
                bodyContent += "</tr>";
            }
        }
        tableContent += headerContent + bodyContent + "</tbody></table>";
        // meta
        if (totalRecord > 0 && list.length) {
            pageContent += $.tpl(
                '<div class="meta">从 {{start}} 到 {{end}} / 共 {{totalPage}} 页 / 共 {{totalRecord}} 条</div>', {
                    start: +start + 1,
                    end: +start + limit > totalRecord ? totalRecord : +start + limit,
                    totalPage: totalPage,
                    totalRecord: totalRecord
                }
            );
        }
        if (opt.isPageing) {
            var pageItem = $.tpl(
                '<span class="pages"><button class="btn first">{{first}}</button><button class="btn prev">{{prev}}</button><button class="btn next">{{next}}</button><button class="btn last">{{last}}</button></span>', {
                    first: opt.firstPageText,
                    prev: opt.prevPageText,
                    next: opt.nextPageText,
                    last: opt.lastPageText
                }
            );
            pageContent +=
                '<div class="pager"><span class="jumper"><input class="go" value="' +
                currPage +
                '" type="number" min="1" max="' +
                (totalPage || 1) +
                '"><button class="btn goto">' + MSG.pageGo + '</button></span>' +
                pageItem +
                "</div></div>";

            tableContent += pageContent;

        }

        $(this).html(tableContent);
        opt.onInit();

        if (currPage <= 1) {
            $(".first, .prev", $this).prop("disabled", true);
        }
        if (currPage >= totalPage) {
            $(".last, .next", $this).prop("disabled", true);
        }
        // 点击事件
        $(".pages", $this).on("click", ".btn", function () {
            if ($(this).is(":disabled")) {
                return;
            }
            var goPage = 1;
            if ($(this).hasClass("first")) {
                goPage = 1;
            }
            if ($(this).hasClass("prev")) {
                goPage = currPage - 1 < 1 ? 1 : currPage - 1;
            }
            if ($(this).hasClass("next")) {
                goPage = currPage + 1 > totalPage ? totalPage : currPage + 1;
            }
            if ($(this).hasClass("last")) {
                goPage = totalPage;
            }
            if (goPage <= 1) {
                $(".first, .prev", $this).prop("disabled", true);
                $(".last, .next", $this).prop("disabled", false);
            }
            if (goPage >= totalPage) {
                $(".first, .prev", $this).prop("disabled", false);
                $(".last, .next", $this).prop("disabled", true);
            }
            $(".pagination .go", $this).val(goPage);
            opt._beforePageChange(goPage);
        });
        // 输入框跳转
        $(".pagination", $this).on("click", ".goto", function () {
            var v = Math.floor($('.go', $this).val());
            if (v > totalPage) {
                v = totalPage;
            }
            if (v < 1) {
                v = 1;
            }
            $('.go', $this).val(v);
            if (v <= 1) {
                $(".first, .prev", $this).prop("disabled", true);
                $(".last, .next", $this).prop("disabled", false);
            }
            if (v >= totalPage) {
                $(".first, .prev", $this).prop("disabled", false);
                $(".last, .next", $this).prop("disabled", true);
            }
            opt._beforePageChange(v);
        });

        // 回车事件跳转
        $('.go', $this).on('keyup', function (e) {
            if (13 === e.keyCode) {
                $('.goto').click();
            }
        });

        if (opt.isOneLine) {
            hoverTips($this);
        }
    });
};


/**
 * 上传
 * @param {String} uploadUrl 上传服务地址
 * @param {String} fileType 上传类型：图片 1，视频 2，文件 3，音频 4
 * @param {Function} uploaded 上传完成后的回调，返回完整路径
 */
$.fn.uploader = function (config) {
    var opt = $.extend({
        uploadUrl: '/login/f04',
        fileType: 1,
        type: [],
        beforeUpload: function () { },
        uploaded: function () { },
        error: function () { }
    }, config);
    if (!opt.type.length) {
        switch (opt.fileType) {
            case 1:
                opt.type = ['jpg', 'jpeg', 'gif', 'bmp', 'png'];
                break;
            case 2:
                opt.type = ['mp4', 'webm'];
                break;
            case 3:
                opt.type = ['doc', 'xls', 'ppt', 'pdf', 'docx', 'xlsx', 'pptx', 'txt', 'wps', 'zip', 'rar'];
                break;
            case 4:
                opt.type = ['mp3', 'ac3'];
                break;
            default:
                $.warm(MSG.configError);
        }
    }

    function pushToHost(fileType, file, el) {
        const fd = new FormData();
        fd.append('fileType', fileType + '');
        fd.append('file', file);
        AJAX2.Async({
            url: opt.uploadUrl,
            data: fd,
            isUpload: true
        }, function (data) {
            el.val('');
            if (data === '上传失败，文件为空') {
                $.error(MSG.uploadFileEmptyError);
                opt.error();
                return;
            }
            opt.uploaded({
                name: data.fileName.replace(/<|>|\/|\\/g, ''),
                url: data.url,
                suffix: data.suffix,
                el: el,
                id: data.url.split(/static\/.*\./img)[1]
            });
        });
    }
    $(this).each(function () {
        $(this).off('change').on('change', function () {
            var $this = $(this),
                files = $this[0].files,
                result = true;
            for (let i = 0, len = files.length; i < len; i++) {
                if (opt.type.indexOf(files[i].name.split('.').reverse()[0].toLowerCase()) < 0) {
                    $.error(MSG.uploadTypeError + opt.type.join(', '));
                    $this.val('');
                    opt.error();
                    result = false;
                    break;
                }
                // 大小检测
                if (opt.maxSize && files[i].size > opt.maxSize) {
                    $.error(MSG.uploadMaxSizeError + (opt.maxSize / 1024) + 'kb');
                    $this.val('');
                    opt.error();
                    result = false;
                    break;
                }
            }

            if (!result) {
                return false;
            }

            if (opt.beforeUpload({
                url: URL.createObjectURL($this[0].files[0]),
                el: $this
            }) === false) {
                $this.val('');
                return;
            }

            setTimeout(() => {
                for (let i = 0; i < files.length; i++) {
                    pushToHost(opt.fileType, files[i], $this);
                }
            }, 100);

        });
    });
};


//鼠标悬停提示
function hoverTips(id, children) {
    $('.hover-tips').length || $('body').append('<div class="hover-tips"></div>');
    var $menuTips = $('.hover-tips'),
        $el = $(id).length ? $(id) : $('#container'),
        $children = children || 'td',
        isTable = $el.find('table').length,
        isShow = false;
    $el.on('mouseover', $children, function () {
        var cont = $(this).attr('data-tips') || $.trim($(this).text());
        if (isTable && $('button, a', this).length || cont === '' || $(this).hasClass('notips')) {
            $menuTips.hide();
            isShow = false;
        } else {
            $menuTips.html(cont);
            isShow = true;
        }
    });
    $el.on('mousemove', $children, function (e) {
        if (!isShow) {
            return;
        }
        var x = e.pageX + 18;
        var y = e.pageY - 5;
        $menuTips.show().css({
            left: x,
            top: y
        });
        return false;
    });
    $el.on('mouseleave', $children, function () {
        $menuTips.hide();
    });
    $(window).on('mousemove', function () {
        $menuTips.hide();
    });
}

(function ($) {
    $.extend({
        get: function (url, success) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'text',
                success: function (res) {
                    success(res);
                },
                error: function () {
                    success(MSG.tplError);
                }
            });
        },
        // 导出
        exports: function (options) {
            var _opt = $.extend({
                url: '/',
                fileName: '导出文件.xls',
                date: true,
                query: {}
            }, options, true);
            $.loading();
            var formData = new FormData();
            url = (CONFIG.serverUrl + '/' + CONFIG.serverName + CONFIG.checkPermission + _opt.url + '?' + $.param(_opt.query));
            // url = _opt.url;
            var xhr = new XMLHttpRequest();
            xhr.open('post', url, true); // 也可以使用POST方式，根据接口
            xhr.responseType = "blob"; // 返回类型blob
            xhr.setRequestHeader('accessToken', $.getCookie('accessToken'));
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            // xhr.setRequestHeader('Content-Type', 'application/json');
            // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
            xhr.onload = function () {
                // 请求完成
                if (this.status === 200 && this.response.type === 'application/msexcel') {
                    // 返回200
                    var blob = this.response;
                    var reader = new FileReader();
                    reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
                    reader.onload = function (e) {
                        // 转换完成，创建一个a标签用于下载
                        var a = document.createElement('a');
                        var name = _opt.date ? _opt.fileName.split('.')[0] + '-' + new Date(+new Date() + 8 * 3600 * 1000).toISOString().substr(0, 19).replace(/-|T|:/g, '') + '.' + _opt.fileName.split('.')[1] : _opt.fileName;
                        a.download = name;
                        a.href = e.target.result;
                        $('body').append(a);
                        a.click();
                        $(a).remove();
                        $.hideLoading();
                    };
                } else {
                    if (this.response.type === 'application/json') {
                        console.log(this);
                        // $.error(this.response);
                    } else {
                        $.error(MSG.exportFailed);
                    }
                    $.hideLoading();
                }
            };

            // 发送ajax请求
            if (_opt.query) {
                //导出功能为formData方式传参调用该方法
                xhr.send(formData);
            } else {
                xhr.send();
            }

            // xhr.send(JSON.stringify(_opt.query || {}));
        },
        // 表单提示
        formTips: function (cont, el, noScroll, direction) {
            let $el = $(el);
            $el.focus();
            var $tips = $(`
                <div class="form-tips">${cont}</div>
            `);
            noScroll || $('#container').scrollTop($el.offset().top - $('#container').offset().top - 50);
            $tips.addClass(direction || '').css({
                top: $el.position().top + (direction === 'bottom' ? $el.outerHeight() : 0),
                left: $el.position().left
            }).insertAfter($el);
            setTimeout(() => {
                $tips.addClass('show');
                $el.addClass('error');
            }, 20);
            setTimeout(() => {
                $tips.removeClass('show');
                $el.removeClass('error');
            }, 1200);
            setTimeout(() => {
                $tips.remove();
            }, 1350);
        },
        // 表单检测
        formCheck: function (id, noScroll) {
            let res = true;
            $(id).find('input, select, textarea').each(function () {
                let $this = $(this),
                    v = $.trim($this.val());
                // 不可见或禁用，忽略
                if (!$this.is(':visible') || $this.is(':disabled')) {
                    return;
                }
                // 必填项
                if ($this.attr('required')) {
                    if (v === '') {
                        $.formTips(MSG.formEmpty, $this, noScroll, $this.attr('data-direction'));
                        $this.val('');
                        res = false;
                        return false;
                    }
                }
                // 数值大小判断
                if ($this.attr('max') !== undefined) {
                    if (+v > +$this.attr('max')) {
                        $.formTips(MSG.formMax + $this.attr('max'), $this, noScroll, $this.attr('data-direction'));
                        res = false;
                        return false;
                    }
                }
                if ($this.attr('min') !== undefined) {
                    if (+v < +$this.attr('min')) {
                        $.formTips(MSG.formMin + $this.attr('min'), $this, noScroll, $this.attr('data-direction'));
                        res = false;
                        return false;
                    }
                }
                // 整数判断
                if ($this.attr('int')) {
                    if (v.indexOf('.') > -1) {
                        $.formTips(MSG.formInt, $this, noScroll, $this.attr('data-direction'));
                        res = false;
                        return false;
                    }
                }
                // 最小长度判断
                if ($this.attr('minlength')) {
                    if (v.length < $this.attr('minlength')) {
                        $.formTips(MSG.formLength + $this.attr('minlength'), $this, noScroll, $this.attr('data-direction'));
                        res = false;
                        return false;
                    }
                }
                // 历史记录选择判断
                if ($this.attr('list')) {
                    let vals = [];
                    $('#' + $this.attr('list')).find('option').each(function () {
                        vals.push($(this).attr('value'));
                    });
                    if (vals.indexOf(v) < 0) {
                        $.formTips(MSG.formSelectItem, $this, noScroll, $this.attr('data-direction'));
                        res = false;
                        return false;
                    }
                }
            });
            return res;
        },
        // 返回按钮
        goback: function () {
            $('.container').prepend('<a href="javascript:history.back()" class="btn btn-back">返回</a>');
        }
    });
    // 渲染列表
    $.fn.renderTable = function (url, config) {
        var opt = $.extend({
            currPage: 1,
            data: [],
            limit: 10,
            header: [],
            isIndex: true,
            isPageing: true,
            listField: 'aaData',
            onDataLoad: function () { },
            onPageChange: function () { }
        }, config);
        var data = $.extend({
            iDisplayLength: opt.limit,
            iDisplayStart: 0,
            sEcho: 1
        }, opt.data);
        this.each(function () {
            var $this = $(this);

            function render(page) {
                data.iDisplayStart = (page - 1) * 10;
                $this.addClass('loading');
                AJAX2.Async({
                    url: url,
                    data: JSON.stringify(data),
                    special: true,
                    onend: function () {
                        $this.removeClass('loading');
                    }
                }, function (data) {
                    $this.table({
                        header: opt.header,
                        currPage: page,
                        data: data,
                        isPageing: opt.isPageing,
                        isIndex: opt.isIndex,
                        listField: opt.listField,
                        onPageChange: function (n) {
                            render(n);
                            opt.onPageChange(n);
                        }
                    });
                    opt.onDataLoad(data);
                });
            }
            render(opt.currPage);
        });
    };

    // 日历
    $.fn.calendar = function (conf) {
        var opt = $.extend({
            format: 'yyyy-MM-dd',
            type: 'date',
            trigger: 'click'
        }, conf);
        this.each(function () {
            opt.elem = $(this)[0];
            if (opt.type === 'minute') {
                opt.type = 'datetime';
                opt.format = 'yyyy-MM-dd HH:mm';
                if (opt.min) {
                    opt.min += ':00';
                }
                if (opt.max) {
                    opt.max += ':00';
                }
                opt.ready = function () {
                    $('.layui-laydate').addClass('minute');
                }
            }
            //小时+分钟
            if (opt.type === 'HT') {
                opt.type = 'time';
                opt.format = 'HH:mm';
                opt.ready = function () {
                    $('.layui-laydate').addClass('minute');
                }
            }
            laydate.render(opt);
        });
        $('#container').on('scroll', function () {
            $('.layui-laydate').remove();
        });
    };

    // 文本域字符统计
    $.fn.counter = function (startNumber = 0) {
        this.each(function () {
            var $counter = $('<div class="text-counter">' + ($(this).val().length + startNumber) + '/' + (+$(this).attr('maxlength') + startNumber) + '</div>');
            $counter.insertAfter($(this));
            $(this).on('input', function () {
                $counter.text(($(this).val().length + startNumber) + '/' + (+$(this).attr('maxlength') + startNumber));
            });
        });
    };
    $.fn.upload = function (config) {
        var opt = $.extend({
            tips: '图片支持jpg、png、bmp格式，最大不超过200KB',
            type: ['jpg', 'png', 'bmp'],
            maxSize: 200,
            maxLength: 1,
            width: 0,
            height: 0,
            images: [],
            readOnly: false,
            multi: false,
            success: () => true,
            beforeUpload: function () { }
        }, config);
        this.each(function () {
            var imageItem = `
                <div class="image-item">
                    <div class="image">
                        <img src="{{url}}">
                    </div>
                    ${opt.readOnly ? '' : '<a class="del js-image-del"></a>'}
                </div>
                `;
            var images = opt.images.reduce(function (b, a) {
                return b + $.tpl(imageItem, {
                    url: a
                });
            }, '');
            var $items = $(`
                    <div class="image-viewer clearfix">${images}</div>
                    <div class="image-uploader${opt.images.length >= opt.maxLength ? ' hide' : ''}">
                        <input type="file" id="image" ${opt.multi ? 'multiple' : ''}>
                        <div class="loading"></div>
                    </div>
                    ${(opt.readOnly || !opt.tips) ? '' : `<div class="image-meta">${opt.tips}</div>`}
                `);
            $items.appendTo($(this));

            var $this = $(this);

            if (opt.images.length) {
                $('.image-item', $this).addClass('show');
            }
            let pass = true;
            $items.find('#image').uploader({
                maxSize: opt.maxSize * 1024,
                type: opt.type,
                beforeUpload: function (img) {
                    pass = true;
                    opt.beforeUpload(img);
                    if (opt.width) {
                        const image = new Image();
                        image.src = img.url;
                        image.onload = () => {
                            if (image.width !== opt.width || image.height !== opt.height) {
                                $.error(`${MSG.uploadImageSizeError}${opt.width}×${opt.height}`);
                                $items.find('#image').val('');
                                pass = false;
                            } else {
                                $('.image-uploader', $this).addClass('loading');
                            }
                        }
                    } else {
                        $('.image-uploader', $this).addClass('loading');
                    }
                },
                error: function () {
                    $('.image-uploader', $this).removeClass('loading');
                },
                uploaded: function (res) {
                    if (!pass) {
                        $items.find('#image').val('');
                        return;
                    }
                    if (!opt.success(res)) {
                        $items.find('#image').val('');
                        return;
                    };
                    const img = new Image();
                    img.src = res.url;
                    img.onload = () => {
                        $('.image-uploader', $this).removeClass('loading');
                        $('.image-viewer', $this).append($.tpl(imageItem, {
                            url: res.url
                        }));
                        if ($('.image-item', $this).length >= opt.maxLength) {
                            $('.image-uploader', $this).addClass('hide');
                            $('.image-item', $this).last().addClass('show');
                        } else {
                            $('.image-item', $this).last().addClass('show');
                        }
                        if ($('.image-item', $this).length > opt.maxLength) {
                            $.error('最多只能上传 ' + opt.maxLength + ' 张图片');
                            $('.image-item', $this).eq(opt.maxLength - 1).nextAll('.image-item').remove();
                        }
                        var _res = res;
                        _res.images = $('.image-item', $this).find('img').attr('src');
                    };
                }
            });
            $this.on('click', '.js-image-del', function () {
                $(this).parent().remove();
                if ($('.image-item', $this).length < opt.maxLength) {
                    $('.image-uploader', $this).removeClass('hide');
                }
            });
        });
    };
    // tab选项卡
    $.fn.tab = function (index, after, flag = true) {
        this.each(function () {
            var _index = index || 0;
            var $header = $('>.tab-header', this),
                $items = $('>.tab-items', this);

            function go(i) {
                $('a', $header).eq(i).addClass('current').siblings().removeClass('current');
                $('>.tab-item', $items).eq(i).addClass('current').siblings().removeClass('current');
                after && after(i);
            }
            go(_index);
            if (flag) {
                $header.off('click').on('click', 'a', function () {
                    go($(this).index());
                });
            }
        });
    };

    // 审批记录
    $.fn.approvalRecords = function (config) {
        var opt = $.extend({
            url: '/bpm/process/queryHis',
            serviceId: '',
            sort: '1',
            processDef: '',
            empty: MSG.approvalEmpty
        }, config);
        var self = this;

        function formatStatus(code) {
            switch (+code) {
                case 1:
                    return '提交审批';
                case 2:
                    return '审批通过';
                case 3:
                    return '审批拒绝';
                case 4:
                    return '驳回修改';
                case 5:
                    return '重新提交';
                case 6:
                    return '终止';
                default:
                    return '';
            }
        }
        AJAX2.Async({
            url: opt.url,
            isLoading: true,
            data: JSON.stringify({
                serviceId: opt.serviceId,
                processDef: opt.processDef,
                sort: opt.sort
            })
        }, function (res) {
            if (JSON.stringify(res) === '{}') {
                self.text(opt.empty);
                return;
            }
            var tpl = `
                <div class="item {{statusClassName}}">
                    <div class="header">
                        <span class="status">{{status}}</span>
                        <span class="date">{{processTime}}</span>
                    </div>
                    <div class="infos">
                        <div class="user-infos">
                            <strong>{{processUserName}}</strong>
                            <p>{{processUserRole}}</p>
                        </div>
                        {{msg}}
                    </div>
                </div>
                `;
            var cont = res.reduce(function (b, a) {
                return b + $.tpl(tpl, {
                    processTime: a.processTime,
                    status: formatStatus(a.businessType),
                    processUserName: a.processUserName,
                    processUserRole: a.processUserRole || '',
                    msg: a.processContent ? `<div class="msg"><strong>审批意见：</strong>${a.processContent}</div>` : '',
                    statusClassName: `status-${a.businessType}`
                });
            }, '');
            self.html(`
                <div class="progress">${cont}</div>
            `);
        });
    };

    // 审批记录
    $.fn.approvalRecordsAfter = function (config) {
        var opt = $.extend({
            url: '/osg-openpf0001/operator/ai/f06',
            id: '',
            empty: MSG.approvalEmpty
        }, config);
        var self = this;

        function formatStatus(code) {
            switch (+code) {
                case 'Pass':
                    return '审批通过';
                case 'Refuse':
                    return '审批拒绝';
                default:
                    return '';
            }
        }
        AJAX2.Async({
            url: opt.url,
            isLoading: true,
            special: true,
            data: JSON.stringify({ id: opt.id })
        }, function (res) {
            var res = res.data;
            if (JSON.stringify(res) === '[]') {
                self.text(opt.empty);
                return;
            }
            var tpl = `
                    <div class="item {{statusClassName}}">
                        <div class="header">
                            <span class="status">{{status}}</span>
                            <span class="date">{{processTime}}</span>
                        </div>
                        <div class="infos">
                            <div class="user-infos">
                                <strong>{{processUserName}}</strong>
                                <p>{{processUserRole}}</p>
                            </div>
                            {{msg}}
                        </div>
                    </div>
                    `;
            var cont = res.reduce(function (b, a) {
                return b + $.tpl(tpl, {
                    processTime: a.updateTime,
                    status: a.auditResult === 'Pass' ? '审批通过' : '审批拒绝',
                    processUserName: a.auditorName,
                    processUserRole: a.processUserRole || '',
                    msg: a.commentInfo ? `<div class="msg"><strong>审批意见：</strong>${a.commentInfo}</div>` : '',
                    statusClassName: a.auditResult === 'Pass' ? 'status-1' : 'status-3'
                });
            }, '');
            self.html(`
                    <div class="progress">${cont}</div>
                `);
        });
    };

    // 步骤
    $.fn.steps = function (name) {
        $(this).html(`<div class="steps">${[...name].reduce((b, a, c) => b + `<div class="item" data-num="${c + 1}">${a}</div>`, '')}</div>`);
        function go(n) {
            $('.steps').find('.item').eq(n - 1).addClass('current').prevAll('.item').addClass('current');
            $('.steps').find('.item').eq(n - 1).nextAll('.item').removeClass('current');
        }
        go(1);
        return {
            go: go
        };
    };
    // JY步骤
    $.fn.stepsJy = function (name) {
        $(this).html(`<div class="steps">${[...name].reduce((b, a, c) => b + `<div class="item" data-num="${c + 1}"><div style="text-align: center; margin-left: -8px;">${a}</div></div>`, '')}</div>`);
        function go(n) {
            $('.steps').find('.item').eq(n - 1).addClass('current').prevAll('.item').addClass('current');
            $('.steps').find('.item').eq(n - 1).nextAll('.item').removeClass('current');
        }
        go(1);
        return {
            go: go
        };
    };
    // 多选
    $.fn.wSelect = function (config) {
        var opt = $.extend({
            multi: true,
            placeholder: '请选择',
            controller: true,
            onChange: function () { },
            onSelect: function () { },
            maxSelect: -1
        }, config);
        this.each(function () {
            const $this = $(this);
            $this.hide();
            const infos = opt.controller ? `
                <div class="infos">
                    <div class="btns">
                        ${opt.maxSelect >= 0 ? '' : '<a class="all">全选</a>'}
                        <a class="clean">清空</a>
                        ${opt.maxSelect >= 0 ? '' : '<a class="change">反选</a>'}
                    </div>
                    <div class="total">已选<span class="select-count"></span>${opt.maxSelect >= 0 ? '/' + opt.maxSelect : ''}</div>
                </div>
            ` : '';
            const tpl = `
                <div class="selector ${opt.multi ? 'multi' : 'single'}">
                    <div class="selector-selected"></div>
                    <div class="selector-drop-down">
                        ${infos}
                        <div class="list"><ul></ul></div>
                    </div>
                </div>
            `;
            if (!$this.next('.selector').length) {
                $(tpl).insertAfter($this);
            }
            const $selector = $this.next('.selector');
            // 数据遍历
            let selectedData = [],
                selectedValue = [],
                list = [];
            $this.find('option').each(function (a, el) {
                if (el.getAttribute('selected') !== null) {
                    selectedData.push(el.innerText);
                    selectedValue.push(el.value);
                }
                list.push(`<li data-value="${el.value}" class="${el.getAttribute('disabled') !== null ? 'disabled' : ''}">${el.innerText}</li>`);
            });
            maxSet();
            $('ul', $selector).html(list.join(''));
            renderSelect();
            $('.selector-selected', $selector).on('click', function () {
                $('.selector').not($selector).removeClass('open');
                $selector.toggleClass('open');
                return false;
            });
            $('.selector-drop-down', $selector).on('click', 'li', function () {
                if ($(this).hasClass('disabled') || $(this).hasClass('not-allowed')) {
                    return false;
                }
                const text = $(this).text(),
                    value = $(this).attr('data-value');
                if (opt.multi) {
                    // 多选
                    $(this).toggleClass('selected');
                    if ($(this).hasClass('selected')) {
                        selectedData.push(text);
                        selectedValue.push(value);
                    } else {
                        const idx = selectedData.findIndex(el => el === text);
                        selectedData.splice(idx, 1);
                        selectedValue.splice(idx, 1);
                    }
                    renderSelect();
                    maxSet();
                    opt.onChange(text, value, selectedData, selectedValue);
                } else {
                    // 单选
                    $selector.removeClass('open');
                    selectedData = [text];
                    selectedValue = [value];
                    renderSelect();
                    opt.onChange(selectedData.join(''), selectedValue.join(''));
                    opt.onSelect(selectedData.join(''), selectedValue.join(''));
                }
                return false;
            });
            // 清空
            $('.clean', $selector).on('click', function () {
                $('.list li:not(.disabled)', $selector).each(function () {
                    if (selectedValue.includes($(this).attr('data-value'))) {
                        const idx = selectedValue.findIndex(el => el === $(this).attr('data-value'));
                        selectedData.splice(idx, 1);
                        selectedValue.splice(idx, 1);
                    }
                });
                renderSelect();
                return false;
            });
            // 全选
            $('.all', $selector).on('click', function () {
                $('.list li:not(.disabled)', $selector).each(function () {
                    selectedValue.includes($(this).attr('data-value')) || (selectedValue.push($(this).attr('data-value')), selectedData.push($(this).text()));
                });
                renderSelect();
                return false;
            });
            // 反选
            $('.change', $selector).on('click', function () {
                $('.list li:not(.disabled)', $selector).each(function () {
                    if (selectedValue.includes($(this).attr('data-value'))) {
                        const idx = selectedValue.findIndex(el => el === $(this).attr('data-value'));
                        selectedData.splice(idx, 1);
                        selectedValue.splice(idx, 1);
                    } else {
                        selectedValue.push($(this).attr('data-value'));
                        selectedData.push($(this).text());
                    }
                });
                renderSelect();
                return false;
            });
            $(window).off('click').on('click', function () {
                $('.selector').removeClass('open');
            });

            function renderSelect() {
                $('.select-count', $selector).text(selectedValue.length);
                $('.selector-selected', $selector).text(selectedData.join('，'));
                $('.list li', $selector).each(function () {
                    selectedValue.includes($(this).attr('data-value')) ? $(this).addClass('selected') : $(this).removeClass('selected');
                });
                if (!selectedValue.length) {
                    $('.selector-selected', $selector).text(opt.placeholder).addClass('placeholder');
                } else {
                    $('.selector-selected', $selector).removeClass('placeholder');
                }
            }

            function maxSet() {
                if (opt.maxSelect < 0) {
                    return;
                }
                if (selectedData.length >= opt.maxSelect) {
                    $('li', $selector).not('.selected').addClass('not-allowed');
                } else {
                    $('li.not-allowed', $selector).removeClass('not-allowed');
                }
            }
        });
    };
    // 地区选择
    $.fn.regionSelector = function (config) {
        var opt = $.extend({
            datas: [],
            title: '请选择',
            nameField: 'regionName',
            codeField: 'regionCode',
            selectedIds: [],
            onInit: function () { },
            yes: function () { },
            onChange: function () { },
        }, config);
        $(this).off('click').on('click', function () {
            const items = opt.datas.reduce((a, b) =>
                a + `
                    <li>
                        <label>
                            <input type="checkbox" data-name="${b[opt.nameField]}" value="${b[opt.codeField]}"${opt.selectedIds.includes(b[opt.codeField]) ? ' checked' : ''}>
                            <span>${b[opt.nameField]}</span>
                        </label>
                    </li>
                `,
                ''
            );
            $.pop({
                width: 600,
                title: opt.title,
                cont: `
                    <div class="js-region-list region-list">
                        <ul class="clearfix">${items}</ul>
                    </div>
                `,
                onInit: opt.onInit,
                yes: function () {
                    let res = [],
                        names = [],
                        ids = [];
                    $('.js-region-list input:checked').each(function () {
                        res.push({
                            name: $(this).next('span').text(),
                            code: $(this).val()
                        });
                        names.push($(this).next('span').text());
                        ids.push($(this).val());
                    });
                    opt.yes(res);
                }
            });
            return false;
        });
    };
    // 序列化表单数据为对象
    $.fn.serializeObject = function () {
        let obj = {};
        $.each(this.serializeArray(), function (i, param) {
            if (!(param.name in obj) && $.trim(param.value) !== '') {
                obj[param.name] = $.trim(param.value);
            }
        });
        return obj;
    };
})(jQuery);

// 数字填充0
Number.prototype.fillZero = function () {
    return (this < 10 ? '0' : '') + this;
};

// 日期格式化
Date.prototype.format = function (cont = 'yyyy-mm-dd') {
    const f = {
        'yyyy': this.getFullYear(),
        'mm': (this.getMonth() + 1).fillZero(),
        'dd': this.getDate().fillZero(),
        'hh': this.getHours().fillZero(),
        'ii': this.getMinutes().fillZero(),
        'ss': this.getSeconds().fillZero()
    }
    let res = cont;
    for (const k in f) {
        res = res.replace(k, f[k]);
    }
    return res;
}