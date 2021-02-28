$(function () {
    // 打开详情页的时候先查看是否携带id,goodsSign参数；
    // 如果不存在  跳转到列表页
    // 如果存在  根据id goodsSign 获取数据；
    let reg = /id=(.*)\&(.*)/
    if(!reg.test(location.search)){
        window.location.herf = './list.html';
    }
    let goodsId = location.search.match(reg)[1];
    let goodsSign = location.search.match(reg)[2];
    $.ajax({
        url: '../php/detail.php',
        type:'get',
        data:{
            goodsId:`${goodsId}`,
            goodsSign:goodsSign
        },
        success: function (res) {
            let date = JSON.parse( JSON.parse(res).dlist.detail);
            console.log(date);
            // h5
            let specs = date.goodsSkuVos[0].specs;
            let sarr =[];
            specs.forEach(function(item){
                sarr.push(item.specKey)
            })
            let h5str = `${date.adGoodsDetailDTO.goodsName}  
            ${sarr.join(  ' ')}`
            $('.dtRight h5').html(h5str)

            // dtR1top
            $('.dtR1top .dp5').html(parseInt(JSON.parse(res).dlist.minGroupPrice / 1000)+'.00');
            $('.dtR1top .dp3').html(parseInt( JSON.parse(res).dlist.minGroupPrice / 1000- JSON.parse(res).dlist.couponDiscount / 1000)+'.00')
            $('.dtR1bottom .dm2').html(parseInt(JSON.parse(res).dlist.couponDiscount / 1000)+'元券');
            $('.dtR1bottom .dm3').html('剩'+JSON.parse(res).dlist.optId+'张');
            // scolor
            if(specs.length == 2){
                let obj = {};
                let obj1 = {};
                date.goodsSkuVos.forEach(function (item) {
                    if (!obj[item.specs[0]['specValue']]) {
                        obj[item.specs[0]['specValue']] = item.spec;
                    }
                    if (!obj1[item.specs[1]['specValue']]) {
                        obj1[item.specs[1]['specValue']] = item.spec;
                    }
                })
                let sstr = '';
                for (var i in obj) {
                    sstr +=
                        `
                  <span spec = '${obj[i]}'>${i}</span>
                  `
                }
                $('.scolor p').html(sarr[0]);
                $('.sclist').append(sstr)
    
                let sstr1 = '';
                for (var i in obj1) {
                    sstr1 +=
                        `
                 <span spec = '${obj1[i]}'>${i}</span>
                 `
                }
                $('.ssize p').html(sarr[1])
                $('.sslist').append(sstr1)
            }
            if(specs.length == 1){
                let obj = {};
                date.goodsSkuVos.forEach(function (item) {
                    if (!obj[item.specs[0]['specValue']]) {
                        obj[item.specs[0]['specValue']] = item.spec;
                    }
                })
                let sstr = '';
                for (var i in obj) {
                    sstr +=
                        `
                  <span spec = '${obj[i]}'>${i}</span>
                  `
                }
                $('.scolor p').html(sarr[0]);
                $('.sclist').append(sstr);
            }
            //  点击切换图片
            let rstr = '';
            date.adGoodsDetailDTO.galleryUrls.forEach(function (item,index) {
                rstr +=
                    `
                    <img src="${item}" alt="">
                `
            })
            $('.btnCenter nav').append(rstr);
            $('.simg').attr('src',`${date.adGoodsDetailDTO.galleryUrls[date.adGoodsDetailDTO.galleryUrls.length - 1]}`);
            $('.magnifier img').attr('src',`${date.adGoodsDetailDTO.galleryUrls[date.adGoodsDetailDTO.galleryUrls.length - 1]}`);
            //  缩放图
              let lleft = 0
            //按钮   
              $('.btnr').click(function () {
                  lleft++;
                  if ($('.btnCenter nav').position().left < ($('.btnCenter img').size()-4)*-66) {
                    lleft = $('.btnCenter img').size()-4
                }
                  $('.btnCenter nav').css({
                      left: -66 * lleft
                  })
              })
              $('.btnl').click(function () {
                  lleft--;
                  if ($('.btnCenter nav').position().left == 0) {
                      lleft = 0
                  }
                  $('.btnCenter nav').css({
                      left: -66 * lleft
                  })
              })
            //   btnCenter nav img 放大镜
              $('.btnCenter nav img').click(function(){
                $('.simg').attr('src',`${this.src}`);
                $('.magnifier img').attr('src',`${this.src}`)
              })

            //   sclist span  放大镜
            $('.sclist span').eq(0).css('color', 'red').css('border', '1px solid red');
            $('.sclist span').click(function () {
                let that = $(this).attr('spec');
                $(this).css('color', 'red').css('border', '1px solid red').siblings().css('color', '').css('border', '1px solid #ccc')
                date.goodsSkuVos.forEach(function (item) {
                    if (item.spec === that) {
                        $('.simg').attr('src', `${item.thumbUrl}`);
                        $('.magnifier img').attr('src',`${item.thumbUrl}`)
                    }
                })
            })

            // sslist span
            $('.sslist span').eq(0).css('color', 'red').css('border', '1px solid red');
            $('.sslist span').click(function () {
                $(this).css('color', 'red').css('border', '1px solid red').siblings().css('color', '').css('border', '1px solid #ccc');
            })

            // dtR3 销量
             $('.dtR3 div:eq(1)').html(JSON.parse(res).dlist.salesTip)
             //   dF1
            $('.df1').html(date.adGoodsDetailDTO.mallName)
            $('.df2 span').html(date.adGoodsDetailDTO.servTxt)
            $('.df3 span').html(date.adGoodsDetailDTO.descTxt)
            $('.df4 span').html(date.adGoodsDetailDTO.lgstTxt)
            $('.c1').html(date.adGoodsDetailDTO.goodsDesc)

            // 商品描述 图片
            let imgList =date.adGoodsDetailDTO.goodsGalleryUrls;
            let str = ''
            imgList.forEach(function (item,index) {
                str +=
                    `
                        <img src="${item}" alt="">
                    `
            })
            $('.center').append(str);
        }
    })


    //  放大镜
    $('.smallimg').mouseover(function () {
        $('.mark').add('.magnifier').show();
    }).mouseleave(function () {
        $('.mark').add('.magnifier').hide();
    }).mousemove(function (e) {
        let l = e.pageX - $(this).offset().left - 50;
        let t = e.pageY - $(this).offset().top - 50;
        if (l < 0) {
            l = 0
        }
        if (l > $('.smallimg').outerWidth() - $('.mark').width()) {
            l = $('.smallimg').outerWidth() - $('.mark').width()
        }
        if (t < 0) {
            t = 0
        }
        if (t > $('.smallimg').outerHeight() - $('.mark').height()) {
            t = $('.smallimg').outerHeight() - $('.mark').height()
        }
        $('.mark').css({
            left: l,
            top: t
        })
        $('.magnifier img').css({
            left: -3 * l,
            top: -3 * t
        })
    })

    // 鞋码
    $('.sslist span').click(function () {
        $(this).addClass('act').siblings().removeClass('act')
    })

    // // 颜色分类
    $('.sclist span').click(function () {
        $(this).addClass('act').siblings().removeClass('act')
    })

    // // 数量
    let num = 0;
    $('.add').click(function () {
        num++;
        $('.count').html(num)
    });
    $('.reduce').click(function () {
        num--;
        if(num < 0){
            alert('商品数量最少为0');
            return;
        }
        $('.count').html(num)
    })

    // // 商品详情  用户评价
    $('.head span').click(function () {
        $(this).addClass('curr').siblings().removeClass('curr')
    })
    // 查看购物车
    $('.buy1').click(function(){
        let login = getCookie('login');
        if(!login){
            alert('没有登录请到登录页面登录');
            localStorage.setItem('url',location.href);
            location.href = '../html/login.html';
            return
        }else{
            window.location.href ='./shopping.html';
        }
    })
    // 添加到购物车
    $('.buy2').click(function(){
        let login = getCookie('login');
        if(!login){
            alert('没有登录请到登录页面登录');
            localStorage.setItem('url',location.href);
            location.href = '../html/login.html';
            return
        }else{
            window.location.href ='./shopping.html';
            $.ajax({
               url:'../php/addShopping.php',
               data:{
                goodsId:goodsId,
                'username':login
               },
               type:'get',
               success:function(res){
                   console.log(res);
               }
            })
        }
    })
})
