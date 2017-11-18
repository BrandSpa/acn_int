<?php

function bs_contact_call_sc($atts, $content = null) {

	$attributes = [
		'name-placeholder' => 'Name',
		'lastname-placeholder' => 'Lastname',
		'email-placeholder' => 'Email',
		'country-placeholder' => 'Country',
		'city-placeholder' => 'City',
		'phone-placeholder' => 'phone',
		'btn-placeholder' => 'Get call',
		'name-validation' => 'Name required',
		'phone-validation' => 'Phone required',
		'redirect' => '',
		'convertloop_tags' => '',
		'convertloop_event' => 'Subscription',
		'btn_text' => ''
	];

  $at = shortcode_atts( $attributes , $atts );

	$getLang = getLangTag() . ',';

	$props = [
		"convertloop" => [
			"tags" => $getLang . $at['convertloop_tags'],
			"event" =>  empty($at['convertloop_event']) ? 'Subscription' : $at['convertloop_event']
		],
		"texts" => [
			"btn" => $at['btn-text'],
		],
		"placeholders" => [
			"name" => $at['name-placeholder'],
			"lastname" => $at['lastname-placeholder'],
			"country" => $at['country-placeholder'],
			"city" => $at['city-placeholder'],
			"phone" => $at['phone-placeholder'],
		],
		"validationMessages" => [
			"name" => $at['name-validation'],
			"phone" => $at['phone-validation'],
		],
		"redirect" => $at['redirect'] ? $at['redirect'] : get_option('subscribe_redirect'),
		"country" => getCountry(),
		"countries" => function_exists('getCountries') ? getCountries() : []
	];

  ob_start();
?>

<div
	class="bs-contact-call"
	data-props='<?php echo json_encode($props) ?>'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_contact_call', 'bs_contact_call_sc' );
