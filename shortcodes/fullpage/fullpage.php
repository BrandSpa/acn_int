<?php

function acn_fullpage_sc( $atts, $content ) {
	$at = shortcode_atts([
		"unique_name" => "fullpage",
		"anchor" => ""
	], $atts);

	ob_start();
	?>
		<div id="<?php echo $at['unique_name'] ?>">
			<?php echo do_shortcode($content) ?>
		</div>
		<script>
			onLoad(function() {

				$('#<?php echo $at['unique_name'] ?>').fullpage({
					lazyLoading: false,
					afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
						console.log(anchorLink, index, slideAnchor, slideIndex);
					},
					onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
						console.log(anchorLink, index, slideIndex, direction, nextSlideIndex);
					} 
				});

				$(document).on('click', '.section__open-post', function(e) {
					var $postSection =  $(this).closest('.fp-tableCell').find('.section__post');
					if($postSection.hasClass('section__post--open')) {
						$.fn.fullpage.setAllowScrolling(true);
						$postSection.removeClass('section__post--open');
					} else {
						$.fn.fullpage.setAllowScrolling(false);
						$postSection.addClass('section__post--open');
					}
					
					
				});

			});

	
		</script>
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage', 'acn_fullpage_sc' );