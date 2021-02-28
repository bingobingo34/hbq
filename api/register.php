<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','root','123456','hbq');

    $sql = " SELECT * FROM `register` WHERE `username` = '$username' ";

    $res = mysqli_query($con,$sql);

    if(!$res){
        print_r("数据库连接错误" . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    if($row){
        echo json_encode(array("code" => 0,"msg" => "注册失败"));
    }else{
        $addsql = " INSERT INTO `register`(`id`, `username`, `password`) VALUES (null,'$username','$password') ";

        $addres = mysqli_query($con,$addsql);

        echo json_encode(array("code" => 1,"msg" => "注册成功"));
    }
?>