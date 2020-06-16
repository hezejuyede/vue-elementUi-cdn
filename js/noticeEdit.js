var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值

        URL: {
            upload: '/login/f04',//上传图片
            edit: '/osg-omgmt1032/operator/c01/f97',//数据回显
            doEdit: '/osg-omgmt1032/operator/c01/f97' //进行编辑
        },

        ruleForm: {
            BTMC: "",
            GGGS:"",
            FBFS:"1",
            FBSJ:"",
            GGZW:""
        },
        rules: {
            BTMC: [
                {required: true, message: '请输入标题名称', trigger: 'blur'},
                {min: 2, max: 20, message: '姓名在 2 到 20 个字符'}
            ],
            GGGS: [
                {required: true, message: '请选择公告归属', trigger: 'blur'},
                {min: 2, max: 20, message: '姓名在 2 到 20 个字符'}
            ],
            FBSJ: [
                {required: true, message: '请选择发布时间', trigger: 'change'},
            ],
            GGZW: [
                {required: true, message: '请输入公告正文', trigger: 'change'},
            ],

        },

        options: [
            {
                value: '选项1',
                label: '黄金糕'
            },
            {
                value: '选项2',
                label: '双皮奶'
            },
            {
                value: '选项3',
                label: '蚵仔煎'
            },
            {
                value: '选项4',
                label: '龙须面'
            },
            {
                value: '选项5',
                label: '北京烤鸭'
            }],

        editorOption: {
            placeholder: ''
        },

        headers: {},

        uploadData: {},
        hideUpload: false,

    },


    created: function () {


    },

    mounted: function () {

        this.setDivHeight();


    },



    methods: {

        //根据屏幕设置div高度
        setDivHeight: () => {
            $(".elContainer").height(window.innerHeight);
        },


        //进行新增
        doAdd() {

            this.$refs.form.validate((valid) => {
                if (valid) {

                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });


        },


        //进行保存
        doSave() {
            this.$refs.form.validate((valid) => {
                if (valid) {

                } else {
                    return this.$message.warning("信息填写不正确");
                    return false
                }
            });


        },


        //取消
        doCancel() {

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
