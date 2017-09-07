<?php

function bs_contact_us_form_sc($atts) {
  $at = shortcode_atts([
    'name_placeholder' => 'Name',
    'lastname_placeholder' => 'Lastname',
    'email_placeholder' => 'Email',
    'message_placeholder' => 'Message',
    'name_validation' => 'Name required',
    'lastname_validation' => 'Lastname required',
    'email_validation' => 'Email invalid',
    'message_validation' => 'Message required',
    'btn_text' => 'Send'
  ], $atts);

  $props = [
    'placeholders' => [
      'name' => $at['name_placeholder'],
      'lastname' => $at['lastname_placeholder'],
      'email' => $at['email_placeholder'],
      'message' => $at['message_placeholder']
    ],
    'messages' => [
      'name' => $at['name_validation'],
      'lastname' => $at['lastname_validation'],
      'emaie' => $at['email_validation'],
      'message' => $at['message_validation'],
    ],
    'btnText' => $at['btn_text']
  ];

  ob_start();
?>
<div
  class="bs-contact-form-us"
  data-props='<?php echo json_encode($props) ?>'
>
</div>
<?php
  return ob_get_clean();
}

add_shortcode('bs_contact_us_form', 'bs_contact_us_form_sc');
