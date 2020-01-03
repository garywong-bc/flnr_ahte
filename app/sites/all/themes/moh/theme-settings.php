<?php

	function moh_form_system_theme_settings_alter(&$form, $form_state) {
	  
		// Add the BC Government Header Menu to the themes 'Toggle Display' options
		$form['theme_settings']['gov_menu'] = array(
			'#type' => 'checkbox',
			'#title' => t('BC Government Header Menu'),
			'#weight' => -10,
			'#default_value' => theme_get_setting('gov_menu'),
		);
		
		// Add the BC Government Footer Menu to the themes 'Toggle Display' options
		$form['theme_settings']['gov_footer_menu'] = array(
			'#type' => 'checkbox',
			'#title' => t('BC Government Footer Menu'),
			'#weight' => 100,
			'#default_value' => theme_get_setting('gov_footer_menu'),
		);
		
		// Add the BC Government Media Links to the themes 'Toggle Display' options
		$form['theme_settings']['gov_media_links'] = array(
			'#type' => 'checkbox',
			'#title' => t('BC Government Media Links'),
			'#weight' => 101,
			'#default_value' => theme_get_setting('gov_media_links'),
		);
		
	}

?>