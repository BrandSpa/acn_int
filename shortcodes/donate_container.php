<?php

function bs_donate_container_sc($atts, $content = null) {

	 $at = shortcode_atts([
		"donate_monthly_redirect" => get_option('donate_monthly_redirect'),
		 "donate_once_redirect" => get_option('donate_once_redirect'),
		 "country" => getCountry(),
		 "city" => getCity(),
		 "other" => get_option('other')?:gett("Other"),
		 "phone" => get_option('phone')?:gett("Phone"),
		 "monthly" => get_option('monthly')?:gett("Monthly"),
		 "once" => get_option('once')?:gett("Once"),
		 "donate" => get_option('donate')?:gett("Donate"),
		 "next" => get_option('next')?:gett("Next"),
		 "back" => get_option('back')?:gett("Back"),
     "yes" => get_option('yes')?:gett("Yes"),
    "no" => get_option('no')?:gett("Not now"),
		 "placeholder_amount" => get_option('placeholder_amount')?:gett("Amount"),
    "placeholder_credit_card" => get_option('placeholder_credit_card')?:gett("Credit Card Number"),
    "placeholder_month" => get_option('placeholder_month')?:gett("MM"),
    "placeholder_year" => get_option('placeholder_year')?:gett("YY"),
	"placeholder_cvc" => get_option('placeholder_cvc')?:gett("CVC"),
	'placeholder_phone' => get_option('placeholder_phone')?:'phone',
    "explain_cvc" => get_option('explain_cvc')?:gett("The last 3 digits displayed on the back of your credit card."),
    "placeholder_name" => get_option('placeholder_name')?:gett("Name"),
    "placeholder_email" => get_option('placeholder_email')?:gett("Email"),
    "placeholder_country" => get_option('placeholder_country')?:gett("Country"),
	"validation_declined" => get_option('validation_declined')?:gett("Your transaction was not accepted, try again"),
    "validation_card" => get_option('validation_card')?:gett("Incorrect card"),
    "validation_month" => get_option('validation_month')?:gett("Incorrect month"),
    "validation_year" => get_option('validation_year')?:gett("Incorrect year"),
    "validation_cvc" => get_option('validation_cvc')?:gett("Incorrect cvc"),
    "validation_name" => get_option('validation_name')?:gett("Incorrect name"),
    "validation_email" => get_option('validation_email')?:gett("Incorrect email"),
	"validation_country" => get_option('validation_country')?:gett("Incorrect country"),
	"validation_phone" => get_option('validation_phone')?:gett("Incorrect phone"),
    "step_amount_text" => get_option('step_amount_text')?:gett("Select Gift Amount"),
    "step_payment_text" => get_option('step_payment_text')?:gett("Payment Details"),
    "step_contact_text" => get_option('step_contact_text')?:gett("Your Information"),
	"template_uri" => str_replace("http:", "", get_template_directory_uri()),
    "success_title" => get_option('success_title')?:gett("YOUR DONATION WAS SUCCESSFUL"),
    "success_subtitle" => get_option('success_subtitle')?:gett("THANK YOU FOR YOUR GENEROSITY!."),
    "text_four_step" => get_option('text_four_step')?:gett("ACN has a bigger impact when due to the generosity of benefactors can count on an stable budget."),
    "subtext_four_step" => get_option('subtext_four_step')?:gett("Could you help us with a small daily donation in the amount of US$"),
    "text_footer" => get_option('text_footer')?:gett("Your donation will be charged to your credit card. You can cancel your contribution anytime you want."),
	"is_blue" => false,
	"call_center" => get_option('call_center'),
		"preload" => get_template_directory_uri() . "/public/img/spinner.svg",
		"tags" => ""
	 ], $atts);


	 	$getLang = getLangTag();

	 $props = [
 		"texts" => $at,
		"countries" => function_exists('getCountries') ? getCountries() : [],
		"prefixes" =>  function_exists('country_code') ? country_code() : [],
	    "is_blue" => $at['is_blue'],
		"call_center" => $at['call_center'], 
 		"redirect" => [
 			"monthly" => $at['donate_monthly_redirect'],
 			"once" => $at['donate_once_redirect']
 		],
 		"tags" => !empty($getLang) ? strtoupper($getLang) . ',' : '' . $at['tags'],
		"titles" => ["SUPPORT A PERSECUTED CHRISTIAN", "THANK YOU"],
		"content" =>  $content,
		"loadSpinner" => get_template_directory_uri() . "/public/images/loading.gif",
 	];

	ob_start();
?>

<div
	class="bs-donate-container"
	data-props='<?php echo json_encode($props) ?>'
>
</div>

<?php
return ob_get_clean();
}

add_shortcode('bs_donate_container', 'bs_donate_container_sc');
