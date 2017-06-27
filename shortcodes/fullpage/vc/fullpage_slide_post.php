<?php
  function acn_fullpage_slide_post_vc() {
    $params = [
      [
        "heading" => "Background image",
        "type" => "attach_image",
        "param_name" => "bg_img"
      ],
      [
        "heading" => "Background image mobile",
        "type" => "attach_image",
        "param_name" => "bg_img_mobile"
      ],
      [
        "heading" => "Anchor",
        "type" => "textfield",
        "param_name" => "anchor"
      ],
			[
        "heading" => "title",
				"type" => "textarea",
				"param_name" => "title"
			],
			[
        "heading" => "Post Content",
				"type" => "textarea_html",
				"param_name" => "content"
			]
		];

    vc_map(
      array(
        "name" =>  "FullPage Slide Post",
        "base" => "acn_fullpage_slide_post",
        "category" =>  "ACN",
				"content_element" => true,
        "params" => $params
      ) 
    );

		if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
    	class WPBakeryShortCode_acn_fullpage_slide_post extends WPBakeryShortCode {}
		}
  }

add_action( 'vc_before_init', 'acn_fullpage_slide_post_vc' );

