<?php get_header() ?>

<div id="acn_int" class="l-wrap" >
  <?php get_search_form(); ?>
  <ul class="search-results">
  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <li class="bs-posts-list__item">

        <?php if(get_the_post_thumbnail_url()): ?>
            <a href="">
            <div class="bs-posts-list__item__img" style="background-image: url(<?php echo get_the_post_thumbnail_url()?>)"></div>
            </a>
        <?php endif; ?>
        <div class="bs-posts-list__item__content">
            <h2 class="card-header">
                <a href="<?php the_permalink() ?>"><?php the_title() ?>  </a>
                <span class="badge"><?php echo get_post_type() ?></span>
            </h2>
            <?php 
            $posttype = get_post_type();    
            if($posttype !== 'page'): ?>
            <div class="resume"><?php the_excerpt() ?></div>
            <?php endif; ?>
        </div>
        

    </li>
    
  <?php endwhile; else : ?>
    <h3 class="search-empty-message">
    <?php echo "<span class='bold-message'>". get_search_query() ."</span> ". __("did not match any post") ?>
    </h3>
  <?php endif; ?>
  </ul>
</div>

<?php get_footer() ?>
