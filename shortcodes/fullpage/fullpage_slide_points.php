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
				<ellipse cx="16" cy="15.5" rx="16" ry="15.5" filter="url(#logo-drop-shadow)"></ellipse><g transform="translate(3, 4) scale(1.2, 1.2)">
					<g transform="translate(4, 0)" fill="#666">
						<path d="M4.37625047,17.8834298 C3.88751403,17.2943672 3.45650493,16.4930332 3.10592491,15.536879 C3.31251091,15.5473247 3.52298865,15.5577704 3.73638518,15.5670969 C4.32727953,17.1279822 5.17081202,18.1300228 6.18849944,18.2292569 C6.262118,18.2326145 6.33606087,18.2344798 6.41000374,18.2355989 C7.46985157,18.2020235 8.34808532,17.1999829 8.96005987,15.6044029 C9.17280778,15.5973148 9.3826369,15.5898536 9.58889859,15.5816462 C9.21431957,16.5911481 8.74893352,17.4241923 8.22127978,18.0147471 C9.72510914,17.6174376 11.058351,16.7041854 12.0770114,15.4488367 C12.4298615,15.4257069 12.740227,15.4033233 13,15.3835511 C11.4838468,17.5842352 9.14264688,19 6.51767494,19 C6.48167644,19 6.44600225,18.9973886 6.41032805,18.9970155 C6.39184234,18.9973886 6.37368093,19 6.35551952,19 C6.29876512,19 6.24298366,18.9955233 6.18687788,18.9903004 C3.67671199,18.8761439 1.45161532,17.4682134 7.72715225e-14,15.3324418 C0.25490832,15.3525871 0.565598104,15.3764629 0.921367095,15.4018311 C1.84532868,16.5571996 3.03295497,17.4294151 4.37625047,17.8834298 M4.37625047,1.1165702 C3.88751403,1.7056328 3.45650493,2.50696685 3.10592491,3.46312102 C3.31251091,3.45267532 3.52298865,3.44222963 3.73638518,3.43290311 C4.32727953,1.8720178 5.17081202,0.869977185 6.18849944,0.770743081 C6.262118,0.767385536 6.33606087,0.765520233 6.41000374,0.764401052 C7.46985157,0.797976501 8.34808532,1.80001712 8.96005987,3.39559706 C9.17280778,3.40268521 9.3826369,3.41014642 9.58889859,3.41835375 C9.21431957,2.40885192 8.74893352,1.57580773 8.22127978,0.985252893 C9.72510914,1.38256237 11.058351,2.29581458 12.0770114,3.55116331 C12.4298615,3.57429306 12.740227,3.59667669 13,3.6164489 C11.4838468,1.41576476 9.14264688,0 6.51767494,0 C6.48167644,0 6.44600225,0.0026114238 6.41032805,0.00298448434 C6.39184234,0.0026114238 6.37368093,0 6.35551952,0 C6.29876512,0 6.24298366,0.00447672651 6.18687788,0.00969957411 C3.67671199,0.1238561 1.45161532,1.53178659 7.72715225e-14,3.66755819 C0.25490832,3.64741293 0.565598104,3.62353705 0.921367095,3.59816893 C1.84532868,2.44280043 3.03295497,1.57058488 4.37625047,1.1165702"></path></g><path d="M2.32093671,4.62855347 C2.32093671,4.62855347 7.07116578,4 11.086448,4 C15.1760593,4 19.6703084,4.62855347 19.6703084,4.62855347 C19.6703084,4.62855347 22.0162222,6.37498929 21.9999154,9.34270449 C21.9817124,12.7240079 19.6839607,14.3714465 19.6839607,14.3714465 C19.6839607,14.3714465 15.1612693,15 10.8907656,15 C7.0817842,15 2.71343927,14.3714465 2.71343927,14.3714465 C2.71343927,14.3714465 0.172601432,13.6976372 0.00498198077,9.65698123 C-0.124714518,6.55412702 2.32093671,4.62855347 2.32093671,4.62855347 Z" stroke="#666" stroke-width="1.3"></path><path d="M17.5530323,7 C18.0469635,7 18.6472132,7.22388656 18.8941788,7.50009986 C19.1411444,7.77611344 18.9411723,8 18.4469078,8 C17.9533099,8 17.3527269,7.77611344 17.1057613,7.50009986 C16.8587957,7.22388656 17.0591011,7 17.5530323,7" fill="#666" fill-rule="nonzero">

						</path>
						<g transform="translate(4, 6)" font-size="7" font-family="Roboto-Regular, Roboto" fill="#666" font-weight="normal">
							<text><tspan fill="#666" x="0.44333767" y="6">+</tspan></text>
						</g>
					</g>
					</g>
			</g>
			<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
				<tspan x="0" dy="1.4em">Telleskuf</tspan>
			</text>
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
