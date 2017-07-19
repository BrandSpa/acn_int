<?php

function get_att_name($name) {
  $name = strtolower($name);
  return str_replace(" ", "_", $name);
}

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
					<h3 style="font-weight: 500;"><?php echo do_shortcode('[bs_counter num="14880"]') ?></h3>
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
					<h4><?php echo do_shortcode('[bs_counter num="3365"]') ?></h4>
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
          <h4><?php echo do_shortcode('[bs_counter num="599"]') ?></h4>

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
