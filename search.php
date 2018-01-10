<?php get_header() ?>

<div id="acn_int" class="l-wrap" >
  <?php get_search_form(); ?>
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <div class="search-result">
        <h3 class="card-header">
            <a href="<?php the_permalink() ?>"><?php the_title() ?>  </a>
            <span class="badge"><?php echo get_post_type() ?></span>
        </h3>
        <div class="search-result-permalink"><?php the_permalink() ?></div>
        <?php 
        $posttype = get_post_type();    
        if($posttype !== 'page'): ?>
        <div class="search-result-resume"><?php the_content() ?></div>
        <?php endif; ?>
    </div>
    
  <?php endwhile; else : ?>
    <h1>
    <?php echo "no results found" ?>
    </h1>
  <?php endif; ?>
</div>

<?php get_footer() ?>
