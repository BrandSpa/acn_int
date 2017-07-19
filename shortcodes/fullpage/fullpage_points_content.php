<?php

function get_att_name($name) {
  $name = strtolower($name);
  return str_replace(" ", "_", $name);
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

  $params = generate_att($params, 'Damaged Houses');
  $params = generate_att($params, 'Totally Destroyed');
  $params = generate_att($params, 'Burnt');
  $params = generate_att($params, 'Partially Damaged');
  $params = generate_att($params, 'Number of Houses Actually Being Renovated');
  $params = generate_att($params, 'Number of families prior to 2014');
  $params = generate_att($params, 'Number of Houses Registered to be Renovated');
  $params = generate_att($params, 'Number of Christians Returned');
  $params = generate_att($params, 'Families returned to Nineveh Plains');
  $params = generate_att($params, 'Properties already restored');

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
				<h4><?php echo do_shortcode('[bs_counter num="12970"]') ?></h4>
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
					<h3 style="font-weight: 500;"><?php echo do_shortcode('[bs_counter num="232"]') ?></h3>
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
					<h4 style="font-weight: 500;"><?php echo do_shortcode('[bs_counter num="9320"]') ?></h4>
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
					<h4><?php echo do_shortcode('[bs_counter num="342"]') ?></h4>
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
