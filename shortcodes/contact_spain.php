<?php

function bs_contact_call_sc($atts, $content = null) {

	$attributes = [
		'name-placeholder' => 'Name',
		'lastname-placeholder' => 'Lastname',
		'email-placeholder' => 'Email',
		'country-placeholder' => 'Country',
		'city-placeholder' => 'City',
		'phone-placeholder' => 'phone',
		'btn-placeholder' => 'Pray',
		'name-validation' => 'Name required',
		'email-validation' => 'email required',
		'redirect' => '',
		'convertloop_tags' => '',
		'convertloop_event' => 'Subscription',
		'btn_text' => '',
		'loading_text' => 'loading...'
	];

  $at = shortcode_atts( $attributes , $atts );

	$getLang = getLangTag() . ',';

	$props = [
		"convertloop" => [
			"tags" => $getLang . $at['convertloop_tags'],
			"event" =>  empty($at['convertloop_event']) ? 'Subscription' : $at['convertloop_event']
		],
		"texts" => [
			"btn" => $at['btn_text'],
			"loading" => $at['loading_text']
		],
		"placeholder" => [
			"name" => $at['name-placeholder'],
			"lastname" => $at['lastname-placeholder'],
			"email" => $at['email-placeholder'],
			"country" => $at['country-placeholder'],
			"province" => $at['province-placeholder'],
			"postal-code" => $at['postal-code-placeholder'],
		],
		"validation" => [
			"name" => $at['name-validation'],
			"email" => $at['email-validation'],
		],
		"redirect" => $at['redirect'] ? $at['redirect'] : get_option('subscribe_redirect'),
		"country" => getCountry(),
		"countries" => function_exists('getCountries') ? getCountries() : []
	];

  ob_start();
?>

<div
	class="bs-contact-spain"
	data-props='<?php echo json_encode($props) ?>'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_contact_spain', 'bs_contact_spain_sc' );
