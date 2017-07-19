<?php

function get_att_name($name) {
  $name = strtolower($name);
  return str_replace(" ", "_", $name);
}

function get_family() {
  return '
    <svg width="38px" height="27px" viewBox="0 0 38 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs></defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="ME-Copy" transform="translate(-390.000000, -487.000000)" fill-rule="nonzero" fill="#FFFFFF">
                <g id="Infografia" transform="translate(329.000000, 371.000000)">
                    <path d="M72.1643537,119.008982 C72.1643537,117.555243 73.3424113,116.376785 74.7961503,116.376785 C76.2498894,116.376785 77.4283476,117.554842 77.4283476,119.008982 C77.4283476,120.462721 76.2498894,121.641179 74.7961503,121.641179 C73.3424113,121.641179 72.1643537,120.462721 72.1643537,119.008982 L72.1643537,119.008982 Z M70.4152989,132.143522 C70.5343068,132.15915 70.6561195,132.149132 70.7719218,132.114271 L69.9793375,135.414435 C69.9140234,135.732991 70.1203838,136.043935 70.4385395,136.109249 C70.4754039,136.116461 70.5134704,136.120468 70.5507355,136.120869 L72.8884184,136.120869 L73.3472197,141.253033 C73.3969065,141.689795 73.7675538,142.019571 74.2071216,142.018369 L75.3851791,142.018369 C75.8251475,142.019571 76.1953942,141.690196 76.245081,141.253033 L76.692262,136.124074 L79.0479764,136.124074 C79.3725433,136.120869 79.6342003,135.854403 79.630594,135.529436 C79.6297926,135.49177 79.6261863,135.454505 79.618573,135.417641 L78.8207796,132.119881 C78.9365818,132.155143 79.0579939,132.16516 79.1774024,132.149533 C79.6774758,132.084219 80.0292903,131.626219 79.9643769,131.126145 C79.9623734,131.11172 79.9595685,131.097696 79.957565,131.083671 L78.3026747,123.994089 C78.1043282,123.138995 77.4043056,122.491464 76.5363898,122.360035 C76.3777126,122.336394 73.2222013,122.337596 73.0655277,122.360035 C72.1972111,122.491464 71.4971885,123.138995 71.2984414,123.994089 L69.6263209,131.083671 C69.5413726,131.580539 69.8747548,132.052163 70.3716226,132.137111 C70.3860478,132.139515 70.400473,132.141519 70.4152989,132.143522 Z M62.9534664,124.399998 C62.9534664,123.286854 63.8558425,122.384478 64.9689866,122.384478 C66.0817301,122.384478 66.9845069,123.286854 66.9845069,124.399998 C66.9845069,125.513142 66.0817301,126.415518 64.9689866,126.415518 C63.8554418,126.415919 62.9534664,125.513142 62.9534664,124.399998 L62.9534664,124.399998 Z M61.6147282,134.457163 C61.7056871,134.468783 61.7986495,134.461571 61.8872041,134.434323 L61.2805446,136.961537 C61.2304571,137.205163 61.3883328,137.443579 61.632359,137.493667 C61.6600073,137.499276 61.6896591,137.502482 61.7185095,137.502883 L63.5088364,137.502883 L63.8594488,141.432546 C63.8983167,141.76673 64.1816114,142.019571 64.5181993,142.018369 L65.4201747,142.018369 C65.7571632,142.019571 66.040458,141.76713 66.0789252,141.432546 L66.4211229,137.505287 L68.2246729,137.505287 C68.4735075,137.502883 68.673056,137.298926 68.6710525,137.050092 C68.6710525,137.021241 68.6678469,136.992391 68.6618364,136.964342 L68.0515705,134.439532 C68.1393238,134.466379 68.2326869,134.473993 68.3244471,134.461972 C68.7071155,134.411884 68.9763858,134.061272 68.926699,133.678603 C68.9254969,133.667784 68.9234934,133.656966 68.9218906,133.645746 L67.6536756,128.216664 C67.5018104,127.56192 66.9660747,127.065854 66.3013136,126.965679 C66.1799016,126.947647 63.7636815,126.948849 63.6430709,126.965679 C62.9787105,127.065854 62.4425741,127.56192 62.2899075,128.216664 L61.0100722,133.645345 C60.9451588,134.02601 61.2008053,134.387441 61.5810695,134.452355 C61.5926897,134.453958 61.6031079,134.455961 61.6147282,134.457163 Z M85.4691914,121.6528 C86.9213276,121.6528 88.0985838,120.475944 88.0985838,119.023407 C88.0985838,117.571271 86.9213276,116.394015 85.4691914,116.394015 C84.018658,116.394015 82.8418025,117.569267 82.839799,119.020202 C82.839799,120.473139 84.0166545,121.651197 85.4691914,121.6528 Z M81.4032901,129.684828 C81.479423,130.402481 81.9586601,131.013549 82.6366442,131.259979 L83.7265478,141.270263 C83.7754331,141.706224 84.144077,142.035599 84.583244,142.036 L86.3086576,142.036 C86.7474239,142.036 87.1160678,141.706625 87.1653538,141.270263 L88.2576616,131.259979 C88.9504716,131.026371 89.4457367,130.414102 89.5298836,129.687633 L90.1778153,124.820733 C90.315656,123.598999 89.4377227,122.496673 88.2159888,122.358432 C88.133044,122.349216 88.0496984,122.344408 87.9663528,122.344408 L82.9724307,122.344408 C81.7446863,122.342805 80.7481458,123.336941 80.746543,124.565086 C80.7461423,124.650034 80.7517521,124.735784 80.7617696,124.821133 L81.4032901,129.684828 Z M94.6143639,126.634701 C95.7114801,126.634701 96.6010338,125.745548 96.6010338,124.648031 C96.6010338,123.550915 95.7114801,122.661361 94.6143639,122.661361 C93.5184499,122.661361 92.6292969,123.549312 92.6276941,124.646027 C92.6276941,125.743144 93.5172478,126.633899 94.6143639,126.634701 Z M91.5421982,132.703701 C91.6002997,133.246248 91.9621317,133.707854 92.4746268,133.89418 L93.298065,141.45779 C93.33533,141.787165 93.6134157,142.036 93.9447945,142.036 L95.2490725,142.036 C95.5800506,142.036 95.858537,141.786765 95.8958021,141.45779 L96.7212437,133.89418 C97.2445577,133.717471 97.6192121,133.255064 97.682122,132.706105 L98.1717772,129.028882 C98.2763598,128.10567 97.6124002,127.272615 96.6899891,127.168032 C96.62748,127.16082 96.5645701,127.157614 96.5008588,127.157614 L92.7278691,127.157614 C91.8006496,127.156813 91.0477346,127.907724 91.0469332,128.835344 C91.0465325,128.899857 91.0505395,128.96437 91.0577521,129.028882 L91.5421982,132.703701 Z" id="Icono_Familia"></path>
                </g>
            </g>
        </g>
    </svg>';
};

