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
	
	<div id="<?php echo $at['uniq_name'] ?>" class="section" id="<?php echo $at['uniq_name'] ?>">
			<style>
			
				
		#<?php echo $at['uniq_name'] ?>.active .layer-bg-animation {
			animation: Q2S1Bg 3s;
		}

		#<?php echo $at['uniq_name'] ?>.active .layer-overlay-animation {
			animation: Q4S1Fg 3s;
		}

		.active .animate-text {
			animation: textAnim 2.5s;
		}

	</style>

	<div class="section__content" style="position: relative; z-index: 3;">
			<?php echo do_shortcode($content) ?>
	</div>

		<div
			class="layer-bg-animation lazyload"
			data-bgset="<?php echo $bgUrl ?> 1200w, <?php echo $bgUrlMobile ?> 768w"
			style="
					background-size: cover; 
					background-position: center center;
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: 1;
			"
		>
		</div>

		<div 
			class="layer-overlay-animation lazyload"
			data-bgset="<?php echo $overlayUrl ?> 1200w, <?php echo $overlayUrlMobile ?> 768w"
			style="
				background-size: cover; 
				background-position: center center;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: 2;
				"
			>
		</div>
			
		</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_bgs', 'acn_fullpage_slide_bgs_sc' );