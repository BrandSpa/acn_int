<?php get_header() ?>
<div class="search-container">
    <div id="acn_int" class="l-wrap" >
   
    <?php if ( have_posts() ) : ?>
    <ul class="search-results row">
    <?php while ( have_posts() ) : the_post(); ?>
        <li class="bs-posts-list__item row">

            <?php if(get_the_post_thumbnail_url() || get_option('logo')): ?>
                <div class="col-xs-5 col-md-3" style="background-image: url(<?php echo get_post_meta($post->ID, 'image_square_key', true)?:get_option('logo') ?>);background-size: 100% auto; background-position: center center; background-repeat: no-repeat;">
                    <a href="<?php the_permalink() ?>">
                    <div 
                        class="" 
                        style="">
                        <img src="<?php echo get_post_meta($post->ID, 'image_square_key', true)?:get_option('logo') ?>" style="visibility:hidden; max-width:100%">
                    </div>
                    </a>
                </div>
                
            <?php endif; ?>
            <div class="bs-posts-list__item__content col-xs-7 col-md-9">
                <h2 class="card-header">
                    <a href="<?php the_permalink() ?>"><?php the_title() ?>  </a>
                    <span class="badge"><?php echo get_post_type() ?></span>
                </h2>
                <?php 
                $posttype = get_post_type();    
                if($posttype !== 'page'): ?>
                <div class="resume"><p><?php the_excerpt() ?></p></div>
                <?php endif; ?>
            </div>
            
        </li>
        
    <?php endwhile; ?>
    </ul>   
    <div class="pagination row">
        <?php print_r(pagination_links()); ?>
    </div>
    <?php else : ?>
        <h3 class="search-empty-message">
        <?php echo "<span class='bold-message'>". get_search_query() ."</span> ". __("did not match any post") ?>
        </h3>
    <?php endif; ?>
    
    </div>
</div>


<?php get_footer() ?>
