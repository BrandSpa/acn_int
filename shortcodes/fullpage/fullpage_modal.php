<?php

function acn_fullpage_modal_sc( $atts, $content ) {
	$at = shortcode_atts([
		"uniq_name" => "section-side" . uniqid() . rand(0, 100)
	], $atts);

	ob_start();
?>

  <div class="section__modal" data-modal="<?php echo $at['uniq_name'] ?>">
    <div class="section__modal__content">
      <?php echo do_shortcode($content) ?>
      </div>
  </div>

	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_modal', 'acn_fullpage_modal_sc' );