function get_house() {
  return '<svg width="27px" height="26px" viewBox="0 0 27 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs></defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="ME-Copy" transform="translate(-359.000000, -395.000000)" fill-rule="nonzero" fill="#FFFFFF">
              <g id="Infografia" transform="translate(329.000000, 371.000000)">
                  <path d="M43.6228529,24.8575774 C43.7466795,24.8681535 43.8641233,24.9170884 43.9588216,24.9975643 L56.5016536,35.7485661 C56.6648114,35.8881917 56.7406969,36.1044959 56.7005305,36.3154451 C56.660364,36.5263944 56.5102975,36.6996804 56.3072436,36.7695843 C56.1041897,36.8394883 55.8792476,36.795304 55.7177266,36.6537883 L43.5668581,26.2387821 L31.4159897,36.6537883 C31.2544687,36.795304 31.0295266,36.8394883 30.8264727,36.7695843 C30.6234188,36.6996804 30.4733522,36.5263944 30.4331858,36.3154451 C30.3930194,36.1044959 30.4689049,35.8881917 30.6320627,35.7485661 L43.1748946,24.9975643 C43.2988581,24.8917392 43.4606868,24.8411678 43.6228529,24.8575774 L43.6228529,24.8575774 Z M37.8927199,24.8762423 L37.8927199,28.73055 L35.503609,30.7836922 L35.503609,24.8762423 L37.8927199,24.8762423 Z M43.5668581,27.2466882 L53.1233015,35.3099254 L53.1233015,49.3459396 L34.0104148,49.3459396 L34.0104148,35.3099254 L43.5668581,27.2466882 L43.5668581,27.2466882 Z M47.7478021,37.4003854 L44.1641359,37.4003854 L44.1641359,40.9840517 L47.7478021,40.9840517 L47.7478021,37.4003854 Z M42.9695804,37.4003854 L39.3859142,37.4003854 L39.3859142,40.9840517 L42.9695804,40.9840517 L42.9695804,37.4003854 Z M47.7478021,42.1786071 L44.1641359,42.1786071 L44.1641359,45.7622734 L47.7478021,45.7622734 L47.7478021,42.1786071 L47.7478021,42.1786071 Z M42.9695804,42.1786071 L39.3859142,42.1786071 L39.3859142,45.7622734 L42.9695804,45.7622734 L42.9695804,42.1786071 L42.9695804,42.1786071 Z" id="Icono_Casa"></path>
              </g>
          </g>
      </g>
  </svg>';
}

function generate_att($params, $name) {
  $arr = [];
  $key = get_att_name($name);
  $val = $name;
  $arr[$key] = $val;
  return array_push($params, $arr);
}

