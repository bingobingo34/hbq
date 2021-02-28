<?php
 $goodsId = $_GET['goodsId'];
 $goodsSign = $_GET['goodsSign'];
 $con = mysqli_connect('localhost','root','123456','list');
 $sql = "SELECT * FROM `goodsList` WHERE `goodsId` = '$goodsId' AND `goodsSign` = '$goodsSign'";
 $res = mysqli_query($con,$sql);
 if(!$res){
     die('数据库链接错误' . mysqli_error($con));
 }
 $row = mysqli_fetch_assoc($res);
 echo json_encode(array(
     "code" => 1,
     "message" => '获取数据成功',
     "dlist" => $row 
 ));
?>