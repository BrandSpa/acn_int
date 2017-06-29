<?php

function acn_fullpage_slide_sc( $atts, $content ) {
	$at = shortcode_atts([
		"bg_img" => "",
		"bg_img_mobile" => "",
		"bg_color" => "#fff",
		"uniq_name" => "slide-" . uniqid() . rand(0, 100) 
	], $atts);
	
	$bgUrl = wp_get_attachment_url( $at['bg_img'] ); 
	$bgUrlMobile = wp_get_attachment_url( $at['bg_img_mobile'] ); 

	ob_start();
	?>
		<div
			data-anchor="<?php echo $at['uniq_name'] ?>"
			class="section section--<?php echo $at['uniq_name'] ?>" 
			style="background-size: cover; background-position: center center"
		>
		<style>

			.section--<?php echo $at['uniq_name'] ?> {
				background-color: #000;
			}

			.section--<?php echo $at['uniq_name'] ?>.load-bgs {
				background-image: url(<?php echo $bgUrl ?>);
			}

			@media (max-width: 767px) {
				.section--<?php echo $at['uniq_name'] ?>.load-bgs {
					background-image: url(<?php echo $bgUrlMobile ?>)
				}
			}
		
		</style>
			<div class="section__content">
				<?php echo do_shortcode($content) ?>
				<button 
					class="section__down"
					style="
						background: transparent;
						border: 2px solid #fff;
						width: 100px; 
						height: 100px; 
						border-radius: 100px; 
						margin: 0 auto;
						display: block;
						position: absolute;
						bottom: 40px;
						left: 0;
						right: 0;
						z-index: 2;
						font-size: 32px"
					>
				><i class="ion-chevron-down"></i></button>
			</div>
		</div>
		
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide', 'acn_fullpage_slide_sc' );