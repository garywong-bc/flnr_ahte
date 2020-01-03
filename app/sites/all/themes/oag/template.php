<?php
/**
 * Implements hook_preprocess_html().
 */
function oag_preprocess_html(&$variables) {
  
  // default paths
  $variables['base_path'] = base_path();
  $variables['path_to_theme'] = drupal_get_path('theme', 'oag');

  // add body classes
  (empty($variables['page']['secondary']) && empty($variables['page']['secondary_bottom'])) ? $variables['classes_array'][] = 'no-secondary' : '';
  (empty($variables['page']['tertiary'])) ? $variables['classes_array'][] = 'no-tertiary' : '';
  (empty($variables['page']['secondary']) && empty($variables['page']['secondary_bottom']) && empty($variables['page']['tertiary'])) ? $variables['classes_array'][] = 'no-secondary-and-tertiary' : '';
  (empty($variables['page']['preface'])) ? $variables['classes_array'][] = 'no-preface' : '';
  (empty($variables['page']['postscript'])) ? $variables['classes_array'][] = 'no-postscript' : '';
  $variables['classes_array'][] = preg_replace('![^abcdefghijklmnopqrstuvwxyz0-9-_]+!s', '', 'menu-item-'. drupal_strtolower(menu_get_active_title()));

  // add unique classes for each section
  if(!$variables['is_front']) {
    $path = explode('/', drupal_get_path_alias($_GET['q']), 3);
    $variables['classes_array'][] = check_plain('section-'. $path[0]);
    $variables['classes_array'][] = check_plain('sub-section-'. (isset($path[1]) ? $path[1] : 'none'));
  }
  // remove redundant classes
  $body_classes = array_diff($variables['classes_array'], array('page-node-', 'no-sidebars'));
  $variables['classes_array'] = $body_classes;

  // Send X-UA-Compatible HTTP header to force IE to use the most recent
  // rendering engine or use Chrome's frame rendering engine if available.
  if (is_null(drupal_get_http_header('X-UA-Compatible'))) {
    drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
  }
  
}

/**
 * Implement hook_html_head_alter().
 */
function oag_html_head_alter(&$head) {
  // Simplify the meta tag for character encoding.
  if (isset($head['system_meta_content_type']['#attributes']['content'])) {
    $head['system_meta_content_type']['#attributes'] = array('charset' => str_replace('text/html; charset=', '', $head['system_meta_content_type']['#attributes']['content']));
  }
}

/**
 * Implements hook_preprocess_page().
 */
//function oag_preprocess_page(&$variables) {}

/**
 * Implements hook_preprocess_maintenance_page().
 */
//function oag_preprocess_maintenance_page(&$variables) {}

/**
 * Implements hook_preprocess_node().
 */
function oag_preprocess_node(&$variables) {
  // node author uid
  $variables['classes_array'][] = 'author-uid-' . $variables['node']->uid;
  // full node or teaser
  ($variables['view_mode'] == 'full' ? $variables['classes_array'][] = 'node-full' : $variables['classes_array'][] = 'teaser');
  // odd/even class for node listings
  $variables['classes_array'][] = $variables['zebra'];
  // node count for node listings
  $variables['classes_array'][] = 'count-' . $variables['id'];
  // clearfix
  $variables['classes_array'][] = 'clearfix';
  
  
  // report pages
  if($variables['node']->type == 'report_page') {

    // private report pages
    if($variables['node']->field_report_page_private['und'][0]['value'] == 1){
      if(user_access('administer nodes')){
        drupal_set_message('You are viewing a private report page.', 'warning');
      } else {
        drupal_set_message('You must be logged in to view private report pages.', 'warning');
        unset($variables['content']);
      }
    }
    
    
  }
}

/**
 * Implements hook_preprocess_block().
 */
function oag_preprocess_block(&$variables) {
  // add classes
  $variables['classes_array'][] = 'region-count-'. $variables['block_id'];
  $variables['classes_array'][] = $variables['block_zebra'];
  $variables['classes_array'][] = 'clearfix';
  $variables['title_attributes_array']['class'][] = 'block-title';
  
  // Use a template with no wrapper for the page's main content.
  if ($variables['block_html_id'] == 'block-system-main') {
    $variables['theme_hook_suggestions'][] = 'block__no_wrapper';
  }
  
}

/**
 * Implements hook_preprocess_comment().
 */
//function oag_preprocess_comment(&$variables) {}



function oag_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    // Adding the title of the current page to the breadcrumb.
    $breadcrumb[] = '<span>'.drupal_get_title().'</span>';
    
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $output .= '<div class="breadcrumb">' . implode(' &rsaquo; ', $breadcrumb) . '</div>';
    return $output;
  }
}