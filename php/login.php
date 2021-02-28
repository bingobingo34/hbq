<?php
$user = $_GET['username'];
$pass = $_GET['password'];
// 链接数据库
$con = mysqli_connect('localhost','root','123456','list');
$sql = "SELECT * FROM `user` WHERE `username` = '$user' AND `password` = '$pass'";
$res = mysqli_query($con,$sql);
if(!$res){
    die('数据库链接错误' . mysqli_error($con));
}
$row = mysqli_fetch_assoc($res);
 if($row){
    print_r(json_encode($row));
}else{
    print_r('用户名或密码错误');
}
?>