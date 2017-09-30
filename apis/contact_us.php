<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require $dir_base . 'vendor/autoload.php';

function contact_us($data = [], $smtp) {
  $gump = new GUMP();

  $rules = array(
		'name'  => 'required',
		'email' => 'required|valid_email',
		'message' => 'required'
	);

	$data = $gump->sanitize($data);

  $gump->validation_rules($rules);
	$isValid = $gump->run($data);

	if($isValid === false) {
    return $gump->get_errors_array();
  } else {
    $name = $data['name'] . ' ' . $data['lastname'];

    $content = [
      'name' => $name,
      'email' => $data['email'],
      'message' => $data['message']
    ];

    $postarr = [
      'post_title' => $data['email'],
      'post_name' => $name,
      'post_content' => json_encode($content),
      'post_type' => 'contact_us'
    ];

    $result = wp_insert_post($postarr);

    if($result) {
      return sendMail($data, $smtp);
    }
  }

  return 'Insert post error';
}

function sendMail($data = [], $smtp) {
  $mail = new PHPMailer(true);

  try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = $smtp['url'];  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $smtp['username'];                 // SMTP username
    $mail->Password = $smtp['password'];                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = $smtp['port'];                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('noreplay@acninternational.org');
    $mail->addAddress('alejandro@brandspa.com');
    $mail->addReplyTo('noreplay@acninternational.org', 'ACN');

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    return 'Message has been sent';
  } catch (Exception $e) {
    return 'Mailer Error: ' . $mail->ErrorInfo;
  }
}
