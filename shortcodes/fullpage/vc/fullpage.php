<?php
function acn_fullpage_vc() {
    $subparams = [
      [
        'type' => 'textfield',
        'param_name' => 'anchor',
        'heading' => 'link Anchor',
        'value' => ''
      ],
      [
        'type' => 'textfield',
        'param_name' => 'title',
        'heading' => 'link title',
        'value' => ''
      ]
    ];
    
    $params = [
      [
        'type' => 'textfield',
        'param_name' => 'unique_name',
        'heading' => 'Component Name',
        'value' => ''
      ],
      [
        'type' => 'param_group',
        'param_name' => 'links',
        'value' => '',
        'params' => $subparams
      ]
    ];

    vc_map(
      array(
        "name" =>  "FullPage",
        "base" => "acn_fullpage",
        "category" =>  "ACN",
				"content_element" => true,
				"show_settings_on_create" => true,
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