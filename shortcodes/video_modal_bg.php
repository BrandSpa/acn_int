<?php

function bs_video_modal_bg_sc($atts, $content = null) {
	$attributes = [
		"video_url" => "",
		"modal_name" => "bs-video-modal",
		"image_id" => ""
	];

  $at = shortcode_atts( $attributes , $atts );
  ob_start();
?>

<div id="open-<?php echo $at['modal_name'] ?>" style="background: url(<?php echo wp_get_attachment_url($at['image_id']); ?>); background-size: cover">
	<?php echo do_shortcode($content) ?>
</div>

<div id="<?php echo $at['modal_name'] ?>" class="modal">
  <a class="modal__close" href="#"> <i class="ion-close"></i> </a>
  <div class="iframe-container">
  	
  </div>
</div>

<script>
	onLoad(function() {
		$("#open-<?php echo $at['modal_name'] ?>").on('click', function() {
			$("#<?php echo $at['modal_name'] ?>").find('.iframe-container').append('<iframe src="<?php echo $at["video_url"] ?>?autoplay=1" frameBorder="0" height="315" width="100%" allowFullScreen ></iframe>');
			$("#<?php echo $at['modal_name'] ?>").toggleClass('modal--show');
		});

		$('.modal__close').on('click', function() {
			$(this).find('.iframe-container iframe').remove();
			$(this).parent().toggleClass('modal--show');
		});

	});
</script>

<?php
  return ob_get_clean();
}

add_shortcode( 'bs_video_modal_bg', 'bs_video_modal_bg_sc' );
add_action( 'vc_before_init', 'bs_video_modal_bg_vc' );

function bs_video_modal_bg_vc() {

	vc_map([
		"name" => "Video modal BG",
		"base" => "bs_video_modal_bg",
		"content_element" => true,
		"show_settings_on_create" => true,
		"is_container" => true,
			"params" => array(
					[
						"type" => "textfield",
						"heading" => "video url",
						"param_name" => "video_url",
						"description" => "youtube embed url"
				],
				[
					"type" => "textfield",
					"heading" => "name",
					"param_name" => "name",
					"description" => "it must be unique, if there are more then one in the page"
				],
				[
					"type" => "attach_image",
					"heading" => "background",
					"param_name" => "image_id"
				]
			),
			"js_view" => 'VcColumnView'
	]);

	if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
  	class WPBakeryShortCode_bs_video_modal_bg extends WPBakeryShortCodesContainer {}
	}

}
