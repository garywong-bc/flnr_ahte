<?php

/**
 * Implementation of hook_taxonomy_default_vocabularies().
 */
function bcgov_taxonomies_taxonomy_default_vocabularies() {
  return array(
    'mu' => array(
      'name' => 'Mu',
      'description' => '',
      'help' => '',
      'relations' => '1',
      'hierarchy' => '0',
      'multiple' => '1',
      'required' => '1',
      'tags' => '0',
      'module' => 'features_mu',
      'weight' => '0',
      'type' => NULL,
      'nodes' => array(),
    ),
    'region' => array(
      'name' => 'Region',
      'description' => 'Contains all regions',
      'help' => '',
      'relations' => '1',
      'hierarchy' => '1',
      'multiple' => '1',
      'required' => '1',
      'tags' => '0',
      'module' => 'features_region',
      'weight' => '0',
      'nodes' => array(
        'hunting_regulation' => 'hunting_regulation',
        'angling_regulation' => 'angling_regulation',
      ),
    ),
  );
}
