<?php
function get_att_name($name) {
  $name = strtolower($name);
  return str_replace(" ", "_", $name);
}

function acn_fullpage_slide_points_sc( $atts, $content ) {

	$params = [
		"title" => "",
		"subtitle" => "",
		"bg_color" => "#fff",
		"bg_img" => "",
		"bg_img_mobile" => "",
		"story_num" => "",
		"index_num" => "",
		"uniq_name" => "slide-" . uniqid() . rand(0, 100),
		"contents" => ""
	];

	$titles = [
    'Damaged Houses',
    'Totally Destroyed',
    'Burnt',
    'Partially Damaged',
    'Number of Houses Actually Being Renovated',
    'Number of families prior to 2014',
    'Number of Houses Registered to be Renovated',
    'Number of Christians Returned',
    'Families returned to Nineveh Plains',
    'Properties already restored'
  ];

  foreach ($titles as $title) {
    $params[get_att_name($title)] = $title;
  }


	$at = shortcode_atts($params, $atts);

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
			'y' => '125',
			'image' => '/wp-content/uploads/2017/07/img150-1.jpg'
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
				  <polygon id="path-1" points="5.42101086e-20 0.0001 5.42101086e-20 197.878 134.575 197.878 134.575 0.0001"></polygon>


			<?php foreach($points as $name => $point): ?>
				<pattern id="<?php echo $name ?>-img" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
					<image x="0" y="0" height="50" width="50" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?php echo $point['image'] ?>">
					</image>
				</pattern>
			<?php endforeach; ?>

</defs>

<g class="nineveh-general-point" transform="translate(1060, 482)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" filter="url(#pin-drop-shadow)">
		<g id="ME-Copy-2" transform="translate(-1060.000000, -471.000000)">
				<g id="Page-1" transform="translate(1060.000000, 478.000000)">
						<mask id="mask-2" fill="white">
								<use xlink:href="#path-1"></use>
						</mask>
						<g id="Clip-2"></g>
						<path d="M67.2876,0.0001 C30.1256,0.0001 -0.0004,30.1261 -0.0004,67.2881 C-0.0004,78.0161 2.5106,88.1581 6.9766,97.1571 L6.8926,97.1571 L57.4326,191.4041 C57.6606,191.9301 57.9336,192.4311 58.2396,192.9091 C60.1476,195.8941 63.4826,197.8781 67.2876,197.8781 C70.8466,197.8781 73.9926,196.1391 75.9466,193.4731 C76.5356,192.6691 77.0136,191.7821 77.3626,190.8301 L125.0956,101.7441 C131.1156,91.6661 134.5756,79.8811 134.5756,67.2881 C134.5756,30.1261 104.4496,0.0001 67.2876,0.0001" id="Fill-1" fill="#F1364E" mask="url(#mask-2)"></path>
				</g>
				<circle id="Oval-2-Copy-9" fill="#FFFFFF" cx="1175.15593" cy="489.155927" r="18.1559266" filter="url(#logo-drop-shadow)"></circle>
				<g id="Group-9" transform="translate(1165.000000, 480.000000)" stroke="#343434" stroke-width="5" stroke-linecap="square">
						<path d="M1.32515625,9.5 L19.6748438,9.5" id="Line-3"></path>
						<path d="M10,0.32515625 L10,18.6748437" id="Line-3"></path>
				</g>
				<text id="NINEVEH-GENERAL-DATA" font-family="OpenSans-Light, Open Sans" font-size="22" font-weight="300" line-spacing="24" fill="#FFFFFF">
						<tspan x="1080.77246" y="534">NINEVEH</tspan>
						<tspan x="1079" y="558">GENERAL</tspan>
						<tspan x="1099.07715" y="582">DATA</tspan>
				</text>
		</g>
</g>

<g class="map-points__spots">
	<?php foreach($points as $name => $point): ?>
 	<g transform="translate(<?php echo $point['x'] ?>, <?php echo $point['y'] ?>)" class="map-points__spot" data-content="<?php echo $name ?>">
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
<button class="section__open section__close-nineveh-general"> <i class="ion-close-round"></i> </button>

<div class="nineveh-general-content">
	<div class="nineveh-general-content__container">
		<h2>Nineveh Plains Reconstruction Process</h2>
		<ul>
			<li></li>
			<li></li>
		</ul>
	</div>
</div>

	<?php foreach($contents as $cont): ?>
		<?php require('points_content.php') ?>
	<?php endforeach; ?>
</div>

<?php
return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_points', 'acn_fullpage_slide_points_sc' );
