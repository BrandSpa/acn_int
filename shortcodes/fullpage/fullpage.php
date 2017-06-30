<?php

function acn_fullpage_sc( $atts, $content ) {
	$at = shortcode_atts([
		"unique_name" => "fullpage",
		"links" => ""
	], $atts);

	$links = empty(vc_param_group_parse_atts($at['links'])) ? [] : vc_param_group_parse_atts($at['links']);

	$anchors = array_map(function($link) {
		return $link['anchor'];
	}, $links);

	ob_start();
?>

	<div id="fullpage">
		<?php echo do_shortcode($content) ?>
	</div>

	<div class="indicator">
		<div class="indicator__story">1</div>
		<div class="indicator__index">1</div>
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
		setTimeout(function() { 
			$('.intro').addClass('intro--close');
		}, 13000);
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