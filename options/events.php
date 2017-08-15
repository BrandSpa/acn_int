<?php
add_action('admin_menu', 'bs_admin_events_options_menu');

function bs_admin_events_options_menu() {
		add_menu_page(
    'Brandspa theme options',
    'Accounts Info', //menu name
    'manage_options', //allow it options
    'bs-events', //slug
    'bs_events_options',
    get_template_directory_uri() . '/public/img/bs.png', //icon on menu
    113 //position on menu
  );
}

function bs_events_options() {
  $paged = isset($_GET['paged']) ? $_GET['paged'] : 0;
  $perpage = isset($_GET['perpage']) ? $_GET['perpage'] : 25;

  $query = new Wp_Query(array(
    'post_type' => 'event',
    'paged' => $paged,
		'posts_per_page' => $perpage
  ));

  $posts = $query->get_posts();

  ?>

  <table class="table">
    <thead>
      <tr>
        <td>event name</td>
        <td>content</td>
      </tr>
    </thead>
    <tbody>
      <?php foreach($posts as $post): ?>
        <tr>
          <td><?php echo  $post->post_title ?></td>
          <td><?php echo $post->post_content ?></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>

  <?php
  }
