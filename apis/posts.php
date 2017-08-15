<?php

function bs_get_posts(
	$type = array('video','gallery','featured','post'),
	$paged = 0,
	$category = '',
	$perpage = '6',
	$status) {

	$query = new Wp_Query(array(
    'post_type' => $type,
    'paged' => $paged,
    'category_name' => $category,
		'posts_per_page' => $perpage,
		'post_status' => $status
  ));

	$posts = array_map(function($post) {
			$images = !empty(get_post_meta($post->ID, 'image_square_key', true)) ? get_post_meta($post->ID, 'image_square_key', true) : '';
 			$post->post_image = str_replace('http:', '', $images);
			$content = substr($post->post_content, 0, 250) ? substr($post->post_content, 0, 250) : $post->post_content;
			$post->post_short = preg_replace('/\[(.*?)\]/', '', wp_strip_all_tags(substr($post->post_content, 0, 200)) );
			$post->post_content = '';
			$post->post_permalink = get_post_permalink($post->ID);
			return $post;
	}, $query->get_posts());

	return $posts;
}

function wp_get_posts() {
  $paged = isset($_POST['paged']) ? $_POST['paged'] : 0;
  $post_type = isset($_POST['post_type']) ? $_POST['post_type'] : array('video','gallery','featured','post');
  $category = isset($_POST['post_category']) ? $_POST['post_category'] : '';
  $perpage = isset($_POST['post_perpage']) ? $_POST['post_perpage'] : '6';
  $status = isset($_POST['post_status']) ? $_POST['post_status'] : 'publish';
	$cleanContent = isset($_POST['']) ?
  $res = bs_get_posts($post_type, $paged, $category, $perpage, $status);

  responseJson($res);
  die();
}

add_action( 'wp_ajax_nopriv_get_posts', 'wp_get_posts' );
add_action( 'wp_ajax_get_posts', 'wp_get_posts' );
