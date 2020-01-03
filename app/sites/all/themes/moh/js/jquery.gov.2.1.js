(function ($) {

	Drupal.behaviors.mohTheme = {
		attach: function(context, settings) {
	
			//******************************************
			// Font Sizer  //
			//******************************************
			$('#sizer', context).font_sizer({ 
				applyTo: '#content', 
				changesmall: 0.2, 
				changelarge: 0.2, 
				expire: 30
			});
						
			//******************************************
			// SlidesJS Set up for Reports Front Page Block
			//******************************************
			$('body.front .view-report-teaser-view').slides({
				container: 'view-content',
				play: 5000,
				pause: 2500,
				hoverPause: true,
				crossfade: true,
				effect: 'fade',
				fadeSpeed: 400,
				randomize: false
			});
			
			//******************************************
			//  Add the file type and size     	//
			// (EXT X.XXMB) to each file links  //
			//******************************************
			$('#main-content a').each(function(){
				
				var pdf_path 		= $(this).attr('href');
				var file_extension	= pdf_path.split('.').pop();
				var extension_array = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];				
				var link 			= $(this);
				
				$.each(extension_array, function(index, value){
					if ( file_extension == value ) {						
						var request;
						var ext = value.toUpperCase();
										
						request = $.ajax({
							type: 'HEAD',
							url: pdf_path,
							success: function () {
								var file_size = parseInt( request.getResponseHeader("Content-Length") );
									file_size = ( file_size / 100000 ).toFixed(2);
								var	formated_size = (' <span class="pdf-size">(' + ext + ' ' + file_size + 'MB)</span>').toString();	
									link.after(formated_size);
							}
						});	
						
					}
					
				});		
								
			});
		}
	}
	
})(jQuery);