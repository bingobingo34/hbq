<?php
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','list');
    $start = $_GET['index'];
    $len = $_GET['length'];
    $s = ($start-1)*$len;
    $sql = "SELECT * FROM `goodsList` LIMIT $s,$len";
    # 执行SQL语句
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('error' . mysqli_error($con));
    }
    # 数据的处理
    $dataArr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($dataArr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    echo json_encode(array(
      "list" => $dataArr,
      "code" => 1,
      "message" => "获取列表数据成功"
    ));
?>