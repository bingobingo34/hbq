$(function () {
    // 模糊搜索
        $('.head_btn button').click(function(){
            let bval = $('.head_btn input').val();
            if(!bval){
                alert('请输入搜索内容');
                return;
            }else{
                window.location.href = `./html/list.html?seach=${bval}`;
            }
        })
    // 按下 enter 模糊搜索
    $(document).keydown(function(event){
        if(event.keyCode == 13){
                let bval = $('.head_btn input').val();
                if(!bval){
                    alert('请输入搜索内容');
                    return;
                }else{
                    window.location.href = `./html/list.html?seach=${bval}`;
                }
        }
    }) 
      
    // 返回顶部
    $(document).scroll(function () {
        if ($(document).scrollTop() > 150) {
            $('.head').css({
                position: 'fixed',
                top: 0,
            }).css('z-index', 100)
        } else {
            $('.head').css({
                position: 'static',
            }).css('z-index', 0)
        }
        if ($(document).scrollTop() > $(window).height()) {
            $('.retutnTop').show()
        } else {
            $('.retutnTop').hide()
        }
    })
    $('.retutnTop li').click(function () {
        let ind = $(this).index();
        $('html,body').stop().animate({
            scrollTop: ind * 350
        }, 700)
        // $(document).scrollTop(ind*500) 
    }).mouseover(function () {
        $(this).addClass('active').siblings().removeClass('active')
    }).mouseleave(function () {
        $(this).removeClass('active')
    })

    // 首页头部
    $('.denglu').click(function () {
        window.location.href = './html/login.html'
    })

    // 轮播图
    let timer;
    let index = 1;
    $('.banner').mouseover(function () {
        clearInterval(timer)
        $('.btn_l,.btn_r').show()
    })
    $('.banner').mouseleave(function () {
        $('.btn_l,.btn_r').hide()
        timer = setInterval(function () {
            index++;
            move()
        }, 2000)
    })
    let flag = true
    $('.btn_r').click(function () {
        if (flag) {
            flag = false;
            index++;
            move()
        }
    })
    $('.btn_l').click(function () {
        if (flag) {
            flag = false;
            index--;
            move()
        }
    })
    timer = setInterval(function () {
        index++;
        move()
    }, 2000)
    function move() {
        $('.banner_l nav').animate({
            left: -750 * index
        }, 500, function () {
            flag = true;
            if (index == $('.banner_l nav img').size() - 1) {
                index = 1;
                $('.banner_l nav').css('left', -750)
            }
            if (index == 0) {
                index = 5
                $('.banner_l nav').css('left', -750 * 5)
            }
        })
    }

    // 热销爆款
    $.ajax({
        url: './php/index.php',
        success: function (res) {
            console.log(res);
         let data = JSON.parse(res).dlist;
         let hotdata = [data[0],data[1],data[2],data[3],data[4]];
         let pdata = [data[5],data[6],data[7],data[8],data[9],data[10]];
         let ppdata = [data[11],data[12],data[13],data[14]];
            render1(hotdata);
            render2(pdata);
            render3( ppdata);
        }
    })
    function render1(hotdata) {
        let str = '';
        hotdata.forEach(function (item) {
            str +=
                ` <a  href= "./html/detail.html?id=${item.goodsId}&${item.goodsSign}"  class="hotShop"> 
             <img src="${item.goodsImageUrl}" alt="">
             <p class="goodsName">${item.goodsName}</p>
             <p class="salesTip">销量  ${item.salesTip}</p>
             <div class="goodsp">
                 <span class="afterP">券后</span>
                 <span class="goodsId">￥${parseInt((item.minGroupPrice / 1000) - (item.couponDiscount / 1000))}</span>
                 <span class="minGroupPrice">原价￥${parseInt(item.minGroupPrice / 1000)}.00</span>
             </div>
         </a>
             `
            $('.hotlist').html(str);
        })
    }
    // 品牌专场
    function render2(pdata) {
        let str1 = '';
        pdata.forEach(function (item) {
            str1 +=
                `
                <a  href= "./html/detail.html?id=${item.goodsId}&${item.goodsSign}"  class="ppShoplist" >
                <img src="${item.goodsImageUrl}" alt="">
                <p class="ppShoplist1">${item.goodsName}</p>
                <p class="ppShoplist2"><span>券后价</span><span>￥${parseInt((item.minGroupPrice / 1000) - (item.couponDiscount / 1000))}.00</span></p>
            </a>
                `
            $('.ppShop').html(str1);
        })
    }
    function render3( ppdata) {
        let str2 = '';
        ppdata.forEach(function (item) {
            str2 +=
                `
                <a  href= "./html/detail.html?id=${item.goodsId}&${item.goodsSign}" class="ppShoplist">
                <img src="${item.goodsImageUrl}" alt="">
                <p class="ppShoplist1">${item.goodsName}</p>
                <p class="ppShoplist2"><span>券后价</span><span>${(item.minGroupPrice.toString().match(/(.*)?(\d{3})/))[1]}.${(item.minGroupPrice.toString().match(/(.*)?(\d{3})/))[2].slice(0, 2)}</span></p>
            </a>
                `
            $('.prShop').html(str2);
        })
    }
    let dex = 1;
    // 精选 瀑布流
    $(document).scroll(function () {
        if ($(document).scrollTop() > ($(document).height() - $(window).height()) - 1) {
            dex++;
            fun(dex,30);
        }
    })
    fun(1,30)
    function fun(index,len) {
        $.ajax({
            url: './php/pubu.php',
            data:{
               index:index,
               length:len
            },
            success: function (res) {
              let jiazai =  JSON.parse(res).list;
                render4(jiazai);
            }
        })
    }
    function render4(jiazai) {
        let str4 = '';
        jiazai.forEach(function (item) {
            str4 +=
                `
                 <a   href= "./html/detail.html?id=${item.goodsId}&${item.goodsSign}" class="jxPubu1">
                <img src="${item.goodsImageUrl}" alt="">
                <p class="jxPubu2">${item.goodsName}</p>
                <p class="jxPubu3"><span>券后价</span><span>￥${parseInt((item.minGroupPrice / 1000) - (item.couponDiscount / 1000))}.00</span></p>
            </a> 
                `
        })
        $('.jxPubu').append(str4);
    }
})