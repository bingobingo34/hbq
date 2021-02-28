<?php
    $con =mysqli_connect('localhost','root','123456','hbq');

    $username = $_POST['username'];
    $goods_id = $_POST['goods_id'];

    $sql = "DELETE  FROM `car` WHERE `username` = '$username' AND `goods_id` = '$goods_id' ";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库连接错误' . mysqli_error($con));
    }
    print_r(json_encode(array('code'=>$res,'msg'=>'删除成功'),JSON_UNESCAPED_UNICODE));
?>