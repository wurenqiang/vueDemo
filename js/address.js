new Vue({
    el: '.container',
    data: {
        addressList: [],
        limtnumber:3,
        clickIndex:0,
        delectaddress:'',
        shippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAdddressList()
        })
    },
    computed:{
        // 过滤器，控制显示个数
        filteredItems: function () {
            return this.addressList.slice(0,this.limtnumber)
        }
    },
    methods: {
        getAdddressList: function () {
            var _this = this;
            this.$http.get("data/address.json").then(reponse => {
                if (reponse.data.status == "0") {
                    _this.addressList = reponse.data.result;
                    // console.log(_this.addressList)
                }
            })
        },
        addressMore:function () {
            this.limtnumber = this.addressList.length;
        },
        seltDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId == addressId){
                   address.isDefault=true;
                }else {
                    address.isDefault=false;
                }
            })
        },
        delectlist:function (item) {
            this.delectaddress=item;
            var index = this.addressList.indexOf(this.delectaddress);
            this.addressList.splice(index,1);

            console.log(index)
        }
    },
});