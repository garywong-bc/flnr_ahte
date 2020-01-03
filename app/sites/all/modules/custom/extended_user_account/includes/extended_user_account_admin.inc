<?php 

	function extended_user_account_terms(){  
	
		$default = array(
			'value' => "<p>Do you want to subscribe to our email notifications where you will receive up-to-date information on new hunting and angling regulations. Interested in receiving information on a specific topic? Click on the topic(s) in the list below that interest you. You may change your subscription preferences at any time.</p>",
			'format' => 'full_html',
		);

		$extended_user_account_notification_text = variable_get('extended_user_account_notification_text', $default);		
		$form['extended_user_account_notification_text'] = array(
			'#title' => t('Email Notification Text'),
			'#type' => 'text_format',
			'#rows' => 5,
			'#format' => 'full_html',
			'#required' => TRUE,
			'#description' => t('This is the block content for the subscriptions block for users that already subscribe to this content.'),
			'#default_value' => check_markup( $extended_user_account_notification_text['value'], $extended_user_account_notification_text['format'] ),
			'#group' => 'messages',
		);

		$extended_user_account_terms = variable_get('extended_user_account_terms', 'Terms of Use.');		
		$form['extended_user_account_terms'] = array(
			'#title' => t('Terms of Use'),
			'#type' => 'text_format',
			'#rows' => 5,
			'#format' => 'full_html',
			'#required' => TRUE,
			'#description' => t('This is the block content for the subscriptions block for users that already subscribe to this content.'),
			'#default_value' => check_markup( $extended_user_account_terms['value'], $extended_user_account_terms['format'] ),
			'#group' => 'messages',
		);
		
		return system_settings_form($form);
	}
?>