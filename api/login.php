<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','root','123456','hbq');

    $sql = " SELECT * FROM `register` WHERE `username` = '$username' AND `password` = '$password' ";
    
    $res = mysqli_query($con,$sql);

    if(!$res){
        print_r("数据库连接错误" . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    if(!$row){
        echo json_encode(array("code" => 0,"msg" => "登录失败"));
    }else{
        echo json_encode(array("code" => 1,"msg" => "登录成功"));
    }
?>