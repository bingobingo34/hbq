<?php
    $con = mysqli_connect('localhost','root','123456','hbq');

    $goods_id = $_POST['goods_id'];
    $username = $_POST['username'];

    $sql = "SELECT * FROM `car` WHERE `goods_id` = '$goods_id' AND `username` = '$username'";
    
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库连接失败' . mysqli_error($con));
    }
    
    $row = mysqli_fetch_assoc($res);

    if(!$row){
        $addSql = "INSERT INTO `car` VALUES (null, '$username', '$goods_id', '1')";

        $addRes = mysqli_query($con,$addSql);

        if(!$addRes){
            die('数据库连接失败' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }else{

        $goods_num = ++$row['goods_num'];
        $updateSql = "UPDATE `car` SET `goods_num` = '$goods_num' WHERE `username` = '$username' AND `goods_id` = '$goods_id'";

        $updateRes = mysqli_query($con,$updateSql);

         if(!$updateRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$updateRes,"msg"=>"添加成功",'num'=>$goods_num),JSON_UNESCAPED_UNICODE));
    }


?>