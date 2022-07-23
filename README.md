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



<!-- ---------- MODAL -->

<span class="mab_modal__open" href="#modal_id"> open modal </span>
<span class="mab_modal__open" href="pages/modal.php#modal_id"> open modal with ajax </span>

<div id="modal_id" class="mab_modal" aria-hidden="true">
	<div class="mab_modal__wrapper">
		<div class="mab_modal__close"></div>
	</div>
</div>


<!-- ---------- SCROLL -->

<div class="mab_scroll" href="target" offset="value in pixel"> SCROLL </div>


<!-- ---------- ANIMATION -->

<div class="mab_animation"> ANIMATION </div>


<!-- ---------- SLIDER -->

<div class="mab_slider" id="mab_slider">
	<img class="mab_slider__next" src="images/next.png">
	<img class="mab_slider__prev" src="images/prev.png">
	<div class="mab_slider__inner">
		<span class="active" style="background: url('img.jpg') no-repeat; background-size: contain; background-position: center;"></span>
		<span style="background: url('img.jpg') no-repeat; background-size: contain; background-position: center;"></span>
	</div>
</div>


<!-- ---------- LIGHTBOX -->

<img class="mab_lightbox" lb-id="mab_lightbox" src="img.jpg">


<!-- ========== END TEMPLATE -->
