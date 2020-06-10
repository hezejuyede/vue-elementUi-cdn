var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值
        tables: [
            {"xuhao": 1, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 1},
            {"xuhao": 2, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 2},
            {"xuhao": 3, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 3},
            {"xuhao": 4, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 4},
            {"xuhao": 5, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 5},
            {"xuhao": 6, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 6},
            {"xuhao": 7, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "id": 7}
        ],


        activeName: "third",
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
            DHBXBZTS:""

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


    },


    created: function () {
        this.setTableHeight();
        this.getTableList();


    },

    mounted: function () {

        this.setDivHeight();

    },



    methods: {

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

            } else if (this.activeName === "second") {

            } else if (this.activeName === "third") {

            } else if (this.activeName === "fourth") {

            } else if (this.activeName === "fifth") {

            }
        },


        //页面加载去请求的table
        getTableList() {

        },

        //显示任务配置
        showRwPz(row) {
            if (row.id) {
                this.rwVisible = true
            }
            else {
                this.$message.warning("没有ID");
            }

        },

        //进行任务配置
        doSavePz() {
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











        //显示添加项目
        showAddXM() {


        },


        //显示添加问答
        showAddWD() {

        },


        editClick() {


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
                     console.log(1)

                }).catch(function() {
                    _self.$message.warning("值填写不正确");
                    return false
                });

            }
            else if (this.activeName === "second") {

            }
            else if (this.activeName === "third") {

                this.$refs.form5.validate((valid) => {
                    if (valid) {

                    } else {
                        return this.$message.warning("信息填写不正确");
                        return false
                    }
                });

            } else if (this.activeName === "fourth") {

            } else if (this.activeName === "fifth") {

            }
        },


        //取消
        doCancel() {
            window.history.go(-1)
        },


        //显示数据改变
        handleSizeChange(val) {
            this.mrPage = val;
            this.startIndex = (this.currentPage - 1) * this.mrPage;
            this.getTableList();
        },


        //页面改变
        handleCurrentChange(val) {
            this.startIndex = (val - 1) * this.mrPage;
            this.getTableList();
        },


    }
});
