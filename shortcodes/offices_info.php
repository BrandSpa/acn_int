<?php

function bs_offices_info_sc($atts, $content = null) {
	$attributes = [
		'content' => '',
    'btn_title' => '',
    'background' => '#687f87',
    'btn_title_color' => '#fff'
  ];

  $at = shortcode_atts( $attributes , $atts );

	$props = [];

  ob_start();

foreach(getOfficesCountries() as $country):
  $country = space_to_lodash($country);
?>
<div class="col-3-l">
  <h6>ACN <?php echo $country !== 'default' ? $country : '' ?></h6>
  <h6><?php echo get_option('name_' . $country) ?></h6>
  <h6><?php echo get_option('contact_info_address_' . $country) ?></h6>
  <h6><?php echo get_option('contact_info_email_' . $country) ?></h6>
  <h6><?php echo get_option('contact_info_phone_' . $country) ?></h6>
  <ul class="bs-contact-info__social">
    <?php if( !empty(get_option('contact_facebook_' . $country)) ): ?>
    <li>
      <a href="<?php echo get_option('contact_facebook_' . $country) ?>">
        <i class="ion-social-facebook"></i>
      </a>
    </li>
    <?php endif; ?>
    <?php if( !empty(get_option('contact_twitter_' . $country)) ): ?>
    <li>
      <a href="<?php echo get_option('contact_twitter_' . $country) ?>">
        <i class="ion-social-twitter"></i>
      </a>
    </li>
    <?php endif; ?>
    <?php if( !empty(get_option('contact_youtube_' . $country)) ): ?>
    <li>
      <a href="<?php echo get_option('contact_youtube_' . $country) ?>">
        <i class="ion-social-youtube"></i>
      </a>
    </li>
    <?php endif; ?>
    <?php if( !empty(get_option('contact_instagram_' . $country)) ): ?>
    <li>
      <a href="<?php echo get_option('contact_instagram_' . $country) ?>">
        <i class="ion-social-instagram"></i>
      </a>
    </li>
    <?php endif; ?>
  </ul>
</div>
<?php
  endforeach;
  return ob_get_clean();
}

add_shortcode( 'bs_offices_info', 'bs_offices_info_sc' );
