<?php

function store_event($content, $type = 'event') {
  $postarr = [
    'post_name' => $type,
    'post_content' => $content,
    'post_type' => $type
  ];

  $result = wp_insert_post($postarr);

  return [
    'result' => $result,
    'content' => $content,
    'type' => $type
  ];
}

function store_event_ajax() {
  $data = $_POST['data'];
  $res = store_event( $data['content'] );
  header('Content-type: application/json');
  echo json_encode($res);
  die();
}

add_action( 'wp_ajax_nopriv_store_event', 'store_event_ajax' );
add_action( 'wp_ajax_store_event', 'store_event_ajax' );
