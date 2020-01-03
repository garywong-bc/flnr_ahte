<?php

/**
 * Implementation of hook_strongarm().
 */
function ct_hunting_regulation_strongarm() {
  $export = array();

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_hunting_regulation';
  $strongarm->value = array(
    'title' => '-5',
    'body_field' => '0',
    'revision_information' => '20',
    'author' => '20',
    'options' => '25',
    'comment_settings' => '30',
    'menu' => '-2',
    'path' => '30',
    'attachments' => '30',
  );
  $export['content_extra_weights_hunting_regulation'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_hunting_regulation';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_hunting_regulation'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_hunting_regulation';
  $strongarm->value = '1';
  $export['upload_hunting_regulation'] = $strongarm;

  return $export;
}
