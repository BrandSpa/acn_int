<script>
  var bs = {};
  bs.lang = '<?php echo getCountryLang(getCountry()) ?>';
  bs.donate = '<?php echo gett('Donate') ?>';
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src='<?php echo get_template_directory_uri() ?>/client/dist/vendor.js?v=<?php echo filemtime(get_template_directory() . '/client/dist/vendor.js') ?>'></script>
<script src='<?php echo get_template_directory_uri() ?>/client/dist/app.js?v=<?php echo filemtime(get_template_directory() . '/client/dist/app.js') ?>'></script>

<script
  src="<?php echo get_template_directory_uri() ?>/client/dist/vendor_me.js?v=<?php echo filemtime(get_template_directory() . '/client/dist/vendor_me.js') ?>"></script>
<script
  src="<?php echo get_template_directory_uri() ?>/client/dist/app_me.js?v=<?php echo filemtime(get_template_directory() . '/client/dist/app_me.js') ?>"></script>

  <!-- Google Analytics -->
   <script src='https://www.google-analytics.com/analytics.js'></script>

   <script>
   window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

   ga('create', '<?php echo get_option('analytics_id') ?>', 'auto');
   ga('send', 'pageview');
   ga('require', 'ecommerce');

   <?php if(isset($_GET['customer_id']) && isset($_GET['order_revenue'])): ?>
     ga('ecommerce:addTransaction', {
       id: "<?php echo $_GET['customer_id'] ?>",
       revenue: "<?php echo $_GET['order_revenue'] ?>",
 			currency: 'USD',
     });

     ga('ecommerce:send');
   <?php endif; ?>

 	<?php if(isset($_GET['event_action']) && isset($_GET['event_category']) && isset($_GET['event_label'])): ?>
 		//ANALYTICS EVENT
 		//category: SUBSCRIBE
 		//Action:  PRAYERNETWORK
 		//label: EN
 		ga('send', 'event', $_GET['event_category'], $_GET['event_action'], $_GET['event_label']);

 	<?php endif; ?>
 </script>

 <!-- End Google Analytics -->

 <!-- ConvertLoop -->
 <script>
 !function(t,e,n,s) { t.DPEventsFunction=s,t[s]=t[s] || function() { (t[s].q=t[s].q||[]).push(arguments) }; var c=e.createElement("script"),o=e.getElementsByTagName("script")[0]; c.async=1,c.src=n,o.parentNode.insertBefore(c,o); }(window, document, "https://www.convertloop.co/v1/loop.min.js", "_dp");

 _dp("configure", { appId: "746fffe4" });
 _dp("pageView");
 </script>
 <!-- End ConvertLoop -->

</body>
</html>
