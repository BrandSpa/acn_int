<?php

require $dir_base . 'vendor/autoload.php';

function contact_us($data = []) {
  $transport = new Swift_SendmailTransport('/usr/sbin/sendmail -bs');

  $mailer = new Swift_Mailer($transport);

   ob_get();
?>
  <html>
    <body>
      <p><?php echo $data['name'] . ' ' . $data['lastname'] ?></p>
      <p><?php echo $data['email'] ?></p>
      <p><?php echo $data['message'] ?></p>
    </body>
  </html>
<?php
  $html = ob_get_clean();

  // Create a message
  $message = (new Swift_Message('New contact us'))
    ->setFrom(['contact@acninternational.org' => 'ACN Contact'])
    ->setTo(['alejandro@brandspa.com' => 'Alejandro'])
    ->setBody($html);

  // Send the message
  return $mailer->send($message);
}
