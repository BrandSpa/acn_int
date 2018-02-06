<?php get_header() ?>

<div id="acn_int" class="bs-post" >
<!--video template-->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php if(get_post_meta($post->ID, 'video_url_key', true)): ?>

<!--this call react component-->
<div class="bs-video-header" data-props='{
	"imageUrl": "<?php echo the_post_thumbnail_url( 'full' )  ?>",
	"videoUrl": "<?php echo get_post_meta($post->ID, 'video_url_key', true) ?>"
}'>
</div>

	<div class="l-wrap">
		
<script>
		onLoad(function() {
			var h = window.innerHeight;
			var navH = $('.nav').height() + 20;
			var titleH = $('.video__header-title').innerHeight();

			if(window.innerWidth > '700') {
				$('.video__header-title').css({position: 'relative', marginTop: '-' + titleH + 'px'});
			}
		});
	</script>
</div>

	
<?php endif; ?>

<div class="container">
<section class="single-content row">
	<!-- Social Area -->
	<aside class="social-sidebar col-md-1 col-xs-12 hidden-sm">
		<div class="sticky">
			<div
				class="bs-post-share"
				data-props='<?php echo json_encode($props) ?>'
			>
			</div>
		</div>
	</aside>

	<!-- Article Area -->
	<article class="col-md-8 col-xs-12 post-text article">

		<!-- Post Header -->
		<header>
			<?php if(!empty(get_the_post_thumbnail_url($post->ID, 'full'))): ?>
			<?php require('templates/post_header_image.php') ?>
			<?php else: ?>
			<?php require('templates/post_header.php') ?>
			<?php endif; ?>
		</header>
		<div class="sticky visible-sm">
			<div
				class="bs-post-share"
				data-props='<?php echo json_encode($props) ?>'
			>
			</div>
		</div>
		<div class="content">
			<?php the_content() ?>
		</div>
	
	</article>

	<!-- Widgets Area -->
	<aside class="col-md-3 col-xs-12 banner-vertical">
		<?php if ( is_active_sidebar( 'post_widget_area' ) ) : ?>
			<?php dynamic_sidebar( 'post_widget_area' ); ?>
		<?php endif; ?>
	</aside>
	
</section>
</div>

	<?php //require('templates/post_share.php') ?>
	<?php require('templates/post_donate.php') ?>


	<div class="l-wrap" style="margin: 40px auto">
		<h3 style="font-size: 28px; font-weight: normal; display: block; margin: 40px 0;color: #3C515F"><?php echo gett('Latest news'); ?></h3>
		<?php require('templates/post_latest.php') ?>
	</div>

  <?php endwhile; else : ?>
    <h2> <?php echo gett('404') ?> </h2>
  <?php endif; ?>
</div>

<?php get_footer() ?>
