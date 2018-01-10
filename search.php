<?php get_header() ?>

<div id="acn_int" class="l-wrap" >
  <?php get_search_form(); ?>
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <div>
        <h3><?php the_title() ?>  <span><?php echo get_post_type() ?></span></h3>
        <?php 
        $posttype = get_post_type();    
        if($posttype !== 'page'): ?>
        <p><?php the_content() ?></p>
        <?php endif; ?>
        <p><?php the_permalink() ?></p>
    </div>
    
  <?php endwhile; else : ?>
    <h1>
    <?php echo "no results found" ?>
    </h1>
  <?php endif; ?>
</div>

<?php get_footer() ?>
