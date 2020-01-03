<?php 
	
	function extended_user_account_form($form, &$form_state) {

		module_load_include('inc', 'siteminder');
	
		global $user;
		
		$siteminder = new Siteminder();

		if ( user_is_logged_in() ) {
			$account = user_load($user->uid);
		} else {
			$userAccountExists = $siteminder->userAccountExists();
			
			if ( $userAccountExists ) {
				$siteminder->userLogin();
				drupal_goto( drupal_get_destination() );
			} else {
				$siteminder->createUserAccount();
				drupal_goto( current_path() );
			}
			
			$account = $siteminder->account;
		}
		
		if (isset($_SESSION['registration_incomplete'])) {
			form_set_error('accept_terms', 'Please complete account registration.');
			unset($_SESSION['registration_incomplete']);
		}		
		
		$form = array();
				
		$form['name'] = array(
			'#type' => 'hidden',
			'#default_value' => $account->name,
			'#required' => TRUE,
		);
		
		$form['city'] = array(
			'#type' => 'textfield',
			'#title' => t('City:'),
			'#maxlength' => USERNAME_MAX_LENGTH,
			'#description' => 'Enter your city.',
			'#default_value' => $account->field_profile_city['und'][0]['value'],
			'#required' => TRUE,
		);

		$form['residence'] = array(
			'#type' => 'select',
			'#title' => t('Residency:'),
			'#options' => array(
				0 => t('Resident'),
				1 => t('Non-resident'),
				2 => t('Non-resident Alien'),
			),
			'#description' => 'Indicate whether you are a resident of B.C.',
			'#default_value' => isset($account->field_profile_residence['und']) ? $account->field_profile_residence['und'][0]['value']: '',
			'#required' => TRUE,
		);
		
		$default_value = array();
		$account_organization_array = isset($account->field_organization['und']) ? $account->field_organization['und']: array();
		
		foreach ($account_organization_array as $organization) {
			array_push($default_value, $organization['tid']);
		}
		
		$form['organization'] = array(
			'#type' => 'checkboxes',
			'#options' => get_taxonomy_terms('organization'),
			'#title' => t('Choose your organization.'),
			'#description' => 'Choose your organization.',
			'#required' => TRUE,
			'#default_value' => $default_value,
		);
		
		$form['other'] = array(
			'#type' => 'textfield',
			'#title' => t('Other:'),
			'#maxlength' => USERNAME_MAX_LENGTH,
			'#description' => 'Enter the name of your organization in case it is not listed above.',
			'#default_value' => isset($account->field_profile_other_org['und']) ? $account->field_profile_other_org['und'][0]['value']: '',
			'#states' => array(
				// Hide the settings when the cancel notify checkbox is disabled.
				'visible' => array(
					':input[id="edit-organization-265"]' => array('checked' => TRUE),
				),
			),
			//'#required' => TRUE,
		);
		
		// Email Address
		$form['mail'] = array(
			'#type' => 'textfield',
			'#title' => t('E-mail Address:'),
			'#maxlength' => EMAIL_MAX_LENGTH,
			'#default_value' => $account->mail,
			'#description' => 'A valid email address must be used. All emails from the system will be sent to this address. The email address will be used if you wish to receive a new password, have chosen to opt-in for newsletters and to receive comment notifications.',
			'#required' => TRUE,
		);
		
		$form['email_preferences'] = array(
			'#type' => 'item',
			'#prefix' => '<div id="email-preferences" class="column">',
			'#suffix' => '</div>',
		);
		
		// Simplenews Integration
		module_load_include('module', 'simplenews');
		module_load_include('inc', 'simplenews', 'includes/simplenews.subscription');
		$subscriber = simplenews_subscriber_load_by_mail($account->mail);
	
		$form['email_preferences']['label'] = array(
			'#markup' => '<h2>Manage Your Email Notifications:</h2>',
		);

		$notification_text = variable_get('extended_user_account_notification_text', '');		
		$form['email_preferences']['description'] = array(
			'#markup' => $notification_text['value'],
		);
	
	    $options = array();
		$default_value = array();

		// Get newsletters for subscription form checkboxes.
		// Newsletters with opt-in/out method 'hidden' will not be listed.
		foreach (simplenews_category_get_visible() as $newsletter) {
			$name = check_plain(_simplenews_newsletter_name($newsletter));
			$description = $newsletter->description;
			$class = strtolower(drupal_clean_css_identifier($newsletter->name));
			$options[$newsletter->tid] = '<span class="newsletter-label ' . $class . '">' . $name . '</span>: ' . $description;
			$default_value[$newsletter->tid] = FALSE;
		}

		if ( $subscriber ) {
			$default_value = array_merge($default_value, $subscriber->tids);
		}
	
		$form['email_preferences']['newsletters'] = array(
			'#type' => 'checkboxes',
			'#options' => $options,
			'#default_value' => $default_value,
		);
		
		$terms = variable_get('extended_user_account_terms', '');
		
		$form['terms'] = array(
			'#type' => 'markup',
			'#markup' => $terms['value'],
		);		
		
		$form['accept_terms'] = array(
			'#type' => 'checkbox',
			'#title' => '<span>I agree with these terms.</span>',
			'#default_value' => $account->field_accept_terms && $account->field_accept_terms['und'] ? $account->field_accept_terms['und'][0]['value'] : FALSE,
			'#required' => TRUE,
		);		
		
		// Buttons
		$form['buttons'] = array(
			'#type' => 'item',
			'#prefix' => '<div id="buttons">',
			'#suffix' => '</div>',
		);
		
		$form['buttons']['submit'] = array(
			'#type' => 'submit', 
			'#value' => t('Update'), 
		);

		if ( Siteminder::verifyUserAccount() ){
			$form['buttons']['delete'] = array(
				'#markup' => '<a class="delete-account" href="' . current_path() . '/delete" class="delete-account">Delete Account</a>', 
			);
		}

		// Call the form validation for the account details updates
		$form['#validate'][] = 'extended_user_account_details_form_validate';
		
		// Call the form submit for the account detail updates.
		$form['#submit'][] = 'extended_user_account_details_form_submit';
				
		return $form;	
	
	}

	/**
	 * Delete Form
	 */
	function extended_user_account_delete_form($form, &$form_state){
		
		$form = array();

		$form['redirect'] = array(
			'#type' => 'hidden',
			'#value' => current_path(),
		);		

		$form['message'] = array(
			'#markup' => '<p>Are you sure you want to delete your user account?</p>',
		);
		
		$form['cancel'] = array(
			'#type' 	=> 'submit', 
			'#value' 	=> t('Cancel'), 
			'#submit' 	=> array('extended_user_account_delete_form_cancel'),
		);
		
		$form['submit'] = array(
			'#type' 	=> 'submit', 
			'#value' 	=> t('Delete Account'), 
			'#submit'	=> array('extended_user_account_delete_form_submit'),
		);

		return $form;

	}

	
	/**
	 * Cancel Delete Account
	 */
	function extended_user_account_delete_form_cancel($form, &$form_state){
		drupal_goto('<front>');
	}


	/**
	 * Delete Account
	 */
	function extended_user_account_delete_form_submit($form, &$form_state){
		global $user;
		user_delete( $user->uid );
		$form_state['redirect'] = '<front>';
	}


	function get_taxonomy_terms($id) {

		// Grabbing organization taxonomy terms
		$vocabulary = taxonomy_vocabulary_machine_name_load($id); 
		$terms = entity_load('taxonomy_term', FALSE, array('vid' => $vocabulary->vid));
		
		$options = array();
		
		foreach($terms as $term) {		
			$options[$term->tid] = t($term->name);
		}
		
		return $options;
}	

