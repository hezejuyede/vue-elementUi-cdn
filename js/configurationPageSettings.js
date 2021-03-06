var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值
        URL: {
            details1: '/osg-omgmt1032/operator/c01/f97',   //玩法配置详情
            details2: '/osg-omgmt1032/operator/c01/f97',   //任务管理详情
            details3: '/osg-omgmt1032/operator/c01/f97',   //宝箱配置详情
            details4: '/osg-omgmt1032/operator/c01/f97',   //捐赠管理详情
            details5: '/osg-omgmt1032/operator/c01/f97',   //问卷管理详情


            doSaveWF: '/osg-omgmt1032/operator/c01/f97',     //玩法配置保存
            doSaveBX: '/osg-omgmt1032/operator/c01/f97',     //宝箱配置保存


            showRW: '/osg-omgmt1032/operator/c01/f97',      //显示任务配置
            doRW: '/osg-omgmt1032/operator/c01/f97',        //保存任务配置

            addJZ: '/osg-omgmt1032/operator/c01/f97',      //新增捐赠
            seeJZ: '/osg-omgmt1032/operator/c01/f97',      //显示捐赠
            editJZ: '/osg-omgmt1032/operator/c01/f97',     //编辑捐赠
            deleteJZ: '/osg-omgmt1032/operator/c01/f97',   //删除捐赠

            addWJ: '/osg-omgmt1032/operator/c01/f97',      //新增问卷
            seeWJ: '/osg-omgmt1032/operator/c01/f97',      //显示问卷
            editWJ: '/osg-omgmt1032/operator/c01/f97',     //编辑问卷
            deleteWJ: '/osg-omgmt1032/operator/c01/f97',   //删除问卷



        },

        id:"",

        tables: [
            {"xuhao": 1, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 1},
            {"xuhao": 2, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 2},
            {"xuhao": 3, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 3},
            {"xuhao": 4, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 4},
            {"xuhao": 5, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 5},
            {"xuhao": 6, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 6},
            {"xuhao": 7, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 7}
        ],


        activeName: "first",
        ruleForm: {
            csTimeType: "1",
            csTimes: "",
            TQSX: "",
            DNFW: "1",
            DNFWF: "",
            DNFWT: "",
            BTQSX: "1",
            BTQSXQJ: "",
            RWJL:"",
            BXDHZ:"",
            DHBXBZTS:"",
            XZXM:"",
            QJSL:"",


            subjectType:"",
            subjectBT:"",
            subjectBZ:"",
            subjectXXMS:"",
            XXNR: [
                {"id": 1, "text": "A", "NR": "", "ZQ": "", "ZS": ""},
                {"id": 2, "text": "B", "NR": "", "ZQ": "", "ZS": ""},
                {"id": 3, "text": "C", "NR": "", "ZQ": "", "ZS": ""},
                {"id": 4, "text": "D", "NR": "", "ZQ": "", "ZS": ""},
                {"id": 5, "text": "E", "NR": "", "ZQ": "", "ZS": ""},
                {"id": 6, "text": "F", "NR": "", "ZQ": "", "ZS": ""},
            ],

        },
        rules: {
            csTimeType: [
                {required: true, message: '请选择', trigger: 'blur'},
            ],
            csTimes: [
                {required: true, message: '请输入全局时间', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
            DNFW: [
                {required: true, message: '请选择', trigger: 'blur'},
            ],
            DNFWF: [
                {required: true, message: '请输入最低值', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
            DNFWT: [
                {required: true, message: '请输入最高值', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
            BTQSX: [
                {required: true, message: '请选择', trigger: 'blur'},
            ],
            BTQSXQJ: [
                {required: true, message: '请输入', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
            RWJL: [
                {required: true, message: '请输入任务奖励', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],

            BXDHZ:[
                {required: true, message: '请输入宝箱兑换值', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
            DHBXBZTS:[
                {required: true, message: '请输入兑换宝箱不足提示', trigger: 'blur'},
                {min: 2, max: 500, message: '至少输入两个字'}
            ],

            XZXM: [
                {required: true, message: '请选择项目', trigger: 'change'},
            ],
            QJSL: [
                {required: true, message: '请输入起捐数量', trigger: 'blur'},
                {pattern: /^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],

            subjectType:[
                {required: true, message: '请选择项目', trigger: 'change'},
            ],
            subjectBT:[
                {required: true, message: '请输入题目备注', trigger: 'blur'},
                {min: 2, max: 100, message: '至少输入两个字'}
            ],





        },


        //玩法配置
        playTable1: [
            {"id": 1, "text": "分享1篇热点文章", "number": ""},
            {"id": 2, "text": "完成1次电能知识答题", "number": ""},
            {"id": 3, "text": "签到", "number": ""},
        ],
        playTable2: [
            {"id": 1, "text": "分享1篇热点文章", "numberF": "", "numberT": ""},
            {"id": 2, "text": "完成1次电能知识答题", "numberF": "", "numberT": ""},
            {"id": 3, "text": "签到", "numberF": "", "numberT": ""},
        ],
        playTable3: [
            {"id": 1, "text": "分享1篇热点文章", "number": ""},
            {"id": 2, "text": "完成1次电能知识答题", "number": ""},
            {"id": 3, "text": "签到", "number": ""},
        ],


        //任务管理
        tableRW:[
            {"xuhao": 1, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 1},
            {"xuhao": 2, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 2},
            {"xuhao": 3, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 3},
            {"xuhao": 4, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 4},
            {"xuhao": 5, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 5},
            {"xuhao": 6, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 6},
            {"xuhao": 7, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 7}
        ],
        rwVisible:false,

        //关联任务
        addRwVisible:false,
        tablesGL:[],
        listData: [],


        //捐赠管理
        seeJZVisible: false,
        addJZVisible: false,
        editJZVisible: false,




        //问卷管理
        seeWJVisible: false,
        addWJVisible: false,
        editWJVisible: false,
        radio:"",








        userName: "",
        examineTime: "",
        types: "",
        typesOptions: [
            {"name": "收获", "id": 1},
            {"name": "任务", "id": 2},
            {"name": "偷取", "id": 3}
        ],



        currentPage: 1,
        startIndex: 0,
        mrPage: 10,
        pageNum: Number,
        countSize: 0,




        currentPage2: 1,
        startIndex2: 0,
        mrPage2: 10,
        pageNum2: Number,
        countSize2: 0,


    },


    created: function () {
        this.setTableHeight();
        this.getDetails();

    },

    mounted: function () {

        this.setDivHeight();

    },



    methods: {

        //获取详情信息
        getDetails() {
            this.id = this.getUrlId();
            this.getInfo1(this.id)

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
        setDivHeight: () => {
            let h = window.innerHeight
            $(".elContainer").height(h);
        },

        //动态设置table高度

        setTableHeight() {
            let h = window.innerHeight;
            this.tableHeight = h - 350;
        },



        //tab被选中时触发
        tabClick(tab, event) {
            if (this.activeName === "first") {
                this.getInfo1(this.id)

            }
            else if (this.activeName === "second") {
                this.getInfo2(this.id)
            }
            else if (this.activeName === "third") {
                this.getInfo3(this.id)
            }
            else if (this.activeName === "fourth") {
                this.getInfo4(this.id,this.startIndex, this.mrPage)
            }
            else if (this.activeName === "fifth") {
                this.getInfo5(this.id,this.startIndex, this.mrPage)
            }
        },


        //玩法配置详情
        getInfo1(id) {
            let params ={
                "project":id
            };

            AJAX2.Async(
                {
                    url: this.URL.details1,
                    data: JSON.stringify(params),
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    }
                    else {

                    }

                }
            );
        },

        //任务管理详情
        getInfo2(id) {
            let params = {
                "id": id
            };

            AJAX2.Async(
                {
                    url: this.URL.details2,
                    data: JSON.stringify(params),
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

        },


        //宝箱配置详情
        getInfo3(id) {
            let params = {
                "id": id
            };

            AJAX2.Async(
                {
                    url: this.URL.details3,
                    data:JSON.stringify(params),
                    special: true ,
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

        },


        //捐赠管理详情
        getInfo4(id, startIndex, pageSize) {
            let params = {
                "id": id,
                "startIndex": startIndex,
                "pageSize": pageSize
            };

            AJAX2.Async(
                {
                    url: this.URL.details4,
                    data: JSON.stringify(params),
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

        },


        //问卷管理详情
        getInfo5(id, startIndex, pageSize) {
            let params = {
                "id": id,
                "startIndex": startIndex,
                "pageSize": pageSize
            };

            AJAX2.Async(
                {
                    url: this.URL.details5,
                    data: JSON.stringify(params),
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

        },











        //显示奖励配置
        showRwJlPz(row) {
            if (row.id) {
                this.rwVisible = true

                let params = {
                    "id": id
                };

                AJAX2.Async(
                    {
                        url: this.URL.details5,
                        data: JSON.stringify(params),
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
            }
            else {
                this.$message.warning("没有ID");
            }

        },

        //进行奖励配置
        doSaveJlPz() {
            this.$refs.form4.validate((valid) => {
                if (valid) {

                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });

        },
















        //显示添加关联项目
        showAddGL() {
            this.addRwVisible = true;
            setTimeout(() => {
                console.log(this.$refs.addTable)
                for (let i = 0; i < this.tables.length; i++) {
                    this.$refs.addTable.toggleRowSelection(this.tables[i], false)
                }
            }, 200);
            this.leftDate=[];
        },

        //选择那个一个
        selectList(val) {
            this.listData = val;


        },

        //列表全部选择
        selectAll(val) {
            this.listData = val;
        },

        //选择改变
        selectionChange(val) {
            this.listData = val;
        },

        //进行项目关联
        doSavePzAdd() {
            this.tablesGL = this.listData;
            this.addRwVisible = false;

        },

        //显示删除任务
        showDeleteRW(row) {
            this.$confirm('', '确定删除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.doDeleteRW(row.id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //进行任务删除
        doDeleteRW(id) {
            for (let i = 0; i < this.tablesGL.length; i++) {
                if (this.tablesGL[i].id === id) {
                    this.tablesGL.splice(i, 1);
                }
            }
        },








        //查看项目捐赠
        seeClickJZ(row) {
            this.seeJZVisible = true;

            let params = {
                "id": row.id
            };

            AJAX2.Async(
                {
                    url: this.URL.seeJZ,
                    data:JSON.stringify(params),
                    special: true ,
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

        //显示添加项目
        showAddXM() {
            this.addJZVisible = true;
        },


        //进行添加项目
        doAddJZ() {
            this.$refs.form6.validate((valid) => {
                if (valid) {

                    let params = {
                        "id": row.id
                    };

                    AJAX2.Async(
                        {
                            url: this.URL.addJZ,
                            data:JSON.stringify(params),
                            special: true ,
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

                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });

        },


        //显示编辑
        editClickJZ(row) {
            this.editJZVisible = true;
            let params = {
                "id": row.id
            };

            AJAX2.Async(
                {
                    url: this.URL.seeJZ,
                    data: JSON.stringify(params),
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

        },

        //进行编辑
        doEditJZ(){
            let params = {
                "id": row.id
            };

            AJAX2.Async(
                {
                    url: this.URL.editJZ,
                    data: JSON.stringify(params),
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
        },


        //显示删除捐赠
        showDeleteJZ(row){

            this.$confirm('', '确定删除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.doDeleteJZ(row.id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //进行删除捐赠
        doDeleteJZ(id){
            let params = {
                "id": id
            };

            AJAX2.Async(
                {
                    url: this.URL.deleteJZ,
                    data: JSON.stringify(params),
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

        },








        //显示添加问答
        showAddWD() {
            this.addWJVisible = true;
            setTimeout(()=>{
                this.setModelHeight();

            },500);




        },

        //动态设置全屏弹框的高度
        setModelHeight() {
            let h = window.innerHeight;
            let div = this.$refs.WJVisible;
            div.style.height = (h - 200) + "px";

        },


        //添加问答
        doAddWD() {
            this.$refs.form6.validate((valid) => {
                if (valid) {

                    let params = {
                        "id": row.id
                    };

                    AJAX2.Async(
                        {
                            url: this.URL.addWJ,
                            data:JSON.stringify(params),
                            special: true ,
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

                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });

        },

        //查看问答
        seeClickWD() {
            this.seeWJVisible=true;
            let params = {
                "id": row.id
            };

            AJAX2.Async(
                {
                    url: this.URL.seeWJ,
                    data:JSON.stringify(params),
                    special: true ,
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

        //显示编辑问答
        editClickWD() {
            this.editWJVisible=true;
            let params = {
                "id": row.id
            };

            AJAX2.Async(
                {
                    url: this.URL.seeWJ,
                    data:JSON.stringify(params),
                    special: true ,
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

        //进行问答编辑
        doEditWD() {
            this.$refs.form6.validate((valid) => {
                if (valid) {

                    let params = {
                        "id": row.id
                    };

                    AJAX2.Async(
                        {
                            url: this.URL.editWJ,
                            data:JSON.stringify(params),
                            special: true ,
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

                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });

        },


        //显示删除问答
        showDeleteWD(row) {
            this.$confirm('', '确定删除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.doDeleteWD(row.id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //进行删除
        doDeleteWD(id) {
            let params = {
                "id": id
            };

            AJAX2.Async(
                {
                    url: this.URL.deleteWJ,
                    data: JSON.stringify(params),
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

        },

        //获取选中数据
        getTemplateRow(index, row) {
            for (let i = 0; i < this.ruleForm.XXNR.length; i++) {
                if (this.ruleForm.XXNR[i].id === row.id) {
                    this.ruleForm.XXNR[i].ZQ = "1";
                }
                else {
                    this.ruleForm.XXNR[i].ZQ = "";
                }

            }

        },


        //向下
        changeBottom(row) {
            for (let i = 0; i < this.ruleForm.XXNR.length; i++) {
                if (this.ruleForm.XXNR[i].id === row.id) {
                    let json = this.ruleForm.XXNR[i];
                    this.ruleForm.XXNR.splice(i, 1);
                    this.ruleForm.XXNR.splice(i + 1, 0, json);
                    break;
                }

            }
        },

        //向上
        changeTop(row) {
            for (let i = 0; i < this.ruleForm.XXNR.length; i++) {
                if (this.ruleForm.XXNR[i].id === row.id) {
                    if (i > 0) {
                        let json = this.ruleForm.XXNR[i];
                        this.ruleForm.XXNR.splice(i, 1);
                        this.ruleForm.XXNR.splice(i - 1, 0, json);
                        break;
                    }

                }

            }
        },

        //新增选择
        addXX() {
            let num = this.ruleForm.XXNR.length;
            if (num === 2) {
                let json = {"id": 3, "text": "C", "NR": "", "ZQ": "", "ZS": ""};
                this.ruleForm.XXNR.push(json)
            }
            else if (num === 3) {
                let json = {"id": 4, "text": "D", "NR": "", "ZQ": "", "ZS": ""};
                this.ruleForm.XXNR.push(json)
            }
            else if (num === 4) {
                let json = {"id": 5, "text": "E", "NR": "", "ZQ": "", "ZS": ""};
                this.ruleForm.XXNR.push(json)
            }
            else if (num === 5) {
                let json = {"id": 6, "text": "F", "NR": "", "ZQ": "", "ZS": ""};
                this.ruleForm.XXNR.push(json)
            }
            else {
                this.$message({
                    type: 'warning',
                    message: '最多只能添加6个选项'
                });
            }

        },

        //删除选项
        deleteXX() {
            let num = this.ruleForm.XXNR.length;
            if(num>2){
                this.ruleForm.XXNR.pop();
            }
            else {
                this.$message({
                    type: 'warning',
                    message: '最少剩余2个选项'
                });
            }




        },




        //保存
        doSave() {
            if (this.activeName === "first") {
                let formArr=['form1','form2','form3'];  //假设这是三个form表单的ref
                let resultArr=[];                        //用来接受返回结果的数组
                let _self=this;
                function checkForm(formName) {           //封装验证表单的函数
                    let result = new Promise(function(resolve, reject) {
                        _self.$refs[formName].validate((valid) => {
                            if (valid) {
                                resolve();
                            } else { reject() }
                        })
                    });
                    resultArr.push(result)               //push 得到promise的结果
                }
                formArr.forEach(item => {                //根据表单的ref校验
                    checkForm(item)
                });
                Promise.all(resultArr).then(function() {            //都通过了
                    let params = {
                        "id": id
                    };

                    AJAX2.Async(
                        {
                            url: this.URL.doSave1,
                            data:JSON.stringify(params),
                            special: true ,
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



                })

                    .catch(function() {
                    _self.$message.warning("值填写不正确");
                    return false
                });

            }
            else if (this.activeName === "third") {

                this.$refs.form5.validate((valid) => {
                    if (valid) {

                        let params = {
                            "id": id
                        };

                        AJAX2.Async(
                            {
                                url: this.URL.doSave3,
                                data:JSON.stringify(params),
                                special: true ,
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

            }
        },


        //取消
        doCancel() {
            window.history.go(-1)
        },



        //捐赠管理显示数据改变
        handleSizeChange(val) {
            this.mrPage = val;
            this.startIndex = (this.currentPage - 1) * this.mrPage;
            this.getTableList();
        },


        //捐赠管理页面改变
        handleCurrentChange(val) {
            this.startIndex = (val - 1) * this.mrPage;
            this.getTableList();
        },


        //问卷管理显示数据改变
        handleSizeChange2(val) {
            this.mrPage2 = val;
            this.startIndex2 = (this.currentPage2 - 1) * this.mrPage2;
            this.getTableList();
        },


        //问卷管理页面改变
        handleCurrentChange2(val) {
            this.startIndex2 = (val - 1) * this.mrPage2;
            this.getTableList();
        },


    }
});
