<?php

function acn_fullpage_slide_end_sc( $atts, $content ) {
	$at = shortcode_atts([
    "redirect_url" => "",
		"story_num" => "",
		"index_num" => "",
		"uniq_name" => "slide-" . uniqid() . rand(0, 100)
	], $atts);

	$bgUrl = wp_get_attachment_url( $at['bg_img'] );
	$bgUrlMobile = wp_get_attachment_url( $at['bg_img_mobile'] );

	ob_start();
?>

	<div
		class="section section--<?php echo $at['uniq_name'] ?> "
		data-anchor="<?php echo $at['uniq_name'] ?>"
		data-story="<?php echo $at['story_num'] ?>"
		data-index="<?php echo $at['index_num'] ?>"
    data-redirect="<?php echo $at['redirect_url'] ?>"
	>
	  <div class="fp-bg section__bg-container" style="background: #000"></div>
	</div>

	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_end', 'acn_fullpage_slide_end_sc' );
