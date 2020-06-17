var vm = new Vue({
    el: "#app",
    data: {
        URL: {
            listDN: '/osg-omgmt1032/operator/c01/f97', //电能统计列表
            listJZ: '/osg-omgmt1032/operator/c01/f97', //捐赠统计列表
        },

        tableDN:[
            {"xuhao":1,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":2,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":3,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":4,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":5,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":6,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":7,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0}
        ],
        tablesJZ:[
            {"xuhao":1,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":2,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":3,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":4,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":5,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":6,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0},
            {"xuhao":7,"MONEY": "11", "MONEY2": "22", "MONEY3": "22", "MONEY4": "22","CHECK_STATUS":0}
        ],

        userName:"",
        projectName:"",
        examineTime:"",
        types:"",
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
        setTableHeight(){
            let h = window.innerHeight;
            this.tableHeight = h - 300;
        },

        //tab 被选中时触发
        tabClick(value) {
            if (value.index === 0) {
                this.getTableListDN(this.userName, this.types, this.examineTime[0], this.examineTime[1],this.startIndex, this.mrPage)
            }
            else {
                this.getTableListJZ(this.userName, this.startIndex2, this.mrPage2)
            }


        },

        //查询捐赠
        searchUser() {
            this.getTableListJZ(this.projectName, this.startIndex2, this.mrPage2)
        },


        //查询电能统计
        searchDN() {
            this.getTableListDN(this.userName, this.types, this.examineTime[0], this.examineTime[1],this.startIndex, this.mrPage)


        },

        // 重置查询
        searchReset() {
            this.userName = "";
            this.examineTime = [];
            this.types = "";
        },


        //电能查询
        getTableListDN(userName,types,examineTime0,examineTime1,startIndex,pageSize){
            let params = {
                "userName": userName,
                "type":types,
                "stimes":examineTime0,
                "etimes":examineTime1,
                "startIndex": startIndex,
                "pageSize": pageSize
            };
            AJAX2.Async(
                {
                    url: this.URL.listDN,
                    data: JSON.stringify(params),
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    }
                    else {
                        this.tableDN = resp.data;

                    }

                }
            );
        },


        //捐赠统计查询
        getTableListJZ(projectName,startIndex,pageSize) {
            let params = {
                "projectName": projectName,
                "startIndex": startIndex,
                "pageSize": pageSize
            };
            AJAX2.Async(
                {
                    url: this.URL.listJZ,
                    data: JSON.stringify(params),
                    special: true,
                    isLoading: true
                },
                function (resp) {
                    if (resp.code === 0 || resp.code === "0" || resp.code === 2 || resp.code === "2") {
                        $.error(resp.message);
                    }
                    else {
                        this.tablesJZ = resp.data;
                    }

                }
            );
        },


        //点击捐赠记录
        editClick(row) {

            this.page = "/cdn-vue-elementUi/page/donationRecord.html?" + row.id + "";
            window.location.href = this.page;


        },



        //电能统计显示数据改变
        handleSizeChange(val) {
            this.mrPage = val;
            this.startIndex = (this.currentPage - 1) * this.mrPage;
            this.getTableListDN(this.userName, this.types, this.examineTime[0], this.examineTime[1],this.startIndex, this.mrPage)
        },


        //电能统计页面改变
        handleCurrentChange(val) {
            this.startIndex = (val-1) * this.mrPage;
            this.getTableListDN(this.userName, this.types, this.examineTime[0], this.examineTime[1],this.startIndex, this.mrPage)
        },


        //捐赠统计显示数据改变
        handleSizeChange2(val) {
            this.mrPage2 = val;
            this.startIndex2 = (this.currentPage2 - 1) * this.mrPage2;
            this.getTableListJZ(this.projectName, this.startIndex2, this.mrPage2);
        },


        //捐赠统计页面改变
        handleCurrentChange2(val) {
            this.startIndex2 = (val-1) * this.mrPage2;
            this.getTableListJZ(this.projectName, this.startIndex2, this.mrPage2);
        },


    }
});
