   new Vue({
        el:"#app",
        data:{
            totalMoney:0,
            productList:[],
            checkAllFlag:false,
            delFlag:false,
            curProduct:''
        },
        // 这个是局部过滤器filters
        filters:{
            formatMoney:function (value) {
                return "￥"+value.toFixed(2)
            }
        },
        // 渲染完后加载mounted
        mounted:function(){
            this.$nextTick(function () {
                this.cartView();
            });

        },
        // 这里是放方法的
        methods:{
            cartView:function () {
                var _this = this;
                this.$http.get('data/cartData.json').then( reponse => {
                    _this.productList =reponse.data.result.list;
                    console.log(_this.productList)
                });
            },
            changeMoney:function (num,way) {
                if(way>0){
                    num.productQuantity++;
                }else{
                    num.productQuantity--;
                    if( num.productQuantity<1){
                        num.productQuantity = 1;
                    }
                }
                this. calcTotalPrice();
            },
            selectedProduct:function (item) {
                if(typeof item.checked == 'undefined'){
                    // Vue.set(item,"checked",true);//全局
                    this.$set(item,"checked",true);//局部
                }else {
                    item.checked=!item.checked
                }
                this. calcTotalPrice();
            },
            checkAll:function (flag) {
                this.checkAllFlag = flag;
                var _this = this;
                this.productList.forEach(function (item,index) {
                    if(typeof item.checked == 'undefined'){
                        // Vue.set(item,"checked",true);//全局
                        _this.$set(item,"checked",_this.checkAllFlag);//局部
                    }else {
                        item.checked=_this.checkAllFlag;
                    }
                }),
                this. calcTotalPrice();
            },
            calcTotalPrice:function () {
                var _this=this;
               this.totalMoney=0;
                this.productList.forEach(function (item,index) {
                    if(item.checked){
                        _this.totalMoney +=item.productPrice*item.productQuantity;
                    }
                })
            },
            delConfirm:function (item) {
                this.delFlag=true;
                this.curProduct = item;
            },
            delProduct:function () {
                var index = this.productList.indexOf(this.curProduct);
                this.productList.splice(index,1);
                this.delFlag = false;
            }
        }
    });
   // Vue.filter{"money",function (value,type) {
   //          return "￥"+value.toFixed(2) +type
   //      }}