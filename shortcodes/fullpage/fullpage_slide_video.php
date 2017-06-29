<?php

function acn_fullpage_slide_video_sc( $atts, $content ) {
	$at = shortcode_atts([
		"bg_img" => "",
		"bg_img_mobile" => "",
		"bg_color" => "#fff",
		"video_url" => "",
		"uniq_name" => "slide-" . uniqid() . rand(0, 100) 
	], $atts);
	
	$bgUrl = wp_get_attachment_url( $at['bg_img'] ); 
	ob_start();
	?>

		<div 
			class="section section--<?php echo $at['uniq_name'] ?>" 
		>
			<div class="section__content">
				<?php echo do_shortcode($content) ?>
				<button class="section__open section__open-video"><i class="ion-social-youtube"></i></button>
			</div>

			<div class="section__video" >
				<div class="embed-container">
					<iframe data-src="<?php echo $at['video_url'] ?>?autoplay=1" frameborder="0" allowfullscreen ></iframe>
				</div>
			</div>

			<div class="section__bg-container">
			
				<div class="section__bg lazyload" data-bgset="<?php echo $bgUrl ?> 1200w, <?php echo $bgUrlMobile?> 600ws"></div>
			
			</div>

		</div>
		
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_video', 'acn_fullpage_slide_video_sc' );