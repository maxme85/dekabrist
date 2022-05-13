<?php

$json = file_get_contents('php://input');
$data = json_decode($json);
$content = json_encode(($data->data));

$msg = '';
foreach ($data->data as $key => $value) {
    $msg = $msg.$value->caption." : ".$value->value;
    $msg = $msg."\n";
    
}
//echo $content;


$message = "test";
$subject = "Заявка с сайта ".$_SERVER['HTTP_REFERER'];
$headers = 'From: sender@maxme-life.ru' . "\r\n" .
    'Reply-To: sender@maxme-life.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


// Кому шлем письмо (заявку)
$to= 'maxme.85@gmail.com';
$success = mail($to, $subject, $msg, $headers);
if ($success) {
    echo '{"responce":"ok"}';
}else{
    echo '{"responce":"bad"}';
}
?>