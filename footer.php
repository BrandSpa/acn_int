	<?php require('templates/footer.php') ?>
  
	<!--wordpress files-->
	  <?php wp_footer() ?>
	<!-- /wordpress files-->

	<!--async load app-->
<script type="text/javascript">
  function appendScript(src) {
    var element = document.createElement("script");
    element.src = src;
    document.body.appendChild(element);
  }

  function appendLink(href) {
    var element = document.createElement("link");
    element.rel = 'stylesheet';
    element.href = href;
    element.type = 'text/css';
    element.media = 'all';
    document.head.appendChild(element);
  }

  function downloadJS (){
    []
    .forEach(function(src) {
      appendScript(src);
    });
  }

  if (window.addEventListener) {
    window.addEventListener("load", downloadJS, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", downloadJS);
  } else {
    window.onload = downloadJS;
  }
</script>
	<!--/async load app-->
<script>
  var bs = {};
  bs.donate = '<?php echo gett('Donate') ?>'
</script>

<script src='<?php echo get_template_directory_uri() ?>/public/js/vendor.b88ac334fa1aa8b5829b.js'></script>
<script src='<?php echo get_template_directory_uri() ?>/public/js/app.473b77be26ee9f468b17.js'></script>
<script>

  
</script>
<!--/app theme-->

 <!-- Google Analytics -->
  <script src='https://www.google-analytics.com/analytics.js'></script>

  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

  ga('create', '<?php echo get_option('analytics_id') ?>', 'auto');
  ga('send', 'pageview');
  ga('require', 'ecommerce');  
</script>
<!-- End Google Analytics -->

</body>
</html>
