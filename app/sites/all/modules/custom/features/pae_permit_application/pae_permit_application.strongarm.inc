<?php

/**
 * Implementation of hook_strongarm().
 */
function pae_permit_application_strongarm() {
  $export = array();

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_permit';
  $strongarm->value = 0;
  $export['comment_anonymous_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_controls_permit';
  $strongarm->value = '3';
  $export['comment_controls_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_permit';
  $strongarm->value = '2';
  $export['comment_default_mode_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_order_permit';
  $strongarm->value = '1';
  $export['comment_default_order_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_permit';
  $strongarm->value = '30';
  $export['comment_default_per_page_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_permit';
  $strongarm->value = '1';
  $export['comment_form_location_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_permit';
  $strongarm->value = '0';
  $export['comment_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_permit';
  $strongarm->value = '0';
  $export['comment_preview_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_permit';
  $strongarm->value = '0';
  $export['comment_subject_field_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'content_extra_weights_permit';
  $strongarm->value = array(
    'title' => '-5',
    'revision_information' => '10',
    'author' => '11',
    'options' => '12',
    'comment_settings' => '14',
    'menu' => '9',
    'taxonomy' => '8',
    'path' => '13',
  );
  $export['content_extra_weights_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_permit';
  $strongarm->value = array(
    0 => 'status',
    1 => 'revision',
  );
  $export['node_options_permit'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'upload_permit';
  $strongarm->value = '1';
  $export['upload_permit'] = $strongarm;

  return $export;
}
