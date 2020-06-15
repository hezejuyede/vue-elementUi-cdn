

var vm = new Vue({
    el: "#app",
    data: {
        URL: {
            list: '/osg-omgmt1032/operator/c01/f97',       //列表
            delete: "/osg-omgmt1032/operator/c01/f97",     //删除
            release: "/osg-omgmt1032/operator/c01/f97",    //发布
            offline: "/osg-omgmt1032/operator/c01/f97",    //下线
        },
        tables: [
            {"xuhao": 1, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "CHECK_STATUS": 0},
            {"xuhao": 2, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "CHECK_STATUS": 0},
            {"xuhao": 3, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "CHECK_STATUS": 0},
            {"xuhao": 4, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "CHECK_STATUS": 0},
            {"xuhao": 5, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "CHECK_STATUS": 0},
            {"xuhao": 6, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "CHECK_STATUS": 0},
            {"xuhao": 7, "MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22", "CHECK_STATUS": 0}
        ],


        userName: "",

        examineTime: "",
        releaseTime: "",
        types: "",
        typesOptions: [
            {"name": "收获", "id": 1},
            {"name": "任务", "id": 2},
            {"name": "偷取", "id": 3}
        ],
        status: "",
        statusOptions: [
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
            this.tableHeight = h - 320;
        },


        //打开全局遮罩层
        openFullScreen() {
            this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: '#fff'
            });
        },

        //关闭全局遮罩层
        closeFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
            });
            loading.close();
        },


        //查询
        doSearch() {

            this.getLoadingList(this.userName, this.examineTime[0], this.examineTime[1], this.releaseTime[0], this.releaseTime[1],this.types,  this.status,this.startIndex, this.pageSize);

        },


        //进行重置
        doReset() {
            this.userName="";
            this.examineTime=[];
            this.types="";
        },


        //页面加载去请求的table
        getTableList(data1, data2, data3, data4, data5, data6, data7, data8, data9) {
            let params = {
                "userName": data1,
                "s": data2,
                'e': data3,
                'fs': data4,
                'es': data5,
                "types": data6,
                "status": data7,
                "startIndex": data8,
                "pageSize": data9
            };

            AJAX2.Async(
                {
                    url: this.URL.list,
                    data: JSON.stringify(params),
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    } else {
                        this.tables = resp.data
                    }

                }
            );

        },


        //帶loading的
        getLoadingList(data1, data2, data3, data4, data5, data6, data7, data8, data9) {
            this.openFullScreen();
            let params = {
                "userName": data1,
                "s": data2,
                'e': data3,
                'fs': data4,
                'es': data5,
                "types": data6,
                "status": data7,
                "startIndex": data8,
                "pageSize": data9
            };

            AJAX2.Async(
                {
                    url: this.URL.list,
                    data: JSON.stringify(params),
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        this.closeFullScreen();
                        $.error(resp.message);
                    } else {
                        this.closeFullScreen();
                        this.tables = resp.data
                    }

                }
            );

        },




        //进行新增

        doAdd() {

            let page = "/cdn-vue-elementUi/page/noticeAdd.html";
            window.location.href = page;

        },


        //进行编辑
        editClick(id) {
            let page = "/cdn-vue-elementUi/page/noticeEdit.html+" + id + "";
            window.location.href = page;
        },

        //显示删除
        showDelete(id) {
            this.$confirm('删除后不和恢复', '确定删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.doDelete(id)

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },

        //进行删除
        doDelete(id) {
            AJAX2.Async(
                {
                    url: this.URL.delete,
                    data: id,
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    }
                    else {
                        this.getLoadingList(this.userName, this.examineTime[0], this.examineTime[1], this.releaseTime[0], this.releaseTime[1],this.types,  this.status,this.startIndex, this.pageSize);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }

                }
            );

        },


        //查看详情
        detailsClick(id) {
            let page = "/cdn-vue-elementUi/page/noticeEdit.html+" + id + "";
            window.location.href = page;
        },


        //进行发布
        releaseClick(id) {
            AJAX2.Async(
                {
                    url: this.URL.release,
                    data: id,
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    }
                    else {
                        this.getLoadingList(this.userName, this.examineTime[0], this.examineTime[1], this.releaseTime[0], this.releaseTime[1],this.types,  this.status,this.startIndex, this.pageSize);
                        this.$message({
                            type: 'success',
                            message: '发布成功!'
                        });
                    }

                }
            );
        },


        //进行下线
        offlineClick() {
            AJAX2.Async(
                {
                    url: this.URL.offline,
                    data: id,
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    } else {
                        this.getLoadingList(this.userName, this.examineTime[0], this.examineTime[1], this.releaseTime[0], this.releaseTime[1],this.types,  this.status,this.startIndex, this.pageSize);
                        this.$message({
                            type: 'success',
                            message: '下线成功!'
                        });
                    }

                }
            );
        },


        //分页显示数据改变
        handleSizeChange(val) {
            this.mrPage = val;
            this.startIndex = (this.currentPage - 1) * this.mrPage;
            this.getTableList(this.userName, this.examineTime[0], this.examineTime[1], this.releaseTime[0], this.releaseTime[1],this.types,  this.status,this.startIndex, this.pageSize);
        },


        //分页页面改变
        handleCurrentChange(val) {
            this.startIndex = (val - 1) * this.mrPage;
            this.getTableList(this.userName, this.examineTime[0], this.examineTime[1], this.releaseTime[0], this.releaseTime[1],this.types,  this.status,this.startIndex, this.pageSize);
        },


    }
});
