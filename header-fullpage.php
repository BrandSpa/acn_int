<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=0">
  <meta name="theme-color" content="#f1364e">
  <meta property="title" content="<?php echo get_the_title(); ?>" />
  	<title>ACN - Aid to the Church in Need <?php echo wp_title(); ?></title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

    <!--wordpress files-->
	  <?php wp_head(); ?>
		<!-- /wordpress files-->
  
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/client/css/fullpage.css?v=<?php echo filemtime(get_template_directory() . '/client/css/fullpage.css') ?>">
	<link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

	<script>
      function onLoad(cb) {
        if (window.addEventListener)
          window.addEventListener("load", cb, false);
        else if (window.attachEvent) {
          window.attachEvent("onload", cb);
        } else {
          window.onload = cb;
        }
      }
  </script>

</head>
<body>
