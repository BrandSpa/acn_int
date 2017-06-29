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
			class="section section--<?php echo $at['uniq_name'] ?>" 
			data-anchor="<?php echo $at['uniq_name'] ?>"
			data-story="1"
			data-index="2"
		>
			<div class="section__content">
				<?php echo do_shortcode($content) ?>
				<button class="section__down" ><i class="ion-chevron-down"></i></button>
			</div>

			<div class="section__bg-container">
				<div class="section__bg lazyload" data-bgset="<?php echo $bgUrl ?> 1200w, <?php echo $bgUrlMobile ?> 600w"></div> </div>
			</div>
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide', 'acn_fullpage_slide_sc' );