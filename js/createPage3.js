var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值

        collapseList:[
            {"text":"项目进展1"},
        ]


    },


    created: function () {


    },

    mounted: function () {

        this.setDivHeight();


    },

    methods: {

        //根据屏幕设置div高度
        setDivHeight() {
            let h = window.innerHeight
            $(".elContainer").height(h);

        },


        //下一步
        doSave(id) {
            this.$refs.form.validate((valid) => {
                if (valid) {


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
            let nmu = this.collapseList.length + 1;

            let json = {"text": "项目进展" + nmu + " "};
            this.collapseList.push(json)


        },

        //删除选项
        deleteXX() {
            let num = this.collapseList.length;
            if (num > 1) {
                this.collapseList.pop();
            }
            else {
                this.$message({
                    type: 'warning',
                    message: '最少剩余1个选项'
                });
            }


        },


    }
});
