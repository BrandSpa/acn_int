<?php

function send_contact_us() {
  $data = $_POST['data'];
  $res = contact_us($data);
  header('Content-type: application/json');
  echo $res;
  die();
}

add_action( 'wp_ajax_nopriv_send_contact_us', 'send_contact_us' );
add_action( 'wp_ajax_send_contact_us', 'send_contact_us' );
