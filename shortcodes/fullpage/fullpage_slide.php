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
			class="section section--<?php echo $at['uniq_name'] ?> lazyload" 
			data-bgset="<?php echo $bgUrl ?> 1200w, <?php echo $bgUrlMobile ?> 600w"
			style="background-size: cover; background-position: center center"
		>

		<style>
			.section--<?php echo $at['uniq_name'] ?> {
				background-color: #000;
			}		
		</style>
			<div class="section__content">
				<?php echo do_shortcode($content) ?>
				<button 
					class="section__down"
					style="
						background: transparent;
						border: 2px solid #fff;
						color: #fff;
						width: 50px; 
						height: 50px; 
						border-radius: 50px; 
						margin: 0 auto;
						display: block;
						position: absolute;
						bottom: 40px;
						left: 0;
						right: 0;
						z-index: 2;
						font-size: 25px"
					><i class="ion-chevron-down"></i></button>
			</div>
		</div>
		
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide', 'acn_fullpage_slide_sc' );