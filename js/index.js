





var vm = new Vue({
    el: "#app",
    data: {
        tableData: [
            {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        },
            {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        },
            {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
    },
    created: function () {
        this.getList();
    },
    mounted: function () {
        this.getMessage();

    },
    computed: function () {

    },

    update: function () {

    },

    destroyed: function () {


    },

    watch: function () {

    },


    methods: {

        getList: function () {

            console.log(1)

        },

        getMessage: function () {
            console.log(2)
        }


    }
});
