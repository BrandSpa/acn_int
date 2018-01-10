<form role="search" method="get" action="<?php echo home_url('/search') ?>">
    <input 
        type="search" 
        class='form-control' 
        placeholder="Search" 
        value="<?php echo get_search_query(); ?>" 
        name="s" 
        title="search"
    >
</form>