<!-- ========== TEMPLATE -->


<!-- ---------- CHECKBOX -->

<div class="mab_checkbox">
	<input type="radio || checkbox" name="" value="">
	<label></label>
</div>


<!-- ---------- RADIO -->

<label class="mab_radio">
	<span class="mab_radio__input">
		<input type="radio || checkbox" name="" value="" />
		<span class="mab_radio__control"></span>
	</span>
	<span class="mab_radio__label"></span>
</label>

<!-- ---------- SWITCH -->

<label class="mab_switch">
	<input type="checkbox" />
	<span class="mab_switch__slider"></span>
</label>


<!-- ---------- COLLAPSE -->

<div class="mab_collapse">
	<span class="mab_collapse__button"></span>
	<div class="mab_collapse__content"></div>
</div>


<!-- ---------- SCROLL -->

<div class="mab_scroll" data-href="target" data-offset="offset in pixel"></div>


<!-- ---------- ANIMATION -->

<div class="mab_animation"></div>

	
<!-- ---------- IMG_COMP -->

<div class="mab_img_cmp">
	<div class="mab_img_cmp__img" data-src="image"></div>
	<div class="mab_img_cmp__img" data-src="image"></div>
</div>


<!-- ---------- MODAL -->

<span class="mab_modal__open" data-href="#modal_id"> open modal </span>
<span class="mab_modal__open" data-href="pages/modal.php#modal_id"> open modal with ajax </span>

<div id="modal_id" class="mab_modal" aria-hidden="true">
	<div class="mab_modal__wrapper">
		<span class="mab_modal__close"></span>
	</div>
</div>


<!-- ---------- LIGHTBOX -->

<img class="mab_lightbox" data-id="mab_lightbox" src="imgage" />


<!-- 
	---------- SLIDER
	fullscreen : <div class="mab_slider fullscreen">
-->

<div class="mab_slider" data-interval="interval in ms">
	<span class="mab_slider__element" data-src="image"></span>
	<span class="mab_slider__element" data-src="image"></span>
</div>


<!--
	---------- SPLIDE
	init splide's slider

	window.splide.push(new Splide("#foo"));
-->


<div class="splide">
	<div class="splide__track">
		<ul class="splide__list">
			<li class="splide__slide" style="background-image: url('image');"></li>
			<li class="splide__slide" style="background-image: url('image');"></li>
		</ul>
	</div>
</div>

<!-- ---------- SPLIDE FULLSCREEN -->

<div class="splide_container">
	<div class="splide">
		<div class="splide__track">
			<ul class="splide__list">
				<li class="splide__slide" style="background-image: url('image');"></li>
				<li class="splide__slide" style="background-image: url('image');"></li>
			</ul>
		</div>
	</div>
	<div class="splide_open"></div>
	<div class="splide_close"></div>
</div>

<!-- ========== END TEMPLATE -->
