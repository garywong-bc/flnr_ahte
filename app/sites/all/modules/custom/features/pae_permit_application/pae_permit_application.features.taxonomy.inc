<?php

/**
 * Implementation of hook_taxonomy_default_vocabularies().
 */
function pae_permit_application_taxonomy_default_vocabularies() {
  return array(
    'activity_type' => array(
      'name' => 'Activity Type',
      'description' => '',
      'help' => '',
      'relations' => '1',
      'hierarchy' => '1',
      'multiple' => '1',
      'required' => '1',
      'tags' => '0',
      'module' => 'features_activity_type',
      'weight' => '-8',
      'nodes' => array(
        'permit' => 'permit',
      ),
    ),
  );
}
