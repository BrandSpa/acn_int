<?php
/*
 * BrandSpa (http://brandspa.com)
 * Alejandro Sanabria <alejandro@brandspa.com>
 * Copyright 2017 BrandSpa
 */

//MENUS
require_once 'lib/menus.php';

//POSTS TYPES
require_once 'lib/post_type.php';

//CLEAN THEME
require_once 'lib/clean_theme.php';

//LIBS
require_once('lib/clean_menu.php');
require_once('lib/space_to_lodash.php');
require_once('lib/translation.php');
require_once('lib/is_mobile.php');
require_once('lib/infusionsoft.php');
require_once 'lib/get_lang.php';
require_once 'lib/show_posts.php';
require_once 'lib/show_donate.php';
require_once 'lib/get_home_url.php';
require_once 'lib/replace_office_texts.php';
require_once 'lib/logo_url.php';
require_once 'lib/in_office.php';
require_once 'lib/geolify.php';
require_once 'lib/redirect_to_lang.php';
require_once 'lib/redirect_ajax.php';
require_once 'lib/clean_quote.php';

//TRANSLATIONS
require_once('translations/index.php');

//APIS
require_once('apis/index.php');
include_once 'apis/mailchimp.php';
include_once 'apis/stripe.php';
include_once 'apis/infusion.php';
include_once 'apis/posts.php';
include_once 'apis/cl.php';

//OPTIONS
require_once('options/index.php');

//SHORTCODES
require_once('shortcodes/contact_form.php');
require_once('shortcodes/header_slider.php');
require_once('shortcodes/projects.php');
require_once('shortcodes/projects_about.php');
require_once('shortcodes/projects_info.php');
require_once('shortcodes/section_video.php');
require_once('shortcodes/section_video_content.php');
require_once('shortcodes/accordion.php');
require_once('shortcodes/donate.php');
require_once('shortcodes/donate_inline.php');
require_once('shortcodes/donate_inline_section.php');
require_once('shortcodes/donate_section.php');
require_once('shortcodes/posts.php');
require_once('shortcodes/contact_info.php');
require_once('shortcodes/posts_list.php');
require_once('shortcodes/campaigns_slider.php');
require_once('shortcodes/download_pdf.php');
require_once('shortcodes/share.php');
require_once('shortcodes/breadcrumb.php');
require_once('shortcodes/modal_gallery.php');
require_once('shortcodes/single_modal.php');
require_once('shortcodes/tri_news.php');
require_once('shortcodes/post_share.php');
require_once('shortcodes/arrow.php');
require_once('shortcodes/carousel.php');
require_once('shortcodes/carousel_item.php');
require_once('shortcodes/post_item.php');
require_once('shortcodes/post_item_square.php');
require_once('shortcodes/latest_news.php');
require_once('shortcodes/banner_donation.php');
require_once('shortcodes/candle.php');
require_once('shortcodes/video_modal_bg.php');
require_once('shortcodes/counter.php');

//FULLPAGE
require_once('shortcodes/fullpage/fullpage.php');
require_once('shortcodes/fullpage/fullpage_slide.php');
require_once('shortcodes/fullpage/fullpage_slide_layers.php');
require_once('shortcodes/fullpage/fullpage_slide_post.php');
require_once('shortcodes/fullpage/fullpage_slide_video.php');
require_once('shortcodes/fullpage/fullpage_slide_video_layers.php');
require_once('shortcodes/fullpage/fullpage_slide_points.php');
require_once('shortcodes/fullpage/fullpage_slide_end.php');
require_once('shortcodes/fullpage/fullpage_modal.php');

require_once('shortcodes/fullpage/vc/fullpage.php');
require_once('shortcodes/fullpage/vc/fullpage_slide.php');
require_once('shortcodes/fullpage/vc/fullpage_slide_layers.php');
require_once('shortcodes/fullpage/vc/fullpage_slide_post.php');
require_once('shortcodes/fullpage/vc/fullpage_slide_video.php');
require_once('shortcodes/fullpage/vc/fullpage_slide_video_layers.php');
require_once('shortcodes/fullpage/vc/fullpage_slide_points.php');
require_once('shortcodes/fullpage/vc/fullpage_slide_end.php');
require_once('shortcodes/fullpage/vc/fullpage_modal.php');

//METABOXES
require_once('metaboxes/image_square.php');
require_once('metaboxes/geolify.php');
require_once('metaboxes/video.php');
require_once('metaboxes/gallery.php');

$post_types = array( 'video', 'gallery','featured' );

foreach( $post_types as $post_type) {
  add_meta_box('page_image_square', 'Square Image', 'bs_page_image_square_cb', $post_type, 'normal', 'high', null);
}

add_theme_support( 'post-thumbnails', ['post', 'gallery', 'video'] );


add_filter( 'upload_mimes', 'add_svg_mime' );

function add_svg_mime( $existing_mimes = array() ) {
	$existing_mimes['svg'] = 'image/svg+xml';
	return $existing_mimes;
}

	add_post_type_support( 'page', 'excerpt' );
