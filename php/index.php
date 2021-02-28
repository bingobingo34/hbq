<?php
$con = mysqli_connect('localhost','root','123456','list');
$sql = "SELECT * FROM `goodsList`";
$res = mysqli_query($con,$sql);
if(!$res){
    die('数据库链接错误' . mysqli_error($con));
}
$arr = array();
$row = mysqli_fetch_assoc($res);
while($row){
    array_push($arr,$row);
    $row = mysqli_fetch_assoc($res);
}
echo json_encode(array(
    "code" => 1,
    "message" => '获取数据成功',
    "dlist" => $arr 
));
?>