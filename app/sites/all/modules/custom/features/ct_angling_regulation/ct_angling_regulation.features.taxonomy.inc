<?php

/**
 * Implementation of hook_taxonomy_default_vocabularies().
 */
function ct_angling_regulation_taxonomy_default_vocabularies() {
  return array(
    'angling_reg_type' => array(
      'name' => 'Angling Regulations Type',
      'description' => '',
      'help' => '',
      'relations' => '1',
      'hierarchy' => '1',
      'multiple' => '1',
      'required' => '1',
      'tags' => '0',
      'module' => 'features_angling_reg_type',
      'weight' => '0',
      'type' => NULL,
      'nodes' => array(),
    ),
  );
}
