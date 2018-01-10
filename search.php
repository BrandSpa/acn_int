<?php get_header() ?>

<div id="acn_int" class="l-wrap" >
  <?php get_search_form(); ?>
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <div>
        <h3><?php the_title() ?>  <span><?php get_post_type() ?></span></h3>
        <p><?php the_permalink() ?></p>
    </div>
    
  <?php endwhile; else : ?>
    <h1>
    <?php echo "no results found" ?>
    </h1>
  <?php endif; ?>
</div>

<?php get_footer() ?>
