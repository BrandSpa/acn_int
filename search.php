<?php get_header() ?>

<div id="acn_int" class="l-wrap" >
  <?php get_search_form(); ?>
  <ul>
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <li class="search-result">
        <h3 class="card-header">
            <a href="<?php the_permalink() ?>"><?php the_title() ?>  </a>
            <span class="badge"><?php echo get_post_type() ?></span>
        </h3>
        <div class="permalink">
            <a href="<?php the_permalink() ?>"><?php the_permalink() ?></a>
        </div>
        <?php 
        $posttype = get_post_type();    
        if($posttype !== 'page'): ?>
        <div class="search-result-resume"><?php the_content() ?></div>
        <?php endif; ?>
    </li>
    
  <?php endwhile; else : ?>
    <h1>
    <?php echo "no results found" ?>
    </h1>
  <?php endif; ?>
  </ul>
</div>

<?php get_footer() ?>
