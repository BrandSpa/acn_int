<?php

function bs_contact_us_form_sc($atts) {
  $at = shortcode_atts([
    'name_placeholder' => 'Name',
    'lastname_placeholder' => 'Lastname',
    'email_placeholder' => 'Email',
    'message_placeholder' => 'Message',
    'btn_text' => 'Send'
  ], $atts);

  $props = [
    'placeholders' => [
      'name' => $at['name_placeholder'],
      'lastname' => $at['lastname_placeholder'],
      'email' => $at['email_placeholder'],
      'message' => $at['message_placeholder']
    ],
    'btnText' => $at['btn_text']
  ];

  ob_start();
?>
<div
  class="contact-form-us"
  data-props='<?php echo json_encode($props) ?>'
>
</div>
<?php
  ob_get_clean();


}
