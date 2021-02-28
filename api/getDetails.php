<?php
    $con = mysqli_connect('localhost','root','123456','hbq');

    $id = $_POST['id'];

    $sql = "SELECT * FROM `goods` WHERE `goods_id` = '$id' ";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库连接错误' . mysqli_error($con));
    }
    
    $row = mysqli_fetch_assoc($res);

    echo json_encode(array(
        "code" => 1,
        "msg" => "获取商品信息成功",
        "details" => $row
    ))
?>