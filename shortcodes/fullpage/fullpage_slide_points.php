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


				<pattern id="pin-aleppo" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
					<image x="0" y="0" height="50" width="50"
					xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
				</image>
			</pattern>

			<pattern id="pin-bosra" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
				<image x="0" y="0" height="50" width="50"
				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
			</image>
		</pattern>

		<pattern id="pin-damascus" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
			<image x="0" y="0" height="50" width="50"
			xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
		</image>
	</pattern>

	<pattern id="pin-qalat_salah_el_din" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
		<image x="0" y="0" height="50" width="50"
		xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
	</image>
</pattern>

<pattern id="pin-crac_des_chevaliers" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
	<image x="0" y="0" height="50" width="50"
	xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
</image>
</pattern>

<pattern id="pin-palmyra" patternUnits="userSpaceOnUse" height="50" width="50" x="21" y="21">
	<image x="0" y="0" height="50" width="50"
	xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
</image>
</pattern>

</defs>

<g class="map-points__spots">

	<g transform="translate(1219.55, 155.68)" class="map-points__spot"   data-content="Telleskuf">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-aleppo)" filter="url(#pin-drop-shadow)"></circle>
			<g class="hotspot__pin-360" transform="translate(13, -48) scale(1.1, 1.1)">
				<ellipse cx="0" cy="25" rx="10" ry="10.5" filter="url(#logo-drop-shadow)"></ellipse>
				<g transform="translate(4, 6)" font-size="10" font-family="Roboto-Regular, Roboto" fill="#EE364D" font-weight="normal">
					<text><tspan fill="#666" x="0" y="0">+</tspan></text>
				</g>
			</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Telleskuf</tspan>
			</text>
	</g>
	</g>

	<g transform="translate(1422.68, 125)" class="map-points__spot"  data-content="Alqosh">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-damascus)" filter="url(#pin-drop-shadow)"></circle>
		</g>

			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Alqosh</tspan>
			</text>
	</g>

	<g transform="translate(1302.85, 225.32)" class="map-points__spot"   data-content="Baqofa">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-qalat_salah_el_din)" filter="url(#pin-drop-shadow)"></circle>
		</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Baqofa</tspan>
			</text>
	</g>

	<g transform="translate(1219.66, 275.41)" class="map-points__spot"  data-content="Batnaya">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-crac_des_chevaliers)" filter="url(#pin-drop-shadow)"></circle>
		</g>
		<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
			<tspan x="0" dy="1.4em">Batnaya</tspan>
		</text>
	</g>

	<g transform="translate(1139.8, 352.83)" class="map-points__spot"  data-content="Telekef">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-palmyra)" filter="url(#pin-drop-shadow)"></circle>
		</g>
		<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
			<tspan x="0" dy="1.4em">Telekef</tspan>
		</text>
	</g>

	<g transform="translate(1013, 411.91)" class="map-points__spot"   data-content="Mosul">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
		</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Mosul</tspan>
			</text>
	</g>

	<g transform="translate(1439.68, 409.84)" class="map-points__spot"   data-content="Bahzani">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
		</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Bahzani</tspan>
			</text>
	</g>

	<g transform="translate(1351.85, 466.08)" class="map-points__spot"   data-content="Bashiqua">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
		</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Bashiqua</tspan>
			</text>
	</g>

	<g transform="translate(1276.32, 625.78)" class="map-points__spot"   data-content="Bartella">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
		</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Bartella</tspan>
			</text>
	</g>

	<g transform="translate(1236.11, 786.49)" class="map-points__spot"   data-content="Karamless">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
		</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Karamless</tspan>
			</text>
	</g>

	<g transform="translate(1072.1, 774.85)" class="map-points__spot"   data-content="Qaraqosh">
		<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
			<circle cx="0" cy="0" r="21" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
		</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Qaraqosh/Bakhdida</tspan>
			</text>
	</g>
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
