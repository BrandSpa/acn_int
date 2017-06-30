<?php

function acn_fullpage_sc( $atts, $content ) {
	$at = shortcode_atts([
		"unique_name" => "fullpage",
		"links" => "",
		"intro" => "",
	], $atts);

	$links = empty(vc_param_group_parse_atts($at['links'])) ? [] : vc_param_group_parse_atts($at['links']);
	$intro = empty(vc_param_group_parse_atts($at['intro'])) ? [] : vc_param_group_parse_atts($at['intro']);
	$introCount = count($intro);

	function get_delay($a, $b) {
		return $a + $b;
	}

	$introDelay = array_reduce($intro, 'get_delay', 0);

	ob_start();
?>

	<div id="fullpage">
		<?php echo do_shortcode($content) ?>
	</div>

	<div class="indicator">
		<div class="indicator__story">1</div>
		<div class="indicator__index">1</div>
	</div>

	<div class="fullpage-nav">
		<ul>
		<?php foreach($links  as $ind => $link): ?>
			<li><a href="<?php echo $link['link'] + 1 ?>"><span class="num"><?php echo $ind ?></span> <?php echo  $link['title'] ?></a></li>
		<?php endforeach; ?>
		</ul>
		
		<button class="fullpage-nav__close"><i class="ion-close-round"></i></button>

		<div class="fullpage-nav__info">
			<ul>
				<li><a href="#">Privacidad</a></li>	
				<li><a href="#">Condiciones</a></li>	
				<li><a href="#">Español</a></li>	
			</ul>	
		</div>
	</div>

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
				<h1><?php echo $item['title'] ?></h1>
			</div>
		</div>
		<?php endforeach; ?>
	
	</div>

	<script>
		
		if(window.localStorage.getItem('intro') !== true) {
			setTimeout(function introDelay() { 
				$('.intro').addClass('intro--close');
				window.localStorage.setItem('intro', true);
			}, <?php echo $introDelay ?>);
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