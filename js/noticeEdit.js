var vm = new Vue({                  //创建Vue 实例
    el: "#app",                     // DOM 元素，挂载视图模型，
    data: {                         // 定义属性，并设置初始值

        ruleForm: {
            CONSIGNEE_NAME: "",
            PHONE:"",
            HARVEST_ADDRESS:"",
            UNIT_NAME:"",
            address:""
        },
        rules: {
            CONSIGNEE_NAME: [
                {required: true, message: '请输入收货人姓名', trigger: 'blur'},
                {min: 2, max: 20, message: '姓名在 2 到 20 个字符'}
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
        uploadUrl:"",
        uploadData: {},
        hideUpload: false,


        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },

    //刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳'
    beforeCreate: function () {


    },

    //这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数'
    //'在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取'
    // '接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染'
    created: function () {


    },

    //虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated'
    // 在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取'
    //'接下来开始render，渲染出真实dom'
    beforeMount: function () {

    },
    //mounted：此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了'
    //'可以在这里操作真实dom等事情...')
    mounted: function () {

        this.setDivHeight();


    },

    //用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，
    // 然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
    //适合对多个变量或者对象进行处理后返回一个结果值，
    //也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化，
    //计算属性默认只有getter，可以在需要的时候自己设定setter：

    //一个的数据受很多数据的影响

    computed: {
        get: function () {

        },
        // setter
        set: function (newValue) {

        }
    },

    //重新渲染之前触发'，'然后vue的虚拟dom机制会重新构建虚拟dom与
    // 上一次的虚拟dom树利用diff算法进行对比之后重新渲染'
    //这里不能更改数据，否则会陷入死循环

    beforeUpdate: function () {

    },

    //数据已经更改完成，dom也重新render完成'
    //这里不能更改数据，否则会陷入死循环

    update: function () {


    },

    ////销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等...'

    beforeDestroy: function () {

    },

    //组件的数据绑定、监听...都去掉了,只剩下dom空壳，这里也可以善后'

    destroyed: function () {


    },

    //主要用于监控vue实例的变化，它监控的变量当然必须在data里面声明才可以，
    // 它可以监控一个变量，也可以是一个对象，
    //只能监控整个对象或单个变量
    //一般用于监控路由、input输入框的值特殊处理等等，它比较适合的场景是一个数据影响多个数据
    //一个数据影响很多数据

    watch: {
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val
        }
    },


    methods: {                     // 定义方法，用于事件交互时使用的函数

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