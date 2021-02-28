$(function () {
    //从列表页跳到详情页，渲染对应商品详情数据
    let reg = /id=(\d+)/;
    if (!reg.test(location.search)) {
        location.href = '../html/list.html';
    }
    let id = reg.exec(location.search)[1];
    let container = $('.container');
    $.ajax({
        url: '../api/getDetails.php',
        method: 'post',
        data: {
            id
        },
        success: function (res) {
            res = JSON.parse(res);
            renderHtml(res.details)
        }
    })

    function renderHtml(data) {
        container.html(`<dl>
        <h2>${data.goods_name}</h2>
        <dt>
            <img src="${data.goods_big_logo}" alt="">
            <div class="enlarge"><img src="${data.goods_big_logo}" alt=""></div>
            <div class="mask"></div>
        </dt>
        <dd>
            <div>
                <h3>商品详情</h3>
                <p>${data.goods_introduce}</p>
            </div>
            <p class="good_price">￥${data.goods_price}</p>
            <button class="goCar">查看购物车</button>
            <button class="addCar">加入购物车</button>
        </dd>
    </dl>`);
        //放大镜效果
        let show = $('.container dl dt');
        console.log(show);
        let mask = $('.mask');
        console.log(mask);
        let enlarge = $('.enlarge');
        let bigImg = $('.enlarge img')
        show.mouseenter(function () {
            console.log(1);
            mask.css('display', 'block')
            enlarge.css('display', 'block')
            show.mousemove(function (e) {
                let left = e.clientX - show.offset().left - mask.width() / 2;
                let top = e.clientY - show.offset().top - mask.height() / 2;
                if (left <= 0) {
                    left = 0;
                }
                if (top <= 0) {
                    top = 0;
                }
                if (left >= show.width() - mask.width()) {
                    left = show.width() - mask.width();
                }
                if (top >= show.height() - mask.height()) {
                    top = show.height() - mask.height();
                }
                mask.css({
                    'left': left,
                    'top': top
                });
                let x = left * bigImg.width() / show.width();
                let y = top * bigImg.height() / show.height();
                bigImg.css({
                    left: -x,
                    top: -y
                })
            })
        })
        show.mouseleave(function () {
            mask.css('display', 'none')
            enlarge.css('display', 'none')
        })
    }
    container.click(function (e) {
        //点击查看购物车按钮，去到购物车页面
        if (e.target.classList.contains('goCar')) {
            location.href = '../html/car.html'
        }
        //点击加入购物车按钮
        if (e.target.classList.contains('addCar')) {
            let login = $.cookie('login');
            console.log(login);
            if (!login) {
                alert('还没有登录，请登录')
                localStorage.setItem('url', location.href)
                location.href = '../html/login.html'
                return
            }
            $.ajax({
                url: '../api/addCar.php',
                method: 'post',
                data: {
                    goods_id: id,
                    username: login
                },
                success:(function(res){
                    
                    console.log(res);
                })
            })
        }
    })
})