<?php

/**
 * Implements hook_views_default_views().
 */
/*function deckfifty_views_default_views() {
  $files = file_scan_directory(drupal_get_path('module', 'deckfifty'). '/views', '/.*\.inc$/');
  foreach ($files AS $filepath => $file) {
    require $filepath;
    if (isset($view)) {
      $views[$view->name] = $view;
    }
  }

  return $views;
}*/