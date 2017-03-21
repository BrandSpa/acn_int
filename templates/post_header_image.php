<div class="bs-post__header--image" style="background-image: url(<?php echo get_the_post_thumbnail_url($post->ID, 'full') ?>)">
	<div class="bs-post__header--image__title">
		<h3 style="padding-bottom: 20px; border-bottom: 1px solid #D3D3D3"><?php the_title() ?></h3>
				<a style="display: block; margin: 0 auto; width: 20px" href="#post-content">
				<?php require('./down_arrow.php') ?>
		</a>
	</div>
</div>

	<div class="bs-post__header--image__title--mobile">
		<h3><?php the_title() ?></h3>
		<a style="display: block; margin: 0 auto; width: 20px" href="#post-content">
			<svg width="20px" height="27px" viewBox="178 602 20 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<defs>
							<polyline id="path-1" points="16.9743561 9.37612525 16.9743561 23.0775777 2.91233907 23.0775777"></polyline>
							<mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="14.062017" height="13.7014524" fill="white">
									<use xlink:href="#path-1"></use>
							</mask>
							<polyline id="path-3" points="16.9743561 3.23766371 16.9743561 16.9391162 2.91233907 16.9391162"></polyline>
							<mask id="mask-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="14.062017" height="13.7014524" fill="white">
									<use xlink:href="#path-3"></use>
							</mask>
					</defs>
					<g id="Group-12" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(178.000000, 602.000000)">
							<use id="Rectangle" stroke="#F1364E" mask="url(#mask-2)" stroke-width="4" transform="translate(9.943348, 16.226851) rotate(-315.000000) translate(-9.943348, -16.226851) " xlink:href="#path-1"></use>
							<use id="Rectangle-Copy" stroke="#F1364E" mask="url(#mask-4)" stroke-width="4" transform="translate(9.943348, 10.088390) rotate(-315.000000) translate(-9.943348, -10.088390) " xlink:href="#path-3"></use>
					</g>
			</svg>
		</a>
	</div>
