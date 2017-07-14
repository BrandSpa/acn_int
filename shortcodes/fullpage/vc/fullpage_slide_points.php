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
        "param_name" => "city"
      ],
      [
        "type" => "textfield",
        "heading" => "subtitle",
        "param_name" => "city_subtitle"
      ],
      [
        "type" => "textfield",
        "heading" => "Families already returned number",
        "param_name" => "families_already_returned_num"
      ],
      [
        "type" => "textfield",
        "heading" => "Families already returned text",
        "param_name" => "families_already_returned_text"
      ],
      [
        "type" => "textfield",
        "heading" => "Damaged number",
        "param_name" => "damaged_houses_num"
      ],
      [
        "type" => "textfield",
        "heading" => "Damaged title 1",
        "param_name" => "damaged_houses_title_1"
      ],
      [
        "type" => "textfield",
        "heading" => "Damaged title 2",
        "param_name" => "damaged_houses_title_2"
      ],
      [
        "type" => "textfield",
        "heading" => "percentage",
        "param_name" => "percentage"
      ],
      [
        "type" => "textfield",
        "heading" => "Number of houses registered to be renovated number",
        "param_name" => "number_of_houses_registered_to_be_renovated_num"
      ],
      [
        "type" => "textfield",
        "heading" => "Number of houses registered to be renovated text",
        "param_name" => "number_of_houses_registered_to_be_renovated_text"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Totally Destroyed number",
        "param_name" => "houses_totally_destroyed_num"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Totally Destroyed text",
        "param_name" => "houses_totally_destroyed_text"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Burnt number",
        "param_name" => "houses_burnt_num"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Burnt text",
        "param_name" => "houses_burnt_text"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Partially Damaged num",
        "param_name" => "houses_partially_damaged_num"
      ],
      [
        "type" => "textfield",
        "heading" => "Houses Partially Damaged text",
        "param_name" => "houses_partially_damaged_text"
      ],
      [
        "type" => "",
        "heading" => "Number of houses actually being renovated number",
        "param_name" => "number_of_houses_actually_being_renovated_num"
      ],
      [
        "type" => "",
        "heading" => "Number of houses actually being renovated text",
        "param_name" => "number_of_houses_actually_being_renovated_text"
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
