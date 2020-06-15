var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值
        URL: {
            list: '/osg-omgmt1032/operator/c01/f97',
        },


    },

    //刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳'
    beforeCreate: function () {


    },


    created: function () {
        this.getInfo();

    },



    mounted: function () {

        this.setDivHeight();


    },







    methods: {

        //根据ID查询
        getInfo() {
            let params = {
                "aa": 11
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
                        $.success(`操作成功`, function () {
                            console.log(1)
                        });
                    }

                }
            );

        },

        //根据屏幕设置div高度
        setDivHeight() {
            let h = window.innerHeight
            $(".elContainer").height(h);

            editormd("test-editor", {
                width: "100%",
                height: 740,
                path: "../common/js/markdown/lib/",
                codeFold: true,
                saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
                searchReplace: true,
                htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
                emoji: true,
            });
            editormd.emoji = {
                path: "../common/js/markdown/plugins/emoji-dialog/",
                ext: ".png"
            };
        },


        //下一步
        nextStep(id) {
            let page = "/cdn-vue-elementUi/page/createPage3.html?" + id + "";
            window.location.href = page;

        },


        //上一步
        lastStep(id) {
            let page = "/cdn-vue-elementUi/page/createPage1.html?" + id + "";
            window.location.href = page;
        },







    }
});
