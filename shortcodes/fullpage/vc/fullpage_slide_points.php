<?php
  function acn_fullpage_slide_points_vc() {

    $spots_content_subparams = [
      [
        "type" => "attach_image",
        "heading" => "header image",
        "param_name" => "header_img"
      ],
      [
        "type" => "textfield",
        "heading" => "City",
        "param_name" => "city",
        "value" => ""
      ],
      [
        "type" => "textfield",
        "heading" => "subtitle",
        "param_name" => "city_subtitle",
        "value" => "Restoration Process and Returnees"
      ],
      [
        "type" => "textfield",
        "heading" => "Families already returned number",
        "param_name" => "families_already_returned_num",
        "value" => "12970"
      ],
      [
        "type" => "textfield",
        "heading" => "Families already returned text",
        "param_name" => "families_already_returned_text",
        "value" => "Families already returned"
      ],
      [
        "type" => "textfield",
        "heading" => "Damaged number",
        "param_name" => "damaged_houses_num",
        "value" => "12970"
      ],
      [
        "type" => "textfield",
        "heading" => "Damaged title 1",
        "param_name" => "damaged_houses_title_1",
        "value" => "Damaged"
      ],
      [
        "type" => "textfield",
        "heading" => "Damaged title 2",
        "param_name" => "damaged_houses_title_2",
        "value" => "houses"
      ],
      [
        "type" => "textfield",
        "heading" => "percentage",
        "param_name" => "percentage",
        "value" => "2%"
      ],
      [
        "type" => "textfield",
        "heading" => "Number of houses registered to be renovated number",
        "param_name" => "number_of_houses_registered_to_be_renovated_num",
        "value" => "12970"
      ],
      [
        "type" => "textfield",
        "heading" => "Number of houses registered to be renovated text",
        "param_name" => "number_of_houses_registered_to_be_renovated_text",
        "value" => "Number of houses registered to be renovated"
      ],
      [
          "type" => "textfield",
          "heading" => "Christians already returned num",
          "param_name" => "christians_already_returned_num",
          "value" => "12970"
      ],
      [
          "type" => "textfield",
          "heading" => "Christians already returned text",
          "param_name" => "christians_already_returned_text",
          "value" => "Christians already returned"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Totally Destroyed number",
        "param_name" => "houses_totally_destroyed_num",
        "value" => "12970"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Totally Destroyed text",
        "param_name" => "houses_totally_destroyed_text",
        "value" => "Houses Totally Destroyed",
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Burnt number",
        "param_name" => "houses_burnt_num",
        "value" => "12970"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Burnt text",
        "param_name" => "houses_burnt_text",
        "value" => "Houses Burnt"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Partially Damaged num",
        "param_name" => "houses_partially_damaged_num",
        "value" => "12970"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Partially Damaged text",
        "param_name" => "houses_partially_damaged_text",
        "value" => "Houses Partially Damaged"
      ],
      [
        "type" => "textfield",
        "heading" => "Number of houses actually being renovated number",
        "param_name" => "number_of_houses_actually_being_renovated_num",
        "value" => "12970"
      ],
      [
        "type" => "textfield",
        "heading" => "Number of houses actually being renovated text",
        "param_name" => "number_of_houses_actually_being_renovated_text",
        "value" => "Number of houses actually being renovated"
      ]
    ];

    $params = [
      [
        "heading" => "Background image",
        "type" => "attach_image",
        "param_name" => "bg_img"
      ],
      [
        "heading" => "Button title",
        "type" => "textfield",
        "param_name" => "btn_title"
      ],
      [
        "heading" => "Anchor",
        "type" => "textfield",
        "param_name" => "uniq_name"
      ],
      [
        "heading" => "Story num",
        "type" => "textfield",
        "param_name" => "story_num"
      ],
      [
        "heading" => "Slide num",
        "type" => "textfield",
        "param_name" => "index_num"
      ],
      [
        'type' => 'param_group',
        'param_name' => 'contents',
        'heading' => 'Spots Content',
        'params' =>  $spots_content_subparams
      ],
			[
        "heading" => "Post Content",
				"type" => "textarea_html",
				"param_name" => "content"
			]
		];

    vc_map(
      array(
        "name" =>  "FullPage Slide Points",
        "base" => "acn_fullpage_slide_points",
        "category" =>  "ACN",
				"content_element" => true,
        "params" => $params
      )
    );

		if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
    	class WPBakeryShortCode_acn_fullpage_slide_points extends WPBakeryShortCode {}
		}
  }

add_action( 'vc_before_init', 'acn_fullpage_slide_points_vc' );
