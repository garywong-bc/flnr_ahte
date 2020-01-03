<?php

/**
 * Implementation of hook_content_default_fields().
 */
function ct_user_profiles_content_default_fields() {
  $fields = array();

  // Exported field: field_profile_city
  $fields['profile-field_profile_city'] = array(
    'field_name' => 'field_profile_city',
    'type_name' => 'profile',
    'display_settings' => array(
      'label' => array(
        'format' => 'above',
        'exclude' => 0,
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '1',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '60',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_profile_city][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'City',
      'weight' => '-4',
      'description' => 'Enter your city',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Exported field: field_profile_consent
  $fields['profile-field_profile_consent'] = array(
    'field_name' => 'field_profile_consent',
    'type_name' => 'profile',
    'display_settings' => array(
      'label' => array(
        'format' => 'above',
        'exclude' => 0,
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'off
on|Allow the BC Government to send you E-mails?',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => 'off',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Email Consent',
      'weight' => 0,
      'description' => 'I agree my E-mail address may be used by the BC Government for survey
purposes, and to notify individuals of changes to the AHTE site,
including updates to regulation proposals, decision documents, and
regulation changes. The BC Government will not release my email for
any other reason.',
      'type' => 'optionwidgets_onoff',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_profile_notification
  $fields['profile-field_profile_notification'] = array(
    'field_name' => 'field_profile_notification',
    'type_name' => 'profile',
    'display_settings' => array(
      'label' => array(
        'format' => 'above',
        'exclude' => 0,
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'off
on|Do you want to receive notifications?',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => 'off',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Email Notification',
      'weight' => '-1',
      'description' => 'Check this box, if you want to get notified about decisions, surveys or further consultation/clarification of comments.<br>
Alternatively, you can follow our [[RSS feed]]',
      'type' => 'optionwidgets_onoff',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_profile_organization
  $fields['profile-field_profile_organization'] = array(
    'field_name' => 'field_profile_organization',
    'type_name' => 'profile',
    'display_settings' => array(
      'label' => array(
        'format' => 'above',
        'exclude' => 0,
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '1',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => 'ffs|Freshwater Fisheries Society	
bcta|B.C Trappers Association
wssbc|Wild Sheep Society of B.C.
bcdf|B.C. Federation of Drift Fishers
bcff|B.C Federation of Fly Fishers	
bcwf|B.C Wildlife Federation
bcfroa|B.C Fishing Resorts and Outfitters Association United Bow Hunters of B.C.
goab|Guide Outfitters Association of B.C.	
sfibc|Sport Fishing Institute of B.C	
non_affiliated|Non-affiliated
other|Other',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Organization',
      'weight' => '-3',
      'description' => 'Choose your organization. ',
      'type' => 'optionwidgets_buttons',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_profile_other_org
  $fields['profile-field_profile_other_org'] = array(
    'field_name' => 'field_profile_other_org',
    'type_name' => 'profile',
    'display_settings' => array(
      'label' => array(
        'format' => 'above',
        'exclude' => 0,
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'token' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '60',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_profile_other_org][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Other',
      'weight' => '-2',
      'description' => 'Enter the name of your organization in case it is not listed above.',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('City');
  t('Email Consent');
  t('Email Notification');
  t('Organization');
  t('Other');

  return $fields;
}
