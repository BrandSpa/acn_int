<?php

function bs_get_url_val_sc( $atts ) {
  $at = shortcode_atts([
    'field' => ''
  ], $atts );

  ob_start();
  ?>

  <?php isset($_GET[$at['field']]) ? echo $_GET[$at['field']] : '' ?>

  <?php
  return ob_get_clean();
}

add_shortcode('bs_get_url_val', 'bs_get_url_val_sc');
