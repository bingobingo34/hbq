<?php
    $con = mysqli_connect('localhost','root','123456','hbq');

    $start = $_POST['start'];
    $len = $_POST['len'];
    $s = ($start-1)*$len;

    $sql = "SELECT * FROM `goods` LIMIT $s,$len";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库连接错误' . mysqli_error($con));
    }

    $dataArr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($dataArr,$row);
        $row = mysqli_fetch_assoc($res);
    }

    $sql1 = "SELECT COUNT(*) `count` FROM `goods` ";
    $res1 = mysqli_query($con,$sql1);
    if(!$res1){
        die('数据库连接错误' . mysqli_error($con));
    }
    $row1 = mysqli_fetch_assoc($res1);

    echo json_encode(array(
        "total" => $row1['count'],
        "list" => $dataArr,
        "code" => 1,
        "msg" => '获取商品列表成功'
    ));
?>