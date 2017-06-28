<?php

function acn_fullpage_slide_bgs_sc( $atts, $content ) {
	$at = shortcode_atts([
		"bg_img" => "",
		"bg_img_mobile" => "",
		"overlay_img" => "",
		"overlay_img_mobile" => "",
		"bg_color" => "#000",
		"uniq_name" => "slide-" . uniqid() . rand(0, 100) 
	], $atts);
	
	$bgUrl = wp_get_attachment_url( $at['bg_img'] ); 
	$bgUrlMobile = wp_get_attachment_url( $at['bg_img_mobile'] ); 
	$overlayUrl = wp_get_attachment_url( $at['overlay_img'] ); 
	$overlayUrlMobile = wp_get_attachment_url( $at['overlay_img_mobile'] ); 

	ob_start();

	?>
	
	<div 
		data-anchor="<?php echo $at['uniq_name'] ?>"
		class="section section--<?php echo $at['uniq_name'] ?>"
	>
		<style>
			.section--<?php echo $at['uniq_name'] ?> .layer-bg-animation {
				background: #000;
				transition: all .5s;
			}

			.section--<?php echo $at['uniq_name'] ?>.active .layer-bg-animation {
				animation: Q2S1Bg 3s;
				opacity: 1;
				background: url(<?php echo $bgUrl ?>);
				@media (max-width: 767px) {
					background: url(<?php echo $bgUrlMobile ?>)
				}
			}

			.section--<?php echo $at['uniq_name'] ?>.active .layer-overlay-animation {
				animation: Q4S1Fg 3s;
				opacity: 1;
				background: url(<?php echo $overlayUrl ?>);
				@media (max-width: 767px) {
					background: url(<?php echo $overlayUrlMobile ?>)
				}
			}

			.active .animate-text {
				animation: textAnim 2.5s;
			}
	</style>

	<div class="section__content" style="position: relative; z-index: 3;">
			<?php echo do_shortcode($content) ?>
	</div>

	<div class="section__layers">

			<div
				class="layer-bg-animation section__layers__layer"
				style=" z-index: 1"
			>
			</div>

			<div 
				class="layer-overlay-animation section__layers__layer"
				style=" z-index: 2"
			>
			</div>
		</div>
	
</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_bgs', 'acn_fullpage_slide_bgs_sc' );