<?php
$dir_base =  str_replace('apis', '', __DIR__);

/**
** Documentation
** Mailchimp endpoint: http://developer.mailchimp.com/documentation/mailchimp/reference/lists/
** Library to make the request: https://github.com/rmccue/Requests
**/

require $dir_base . 'vendor/autoload.php';

  function mc_subscribe($data, $listId, $apiKey) {
    $options = [
      'auth' => ['user', $apiKey]
    ];

    $headers = array('Accept' => 'application/json', 'content-type' => 'application/json');

    // it's always necessary set the datacenter,
    // without it isn't going to store the list register

    $datacenter =  explode("-", $apiKey)[1];
    $urlBase = 'http://'. $datacenter .'.api.mailchimp.com/3.0/';
    $endpoint = $urlBase . 'lists/' . $listId . '/members';
    $req = Requests::post($endpoint, $headers, $data, $options);

    return $req->body;
  }

  function mailchimp_subscribe() {
    $data = json_encode($_POST['data']);
    $listId = get_option('mailchimp_list_id');
    $apiKey = get_option('mailchimp_api');
    $res = mc_subscribe($data, $listId, $apiKey);
    echo $res;
    die();
  }

  add_action( 'wp_ajax_nopriv_mailchimp_subscribe', 'mailchimp_subscribe' );
  add_action( 'wp_ajax_mailchimp_subscribe', 'mailchimp_subscribe' );
