<?php

function bs_donate_react_sc($atts, $content = null) {
	 $at = shortcode_atts([
		 "country" => getCountry(),
		 "other" => gett("Other"),
		 "monthly" => gett("Monthly"),
		 "once" => gett("Once"),
		 "donate" => gett("Donate"),
		 "next" => gett("Next"),
		 "back" => gett("Back"),
     "yes" => gett("Yes"),
    "no" => gett("No"),
		 "placeholder_amount" => gett("Amount"),
    "placeholder_credit_card" => gett("Credit Card Number"),
    "placeholder_month" => gett("MM"),
    "placeholder_year" => gett("YY"),
    "placeholder_cvc" => gett("CVC"),
    "explain_cvc" =>  gett("The last 3 digits displayed on the back of your credit card."),
    "placeholder_name" => gett("Name"),
    "placeholder_email" => gett("Email"),
    "placeholder_country" => gett("Country"),
		"validation_declined" => gett("Your transaction was not accepted, try again"),
    "validation_card" => gett("Incorrect card"),
    "validation_month" => gett("Incorrect month"),
    "validation_year" => gett("Incorrect year"),
    "validation_cvc" => gett("Incorrect cvc"),
    "validation_name" => gett("Incorrect name"),
    "validation_email" => gett("Incorrect email"),
    "validation_country" => gett("Incorrect country"),
    "step_amount_text" => gett("Select Gift Amount"),
    "step_payment_text" => gett("Payment Details"),
    "step_contact_text" => gett("Your Information"),
		"template_uri" => str_replace("http:", "", get_template_directory_uri()),
    "is_blue" => false
	 ], $atts);
	$getLang = function_exists("pll_current_language") ? pll_current_language("name") : "";
	ob_start();
?>

<?php if(show_donate()): ?>

<div
	class="bs-donate-react"
	data-props='{
    "texts": <?php echo json_encode($at) ?>,
    "is_blue": "<?php echo $at['is_blue'] ?>",
    "redirect": {
      "monthly": "<?php echo get_option('donate_monthly_redirect') ?>",
      "once": "<?php echo get_option('donate_once_redirect') ?>"
    },
		"tags": "<?php echo strtoupper($getLang) . ',' . $at['convertloop_tags'] ?>"
  }'
>
</div>
<?php else: ?>

<script type="text/javascript">
  onLoad(function() {
    if(typeof jQuery !== 'undefined') {
      if(jQuery('.donate-react__container')) {
        jQuery('.donate-react__container').remove();
      }

      if(jQuery('.bs-post__donate')) {
        jQuery('.bs-post__donate').remove();
      }
    }
  });
</script>
<?php endif; ?>
<?php
return ob_get_clean();
}

add_shortcode('bs_donate_react', 'bs_donate_react_sc');

add_action( 'vc_before_init', 'bs_donate_react_vc' );

  function bs_donate_react_vc() {
		$params = [];
    $atts = [
      "other" => "Other",
      "monthly" => "Monthly",
      "once" => "Once",
      "placeholder_amount" => "Amount",
      "placeholder_credit_card" => "Credit Card Number",
      "placeholder_month" => "MM",
      "placeholder_year" => "YY",
      "placeholder_cvc" => "CVC",
       "explain_cvc" => "The last 3 digits displayed on the back of your credit card.",
      "placeholder_name" => "Name",
      "placeholder_email" => "Email",
      "placeholder_country" => "Country",
      "validation_declined" => "Your transaction was not accepted, try again",
      "validation_card" => "Incorrect card",
      "validation_month" => "Incorrect month",
      "validation_year" => "Incorrect year",
      "validation_cvc" => "Incorrect cvc",
      "validation_name" => "Incorrect name",
      "validation_email" => "Incorrect email",
      "validation_country" => "Incorrect country",
      "step_amount_text" => "Select Gift Amount",
      "step_payment_text" => "Payment Details",
      "step_contact_text" => "Your Information"
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


  	vc_map(
      array(
        "name" =>  "BS Donate",
        "base" => "bs_donate_react",
        "category" =>  "BS",
        "params" => $params
      )
    );
  }
