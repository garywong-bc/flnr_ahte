<?php

/**
 * Implementation of hook_ctools_plugin_api().
 */
function pae_permit_application_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => 1);
  }
}

/**
 * Implementation of hook_node_info().
 */
function pae_permit_application_node_info() {
  $items = array(
    'permit' => array(
      'name' => t('Notice of Intent'),
      'module' => 'features',
      'description' => t('An Applications for a Park Use Permit.'),
      'has_title' => '1',
      'title_label' => t('Tracking Number'),
      'has_body' => '0',
      'body_label' => '',
      'min_word_count' => '0',
      'help' => '',
    ),
  );
  return $items;
}

/**
 * Implementation of hook_views_api().
 */
function pae_permit_application_views_api() {
  return array(
    'api' => '2',
  );
}
