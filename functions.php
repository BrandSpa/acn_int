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
require_once 'lib/clean_menu.php';
require_once 'lib/space_to_lodash.php';
require_once 'lib/translation.php';
require_once 'lib/is_mobile.php';
require_once 'lib/infusionsoft.php';
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
require_once 'lib/get_lang_tag.php';
require_once 'lib/get_continents.php';
require_once 'lib/country_code.php';

//TRANSLATIONS
require_once 'translations/index.php';

//APIS
require_once 'apis/index.php';
include_once 'apis/stripe.php';
include_once 'apis/convertloop.php';
include_once 'apis/mailchimp.php';
include_once 'apis/infusion.php';
include_once 'apis/posts.php';
include_once 'apis/events.php';
include_once 'apis/contact_us.php';
// APIS AJAX
include_once 'apis/ajax/convertloop.php';
include_once 'apis/ajax/mailchimp.php';
include_once 'apis/ajax/donate.php';
include_once 'apis/ajax/stripe.php';
include_once 'apis/ajax/contact_us.php';

//OPTIONS
require_once 'options/index.php';

//SHORTCODES
require_once 'shortcodes/index.php';

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
require_once 'metaboxes/index.php';

$post_types = array( 'video', 'gallery','featured' );


function cd_meta_box_add(){
	foreach( $post_types as $post_type) {
		add_meta_box('page_image_square', 'Square Image', 'bs_page_image_square_cb', $post_type, 'normal', 'high', null);
	}
}
add_action( 'add_meta_boxes', 'cd_meta_box_add' );
add_theme_support( 'post-thumbnails', ['post', 'gallery', 'video'] );
add_theme_support( 'html5', ['search-form'] );

add_filter( 'upload_mimes', 'add_svg_mime' );
add_rewrite_endpoint( 's', EP_PERMALINK | EP_PAGES );

function search_template_redirect()
{
    if( is_page( 'search' ) )
    {
        wp_redirect( home_url( '/search/' ) );
        die;
    }
}
add_action( 'template_redirect', 'my_page_template_redirect' );

add_filter( 'wp_nav_menu_items','add_search_box', 10, 2 );
function add_search_box( $items, $args ) {
    if( $args->theme_location == 'header' ) // only for primary menu
    {
        $items_array = array();
        while ( false !== ( $item_pos = strpos ( $items, '<li', 2 ) ) )
        {
            $items_array[] = substr($items, 0, $item_pos);
            $items = substr($items, $item_pos);
        }
       
        $items_array[] = '<li id="toggle-search" ><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon"><g class="large-icon" style="fill: currentColor">
        <path d="M21,19.67l-5.44-5.44a7,7,0,1,0-1.33,1.33L19.67,21ZM10,15.13A5.13,5.13,0,1,1,15.13,10,5.13,5.13,0,0,1,10,15.13Z"></path>
        </g></svg></li>';
        $items_array[] = $items;

        $items = implode('', $items_array);
    }
	return $items;
}

function add_svg_mime( $existing_mimes = array() ) {
	$existing_mimes['svg'] = 'image/svg+xml';
	return $existing_mimes;
}

add_post_type_support( 'page', 'excerpt' );


function pagination_links( $type = 'list', $endsize = 1, $midsize = 1 ) {
    global $wp_query, $wp_rewrite;  
    $current = get_query_var( 'paged' ) > 1 ? get_query_var('paged') : 1;

    // Sanitize input argument values
    if ( ! in_array( $type, array( 'plain', 'list', 'array' ) ) ) $type = 'plain';
    $endsize = absint( $endsize );
    $midsize = absint( $midsize );

    // Setup argument array for paginate_links()
    $pagination = array(
        'base'      => @add_query_arg( 'paged', '%#%' ),
        'format'    => '',
        'total'     => $wp_query->max_num_pages,
        'current'   => $current,
        'show_all'  => false,
        'end_size'  => $endsize,
        'mid_size'  => $midsize,
        'type'      => $type,
        'prev_text' => '<i class="ion-chevron-left"></i> '. gett('prev'),
        'next_text' => gett('next') . ' <i class="ion-chevron-right"></i>'
    );

    if ( $wp_rewrite->using_permalinks() )
        $pagination['base'] = user_trailingslashit( trailingslashit( remove_query_arg( 's', get_pagenum_link( 1 ) ) ).'page/%#%/', 'paged' );

    if ( ! empty( $wp_query->query_vars['s'] ) )
        $pagination['add_args'] = array( 's' => get_query_var( 's' ) );

    return paginate_links( $pagination );
}

function arphabet_widgets_init() {
	register_sidebar( array(
		'name'          => 'Sidebar Area',
		'id'            => 'post_widget_area',
		'before_widget' => '<div class="widget-area">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'arphabet_widgets_init' );