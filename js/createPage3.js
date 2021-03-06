var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值
        URL: {
            details: '/osg-omgmt1032/operator/c01/f97',//数据回显
            nextStep: '/osg-omgmt1032/operator/c01/f97',//下一步
        },


        ruleForm: {
            JZCG: "",
            XMJZ: [
                {
                    "text": "项目进展1",
                    "JZBT": "",
                    "date": "",
                    "JZNR": "",
                }
            ],


        },
        rules: {
            JZCG: [
                {required: true, message: '请输入项目进展', trigger: 'blur'},
                {min: 2, max: 100, message: '至少输入两个字'}
            ],
            XMCG: [
                {required: true, message: '请输入项目成果', trigger: 'blur'},
                {min: 2, max: 100, message: '至少输入两个字'}
            ],

            date: [
                {required: true, message: '请选择项目', trigger: 'change'},
            ],
            JZBT: [
                {required: true, message: '请输入进展标题', trigger: 'blur'},
                {min: 2, max: 100, message: '至少输入两个字'}
            ],
            JZNR: [
                {required: true, message: '请输入进展内容', trigger: 'blur'},
                {min: 2, max: 500, message: '至少输入两个字'}
            ]
        },


    },


    created: function () {
        this.getDetails();

    },

    mounted: function () {

        this.setDivHeight();


    },

    methods: {


        //获取详情信息
        getDetails() {
            let id =this.getUrlId();
            if(id){
                let params = {
                    "id":id
                };

                AJAX2.Async(
                    {
                        url: this.URL.details,
                        data: params,
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
            }
            else {

            }
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

        //根据屏幕设置div高度
        setDivHeight() {
            let h = window.innerHeight
            $(".elContainer").height(h);

        },


        //下一步
        doSave(id) {
            this.$refs.form.validate((valid) => {
                if (valid) {

                    let params = {
                        "id": id
                    };

                    AJAX2.Async(
                        {
                            url: this.URL.nextStep,
                            data: params,
                            special: true,
                            isLoading: true
                        },
                        function (resp) {
                            if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                                $.error(resp.message);
                            } else {
                                console.log(resp.data)
                            }

                        }
                    );


                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });

        },


        //上一步
        lastStep(id) {
            let page = "/cdn-vue-elementUi/page/createPage2.html?" + id + "";
            window.location.href = page;
        },


        //新增选择
        addXX() {
            let nmu = this.ruleForm.XMJZ.length + 1;

            let json = {
                "text": "项目进展" + nmu + " ",
                "JZBT": "",
                "daNte": "",
                "JZR": "",
            };
            this.ruleForm.XMJZ.push(json)
            console.log(this.ruleForm.XMJZ)


        },

        //删除选项
        deleteXX() {
            let num = this.ruleForm.XMJZ.length;
            if (num > 1) {
                this.ruleForm.XMJZ.pop();
            } else {
                this.$message({
                    type: 'warning',
                    message: '最少剩余1个选项'
                });
            }


        },


    }
});
