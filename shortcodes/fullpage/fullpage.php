<?php

function acn_fullpage_sc( $atts, $content ) {
	$at = shortcode_atts([
		"unique_name" => "fullpage",
		"links" => ""
	], $atts);

	$links = empty(vc_param_group_parse_atts($at['links'])) ? [] : vc_param_group_parse_atts($at['links']);

	ob_start();
?>

	<div id="fullpage">
		<?php echo do_shortcode($content) ?>
	</div>

	<div class="indicator">
		<div class="indicator__story">1</div>
		<div class="indicator__index">1</div>
	</div>

	<div class="fullpage-nav">
		<ul>
		<?php foreach($links  as $ind => $link): ?>
			<li><a href="<?php echo $link['link'] + 1 ?>"><span class="num"><?php echo $ind ?></span> <?php echo  $link['title'] ?></a></li>
		<?php endforeach; ?>
		</ul>
		
		<button class="fullpage-nav__close"><i class="ion-close-round"></i></button>

		<div class="fullpage-nav__info">
			<ul>
				<li><a href="#">Privacidad</a></li>	
				<li><a href="#">Condiciones</a></li>	
				<li><a href="#">Español</a></li>	
			</ul>	
		</div>
	</div>

	<div class="intro">
		<div class="intro__section intro--fade-in-out intro__section--duration-3 intro__section--delay-1">
			<div class="intro__section__container">
			<h1>lorem ipsum title 1</h1>
			</div>
		</div>

		<div class="intro__section intro--fade-in-out intro__section--duration-4 intro__section--delay-4">
			<div class="intro__section__container">
				<h1>A real title nea</h1>
			</div>
		</div>

		<div class="intro__section intro--fade-in-out intro__section--duration-4 intro__section--delay-8">
			<div class="intro__section__container">
				<h1>A real last title nigga</h1>
			</div>
		</div>
	</div>

	<script>
		
		if(window.localStorage.getItem('intro') !== true) {
			setTimeout(function introDelay() { 
				$('.intro').addClass('intro--close');
				window.localStorage.setItem('intro', true);
			}, 13000);
		}
	</script>

	<style>
		#fullpage{
			height: 100%;
		}
	</style>

	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage', 'acn_fullpage_sc' );