var vm = new Vue({
    el: "#app",
    data: {
        URL: {
            details: '/osg-omgmt1032/operator/c01/f97',//查看详情
        },


        ruleForm: {
            BTMC: "",
            GGGS:"",
            FBFS:"1",
            FBSJ:"",
            GGZW:""
        },
        rules: {
            BTMC: [
                {required: true, message: '请输入标题名称', trigger: 'blur'},
                {min: 2, max: 20, message: '姓名在 2 到 20 个字符'}
            ],
            GGGS: [
                {required: true, message: '请选择公告归属', trigger: 'blur'},
                {min: 2, max: 20, message: '姓名在 2 到 20 个字符'}
            ],
            FBSJ: [
                {required: true, message: '请选择发布时间', trigger: 'change'},
            ],
            GGZW: [
                {required: true, message: '请输入公告正文', trigger: 'change'},
            ],

        },

        options: [
            {
                value: '选项1',
                label: '黄金糕'
            },
            {
                value: '选项2',
                label: '双皮奶'
            },
            {
                value: '选项3',
                label: '蚵仔煎'
            },
            {
                value: '选项4',
                label: '龙须面'
            },
            {
                value: '选项5',
                label: '北京烤鸭'
            }],

        editorOption: {
            placeholder: '',

        },

    },


    created: function () {
         this.getDetails();



    },

    mounted: function () {

        this.setDivHeight();
        this.autotip();


    },

    methods: {

        //根据屏幕设置div高度
        setDivHeight: () => {
            $(".elContainer").height(window.innerHeight);
        },

        //获取详情信息
        getDetails() {
            let params = {
                "id": this.getUrlId()
            };

            AJAX2.Async(
                {
                    url: this.URL.details,
                    data: JSON.stringify(params),
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    }
                    else {
                        console.log(resp.data)
                    }

                }
            );
        },




        //获取URL 传来的ID
        getUrlId() {
            //封装获取的URL中？后是ID
            function GetRequest(urlStr) {
                if (typeof urlStr == "undefined") {
                    var url = decodeURI(location.search); //获取url中"?"符后的字符串
                } else {
                    var url = "?" + urlStr.split("?")[1];
                }
                var theRequest = new Object();
                if (url.indexOf("?") !== -1) {
                    var str = url.substr(1);
                    var strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            }

            //获取ID 并赋值给
            return GetRequest(window.location.search)['id'];
        },


        //富文本框设计鼠标放上去中文提示
        autotip() {
            const titleConfig = [
                {Choice: '.ql-bold', title: '加粗'},
                {Choice: '.ql-italic', title: '斜体'},
                {Choice: '.ql-underline', title: '下划线'},
                {Choice: '.ql-header', title: '段落格式'},
                {Choice: '.ql-strike', title: '删除线'},
                {Choice: '.ql-blockquote', title: '块引用'},
                {Choice: '.ql-code', title: '插入代码'},
                {Choice: '.ql-code-block', title: '插入代码段'},
                {Choice: '.ql-font', title: '字体'},
                {Choice: '.ql-size', title: '字体大小'},
                {Choice: '.ql-list[value="ordered"]', title: '编号列表'},
                {Choice: '.ql-list[value="bullet"]', title: '项目列表'},
                {Choice: '.ql-direction', title: '文本方向'},
                {Choice: '.ql-header[value="1"]', title: 'h1'},
                {Choice: '.ql-header[value="2"]', title: 'h2'},
                {Choice: '.ql-align', title: '对齐方式'},
                {Choice: '.ql-color', title: '字体颜色'},
                {Choice: '.ql-background', title: '背景颜色'},
                {Choice: '.ql-image', title: '图像'},
                {Choice: '.ql-video', title: '视频'},
                {Choice: '.ql-link', title: '添加链接'},
                {Choice: '.ql-formula', title: '插入公式'},
                {Choice: '.ql-clean', title: '清除字体格式'},
                {Choice: '.ql-script[value="sub"]', title: '下标'},
                {Choice: '.ql-script[value="super"]', title: '上标'},
                {Choice: '.ql-indent[value="-1"]', title: '向左缩进'},
                {Choice: '.ql-indent[value="+1"]', title: '向右缩进'},
                {Choice: '.ql-header .ql-picker-label', title: '标题大小'},
                {Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一'},
                {Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二'},
                {Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三'},
                {Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四'},
                {Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五'},
                {Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六'},
                {Choice: '.ql-header .ql-picker-item:last-child', title: '标准'},
                {Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号'},
                {Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号'},
                {Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号'},
                {Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准'},
                {Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐'},
                {Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐'},
                {Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐'},
                {Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐'}
            ];
            document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
            for (let item of titleConfig) {
                let tip = document.querySelector('.quill-editor ' + item.Choice)
                if (!tip) continue
                tip.setAttribute('title', item.title)
            }
        },

        // 获得焦点事件 禁止编辑
        onEditorFocus(event) {
            event.enable(false);
        },


        //取消
        doCancel() {
            window.history.go(-1)
        }


    }
});
