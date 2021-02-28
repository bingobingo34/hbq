<?php
    $goodsId = $_GET['id'];
    $num = $_GET['num'];
    $username = $_GET['username'];

    $con = mysqli_connect('localhost','root','123456','list');

    $sql = "UPDATE `car` SET `num` = '$num' WHERE `username`= '$username' AND `goodsId` = '$goodsId'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接失败'  . mysqli_error($con));
    }

    print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));

?>