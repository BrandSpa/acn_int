<?php

function acn_fullpage_sc( $atts, $content ) {
	$at = shortcode_atts([
		"unique_name" => "fullpage",
		"links" => ""
	], $atts);

	$links = empty(vc_param_group_parse_atts($at['links'])) ? [] : vc_param_group_parse_atts($at['links']);

	$anchors = array_map(function($link) {
		return $link['anchor'];
	}, $links);
	ob_start();
	
	?>
		<div id="<?php echo $at['unique_name'] ?>">
			<?php echo do_shortcode($content) ?>
		</div>
		<ul id="<?php echo $at['unique_name'] ?>-menu">
			<?php foreach($links as $link): ?>
				<li data-menuanchor="<?php echo $link['anchor'] ?>" class="active"><a href="#<?php echo $link['anchor'] ?>"><?php echo $link['title'] ?></a></li>
			<?php endforeach; ?>
		</ul>

		<script>
			onLoad(function() {
				$('#<?php echo $at['unique_name'] ?>').fullpage({
					anchors: <?php echo json_encode($anchors) ?>,
					lazyLoading: false,
					responsiveSlides: true,
					anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
					afterRender: function(anchorLink, index, slideAnchor, slideIndex){
						lazySizes.init();
					},
					afterSlideLoad: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
						console.log('after slide load');
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

				$(document).on('click', '.section__down', function() {
					$.fn.fullpage.moveSectionDown();
				});

			});

	
		</script>
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage', 'acn_fullpage_sc' );