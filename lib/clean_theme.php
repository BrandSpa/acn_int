<?php

function modify_jquery() {
	if (!is_admin()) {
		// comment out the next two lines to load the local copy of jQuery
		wp_deregister_script( 'wp-embed' );
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', false, '3.1.1', true);
		wp_register_script('lightbox2', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.9.0/js/lightbox.min.js', false, '2.9.0', true);
		wp_enqueue_script('jquery');
		wp_enqueue_script('lightbox2');
	}
}

add_action('init', 'modify_jquery');

function deactivate_plugin_conditional() {
	if(is_plugin_active('mpc-massive/mpc-massive.php')) {
		deactivate_plugins('mpc-massive/mpc-massive.php');
	}

	if(is_plugin_active('conditional-menus/init.php')) {
		deactivate_plugins('conditional-menus/init.php');
	}
}

add_action( 'init', 'deactivate_plugin_conditional' );


//remove emojies script
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
