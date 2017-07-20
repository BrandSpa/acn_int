<?php

function acn_fullpage_slide_points_sc( $atts, $content ) {
	$at = shortcode_atts([
		"title" => "",
		"subtitle" => "",
		"bg_color" => "#fff",
		"bg_img" => "",
		"bg_img_mobile" => "",
		"story_num" => "",
		"index_num" => "",
		"uniq_name" => "slide-" . uniqid() . rand(0, 100),
		"contents" => ""
	], $atts);

	$bgUrl = wp_get_attachment_url( $at['bg_img'] );
	$contents = empty(vc_param_group_parse_atts($at['contents'])) ? [] : vc_param_group_parse_atts($at['contents']);
	$points = [
		'Telleskuf' => [
			'x' => '1219.55',
			'y' => '155.68',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Alqosh' => [
			'x' => '1422.68',
			'y' => '125'
		],
		'Baqofa' => [
			'x' => '1302.85',
			'y' => '225.32',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Batnaya' => [
			'x' => '1219.66',
			'y' => '275.41',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Telekef' => [
			'x' => '1139.8',
			'y' => '352.83',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Mosul' => [
			'x' => '1013',
			'y' => '411.91',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Bahzani' => [
			'x' => '1439.68',
			'y' => '409.84',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Bashiqua' => [
			'x' => '1351.85',
			'y' => '466.08',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Bartella' => [
			'x' => '1276.32',
			'y' => '625.78',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Karamless' => [
			'x' => '1236.11',
			'y' => '786.49',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		],
		'Qaraqosh/Bakhdida' => [
			'x' => '1072.1',
			'y' => '774.85',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
		]
	];
	ob_start();
	?>

	<div
	class="section section--<?php echo $at['uniq_name'] ?>"
	data-anchor="<?php echo $at['uniq_name'] ?>"
	data-story="<?php echo $at['story_num'] ?>"
	data-index="<?php echo $at['index_num'] ?>"
	>

	<div class="section__content">
		<?php echo do_shortcode($content) ?>
		<div class="map-points__container">
			<svg class="map-points" width="1409" height="695" preserveAspectRatio="xMidYMid slice" viewBox="150 0 1600 1000">
				<image class="hotspot__bg-image" width="1920" height="1080"
				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/fondoSin.jpg">
			</image>
			<defs>
				<filter id="pin-drop-shadow" height="150%" width="150%" x="-0.2">
					<feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"></feGaussianBlur>
					<feOffset in="blur" result="offsetBlur" dy="5"></feOffset>
					<feFlood flood-color="#000" flood-opacity="0.5"></feFlood>
					<feComposite operator="in" in2="offsetBlur"></feComposite>
					<feMerge>
						<feMergeNode></feMergeNode>
						<feMergeNode in="SourceGraphic"></feMergeNode>
					</feMerge>
				</filter>

				<filter id="logo-drop-shadow" height="150%" width="150%" x="-0.2">
					<feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"></feGaussianBlur>
					<feOffset in="blur" result="offsetBlur" dy="5"></feOffset>
					<feFlood flood-color="#000" flood-opacity="0.5"></feFlood>
					<feComposite operator="in" in2="offsetBlur"></feComposite>
					<feMerge>
						<feMergeNode></feMergeNode>
						<feMergeNode in="SourceGraphic"></feMergeNode>
					</feMerge>
				</filter>

			<?php foreach($points as $name => $point): ?>
				<pattern id="<?php echo $name ?>-img" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
					<image x="0" y="0" height="50" width="50" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo $point['image'] ?>">
					</image>
				</pattern>
			<?php endforeach; ?>

</defs>

<g class="map-points__spots">
	<?php foreach($points as $name => $point): ?>
 	<g transform="translate(<?php echo $point['x'] ?>, <?php echo $point['y'] ?>)" class="map-points__spot"   data-content="<?php echo $name ?>">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#<?php echo $name ?>-img)" filter="url(#pin-drop-shadow)"></circle>
			<g class="hotspot__pin-360" transform="translate(13, -48) scale(1.1, 1.1)">
				<ellipse cx="0" cy="25" rx="10" ry="10" filter="url(#logo-drop-shadow)"></ellipse>
				<g transform="translate(-4, 30)" font-size="15" font-family="Roboto-Regular, Roboto" fill="#EE364D" font-weight="normal">
					<text><tspan fill="#EE364D" x="0" y="0">+</tspan></text>
				</g>
			</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em"><?php echo $name ?></tspan>
			</text>
	</g>
	</g>
<?php endforeach; ?>
</g>
</svg>
</div>

</div>

	<button class="section__open section__close-spot-content"> <i class="ion-close-round"></i> </button>
	<?php foreach($contents as $cont): ?>
		<?php require('points_content.php') ?>
	<?php endforeach; ?>
</div>

<?php
return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_points', 'acn_fullpage_slide_points_sc' );
