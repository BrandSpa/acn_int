<?php

function bs_contact_form_sc($atts, $content = null) {
	$attributes = [
		'name-placeholder' => 'Name',
		'lastname-placeholder' => 'Lastname',
		'email-placeholder' => 'Email',
		'country-placeholder' => 'Select country',
		'name-validation' => 'Name required',
		'lastname-validation' => 'lastname required',
		'email-validation' => 'Email required',
		'terms-validation' => 'You must accept',
		'button-text' => gett('Pray'),
		'terms-text' => 'I want to receive information about ACN, its projects and updated, and I accept the terms and conditions',
		'redirect' => '',
		'btn-bg' => '#F4334A',
		'convertloop_tags' => '',
		'convertloop_event' => 'Subscription',
		'vertical' => false,
		'terms' => false
	];

  $at = shortcode_atts( $attributes , $atts );
	$getLang = function_exists("pll_current_language") ? pll_current_language("name") : "";
  ob_start();
?>

<div
	class="contact-form"
	data-props='{
		"cl": {
			"tags": "<?php echo strtoupper($getLang) . ',' . $at['convertloop_tags'] ?>",
			"event": "<?php echo $at['convertloop_event'] ?>"
		},
		"country": "<?php echo getCountry() ?>",
		"texts": {
			"button": "<?php echo $at['button-text'] ?>",
			"select_country": "<?php echo gett('Select country') ?>",
			"terms": "<?php echo $at['terms-text'] ?>"
		},
		"placeholders": {
			"name": "<?php echo $at['name-placeholder'] ?>",
			"lastname": "<?php echo $at['lastname-placeholder'] ?>",
			"email": "<?php echo $at['email-placeholder'] ?>",
			"country": "<?php echo $at['country-placeholder'] ?>"
		},
		"validationMessages": {
			"name": "<?php echo $at['name-validation'] ?>",
			"lastname": "<?php echo $at['lastname-validation'] ?>",
			"email": "<?php echo $at['email-validation'] ?>",
			"terms": "<?php echo $at['terms-validation'] ?>"
		},
		"redirect": "<?php echo $at['redirect'] ? $at['redirect'] : get_option('subscribe_redirect') ?>",
		"btnBg": "<?php echo $at['btn-bg'] ?>",
		"vertical": "<?php echo $at['vertical'] ?>",
		"terms": "<?php echo $at['terms'] ?>"
	}'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_contact_form', 'bs_contact_form_sc' );
