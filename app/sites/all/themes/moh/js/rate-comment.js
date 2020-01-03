(function($){
	Drupal.behaviors.mohTheme = {
        attach: function (context, settings) {

			$('.rate-button').click(function () {

                var id = $('#main-content .content .node').attr('id');
                var button = $(this).attr('id');
                var arr = id.split('-');
                var arg = button.split('-');
                var node = arr[1];
                var vote = arg[2];

                setTimeout(
                    function() {
                        $.ajax({
                            url: "/ahte/has-user-voted/"+node+"/"+vote
                        }).done(function(data) {
                            if ( data == 'TRUE') {
                                $("#comment-wrapper").css({ display: "block" });
                            }
                            else {
                                $("#comment-wrapper").css({ display: "none" });
                            }
                        });
                    }, 400);
			});
		}
	}	
})(jQuery);