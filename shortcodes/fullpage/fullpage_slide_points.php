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
    <svg class="map-points" width="1409" height="695" preserveAspectRatio="xMidYMid slice" viewBox="153.6 54 1536 864">
    	<image class="hotspot__bg-image" width="1920" height="1080"
    		xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://searchingforsyria.org//images/pins/earth-zoom.jpg">
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
    		<pattern id="pin-aleppo" patternUnits="userSpaceOnUse" height="75" width="75" x="37.648809523809526" y="37.648809523809526">
    			<image x="0" y="0" height="75" width="75"
    				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
    			</image>
    		</pattern>
    		<pattern id="pin-bosra" patternUnits="userSpaceOnUse" height="75" width="75" x="37.648809523809526" y="37.648809523809526">
    			<image x="0" y="0" height="75" width="75"
    				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
    			</image>
    		</pattern>
    		<pattern id="pin-damascus" patternUnits="userSpaceOnUse" height="75" width="75" x="37.648809523809526" y="37.648809523809526">
    			<image x="0" y="0" height="75" width="75"
    				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
    			</image>
    		</pattern>
    		<pattern id="pin-qalat_salah_el_din" patternUnits="userSpaceOnUse" height="75" width="75" x="37.648809523809526" y="37.648809523809526">
    			<image x="0" y="0" height="75" width="75"
    				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
    			</image>
    		</pattern>
    		<pattern id="pin-crac_des_chevaliers" patternUnits="userSpaceOnUse" height="75" width="75" x="37.648809523809526" y="37.648809523809526">
    			<image x="0" y="0" height="75" width="75"
    				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
    			</image>
    		</pattern>
    		<pattern id="pin-palmyra" patternUnits="userSpaceOnUse" height="75" width="75" x="37.648809523809526" y="37.648809523809526">
    			<image x="0" y="0" height="75" width="75"
    				xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wp-content/uploads/2017/07/img150-1.jpg">
    			</image>
    		</pattern>
    	</defs>
    	<g transform="translate(1140, 310)" class="map-points__spot" data-pano-image="/images/panoramas/aleppo.jpg" data-audio-track="/media/Aleppo-English.mp3" data-pano-yaw="300" data-pano-id="0" ga-on="click" ga-event-category="map" ga-event-action="open" ga-event-label="aleppo-360view" style="opacity: 1; fill-opacity: 1;">
    		<g class="hotspot__pin-image" fill="#fff" fill-rule="nonzero">
    			<circle class="hotspot__pin-circle" cx="0" cy="0" r="37.648809523809526" fill="url(#pin-aleppo)" filter="url(#pin-drop-shadow)"></circle>

    		<text class="hotspot__pin-text" fill="#fff" dx="0" y="42.648809523809526" text-anchor="middle" style="display: inline-block;">
    			<tspan x="0" dy="1.4em">ALEJANDRO</tspan>
    		</text>
    	</g>
    	</g>

    	<g transform="translate(1100, 750)" class="map-points__spot" data-pano-image="/images/panoramas/bosra.jpg" data-audio-track="/media/Bosra-English.mp3" data-pano-yaw="480" data-pano-id="1" ga-on="click" ga-event-category="map" ga-event-action="open" ga-event-label="bosra-360view" style="opacity: 1; fill-opacity: 1;">
    		<g class="hotspot__pin-image" fill="#fff" fill-rule="nonzero">
    			<circle class="hotspot__pin-circle" cx="0" cy="0" r="37.648809523809526" fill="url(#pin-bosra)" filter="url(#pin-drop-shadow)"></circle>
    		<text class="hotspot__pin-text" fill="#fff" dx="0" y="20" text-anchor="middle" style="display: inline-block;">
    			<tspan x="0" dy="1.4em">Ancient City of Bosra</tspan>
    		</text>
    	</g>
    	</g>

    	<g transform="translate(950, 610)" class="map-points__spot" data-pano-image="/images/panoramas/damascus.jpg" data-audio-track="/media/Damascus-English.mp3" data-pano-yaw="0" data-pano-id="2" ga-on="click" ga-event-category="map" ga-event-action="open" ga-event-label="damascus-360view" style="opacity: 1; fill-opacity: 1;">
    		<g class="hotspot__pin-image" fill="#fff" fill-rule="nonzero">
    			<circle class="hotspot__pin-circle" cx="0" cy="0" r="37.648809523809526" fill="url(#pin-damascus)" filter="url(#pin-drop-shadow)"></circle>

    		<text class="hotspot__pin-text" fill="#fff" dx="0" y="42.648809523809526" text-anchor="middle" style="display: inline-block;">
    			<tspan x="0" dy="1.4em">Ancient City of Damascus</tspan>
    		</text>
    	</g>
    	</g>

    	<g transform="translate(1390, 310)" class="map-points__spot" data-pano-image="/images/panoramas/qalat_salah_el_din.jpg" data-audio-track="/media/NorthernSyria-English.mp3" data-pano-yaw="30" data-pano-id="3" ga-on="click" ga-event-category="map" ga-event-action="open" ga-event-label="qalat_salah_el_din-360view" style="opacity: 1; fill-opacity: 1;">
    		<g class="hotspot__pin-image" fill="#fff" fill-rule="nonzero">
    			<circle class="hotspot__pin-circle" cx="0" cy="0" r="37.648809523809526" fill="url(#pin-qalat_salah_el_din)" filter="url(#pin-drop-shadow)"></circle>
    		<text class="hotspot__pin-text" fill="#fff" dx="0" y="42.648809523809526" text-anchor="middle" style="display: inline-block;">
    			<tspan x="0" dy="1.4em">Ancient Villages of</tspan>
    			<tspan x="0" dy="1.4em">Northern Syria</tspan>
    		</text>
    	</g>
    	</g>
    	<g transform="translate(1000, 420)" class="map-points__spot" data-pano-image="/images/panoramas/crac_des_chevaliers.jpg" data-audio-track="/media/CracDesChevaliers-English.mp3" data-pano-yaw="0" data-pano-id="4" ga-on="click" ga-event-category="map" ga-event-action="open" ga-event-label="crac_des_chevaliers-360view" style="opacity: 1; fill-opacity: 1;">
    		<g class="hotspot__pin-image" fill="#fff" fill-rule="nonzero">
    			<circle class="hotspot__pin-circle" cx="0" cy="0" r="37.648809523809526" fill="url(#pin-crac_des_chevaliers)" filter="url(#pin-drop-shadow)"></circle>
    		</g>
    		<text class="hotspot__pin-text" fill="#fff" dx="0" y="42.648809523809526" text-anchor="middle" style="display: inline-block;">
    			<tspan x="0" dy="1.4em">Crac des Chevaliers and</tspan>
    			<tspan x="0" dy="1.4em">Qal'at Salah El-Din</tspan>
    		</text>
    	</g>
    	</g>
    	<g transform="translate(1200, 470)" class="map-points__spot" data-pano-image="/images/panoramas/palmyra.jpg" data-audio-track="/media/Palmyra-English.mp3" data-pano-yaw="480" data-pano-id="5" ga-on="click" ga-event-category="map" ga-event-action="open" ga-event-label="palmyra-360view" style="opacity: 1; fill-opacity: 1;">
    		<g class="hotspot__pin-image" fill="#fff" fill-rule="nonzero">
    			<circle class="hotspot__pin-circle" cx="0" cy="0" r="37.648809523809526" fill="url(#pin-palmyra)" filter="url(#pin-drop-shadow)"></circle>
    		</g>
    		<text class="hotspot__pin-text" fill="#fff" dx="0" y="42.648809523809526" text-anchor="middle" style="display: inline-block;">
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
