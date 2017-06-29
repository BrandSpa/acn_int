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

		<style>
			#<?php echo $at['unique_name'] ?> {
				height: 100%;
			}
		</style>

		<script>
		window.lazySizesConfig = window.lazySizesConfig || {};
		window.lazySizesConfig.init = false;

			onLoad(function() {

				$('#<?php echo $at['unique_name'] ?>').fullpage({
					menu: '#<?php echo $at['unique_name'] ?>-menu',
					recordHistory: false,
					lazyLoading: false,
					navigation: true,
					afterRender: function() {
						lazySizes.init();
					},
					afterLoad: function(section, index) {
						if(index == 1) {
							var next = index - 1;
							var $section = $(".section:eq(" + next + ")");
							$section.addClass('load-bgs');
						}
					},
					onLeave: function(index, nextIndex, direction) {
							var next = nextIndex - 1;
							var $section = $(".section:eq(" + next + ")");
							$section.addClass('load-bgs');
					}
				});

				function closePost($postSection) {
						$.fn.fullpage.setAllowScrolling(true);
						$postSection.removeClass("section__post--open");
						$(this).find('i').removeClass('ion-close-round');
						$(this).find('i').addClass('ion-android-open');
				}

				function openPost($postSection) {
					$.fn.fullpage.setAllowScrolling(false);
					$postSection.addClass("section__post--open");
					$(this).find('i').removeClass('ion-android-open');
					$(this).find('i').addClass('ion-close-round');
				}

				function closeVideo() {
						var $videoSection = $(this).parent();
						var $iframe = $videoSection.find('iframe');
						$.fn.fullpage.setAllowScrolling(true);
						$iframe.attr('src', '');
						$videoSection.removeClass("section__video--open");
				}

				function openVideo($videoSection) {
					$.fn.fullpage.setAllowScrolling(false);
					$videoSection.addClass("section__video--open");
					var $iframe = $videoSection.find('iframe');
					var src = $iframe.data('src');
					$iframe.attr('src', src);
				}

				$(document).on("click", ".section__open-post", function handleTogglePost(e) {
					var $postSection = $(this).closest(".fp-tableCell").find(".section__post");

					if ($postSection.hasClass("section__post--open")) {
						closePost.call(this, $postSection);
					} else {
						openPost.call(this, $postSection);
					}
				});

				$(document).on("click", ".section__open-video", function handleToggleVideo(e) {
					var $videoSection = $(this).closest(".fp-tableCell").find(".section__video");

					if ($videoSection.hasClass("section__video--open")) {
						closeVideo.call(this);
					} else {
						openVideo.call(this, $videoSection);
					}
				});				

				$(document).on("click", ".section__down", function() {
					$.fn.fullpage.moveSectionDown();
				});
			});	
		</script>
	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage', 'acn_fullpage_sc' );