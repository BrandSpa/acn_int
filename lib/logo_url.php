<?php

function bs_logo_url() {
	$country = getCountry();

	print_r($country);exit;

	if(!bs_in_office($country)) {
		$country = 'default';
	}
	
	$country = str_replace(' ', '_', $country);
	$url = get_option("logo_". $country);
	$url = str_replace('http:', '',   $url);
	return $url;
}
