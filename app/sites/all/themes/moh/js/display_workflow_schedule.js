//******************************************
// To display Workflow Schedule only if user selects "Publish" or "Unpublish" 
//******************************************
jQuery(document).ready(function($) {
	var current_state = $('input:radio[name="workflow"]:checked').siblings().html();

	if (current_state.indexOf('ublish') != -1) {
		$(".form-item-workflow-scheduled").show();
		$(".form-item-workflow-scheduled-date").show();
		$(".form-item-workflow-scheduled-hour").show();
	} else {
		$(".form-item-workflow-scheduled").hide();
		$(".form-item-workflow-scheduled-date").hide();
		$(".form-item-workflow-scheduled-hour").hide();
	}

	$('input:radio[name="workflow"]').change(
		function(){
			var select_state = $(this).siblings().html();
			//if ($(this).is(':checked') && $(this).val() == '9') {
			if ($(this).is(':checked') && select_state.indexOf('ublish') != -1) { 
				$(".form-item-workflow-scheduled").show();
				$(".form-item-workflow-scheduled-date").show();
				$(".form-item-workflow-scheduled-hour").show();
			} else {
				$(".form-item-workflow-scheduled").hide();
				$(".form-item-workflow-scheduled-date").hide();
				$(".form-item-workflow-scheduled-hour").hide();
				$('#edit-workflow-scheduled-0').attr('checked', true);
			} 
	});
});
