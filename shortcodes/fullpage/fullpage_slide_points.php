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
		"uniq_name" => "slide-" . uniqid() . rand(0, 100)
	], $atts);

	$bgUrl = wp_get_attachment_url( $at['bg_img'] );
	$bgUrlMobile = wp_get_attachment_url( $at['bg_img_mobile'] );
	ob_start();
	?>

	<div
	class="section section--<?php echo $at['uniq_name'] ?>"
	data-anchor="<?php echo $at['uniq_name'] ?>"
	data-story="<?php echo $at['story_num'] ?>"
	data-index="<?php echo $at['index_num'] ?>"
	>

	<div class="section__content">
		<?php echo $content ?>
		<div class="map-points__container">
			<svg class="map-points" width="1409" height="695" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080">
				<image class="hotspot__bg-image" width="1920" height="1080"
				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/fondoBaja.jpg">
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
<g transform="translate(1140, 310)" class="map-points__spot"  style="opacity: 1; fill-opacity: 1;">
	<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
		<circle cx="0" cy="0" r="21" fill="url(#pin-aleppo)" filter="url(#pin-drop-shadow)"></circle>
		</g>
		<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
			<tspan x="0" dy="1.4em">ALEJANDRO</tspan>
		</text>

</g>

<g transform="translate(1100, 750)" class="map-points__spot"  style="opacity: 1; fill-opacity: 1;">
	<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
		<circle cx="0" cy="0" r="21" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
	</g>
		<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
			<tspan x="0" dy="1.4em">Ancient City of Bosra</tspan>
		</text>
</g>

<g transform="translate(950, 610)" class="map-points__spot" style="opacity: 1; fill-opacity: 1;">
	<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
		<circle cx="0" cy="0" r="21" fill="url(#pin-damascus)" filter="url(#pin-drop-shadow)"></circle>
	</g>

		<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
			<tspan x="0" dy="1.4em">Ancient City of Damascus</tspan>
		</text>
</g>

<g transform="translate(1390, 310)" class="map-points__spot"  style="opacity: 1; fill-opacity: 1;">
	<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
		<circle cx="0" cy="0" r="21" fill="url(#pin-qalat_salah_el_din)" filter="url(#pin-drop-shadow)"></circle>
	</g>
		<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
			<tspan x="0" dy="1.4em">Ancient Villages of</tspan>
			<tspan x="0" dy="1.4em">Northern Syria</tspan>
		</text>
</g>

<g transform="translate(1000, 420)" class="map-points__spot" style="opacity: 1; fill-opacity: 1;">
	<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
		<circle cx="0" cy="0" r="21" fill="url(#pin-crac_des_chevaliers)" filter="url(#pin-drop-shadow)"></circle>
	</g>
	<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
		<tspan x="0" dy="1.4em">Crac des Chevaliers and</tspan>
		<tspan x="0" dy="1.4em">Qal'at Salah El-Din</tspan>
	</text>
</g>

<g transform="translate(1450, 150)" class="map-points__spot" style="opacity: 1; fill-opacity: 1;">
	<g class="map-points__spot-image" fill="#fff" fill-rule="nonzero">
		<circle cx="0" cy="0" r="21" fill="url(#pin-palmyra)" filter="url(#pin-drop-shadow)"></circle>
	</g>
	<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
		<tspan x="0" dy="1.4em">Site of Palmyra</tspan>
	</text>
</g>
</g>
</svg>
</div>
</div>

</div>


<?php
return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_points', 'acn_fullpage_slide_points_sc' );
