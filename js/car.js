$(function () {
    let login = $.cookie('login');
    if (!login) {
        localStorage.setItem('url', location.href)
        location.href = '../html/login.html'
    }
    //面向对象
    class Car {
        constructor(ele, username) {
            this.ele = $(ele);
            this.username = username;
            this.info = {
                number: 0,
                totalPrice: 0
            }
            this.init()

        }
        init() {
            this.body = this.ele.find('.panel-body');
            this.species = this.ele.find('.species');
            this.number = this.ele.find('.number');
            this.total = this.ele.find('.total');
            this.allChecked = this.ele.find('.allChecked');
            this.getData();
            //事件委托绑定点击事件

        }
        getData() {
            let that = this
            $.ajax({
                url: '../api/getCarData.php',
                method: 'post',
                data: {
                    username: this.username
                },
                success: function (data) {
                    data = JSON.parse(data);
                    data.forEach(item => {
                        item.is_select = false;
                    })
                    that.renderHtml(data);

                    that.ele.click(function (e) {
                        let target = e.target;
                        that.id = target.getAttribute('idx');
                        if (target.classList.contains('checked')) {
                            data.forEach(function (item) {
                                if (item.goods_id == that.id) {
                                    item.is_select = target.checked;
                                }
                                // return item.is_select = true
                            })
                            that.calculation(data);
                        }
                        if (target.classList.contains('allChecked')) {

                            data.forEach(function (item) {
                                item.is_select = target.checked;
                            })
                            that.renderHtml(data);
                        }
                        if (target.classList.contains('reduce')) {
                            that.reduce(data);
                        }
                        if (target.classList.contains('add')) {
                            that.add(data);
                        }
                        if (target.classList.contains('del')) {
                            that.remove(data);
                        }
                        if (target.classList.contains('settlement')) {
                            // 结算，把勾选的数据删除
                            // 数据中is_select = true 这些数据被删除
                            // 过滤is_select = true的这些数据，然后循环的去发送ajax请求


                            let deleteData = data.filter(item => {
                                return item.is_select == true;
                            })

                            deleteData.forEach(item => {
                                that.settle(data, item.goods_id)
                            })
                        }
                    })

                }
            });

        }
        renderHtml(data) {
            let data1 = data;
            this.calculation(data1);
            let str = '';
            data.forEach(function (item) {
                let total = item.goods_price * item.goods_num;
                str += `<div class="media">
                <div class="media-left">
                    <a href="#" class="media_left">
                        <input type="checkbox" ${item.is_select ? "checked" :''} class="checked" idx="${item.goods_id}">
                        <img class="media-object" style="width: 100px;height:100px;"
                            src="${item.goods_big_logo}"
                            alt="...">
                    </a>
                </div>
                <div class="media-body">
                    <div class="media_body_left">
                        <h4 class="media-heading">${item.goods_name}</h4>
                        <div class="price">
                            <i class="glyphicon glyphicon-yen"></i>
                            <span>${item.goods_price}</span>
                        </div>
                    </div>
                    <div class="media_body_center">
                        <div class="btn-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default reduce" idx="${item.goods_id}">-</button>
                            <button type="button" class="btn btn-default">${item.goods_num}</button>
                            <button type="button" class="btn btn-default add" idx="${item.goods_id}">+</button>
                        </div>
                    </div>
                    <div class="media_body_right">
                        <span class="item_total">小计:￥${total.toFixed(2)}</span>
                        <span idx="${item.goods_id}" class="glyphicon glyphicon-remove del"></span>
                    </div>
                </div>
            </div>`;
            })

            this.body.html(str);
        }


        calculation(data) {
            this.selectData = data.filter(function (item) {
                return item.is_select == true;
            });
            this.info.number = this.selectData.reduce((pre, cur) => {
                return pre + cur.goods_num * 1;
            }, 0);

            this.info.totalPrice = this.selectData.reduce((pre, cur) => {
                return pre + cur.goods_num * cur.goods_price
            }, 0)

            let res = data.every(item => {
                return item.is_select == true
            })
            this.species.html(data.length);
            this.number.html(this.info.number)
            this.total.html(this.info.totalPrice)
            this.allChecked.prop('checked', res);
        }


        reduce(data) {
            let that = this
            let num = data.find(function (item) {
                return item.goods_id == that.id
            }).goods_num

            if (num <= 1) {
                alert('商品数量数量最小为1')
                return
            }
            $.ajax({
                url: '../api/updateCarData.php',
                method: 'post',
                data: {
                    'goods_id': that.id,
                    'goods_num': --num,
                    'username': that.username
                },
                success: function (res) {
                    res = JSON.parse(res);
                    if (res.code) {
                        data.forEach(item => {
                            if (item.goods_id == that.id) {
                                item.goods_num = num;

                                that.renderHtml(data);
                            }
                        })
                    }
                }
            })
        }


        add(data) {
            let that = this
            let num = data.find(function (item) {
                return item.goods_id == that.id
            }).goods_num

            $.ajax({
                url: '../api/updateCarData.php',
                method: 'post',
                data: {
                    'goods_id': that.id,
                    'goods_num': ++num,
                    'username': that.username
                },
                success: function (res) {
                    res = JSON.parse(res);
                    if (res.code) {
                        data.forEach(item => {
                            if (item.goods_id == that.id) {
                                item.goods_num = num;

                                that.renderHtml(data);
                            }
                        })
                    }
                }
            })
        }
        remove(data){
            let that = this
            $.ajax({
                url: '../api/deleteCarData.php',
                method: 'post',
                data: {
                    username: that.username,
                    goods_id: that.id
                },
                success: function (res) {
                    res = JSON.parse(res);
                    if (res.code) {
                        data = data.filter(function (item) {
                            return item.goods_id != that.id;
                        })
                        that.renderHtml(data);
                    }
                }
            })
        }

        settle(data,id) {
            let that = this
            $.ajax({
                url: '../api/deleteCarData.php',
                method: 'post',
                data: {
                    username: that.username,
                    goods_id: id
                },
                success: function (res) {
                    res = JSON.parse(res);
                    if (res.code) {
                        data = data.filter(function (item) {
                            return item.goods_id != id;
                        })
                        that.renderHtml(data);
                    }
                }
            })
        }
    }
    new Car('.container', login);
})