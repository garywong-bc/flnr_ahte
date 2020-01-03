(function($){

	Drupal.behaviors.mohTheme = {
        attach: function (context, settings) {

			$('li.expanded').hover(function () {
				$(this).toggleClass('dropdown');
			});
			
		}
	}	
	
})(jQuery);