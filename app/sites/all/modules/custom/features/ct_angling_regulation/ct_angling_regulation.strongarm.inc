<?php

/**
 * Implementation of hook_strongarm().
 */
function ct_angling_regulation_strongarm() {
  $export = array();

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_angling_regulation';
  $strongarm->value = array(
    'title' => '-5',
    'revision_information' => '10',
    'author' => '9',
    'options' => '11',
    'comment_settings' => '14',
    'menu' => '-1',
    'taxonomy' => '-3',
    'path' => '13',
    'attachments' => '12',
  );
  $export['content_extra_weights_angling_regulation'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_angling_regulation';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_angling_regulation'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_angling_regulation';
  $strongarm->value = '1';
  $export['upload_angling_regulation'] = $strongarm;

  return $export;
}
