var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值
        URL: {
            upload: '/login/f04',//上传图片
            add: '/osg-omgmt1032/operator/c01/f97',//新增公告
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
            placeholder: '',

        },

        headers: {},
        uploadUrl:"",
        uploadData: {},
        hideUpload: false,

    },


    created: function () {


    },

    mounted: function () {

        this.setDivHeight();
        this.autotip();


    },

    methods: {

        //根据屏幕设置div高度
        setDivHeight: () => {
            $(".elContainer").height(window.innerHeight);
        },


        //富文本框设计鼠标放上去中文提示
        autotip() {
            const titleConfig = [
                {Choice: '.ql-bold', title: '加粗'},
                {Choice: '.ql-italic', title: '斜体'},
                {Choice: '.ql-underline', title: '下划线'},
                {Choice: '.ql-header', title: '段落格式'},
                {Choice: '.ql-strike', title: '删除线'},
                {Choice: '.ql-blockquote', title: '块引用'},
                {Choice: '.ql-code', title: '插入代码'},
                {Choice: '.ql-code-block', title: '插入代码段'},
                {Choice: '.ql-font', title: '字体'},
                {Choice: '.ql-size', title: '字体大小'},
                {Choice: '.ql-list[value="ordered"]', title: '编号列表'},
                {Choice: '.ql-list[value="bullet"]', title: '项目列表'},
                {Choice: '.ql-direction', title: '文本方向'},
                {Choice: '.ql-header[value="1"]', title: 'h1'},
                {Choice: '.ql-header[value="2"]', title: 'h2'},
                {Choice: '.ql-align', title: '对齐方式'},
                {Choice: '.ql-color', title: '字体颜色'},
                {Choice: '.ql-background', title: '背景颜色'},
                {Choice: '.ql-image', title: '图像'},
                {Choice: '.ql-video', title: '视频'},
                {Choice: '.ql-link', title: '添加链接'},
                {Choice: '.ql-formula', title: '插入公式'},
                {Choice: '.ql-clean', title: '清除字体格式'},
                {Choice: '.ql-script[value="sub"]', title: '下标'},
                {Choice: '.ql-script[value="super"]', title: '上标'},
                {Choice: '.ql-indent[value="-1"]', title: '向左缩进'},
                {Choice: '.ql-indent[value="+1"]', title: '向右缩进'},
                {Choice: '.ql-header .ql-picker-label', title: '标题大小'},
                {Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一'},
                {Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二'},
                {Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三'},
                {Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四'},
                {Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五'},
                {Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六'},
                {Choice: '.ql-header .ql-picker-item:last-child', title: '标准'},
                {Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号'},
                {Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号'},
                {Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号'},
                {Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准'},
                {Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐'},
                {Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐'},
                {Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐'},
                {Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐'}
            ];
            document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
            for (let item of titleConfig) {
                let tip = document.querySelector('.quill-editor ' + item.Choice)
                if (!tip) continue
                tip.setAttribute('title', item.title)
            }
        },


        //进行新增
        doAdd() {

            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm.GGZW)

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

