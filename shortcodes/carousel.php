<?php

function bs_carousel_sc($atts, $content = null) {
	$attributes = [ ];
  $at = shortcode_atts( $attributes , $atts );
  ob_start();
?>

<?php echo do_shortcode($content) ?>
<div
  class="bs-carousel" 
>
	<?php echo do_shortcode($content) ?>
</div>

<?php
  return ob_get_clean();
}

  add_shortcode( 'bs_carousel', 'bs_carousel_sc' );


  function bs_carousel_vc() {
    $subparams = [];
    $params = [];

    vc_map(
      array(
        "name" =>  "BS Carousel",
        "base" => "bs_carousel",
        "category" =>  "BS",
				"as_parent" => array('only' => 'bs_carousel_item'),
				"content_element" => true,
				"show_settings_on_create" => false,
				"is_container" => true,
        "params" => $params,
				"js_view" => 'VcColumnView'
      ) 
    );
		if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
    	class WPBakeryShortCode_bs_carousel extends WPBakeryShortCodesContainer {}
		}
  }

add_action( 'vc_before_init', 'bs_carousel_vc' );