
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
									<h3 style="color: red;font-weight: 500;">
										<?php echo isset($cont['damaged_houses_num']) ?  $cont['damaged_houses_num'] : ''?>

											<svg width="30px" height="28px" viewBox="0 0 30 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											    <!-- Generator: Sketch 45.2 (43514) - http://www.bohemiancoding.com/sketch -->
											    <desc>Created with Sketch.</desc>
											    <defs></defs>
											    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											        <g id="ME-Copy-2" transform="translate(-559.000000, -524.000000)" fill-rule="nonzero" fill="#F1364E">
											            <g id="Group-4" transform="translate(196.000000, 380.000000)">
											                <path d="M378.145597,144.160029 L392.179702,156.189265 C392.362258,156.345491 392.447166,156.587513 392.402224,156.823542 C392.357282,157.059572 392.189373,157.253461 391.962177,157.331676 C391.734982,157.409891 391.483295,157.360454 391.30257,157.202113 L377.707031,145.54882 L364.111492,157.202113 C363.930767,157.360454 363.679081,157.409891 363.451885,157.331676 C363.224689,157.253461 363.056781,157.059572 363.011839,156.823542 C362.966897,156.587513 363.051804,156.345491 363.234361,156.189265 L377.268465,144.160029 C377.407167,144.041622 377.588237,143.985038 377.769684,144.003398 C377.908232,144.015232 378.03964,144.069985 378.145597,144.160029 Z M371.35827,144.024282 L371.35827,148.336846 L368.685107,150.634095 L368.685107,144.024282 L371.35827,144.024282 Z M388.399682,155.698472 L388.399682,171.40329 L367.01438,171.40329 L367.01438,155.698472 L377.707031,146.676561 L388.399682,155.698472 Z M382.385066,158.037476 L378.375322,158.037476 L378.375322,162.04722 L382.385066,162.04722 L382.385066,158.037476 Z M377.038741,158.037476 L373.028996,158.037476 L373.028996,162.04722 L377.038741,162.04722 L377.038741,158.037476 Z M378.375322,163.383802 L378.375322,167.393546 L382.385066,167.393546 L382.385066,163.383802 L378.375322,163.383802 Z M373.028996,163.383802 L373.028996,167.393546 L377.038741,167.393546 L377.038741,163.383802 L373.028996,163.383802 Z" id="Icono_Casa-Copy-3"></path>
											            </g>
											        </g>
											    </g>
											</svg>
									</h3>
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
