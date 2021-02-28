<?php


    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','list');

    // 请求第一页数据 传过来的start = 0 len = 30 请求的数据为0-29
    // 请求第二页数据 传过来的start = 2 len= 30  请求的数据为30-59 
    // 请求第三页数据 传过来的start = 3 len = 30  请求的额数据为 60 89  60
    $start = $_GET['index'];
    $len = $_GET['length'];
    $search = $_GET['search'];
    $yan1=$_GET['yan1'];
    $yan2=$_GET['yan2'];
    $s = ($start-1)*$len;
  
    # 设置SQL语句
    // `categoryName` = '$search' AND
    $sql = "SELECT * FROM `goodsList` WHERE `minGroupPrice`> '$yan1' AND `minGroupPrice` < '$yan2' AND `categoryName` LIKE '%$search%' LIMIT $s,$len";

    # 执行SQL语句
    $res = mysqli_query($con,$sql);


    if(!$res){
        die('error' . mysqli_error($con));
    }
    # 数据的处理
    $dataArr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($dataArr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    # $row 得到的是当前请求的20条数据
    
    
    $sql2 = "SELECT COUNT(*) `count` FROM `goodsList` WHERE `minGroupPrice`> '$yan1' AND `minGroupPrice` < '$yan2' AND `categoryName` LIKE '%$search%'";
    $res2 = mysqli_query($con,$sql2);
  
    if (!$res2) {
      die('error for mysql: ' . mysqli_error($con));
    }
    $row2 = mysqli_fetch_assoc($res2);
    # 得到数据的总数量 
    # 需要把商品数据 和总数量都返回 给前端


    echo json_encode(array(
      "total" => $row2['count'],
      "list" => $dataArr,
      "code" => 1,
      "message" => "获取列表数据成功"
    ));
?>