<?php
// 获取传递过来的用户名和密码
$user = $_GET['username'];
$pass = $_GET['password'];
// 链接数据库
$con = mysqli_connect('localhost','root','123456','list');
$sql = "SELECT * FROM `user` WHERE `username` = '$user'";
$res = mysqli_query($con,$sql);
if(!$res){
    die('数据库链接错误' . mysqli_error($con));
}
$row = mysqli_fetch_assoc($res);
 // 如果$row 有数据的时候表示 已经存在该用户名
 if($row){
    print_r('该用户名已经存在，请重新输入');
}else{
    $sql1 = "INSERT INTO `user` VALUES(null,'$user','$pass')";
    $res1 = mysqli_query($con,$sql1);
    print_r($res1);
}
?>