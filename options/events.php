<?php
add_action('admin_menu', 'bs_admin_events_options_menu');

function bs_admin_events_options_menu() {
		add_menu_page(
    'Brandspa theme options',
    'Accounts Info', //menu name
    'manage_options', //allow it options
    'bs-accounts', //slug
    'bs_events_options',
    get_template_directory_uri() . '/public/img/bs.png', //icon on menu
    113 //position on menu
  );
}

function bs_events_options() {
  ?>

  <table class="table">
    <thead>
      <tr>
        <td>event name</td>
        <td>content</td>
      </tr>
    </thead>

  </table>

  <?php
  }
