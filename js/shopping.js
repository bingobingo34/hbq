$(function () {
    // 返回首页
    $('.denglu').click(function () {
        window.location.href = '../index.html';
    })
    // 获取 login
    let login = getCookie('login');
    // shopping 实例
    class Shopping{
        constructor(ele, userName) {
            this.ele = $(ele);
            this.username = userName;
            this.info = {
                number: 0,
                totalPrice: 0
            };
            this.init();
        };
    init(){
        this.sone = $('.sone');
        this.ssize=$('.ssize');
        this.snum = $('.snum');
        this.rmb= $('.rmb');
        this.allchecked = $('.checkAll');
        this.getDate();
    }
    // 获取数据
     getDate() {
         let that = this
        $.ajax({
            url: '../php/getCarDate.php',
            type: 'get',
            data: {
                username: login
            },
            success: function (res) {
               that.cardata = JSON.parse(res);
               let cardata =  that.cardata;
               console.log(cardata);
                cardata.forEach(item => {
                    item.select = false;
                })
                that.render(cardata);
                 // 事件委托形式的绑定点击事件
                 that.ele.click(function(e){
                     let target = e.target;
                     that.id = target.parentNode.getAttribute('id');
                    //  单选
                     if(target.classList.contains('checkbox')){
                        cardata.forEach(item => {
                            if (item.goodsId == target.parentNode.id) {
                                item.select = target.checked;
                            }
                        })
                        that.calculation(cardata);
                     }
                    //  全选
                    if (target.classList.contains('checkAll')) {
                        cardata.forEach(item => {
                            item.select = target.checked;
                        })
                        that.render(cardata);
                    }
                    // 减少 num
                    if (target.classList.contains('red')) {
                        let n = target.getAttribute('num');
                        let num = --n;
                        that.bian(target,cardata,num);
                     
                    }
                    // 增加 num
                    if (target.classList.contains('add')) {
                        let n = target.getAttribute('num');
                        let num = ++n;
                        that.bian(target,cardata,num);
                    }
                    // 删除
                    if (target.classList.contains('sdel')) {
                        that.remove(target,cardata);
                        window.location.reload()
                    }
                    // 一键清空
                    if (target.classList.contains('del')) {
                        that.del(cardata);
                    }
                 })
            }
        })
    }
     // 渲染数据
      render(cardata) {
          let c = cardata
        this.calculation(c);
        let str = '';
        cardata.forEach(item => {
            let total = item.num * parseInt(item.minGroupPrice / 1000 - item.couponDiscount / 1000);
            str +=
                `
                <div class="sone" id ="${item.goodsId}">
                <input type="checkbox" ${item.select ? "checked" :''} class="checkbox"}>
                <div class="miaoshu">
                    <img src="${item.goodsImageUrl}" alt="">
                    <p>
                        ${item.goodsName}
                    </p>
                </div>
                <div class="oneprice">
                    单价:<span>￥${parseInt(item.minGroupPrice / 1000 - item.couponDiscount / 1000)}.00</span>
                </div>
                <div class="count">
                    <span class="red" num ="${item.num}">-</span>
                    <span class="num" disabled>${item.num}</span>
                    <span class="add" num ="${item.num}">+</span>
                </div>
                <div class="oneAll">
                    单个商品总价格:<span class="ototal">￥${total}.00</span>
                </div>
                <button class="sdel">删除</button>
            </div>
            
                `
        })
        $('.shopAll').html(str)
    }
    // 计算商品数量 价格
     calculation(cardata) {
        let selectData = cardata.filter(item => {
            return item.select == true;
        });
        // 计算所选商品的数量 和价格
        let number = selectData.reduce((pre, cur) => {
            return pre + cur.num * 1;
        }, 0);
        let totalPrice = selectData.reduce((pre, cur) => {
            return pre + cur.num * parseInt(cur.minGroupPrice / 1000 - cur.couponDiscount / 1000);
        }, 0)
        // 判断是否全选 当所有数据中的is_select = true 的时候表示所有的数据都白勾上
        let res1 = cardata.every(item => {
            return item.select == true
        })
        // 把商品的种类 和所选商品的数量 和价格渲染到结构
        this.ssize.html(cardata.length);
        $('.snum').html(number);
        $('.rmb').html('￥' + totalPrice + '.00');
        $('.checkAll').prop('checked', res1);
    }
     //  num变化
     bian(target,cardata,num){
         let tt = this
      let id = target.parentNode.parentNode.id;
        if (num < 1) {
            alert('商品数量最少为1');
            return;
        }
        $.ajax({
            url: '../php/updatenum.php',
            data: {
                username: login,
                id: id,
                num: num,
            },
            type: 'get',
            success: function (res) {
                if (JSON.parse(res).code == 1) {
                    cardata.forEach(item => {
                        if(item.goodsId == id){
                            item.num = num;
                            tt.render(cardata)
                        }
                    })
                }

            }
        })
    }
    //  删除商品
    remove(target,cardata){
        let tt = this;
        let id = target.parentNode.id;
        console.log(id);
        $.ajax({
            url: '../php/delcar.php',
            data: {
                username: login,
                id: id
            },
            type: 'get',
            success: function (res) {
                if (JSON.parse(res).code == 1) {
                    console.log(1);
                  let card = cardata.filter(item => {
                        return item.goodsId != id;
                    })
                    tt.render(card)
                }

            }
        })
    }
    // 一键清空
    del(cardata){
        let tt = this
        $.ajax({
            url: '../php/delall.php',
            success: function (res) {
                cardata = [];
                tt.render(cardata);
            }
        })
    }
    }
    // 支付
    new Shopping('.center', login);
    $('.js').click(function(){
        alert('是否跳转到支付宝支付')
    })

})
