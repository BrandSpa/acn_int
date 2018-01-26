<?php
add_action( 'vc_before_init', 'bs_donate_container_vc' );

  function bs_donate_container_vc() {
		$params = [];
    $atts = [
      "other" => get_option("other")?:"Other",
      "monthly" => get_option("other")?:"Monthly",
      "once" => get_option("once")?:"Once",
      "placeholder_amount" => get_option("placeholder_amount")?:"Amount",
      "placeholder_credit_card" => get_option("placeholder_credit_card")?:"Credit Card Number",
      "placeholder_month" => get_option("placeholder_month")?:"MM",
      "placeholder_year" => get_option("placeholder_year")?:"YY",
      "placeholder_cvc" => get_option("placeholder_cvc")?:"CVC",
      "explain_cvc" =>  get_option("explain_cvc")?:"The last 3 digits displayed on the back of your credit card.",
      "placeholder_name" => get_option("placeholder_name")?:"Name",
      "placeholder_email" => get_option("placeholder_email")?:"Email",
      "placeholder_country" => get_option("placeholder_country")?:"Country",
      "validation_declined" => get_option("validation_declined")?:"Your transaction was not accepted, try again",
      "validation_card" => get_option("validation_card")?:"Incorrect card",
      "validation_month" => get_option("validation_month")?:"Incorrect month",
      "validation_year" => get_option("validation_year")?:"Incorrect year",
      "validation_cvc" => get_option("validation_cvc")?:"Incorrect cvc",
      "validation_name" => get_option("validation_name")?:"Incorrect name",
      "validation_email" => get_option("validation_email")?:"Incorrect email",
      "validation_country" => get_option("validation_country")?:"Incorrect country",
      "validation_phone" => get_option("validation_phone")?:"Incorrect phone",
      "step_amount_text" => get_option("step_amount_text")?:"Select Gift Amount",
      "step_payment_text" => get_option("step_payment_text")?:"Payment Details",
      "step_contact_text" => get_option("step_contact_text")?:"Your Information",
      "success_title" => get_option("success_title")?:"TU DONACIÓN SE HA REALIZADO CON ÉXITO",
      "success_subtitle" => get_option("success_subtitle")?:"¡GRACIAS POR TU GENEROSIDAD!",
      "text_four_step" => get_option('text_four_step'),
      "subtext_four_step" => get_option('subtext_four_step'),
      "text_footer" => get_option('text_footer'),
      "donate_monthly_redirect" => get_option('donate_monthly_redirect'),
 		  "donate_once_redirect" => get_option('donate_once_redirect')
    ];

    foreach($atts as $key => $val) {
      array_push($params, [
         "type" => "textfield",
         "heading" =>  str_replace('_', ' ', $key),
         "param_name" => $key,
         "value" => $val
      ]);
    }

    array_push($params, [
      "type" => "checkbox",
      "heading" =>  "Blue?",
      "param_name" => "is_blue",
      "value" => false
    ]);

    array_push($params, [
      "type" => "checkbox",
      "heading" =>  "Call Center Mode",
      "param_name" => "call_center",
      "value" => false
    ]);

  	vc_map(
      array(
        "name" =>  "BS Donate Container",
        "base" => "bs_donate_container",
        "category" =>  "BS",
        "params" => $params
      )
    );
  }

?>
