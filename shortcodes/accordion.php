<?php

function bs_accordion_sc($atts, $content = null) {
	$attributes = [
		'content' => '',
    'btn_title' => '',
    'background' => '#687f87',
    'btn_title_color' => '#fff'
  ];

  $at = shortcode_atts( $attributes , $atts );

	$props = [
		'content' => $content,
    'btnTitle' => $at['btn_title'],
    'background' => $at['background'],
    'titleColor' => $at['btn_title_color']
	];

  ob_start();
?>

<div
	class="bs-accordion"
	data-props='<?php echo json_encode($props) ?>'
>
</div>

<?php

  return ob_get_clean();
}

add_shortcode( 'bs_accordion', 'bs_accordion_sc' );
