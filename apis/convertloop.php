<?php
$dir_base =  str_replace('apis', '', __DIR__);

/**
** Documentation
** url: https://convertloop.co/docs/developers/getting-started
**/

require $dir_base . 'vendor/autoload.php';

	// $data: { "email": "german.escobar@convertloop.co", "pid": "3eb13b25", "add_tags": ["Tag 1", "Tag2"] }
	function cl_create_person($appId, $apiKey, $data) {
		try {
			$data = json_encode($data);
			$auth_string = $appId . ":" . $apiKey;
      $auth = base64_encode($auth_string);

			$headers = array(
				"Authorization" => "Basic " . $auth,
				'Accept' => 'application/json',
				'content-type' => 'application/json'
			);

			$endpoint = 'https://api.convertloop.co/v1/people';

			$req = Requests::post($endpoint, $headers, $data);
			return $req->body;
		} catch(Exception $e) {
			return ['error' => $e];
		}

	}

	function convertloop_tag_lang($data) {
		 $lang = getCountryLang($data['country']);

		 switch ($lang) {
		 	case 'de':
		 		return 'GERMAN';
		 		break;
			case 'it':
			 		return 'ITALIAN';
			 	break;
			case 'fr':
				return 'FRENCH';
				break;
			case 'pt':
				return 'PORTUGUESE';
				break;
		 	default:
		 		return 'ENGLISH'
		 		break;
		 }
	}

	function convertloop_contact() {
	  $data = $_POST['data'];
	  $lang = getCountryLang($data['country']);
	  $data['add_tags'][] = $lang == 'es' ? 'SPANISH' : 'ENGLISH';
	  $data['pid'] = isset($_COOKIE['dp_pid']) ? $_COOKIE['dp_pid'] : '';

	  /**
	  ** if is between office country get app id and api key office that come from:
	  ** https://acninternational.org/wp-admin/admin.php?page=bs-offices
	  **/
	  if(in_array($data['country'], getOfficesCountries())) {
	    $countryKey = str_replace(' ', '_', $data['country']);
	    $appId = get_option('convertloop_app_' . $countryKey);
	    $apiKey = get_option('convertloop_api_' . $countryKey);
	  } else {
	    $appId = get_option('convertloop_app_default');
	    $apiKey = get_option('convertloop_api_default');
	  }

	    $res = cl_create_person($appId, $apiKey, $data);
	    header('Content-type: application/json');
	    echo $res;
	  die();
	}


	add_action( 'wp_ajax_nopriv_convertloop_contact', 'convertloop_contact' );
	add_action( 'wp_ajax_convertloop_contact', 'convertloop_contact' );

	// $data: { "name": "Signed Up", "person": { "email": "german.escobar@convertloop.co" } }
	function cl_create_event($appId, $apiKey, $data) {
		try {
			$data = json_encode($data);
			$auth_string = $appId . ":" . $apiKey;
      $auth = base64_encode($auth_string);

			$headers = array(
				"Authorization" => "Basic " . $auth,
				'Accept' => 'application/json',
				'content-type' => 'application/json'
			);

			$endpoint = 'https://api.convertloop.co/v1/event_logs';

			$req = Requests::post($endpoint, $headers, $data);
			return $req->body;
		} catch(Exception $e) {
			return ['error' => $e];
		}
	}

	function convertloop_event() {
	  $data = $_POST['data'];
	  $data['person']['pid'] = isset($_COOKIE['dp_pid']) ? $_COOKIE['dp_pid'] : '';

	  if(in_array($data['country'], getOfficesCountries())) {
	    $countryKey = str_replace(' ', '_', $data['country']);
	    $appId = get_option('convertloop_app_' . $countryKey);
	    $apiKey = get_option('convertloop_api_' . $countryKey);
	  } else {
	    $appId = get_option('convertloop_app_default');
	    $apiKey = get_option('convertloop_api_default');
	  }

	  header('Content-type: application/json');
	  echo cl_create_event($appId, $apiKey, $data);
	  die();
	}

	add_action( 'wp_ajax_nopriv_convertloop_event', 'convertloop_event' );
	add_action( 'wp_ajax_convertloop_event', 'convertloop_event' );

?>
