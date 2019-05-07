<?php
    // 引入PHPExcel
    require_once("PHPExcel.php");
    // 引入PHPMailer的核心文件
    require_once("class.phpmailer.php");
    require_once("class.smtp.php");

    $mysql_host = "localhost"; // 数据库地址
    $mysql_user = "root"; // 数据库的用户名
    $mysql_password = "root"; // 数据库密码
    $mysql_name = "db_user"; // 数据库名
    $filename = "user_data_".time().".xlsx"; //导出的文件名 + 时间戳

    function sendEmail($dir,$filename){
        // 实例化PHPMailer核心类
        $mail = new PHPMailer();
        // 是否启用smtp的debug进行调试 开发环境建议开启 生产环境注释掉即可 默认关闭debug调试模式
        // $mail->SMTPDebug = 1;
        // 使用smtp鉴权方式发送邮件
        $mail->isSMTP();
        // smtp需要鉴权 这个必须是true
        $mail->SMTPAuth = true;
        // 链接qq域名邮箱的服务器地址
        $mail->Host = 'smtp.qq.com';
        // 设置使用ssl加密方式登录鉴权
        $mail->SMTPSecure = 'ssl';
        // 设置ssl连接smtp服务器的远程服务器端口号
        $mail->Port = 465;
        // 设置发送的邮件的编码
        $mail->CharSet = 'UTF-8';
        // 设置发件人昵称
        $mail->FromName = 'LiHuYong';
        // smtp登录的账号 QQ邮箱
        $mail->Username = '2225483232@qq.com';
        // smtp登录的密码 生成的授权码
        $mail->Password = 'mooauhwdfdmmdjhd';
        // 设置发件人邮箱地址 同登录账号
        $mail->From = '2225483232@qq.com';
        // 邮件正文是否为html编码 注意此处是一个方法
        $mail->isHTML(true);
        // 收件人邮箱地址、添加多个收件人多次调用方法即可
        $mail->addAddress('1003957188@qq.com');
        //$mail->addAddress('liangdong@testin.cn');
        //$mail->addAddress('877036466@qq.com');
        //$mail->addAddress('lihuyong@testin.cn');

        $mail->Subject = '这是一封测试邮件'; // 标题
        $mail->Body = '<h1>测试邮件666，233333~~~</h1>'; // 正文
        $mail->addAttachment($dir."/download/".$filename); // 附件

        // 发送邮件 返回状态
        $status = $mail->send();
    }

    date_default_timezone_set('PRC');// 设置时区
    $dir = dirname(__FILE__);// 获取当前文件所在目录

	$mysqli = new mysqli($mysql_host,$mysql_user,$mysql_password,$mysql_name);
    if ($mysqli->connect_errno) {
        printf("Connect failed: %s\n", $mysqli->connect_error);
        exit();
    }
    $mysqli->query("SET NAMES 'utf8'");

    $objPHPExcel=new PHPExcel();
    $objPHPExcel->setActiveSheetIndex(0);
    $objPHPExcel->getActiveSheet()->setCellValue('A1', '邮箱')
                                  ->setCellValue('B1', '用户名')
                                  ->setCellValue('C1', '企业简称')
                                  ->setCellValue('D1', '企业全称')
                                  ->setCellValue('E1', '注册时间');

    $sql="SELECT user_info.email email,user_info.name name,user_info.create_time time,enterprise_info.name easyname, enterprise_info.fullname fullname FROM user_info LEFT JOIN enterprise_info ON user_info.id = enterprise_info.create_userid ORDER BY user_info.id";

    $q=$mysqli->query($sql);
    $rowCount=2;

    //var_dump($q);
    while($row=$q->fetch_assoc()){
        $timeStr = date('Y-m-d H:i:s', $row['time']);

        $objPHPExcel->getActiveSheet()->setCellValue('A'.$rowCount, $row['email']);
        $objPHPExcel->getActiveSheet()->SetCellValue('B'.$rowCount, $row['name']);
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$rowCount, $row['easyname']);
        $objPHPExcel->getActiveSheet()->SetCellValue('D'.$rowCount, $row['fullname']);
        $objPHPExcel->getActiveSheet()->SetCellValue('E'.$rowCount, $timeStr);

        $rowCount++;
    }

    // $q->close();
    $q->free();
    $mysqli->close();

    // 标题填充
    $objPHPExcel->getActiveSheet()->getStyle('A1:E1')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    $objPHPExcel->getActiveSheet()->getStyle('A1:E1')->getFill()->getStartColor()->setARGB('00ffff00');

    // 设置列宽度
    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(30);
    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(30);
    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(40);
    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);
    //$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);

    // 直接导出到本地
    $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
    $objWriter->save($dir."/download/".$filename);

    // 发送邮件
    sendEmail($dir,$filename);
?>