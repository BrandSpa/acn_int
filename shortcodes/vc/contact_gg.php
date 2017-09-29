<?php

add_action( 'vc_before_init', 'bs_contact_gg_vc' );

function bs_contact_gg_vc() {
		$params = [
			[
        "type" => "textfield",
        "heading" => "name placeholder",
        "param_name" => "name_placeholder",
        "value" => 'Name'
			]
	];

  	vc_map(
      array(
        "name" =>  "BS Contact Grants",
        "base" => "bs_contact_gg",
        "category" =>  "BS",
        "params" => $params
      )
    );
  }
