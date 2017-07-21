
			<div class="spot-content <?php echo $cont['city'] ?>">
			  <div class="spot-content__container">
					<?php if(!empty($cont['header_img'])): ?>
						<img style="width: 100%;" src="<?php echo wp_get_attachment_url($cont['header_img']) ?>" alt="06525792_xl" width="944" height="auto" />
					<?php endif; ?>
					<div style="padding: 40px 80px;">
					  <div style="margin-bottom: 40px">
					    <h2><?php echo $cont['city'] ?></h2>
					    <h4><?php echo $cont['city_subtitle'] ?></h4>
					  </div>

					  <div class="col-4-l" style="padding-bottom: 40px">
					    <div style="margin-bottom: 40px">
					      <h3><?php echo isset($cont['families_already_returned_num']) ? $cont['families_already_returned_num'] : '' ?></h3>
					      <p><?php echo $cont['families_already_returned_text'] ?></p>
					    </div>

							<div>
								<h3><?php echo isset($cont['christians_already_returned_num']) ? $cont['christians_already_returned_num'] : ''?></h3>
								<p><?php echo $cont['christians_already_returned_text'] ?></p>
							</div>

					  </div>

					  <div class="col-4-l" style="padding-bottom: 40px">
					    <div style="margin-bottom: 140px">
								<div style="margin-bottom: 40px">
									<h3 style="color: red;font-weight: 500;"><?php echo isset($cont['damaged_houses_num']) ?  $cont['damaged_houses_num'] : ''?></h3>
									<h3 style="color: red;font-weight: 500;"><?php echo $cont['damaged_houses_title_1'] ?></h3>
									<h3 style="color: red;font-weight: 500;"><?php echo $cont['damaged_houses_title_2'] ?></h3>
								</div>
	<!--
								<div style="margin-bottom: 40px">
									<h1 style="font-weight: 700;"><?php echo isset($cont['percentage']) ? $cont['percentage'] : '' ?></h1>
								</div> -->

								<h4 style="color: red;"><?php echo isset($cont['number_of_houses_registered_to_be_renovated_num']) ? $cont['number_of_houses_registered_to_be_renovated_num'] : ''  ?></h4>
								<p><?php echo $cont['number_of_houses_registered_to_be_renovated_text'] ?></p>
					    </div>

					    <ul style="margin-bottom: 40px">
					      <li style="margin-bottom: 20px">
					        <h4><?php echo isset($cont['houses_totally_destroyed_num']) ?  $cont['houses_totally_destroyed_num'] : '' ?></h4>
					        <p><?php echo $cont['houses_totally_destroyed_text'] ?></p>
					      </li>
					      <li style="margin-bottom: 20px">
					        <h4><?php echo isset($cont['houses_burnt_num']) ? $cont['houses_burnt_num'] : '' ?></h4>
					        <p><?php echo $cont['houses_burnt_text'] ?></p>
					      </li>
					      <li style="margin-bottom: 20px">
					        <h4><?php echo isset($cont['houses_partially_damaged_num']) ? $cont['houses_partially_damaged_num'] : '' ?></h4>
					        <p><?php echo $cont['houses_partially_damaged_text'] ?></p>
					      </li>
					    </ul>

					    <h4 style="color: red;">27</h4>
					    <p>Number of houses actually being renovated</p>
					  </div>

					</div>
			  </div>
			</div>
