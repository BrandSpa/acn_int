<?php

function bs_video_modal_bg_sc($atts, $content = null) {
	$attributes = [
		"video_url" => ""
	];
  $at = shortcode_atts( $attributes , $atts );
  ob_start();
?>

<div>
	<?php echo json_encode(do_shortcode($content)) ?>
</div>

<?php
  return ob_get_clean();
}

add_shortcode( 'bs_video_modal_bg', 'bs_video_modal_bg_sc' );
add_action( 'vc_before_init', 'bs_video_modal_bg_vc' );

function bs_video_modal_bg_vc() {

	vc_map([
		"name" => "Video modal BG",
		"base" => "bs_video_modal_bg",
			"as_parent" => array('only' => 'row'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
			"content_element" => true,
			"show_settings_on_create" => false,
			"is_container" => true,
			"params" => array(
					array(
							"type" => "textfield",
							"heading" => "video url",
							"param_name" => "video_url",
							"description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "my-text-domain")
					)
			),
			"js_view" => 'VcColumnView'
	]);

}
