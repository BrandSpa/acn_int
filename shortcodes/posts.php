<?php

function bs_posts_sc($atts, $content = null) {
	$attributes = [ 'url' => '' ];

  $at = shortcode_atts( $attributes , $atts );

	$query = new Wp_Query(array(
		'post_type' => array('video','gallery','featured','post'),
		'posts_per_page' => 6,
		'post_status' => 'publish'
	));

	$posts = array_map(function($post) {
			$post->post_image = str_replace('http:', '', get_post_meta($post->ID, 'image_square_key', true));
			$content = substr($post->post_content, 0, 250) ? substr($post->post_content, 0, 250) : $post->post_content;
			$post->post_short = preg_replace('/\[(.*?)\]/', '', wp_strip_all_tags($content, 0, 250) );
			$post->post_permalink = get_post_permalink($post->ID);
			return $post;
	}, $query->get_posts());

	$props = [
    'see_more' => gett('See more'),
    'url' => $at['url'],
    'read_more' => gett('Read more'),
    'see_more_link' => gett('https://acninternational.org/news/'),
		'posts' => $posts
	];

  ob_start();
?>
<?php if(show_posts()): ?>
<div
	class="bs-posts"
	data-props='<?php echo json_encode($props) ?>'
>
</div>
<?php endif; ?>
<?php

  return ob_get_clean();
}

add_shortcode( 'bs_posts', 'bs_posts_sc' );
add_action( 'vc_before_init', 'bs_posts_vc' );

  function bs_posts_vc() {
		$params = [
      [
        "type" => "textfield",
        "heading" => "See More url",
        "param_name" => "url",
        "value" => ''
			]
		];

  	vc_map(
      array(
        "name" =>  "BS posts",
        "base" => "bs_posts",
        "category" =>  "BS",
        "params" => $params
      )
    );
  }
