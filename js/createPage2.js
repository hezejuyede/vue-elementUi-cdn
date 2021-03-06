var testEditor

var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值
        URL: {
            details: '/osg-omgmt1032/operator/c01/f97',//数据回显
            nextStep: '/osg-omgmt1032/operator/c01/f97',//下一步
        },


    },

    //刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳'
    beforeCreate: function () {


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
            testEditor = editormd("test-editor", {
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
            $(".editormd-markdown-textarea").val("11")


        },


        //下一步
        nextStep(id) {
            let markdown = testEditor.getMarkdown();
            let html = testEditor.getHTML()


            let page = "/cdn-vue-elementUi/page/createPage3.html?" + id + "";
            window.location.href = page;

            let params = {
                "id": id,
                "markdown": markdown,
                "html": html
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


        },


        //上一步
        lastStep(id) {
            let page = "/cdn-vue-elementUi/page/createPage1.html?" + id + "";
            window.location.href = page;
        },

        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },







    }
});
