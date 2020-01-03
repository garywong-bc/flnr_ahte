<?php

/**
 * Implementation of hook_flag_default_flags().
 */
function faw_archive_flag_default_flags() {
  $flags = array();
  // Exported flag: "Archive".
  $flags['archive'] = array(
    'content_type' => 'node',
    'title' => 'Archive',
    'global' => '1',
    'types' => array(
      '0' => 'angling_regulation',
      '1' => 'hunting_regulation',
      '2' => 'permit',
    ),
    'flag_short' => 'Add to archive',
    'flag_long' => '',
    'flag_message' => '',
    'unflag_short' => 'Remove from archive',
    'unflag_long' => '',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'roles' => array(
      'flag' => array(
        '0' => 3,
      ),
      'unflag' => array(
        '0' => 3,
      ),
    ),
    'show_on_page' => 1,
    'show_on_teaser' => 1,
    'show_on_form' => 0,
    'access_author' => '',
    'i18n' => 0,
    'module' => 'faw_archive',
    'locked' => array(
      '0' => 'name',
    ),
    'api_version' => 2,
  );
  return $flags;
}

/**
 * Implementation of hook_views_api().
 */
function faw_archive_views_api() {
  return array(
    'api' => '2',
  );
}
