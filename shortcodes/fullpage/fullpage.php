<?php

function acn_fullpage_sc( $atts, $content ) {
	$at = shortcode_atts([
		"unique_name" => "fullpage",
		"anchor" => ""
	], $atts);

	ob_start();
	?>
		<div id="<?php echo $at['unique_name'] ?>">
			<?php echo do_shortcode($content) ?>
		</div>
		<script>
			onLoad(function() {
				$('#<?php echo $at['unique_name'] ?>').fullpage({
					scrollOverflow: true,
					scrollBar: false
				});
			});
		</script>
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage', 'acn_fullpage_sc' );