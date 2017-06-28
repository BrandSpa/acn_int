<?php
function acn_fullpage_vc() {
    $subparams = [
      [
        'type' => 'textfield',
        'param' => 'anchor',
        'heading' => 'link Anchor'
      ],
      [
        'type' => 'textfield',
        'param' => 'title',
        'heading' => 'link title'
      ]
    ];
    
    $params = [
      [
        'type' => 'param_group',
        'value' => '',
        'param_name' => 'links',
        'params' => $subparams
      ]
    ];

    vc_map(
      array(
        "name" =>  "FullPage",
        "base" => "acn_fullpage",
        "category" =>  "ACN",
				"content_element" => true,
				"show_settings_on_create" => false,
				"is_container" => true,
        "params" => $params,
				"js_view" => 'VcColumnView'
      ) 
    );
		if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
    	class WPBakeryShortCode_acn_fullpage extends WPBakeryShortCodesContainer {}
		}
  }

add_action( 'vc_before_init', 'acn_fullpage_vc' );