function acn_fullpage_slide_points_content_sc( $atts, $content ) {
  $params = [
    "title" => "Nineveh Plains Reconstruction Process"
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

	$at = shortcode_atts($params , $atts);

	ob_start();
?>
<style>
.padding-sides {
  color: #ffffff;
  padding: 0 120px;
}

.nineveh-info {
  z-index: 3;
  position: relative;
  width: 50%;
  text-align: center;
  color: #fff;
  padding: 0 80px;
}

.nineveh-title {
  margin-bottom: 20px;
}

.nineveh-info ul {
  border: 1px solid #fff;
  padding: 20px 0;
  margin: 0 15px;
}

.nineveh-info ul li {
  padding: 0 10px;
  vertical-align: middle;
}

.nineveh-info .row {
  margin: 0;
  margin-bottom: 20px;
  width: 100%;
}

.nineveh-info ul {
  margin-bottom: 20px;
}

.nineveh-box {
  border: 1px solid #fff;
  padding: 20px;
  min-height: 120px;
}

.nineveh-box .bs-counter {
  display: inline-block;
  vertical-align: top;
}

@media (min-width: 768px) and (max-width: 991px) {
  .nineveh-info {
      width: 80%;
      padding: 0 40px;
      margin: 0 auto;
  }


  .nineveh-info .row {
      margin-bottom: 10px;
  }

  .nineveh-info ul {
      margin-bottom: 10px;
  }

  .nineveh-box {
      border: 1px solid #fff;
      padding: 10px;
      min-height: 100px;
  }


}

@media (max-width: 767px) {
  .nineveh-title {
      margin-bottom: 10px;
  }

  .nineveh-info {
      width: 90%;
      padding: 0 40px;
  }

  .nineveh-info .row {
      margin-bottom: 10px;
  }

  .nineveh-info ul {
      margin-bottom: 10px;
      padding: 10px 0;
  }

   .nineveh-box {
      border: 1px solid #fff;
      padding: 10px;
      min-height: 80px;
  }


}


</style>
<div class="map-points__content" style="display: flex; align-items: center; height: 100%;">
	<div class="nineveh-info">
		<h3 class="nineveh-title"><?php echo $at['title'] ?></h3>
		<ul class="horizontal-list nineveh-info-list">
      <li>
        <?php echo get_house(); ?>
      </li>
			<li>
				<h4 style="color: #EE364D"><?php echo do_shortcode('[bs_counter num="12970"]') ?></h4>
        <?php echo $at[get_att_name('Damaged Houses')] ?>
			</li>
			<li>
				<h4><?php echo do_shortcode('[bs_counter num="1233"]') ?></h4>
            <?php echo $at[get_att_name('Totally Destroyed')] ?>
			</li>
			<li>
				<h4><?php echo do_shortcode('[bs_counter num="3521"]') ?></h4>
          <?php echo $at[get_att_name('Burnt')] ?>
			</li>
			<li>
				<h4><?php echo do_shortcode('[bs_counter num="8216"]') ?></h4>
          <?php echo $at[get_att_name('Partially Damaged')] ?>
			</li>
		</ul>

		<div class="row">
			<div class="col-6-l col-6-m col-6">
				<div class="nineveh-box">
					<h3 style="font-weight: 500;"><?php echo get_house(); ?> <?php echo do_shortcode('[bs_counter num="232"]') ?></h3>
          <?php echo $at[get_att_name('Number of Houses Actually Being Renovated')] ?>  *
				</div>
			</div>
			<div class="col-6-l col-6-m col-6">
				<div class="nineveh-box">
					<h3 style="font-weight: 500;"><?php echo get_family(); ?> <?php echo do_shortcode('[bs_counter num="14880"]') ?></h3>
            <?php echo $at[get_att_name('Number of families prior to 2014')] ?>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6-l col-6-m col-6">
				<div class="nineveh-box">
					<h4 style="font-weight: 500;"><?php echo get_house(); ?> <?php echo do_shortcode('[bs_counter num="9320"]') ?></h4>
          <?php echo $at[get_att_name('Number of Houses Registered to be Renovated')] ?>
				</div>
			</div>
			<div class="col-6-l col-6-m col-6">
				<div class="nineveh-box">
					<h4><?php echo get_family(); ?> <?php echo do_shortcode('[bs_counter num="3365"]') ?></h4>
          <?php echo $at[get_att_name('Number of Christians Returned')] ?>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6-l col-6-m col-6">
				<div class="nineveh-box">
					<h4><?php echo get_house(); ?> <?php echo do_shortcode('[bs_counter num="342"]') ?></h4>
              <?php echo $at[get_att_name('Properties already restored')] ?>
					<h3 style="font-weight: 500;">2%</h3>
				</div>
			</div>
      <div class="col-6-l col-6-m col-6">
        <div class="nineveh-box">
          <h4><?php echo get_family(); ?> <?php echo do_shortcode('[bs_counter num="599"]') ?></h4>

          <?php echo $at[get_att_name('Families returned to Nineveh Plains')] ?>
          <h3 style="font-weight: 500;">4%</h3>
        </div>
      </div>
		</div>
	</div>
</div>

<?php
	return ob_get_clean();
}

add_shortcode( 'acn_fullpage_slide_points_content', 'acn_fullpage_slide_points_content_sc' );
