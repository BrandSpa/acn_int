	<?php
	
	function bs_in_office($country) {
		return in_array($country, getOfficesCountries());
	}
	
	function bs_logo_url() {
		$country = getCountry();

		if(!bs_in_office($country)) {
			$country = 'default';
		}
		
		$country = str_replace(' ', '_', $country);
		$url = get_option("logo_". $country);
		$url = str_replace('http:', '',   $url);
		return $url;
	}
