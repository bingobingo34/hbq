<?php
     $goodsId = $_GET['goodsId'];
     $categoryId = $_GET['categoryId'];
     $categoryName = $_GET['categoryName'];
     $couponDiscount = $_GET['couponDiscount'];
     $descTxt = $_GET['descTxt'];
     $goodsImageUrl = $_GET['goodsImageUrl'];
     $goodsName = $_GET['goodsName'];
     $goodsSign = $_GET['goodsSign'];
     $goodsType = $_GET['goodsType'];
     $lgstTxt = $_GET['lgstTxt'];
     $mallName = $_GET['mallName'];
     $minGroupPrice = $_GET['minGroupPrice'];
     $optId = $_GET['optId'];
     $salesTip = $_GET['salesTip'];
     $servTxt = $_GET['servTxt'];
    $con = mysqli_connect('localhost','root','123456','list');
     $sql = "SELECT * FROM `goodsList` WHERE `goodsSign` = '$goodsSign'";
     $res = mysqli_query($con,$sql);
     if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
     if(!$row){
        $sql1 = "INSERT INTO `goodslist`(`goodsId`, `categoryId`, `categoryName`, `couponDiscount`, `descTxt`, `goodsImageUrl`, `goodsName`, `goodsSign`, `goodsType`, `lgstTxt`, `mallName`, `minGroupPrice`, `optId`, `salesTip`, `servTxt`,`detail`) VALUES (null,'$categoryId','$categoryName','$couponDiscount','$descTxt','$goodsImageUrl','$goodsName','$goodsSign','$goodsType','$lgstTxt','$mallName','$minGroupPrice','$optId','$salesTip','$servTxt','1')";
        $res1 = mysqli_query($con,$sql1);
        print_r($res1);
    }
?>