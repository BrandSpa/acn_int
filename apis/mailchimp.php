<?php
$dir_base =  str_replace('apis', '', __DIR__);

/**
** Documentation
** Mailchimp endpoint: http://developer.mailchimp.com/documentation/mailchimp/reference/lists/
** Library to make the request: https://github.com/rmccue/Requests
**/

if( file_exists($dir_base . '/vendor/autoload.php') ) {

  require $dir_base . 'vendor/autoload.php';

  function mc_subscribe($data, $listId, $apiKey) {
    $options = array(
      'auth' => array('user', $apiKey)
    );
    $datacenter =  explode("-", $apiKey)[1];
    $headers = array('Accept' => 'application/json', 'content-type' => 'application/json');
    $urlBase = 'http://'. $datacenter .'.api.mailchimp.com/3.0/';
    $req = Requests::post($urlBase . 'lists/' . $listId . '/members', $headers, $data, $options);
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

}
