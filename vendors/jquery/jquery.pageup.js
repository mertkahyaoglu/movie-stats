/*!
 * jQuery scroll to top plugin 
 * https://github.com/mertkahyaoglu/jquery-pageup
 *
 * Copyright 2014, Mert Kahyaoğlu
 * version 0.1
 * MIT license
 */

(function($, window, undefined) {
	"use strict";

	$.fn.pageup = function(options) {

		var options = $.extend({}, $.fn.pageup.defaults, options);

		return this.each(function() {

			var $this = $(this);
			
			$(document).scroll(function(){
				if ($(this).scrollTop() > options.offset) {
					$this.fadeIn(options.fadeDelay);
				} else {
					$this.fadeOut(options.fadeDelay);
				}
			});
		
			$this.click(function(){
				$('html, body').animate({scrollTop : 0}, options.scrollDuration);
				return false;
			});

		});

		return $this;
	};

	$.fn.pageup.defaults = {
		offset: 100,
		fadeDelay: 500,
		scrollDuration: 400
	};

})(jQuery);