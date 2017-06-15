<?php

function bs_get_posts($type = array('video','gallery','featured','post'), $paged = 0, $category = '', $perpage = '6') {
	$query = new Wp_Query(array(
    'post_type' => $type,
    'paged' => $paged,
    'category_name' => $category,
		'posts_per_page' => $perpage,
		'post_status' => 'publish'
  ));

	$posts = array_map(function($post) {
			$thumbId = get_post_thumbnail_id($post->ID);
			$images = array_unique(get_post_meta($post->ID, 'image_square_key'));
			
			// $images = array_filter($images, function($img) { 
			// 	return strlen($img) > 0;
			// });

 			$post->post_image = $images;
			$content = substr($post->post_content, 0, 250) ? substr($post->post_content, 0, 250) : $post->post_content;
			$post->post_short = preg_replace('/\[(.*?)\]/', '', wp_strip_all_tags($content, 0, 250) );
			$post->post_permalink = get_post_permalink($post->ID);
			return $post;
	}, $query->get_posts());
	
	return $posts;
}

