<?php
$dir_base = str_replace('lib', '', __DIR__);
require $dir_base . '/vendor/autoload.php';

use GeoIp2\Database\Reader;

function get_client_ip_server() {
    $ipaddress = '';
    
    if (isset($_SERVER['HTTP_CLIENT_IP']) && $_SERVER['HTTP_CLIENT_IP'])
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if($_SERVER['HTTP_X_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if($_SERVER['HTTP_FORWARDED_FOR'])
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if($_SERVER['HTTP_FORWARDED'])
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if($_SERVER['REMOTE_ADDR'])
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
 
    return $ipaddress;
}

function get_location($ip) {
	$dir_base = str_replace('lib', '', __DIR__);	
	
	try {
		$reader = new Reader($dir_base .'GeoLite2-Country.mmdb');
		return $reader->country($ip)->country;
	} catch(Exception $e) {
		return $e->getMessage();
	}
	
	return '';
}

function get_location_city($ip) {
	$dir_base = str_replace('lib', '', __DIR__);	
	
	try {
		$reader = new Reader($dir_base .'GeoLite2-Country.mmdb');
		return $reader->city($ip);
	} catch(Exception $e) {
		return $e->getMessage();
	}
	
	return '';
}

function get_user_location() {
    $fp = fopen('data.txt', 'x+');
    fwrite($fp, get_client_ip_server());
    fclose($fp);
    return get_location( get_client_ip_server() );
}

function get_user_location_city() {
    return get_location_city( get_client_ip_server() );
}

function getCountry() {
  if(function_exists('get_user_location')) {
    return is_object(get_user_location()) ? get_user_location()->names['en'] : '';
}

  return '';
}

function getCity(){
    if(function_exists('get_user_location')) {
    return is_object(get_user_location_city()) ? get_user_location_city() : '';
    }

    return '';
}

function getCountryLang($name) {
    $json = file_get_contents(__DIR__ . '/countries_lang.json');
    $countries = json_decode($json);

    $country = array_filter($countries, function($arr) use($name) {
      return $arr->name == $name;
    });

		if(array_keys($country)) {
			return $country[array_keys($country)[0]] ? $country[array_keys($country)[0]]->languages[0] : 'en';
		} else {
			return 'en';
		}
	
}
