(function ($) {

	$(function () {
	
		if ( $.isFunction($.fn.fancybox) ) {
			// Add fancybox to all .fancybox links
			$(".fancybox").fancybox({
				fitToView	: false,
				width		: 700,
				height		: 600,
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none',
				helpers : { 
					overlay: {
						css: { 'background': 'rgba(92,90,90, 0.5)' }
					}
				}
			});
		}
		
		/* TEST that the modal and regular page block are visible... potential conflict */
		
		// Show Hide Email Subscriptions
		var newsletter_list = $('#edit-newsletters');
		
		// onload
		if ( $('input[name="field_subscribe"]').is(':checked') ) {
			$(newsletter_list).fadeTo(100, 1.0);
			enable(newsletter_list);
		} else {
			$(newsletter_list).fadeTo(100, 0.5);
			disable(newsletter_list);
		};
		
		// onclick
		$('input[name="field_subscribe"]').change(function() {
			if(this.checked) {
				$(newsletter_list).fadeTo(100, 1.0);
				enable(newsletter_list);
			} else {
				$(newsletter_list).fadeTo(100, 0.5);
				disable(newsletter_list);
			};
		});

		// Modal Submit
		$('#extended-user-account-manage-email-subscriptions-form input#edit-submit--2').on('click', function(e){
			
			e.preventDefault();
			
			var form = $(this).closest('form');
			
			var req = $.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: $(form).serialize(),
				dataType: "json"
			});
			
			$.fancybox.close(true);
			
		});
		
		// Disable checkboxes
		function disable(parent) {
			$(parent).find('input[type="checkbox"]').each(function(){
				if (this.checked) {
					$(this).attr('wasChecked', true);
				}
				$(this).removeAttr('checked');
				$(this).attr("disabled", true);
			});
		}
		
		// Enable checkboxes
		function enable(parent) {
			$(parent).find('input[type="checkbox"]').each(function(){
				if ( $(this).attr('wasChecked') ) {
					$(this).removeAttr('wasChecked')
					$(this).attr('checked', 'checked');
				}
				$(this).attr("disabled", false);
			});
		}
		
		
	});
	

}(jQuery));