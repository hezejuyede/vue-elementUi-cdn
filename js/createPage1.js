var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值
        URL: {
            list: '/osg-omgmt1032/operator/c01/f97',
        },

        ruleForm: {
            XMMC:"",
            province:"",
            city:"",
            county:"",
            date1:"",
            date2:"",
            XMGS:"",
            MJNR:"1",
            MJNR1:"",
            MJNR2:"",
            NJLX:"1",
            MJZS:"",


        },
        rules: {
            XMMC:[
                {required: true, message: '请输入项目名称', trigger: 'blur'},
                {min: 2, max: 100, message: '至少输入两个字'}
            ],
            province: [
                {required: true, message: '请选择', trigger: 'change'},
            ],
            city: [
                {required: true, message: '请选择', trigger: 'change'},
            ],
            county: [
                {required: true, message: '请选择', trigger: 'change'},
            ],

            date1: [
                {required: true, message: '请选择', trigger: 'change'},
            ],
            date2: [
                {required: true, message: '请选择', trigger: 'change'},
            ],

            XMGS: [
                {required: true, message: '请选择', trigger: 'change'},
            ],

            MJNR: [
                {required: true, message: '请选择', trigger: 'change'},
            ],
            MJNR1: [
                {required: true, message: '请输入游戏内道具', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
            MJNR2: [
                {required: true, message: '请输入人民币', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
            MJZS: [
                {required: true, message: '请输入募集总量', trigger: 'blur'},
                {pattern:/^\+?[1-9][0-9]*$/, message: '格式不正确'}
            ],
        },

        typesOptions: [
            {"name": "收获", "id": 1},
            {"name": "任务", "id": 2},
            {"name": "偷取", "id": 3}
        ],


        headers: {},
        uploadUrl:"",
        uploadData: {},
        hideUpload: false,


    },




    created: function () {
        this.getInfo();


    },



    mounted: function () {

        this.setDivHeight();


    },









    methods: {                     // 定义方法，用于事件交互时使用的函数


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
            let div = this.$refs.elMainContent;
           /* div.style.height = (h - 250) + "px";*/
        },


        //下一步
        nextStep(id) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let page = "/cdn-vue-elementUi/page/createPage2.html?" + id + "";
                    window.location.href = page;

                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });

        },


        //取消
        cancel(id) {
            window.history.go(-1)

        },




        //上传照片前的校验
        beforeAvatarUpload(file) {
            var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type);
            const isLt4M = file.size / 1024 / 1024 <= 2;
            if (!testmsg) {
                this.$message.error('上传图片格式不对!');
                return false
            }
            if (!isLt4M) {
                this.$message.error('上传图片大小不能超过 2M!');
                return false
            }
        },


        //图片上传成功后调用
        uploadSuccess(response, file, fileList) {

        },


        //上传失败
        uploadFailure(err, file, fileList) {
            this.hideUpload = false;
            this.$refs.upload.clearFiles();
            this.$message.warning(err);
        },


        //上传超过设定值
        handleEditChange(file, fileList) {
            this.hideUpload = fileList.length >= 1;
        },

        //删除上传照片后
        handleRemove(file, fileList) {
            this.hideUpload = fileList.length >= 1
        },





    }
});
