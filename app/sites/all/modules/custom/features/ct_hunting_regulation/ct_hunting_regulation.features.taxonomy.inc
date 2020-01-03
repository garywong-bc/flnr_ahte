<?php

/**
 * Implementation of hook_taxonomy_default_vocabularies().
 */
function ct_hunting_regulation_taxonomy_default_vocabularies() {
  return array(
    'hunting_reg_type' => array(
      'name' => 'Hunting Regulations Type',
      'description' => '',
      'help' => '',
      'relations' => '1',
      'hierarchy' => '1',
      'multiple' => '1',
      'required' => '1',
      'tags' => '0',
      'module' => 'features_hunting_reg_type',
      'weight' => '0',
      'type' => NULL,
      'nodes' => array(),
    ),
  );
}
