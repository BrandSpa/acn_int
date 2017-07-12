<?php

function acn_fullpage_sc( $atts, $content ) {
	$at = shortcode_atts([
		"unique_name" => "fullpage",
		"story_name" => '',
		"link_privacy" => '#',
		"text_privacy" => 'Privacy',
		"link_terms" => '#',
		"text_terms" => 'terms',
		"link_lang" => '#',
		"text_lang" => 'español',
		"text_donate" => 'Donate',
		"link_donate" => '#',
		"text_pray" => 'Pray',
		"link_pray" => '#',
		"links" => "",
		"intro" => "",
		"show_intro" => false
	], $atts);

	$current_url = str_replace('//', 'https://', esc_url($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']));
	$links = empty(vc_param_group_parse_atts($at['links'])) ? [] : vc_param_group_parse_atts($at['links']);
	$intro = empty(vc_param_group_parse_atts($at['intro'])) ? [] : vc_param_group_parse_atts($at['intro']);
	$introCount = count($intro);

	function get_delay($a, $b) {
		return ($a['delay'] + $a['duration']) + ($b['delay'] + $b['duration']) * 1000;
	}

	$introDelay = array_reduce($intro, 'get_delay', 0);

	ob_start();
?>


<script type="text/javascript">
	function setMapSize() {
		$('.map-points').attr('width', $(window).width());
		$('.map-points').attr('height', $(window).height());
		if($(window).width() < 767) {
			$('.map-points').attr('viewBox', '250 0 1920 1080');
			$('.map-points__spots').attr('transform', 'translate(-40, 100)');
		}
	}

	onLoad(function() {
		setMapSize();

		$(window).on('resize', function() {
			setMapSize();
		});
	});
</script>

	<div id="fullpage">
		<?php echo do_shortcode($content) ?>
	</div>

	<div class="indicator">
		<div class="indicator__story">1</div>
		<div class="indicator__index">1</div>
		<div class="indicator__title"><?php echo $at['story_name'] ?></div>
	</div>
	<div class="fullpage--menu">
		<ul>
			<li>
				<a href="<?php echo $at['link_donate'] ?>">
					<?php echo $at['text_donate'] ?>
				</a>
			</li>
			<li>
				<a href="<?php echo $at['link_pray'] ?>">
					<?php echo $at['text_pray'] ?>
				</a>
			</li>
			<li class="fullpage--menu__share">
				<a href="#">
					<i class="ion-android-share-alt"></i>
					<ul>
						<li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $current_url ?>" ><i class="ion-social-facebook"></i></a></li>
						<li><a href="https://twitter.com/intent/tweet?text=<?php echo $current_url ?>"><i class="ion-social-twitter"></i></a></li>
					</ul>
				</a>

			</li>
		</ul>
	</div>


	<div class="fullpage-nav">
		<ul>
			<?php foreach($links  as $ind => $link): ?>
				<li><a href="<?php echo $link['link'] + 1 ?>"><span class="num"><?php echo $ind + 1 ?></span> <?php echo  $link['title'] ?></a></li>
			<?php endforeach; ?>
		</ul>

		<button class="fullpage-nav__close"><i class="ion-close-round"></i></button>

		<div class="fullpage-nav__info">
			<ul>
				<li><a href="<?php echo $at['link_privacy'] ?>"><?php echo $at['text_privacy'] ?></a></li>
				<li><a href="<?php echo $at['link_terms'] ?>"><?php echo $at['text_terms'] ?></a></li>
				<li><a href="<?php echo $at['link_lang'] ?>"><?php echo $at['text_lang'] ?></a></li>
			</ul>
		</div>
	</div>
<?php if($at['show_intro']): ?>
	<div class="intro">

	<?php foreach($intro as $i => $item): ?>
		<div
			class="
				intro__section
				intro--fade-in-out
				intro__section--duration-<?php echo $item['duration'] ?>
				intro__section--delay-<?php echo $item['delay'] ?>
			">
			<div class="intro__section__container">
				<h3><?php echo $item['title'] ?></h3>
			</div>
		</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>
	<script>

		if(window.localStorage.getItem('intro') !== 'true') {
			setTimeout(function introDelay() {
				$('.intro').addClass('intro--close');
				window.localStorage.setItem('intro', true);
			}, <?php echo $introDelay ?>);
		} else {
			$('.intro').css({display: 'none'});
		}

	</script>

	<style>
		#fullpage{
			height: 100%;
		}
	</style>

	<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage', 'acn_fullpage_sc' );
