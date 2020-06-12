var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值


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


    }
});
