<?php
    $con = mysqli_connect('localhost','root','123456','hbq');

    $username = $_POST['username'];

    $sql = "SELECT * FROM `goods` WHERE `goods_id` in (SELECT `goods_id` FROM `car` WHERE `username` = '$username') ";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库连接错误' . mysqli_error($con));
    }
    
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    
    
    $carSql = "SELECT * FROM `car` WHERE `username` = '$username' ";

    $carRes = mysqli_query($con,$carSql);

    if(!$carRes){
        die('数据库连接错误' . mysqli_error($con));
    }

    $carArr = array();
    $carRow = mysqli_fetch_assoc($carRes);
    while($carRow){
        array_push($carArr,$carRow);
        $carRow = mysqli_fetch_assoc($carRes);
    }
    for($i = 0;$i <count($carArr);$i++){
        for($j = 0;$j< count($carArr);$j++){
            if($arr[$i]['goods_id'] == $carArr[$j]['goods_id']){
                $arr[$i]['goods_num'] = $carArr[$j]['goods_num'];
            }
        }
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>