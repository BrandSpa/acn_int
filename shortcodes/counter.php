<?php

add_shortcode('bs_counter', 'bs_counter_sc');

function bs_counter_sc( $atts ) {
  $at = shortcode_atts([
    'num' => '1000',
    'style' => '',
    'classes' => ''
  ], $atts );

  ob_start();
  ?>

  <div
    class="bs-counter <?php echo $at['classes'] ?>"
    style="<?php echo $at['style'] ?>"
    data-props='{
      "time": 700,
      "delay": 10,
      "num": "<?php echo $at['num'] ?>"
    }'
  ></div>

  <?php
  return ob_get_clean();
}

add_action( 'vc_before_init', 'bs_counter_vc' );

  function bs_counter_vc() {
		$params = [
      [
        "type" => "textfield",
        "heading" => "Number",
        "param_name" => 'num',
        "value" => '1000'
      ],
      [
        "type" => "textfield",
        "heading" => "Style",
        "param_name" => 'style',
        "value" => ''
      ],
      [
        "type" => "textfield",
        "heading" => "Custom classes",
        "param_name" => 'classes',
        "value" => ''
      ]
		];

  	vc_map(
      array(
        "name" =>  "BS Counter",
        "base" => "bs_counter",
        "category" =>  "BS",
        "params" => $params
      )
    );
  }
