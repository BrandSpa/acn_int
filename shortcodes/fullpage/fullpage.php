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

	<style>
		#fullpage{
			height: 100%;
		}
	</style>

	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage', 'acn_fullpage_sc' );