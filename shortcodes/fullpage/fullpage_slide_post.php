<?php

function acn_fullpage_slide_post_sc( $atts, $content ) {
	$at = shortcode_atts([
		"title" => "",
		"bg_img" => "",
		"bg_color" => "#fff",
		"uniq_name" => "slide-" . uniqid() . rand(0, 100) 
	], $atts);
	
	$bgUrl = wp_get_attachment_url( $at['bg_img'] ); 
	ob_start();
	?>

		<div 
			id="<?php echo $at['uniq_name'] ?>"
			class="section lazyload" 
			data-anchor="<?php echo $at['uniq_name'] ?>"
			data-bgset="<?php echo $bgUrl ?> 1200w"
			data-src="<?php echo $bgUrl ?>"
			data-sizes="auto"
			style="background-size: cover; background-position: center center"
		>
			<div class="section__content">
				<h1 class="animate-text" style="text-align: center"><?php echo $at['title'] ?></h1>

				<button 
					class="section__open-post" 
					style="
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
					<i class="ion-android-open"></i>
				</button>

				<div class="section__post" >
					<?php echo do_shortcode($content) ?>
				</div>
			</div>
		</div>
		
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_post', 'acn_fullpage_slide_post_sc' );