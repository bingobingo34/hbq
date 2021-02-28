$(function () {
    let page = document.querySelector('.page');
    let flag = true
    let reg = /list=(.*)/;
    decodeURI(location.search);
    if(!reg.test(location.search)){
        location.href = '../index.html';
    }
    let cat = decodeURI(location.search.match(reg)[1]);
    console.log(cat);
    getData(1, 8)

    function getData(index, length) {
        $.ajax({
            url: '../api/getCat.php',
            method: 'post',
            data: {
                start: index,
                len: length,
                cat:cat
            },
            success: function (res) {
                let data = JSON.parse(res)
                console.log(data);

                if(flag){
                    new Pagination(page, {
                        pageInfo: {
                            pagenum: index,
                            pagesize: length,
                            total: data.total*1,
                            totalpage:Math.ceil(data.total/length) 
                        },
                        textInfo: {
                            first: '首页',
                            prev: '上一页',
                            list:'',
                            next: '下一页',
                            last: '末页'
                        },
                        change: function (index) {
                            flag = false;
                            // 有一个参数，这个参数当前的页数
                            getData(index,8);
                            renderHtml(data)
                            // scrollTo(0,0)
                        }
                    });
                }

                renderHtml(data)
            }
        })
    }

    function renderHtml(data) {
        let str = '';
        let data1 = data.list
        data1.forEach((item) => {
            str += `<li class="list-item">
            <div class="title">
                <ol class="breadcrumb">
                    <li><a href="#">${item.cat_one_id}</a></li>
                    <li><a href="#">${item.cat_two_id}</a></li>
                </ol>
            </div>
            <div class="row">
                <div>
                    <div class="thumbnail">
                        <img src="${item.goods_big_logo}"
                            alt="...">
                        <div class="caption">
                            <h3>${item.goods_name}</h3>
                            <div class="price">
                                <i class="glyphicon glyphicon-yen"></i>
                                <span>${item.goods_price}</span>
                            </div>
                            <p>
                                <a href="./car.html" class="btn btn-primary" role="button">查看购物车</a>
                                <a href="./details.html?id=${item.goods_id}" class="btn btn-info" role="button">查看商品详情</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
        })
        $('.goods_list').html(str);
    }
})