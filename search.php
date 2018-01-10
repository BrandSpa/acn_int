<?php get_header() ?>

<div id="acn_int" class="l-wrap" >
  <?php get_search_form(); ?>
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <div>
        <h3><?php the_title() ?></h3>
        <div><?php the_excerpt(); ?> </div>
    </div>
    
  <?php endwhile; else : ?>
    <h1>
    <?php echo "no results found" ?>
    </h1>
  <?php endif; ?>
</div>

<?php get_footer() ?>
