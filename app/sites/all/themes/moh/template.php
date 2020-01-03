<?php
// $Id: template.php,v 1.1.2.6.4.2 2011/01/11 01:08:49 dvessel Exp $

/**
 * The default group for NineSixty framework CSS files added to the page.
 */
define('CSS_NS_FRAMEWORK', -200);


/** 
 *Include the gov_menu include
 */
if (theme_get_setting('gov_menu')) {
	require_once drupal_get_path('theme', 'moh') . '/includes/gov_menu/gov_menu.inc';	
}


/**
 * Implements hook_preprocess_html
 */
function moh_preprocess_html(&$vars) {
  
  // If Government Menu is enabled, let's set the variables
  if ( theme_get_setting( 'gov_menu' ) ) {
    // Add the CSS required for the gov menu
    drupal_add_css( drupal_get_path( 'theme', 'moh' ) . '/includes/gov_menu/css/cmf_top_site_navigation.css', 
      array(
          'weight' => 9999, 
          'media' => 'screen',
       )
    );
    
    // Add the JS required for the gov menu
    drupal_add_js( drupal_get_path( 'theme', 'moh' ) . '/includes/gov_menu/js/jquery.easing.1.3.js', 'file' );
    drupal_add_js( drupal_get_path( 'theme', 'moh' ) . '/includes/gov_menu/js/navigation_global.js', 'file' );
  }
  
  if ( theme_get_setting( 'gov_footer_menu' ) ) {
    // Add the CSS required for the gov menu
    drupal_add_css( drupal_get_path( 'theme', 'moh' ) . '/includes/gov_menu/css/cmf_footer.css' );
  }
  
}

function moh_menu_link($variables) {
		
  $element = $variables['element'];
	$sub_menu = '';
	if (user_is_logged_in() == FALSE) {
		if ($element['#href'] != 'user/logout' && $element['#title'] != 'My Account') {
			if ($element['#below']) {
				$sub_menu = drupal_render($element['#below']);
			}
			
			/* Redirect users back to the previous page after logging in */
			if ($element['#title'] == 'Login'){
        $query = drupal_get_destination();
        $path = $query['destination'];
        $query['destination'] = drupal_get_path_alias( $path );
				$output = l("Login", "account/", array('query' => $query), $element['#localized_options']);
			}
			else {
				$output = l($element['#title'], $element['#href'], $element['#localized_options']);
			}
			return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
		}	
	}
	else {
		if ($element['#title'] != 'Login') {
			if ($element['#below']) {
				$sub_menu = drupal_render($element['#below']);
			}
			if ($element['#title'] == 'Logout'){
				$output = l("Logout", "user/logout", array(), $element['#localized_options']);
			}
			else {
				$output = l($element['#title'], $element['#href'], $element['#localized_options']);
			}
			return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
		}
		
	}
	
	
}

/**
 * Preprocessor for page.tpl.php template file.
 */
function moh_preprocess_page(&$vars, $hook) {

	if ( drupal_is_front_page() ) {
       drupal_set_title('');
   }

  // If Government Menu is enabled, let's set the variables
  if ( theme_get_setting( 'gov_menu' ) ) {
	$vars['gov_menu'] = TRUE; 
	$vars['service_header'] = load_element( 'services_header' ); 
    $vars['navigation'] = load_element( 'navigation' ); 
    $vars['flyouts'] = load_element( 'flyouts' ); 	
  }
  
  if ( theme_get_setting( 'gov_footer_menu' ) ) {	
	$vars['gov_footer_menu'] = load_element( 'footer_theme_links_container' ); 	
  }
  
  if ( theme_get_setting( 'gov_media_links' ) ) {	
	$vars['gov_media_links'] = load_element( 'media_links' ); 	
  }
    
  // For easy printing of variables.
  $vars['logo_img'] = '';
  if (!empty($vars['logo'])) {
    $vars['logo_img'] = theme('image', array(
      'path'  => $vars['logo'],
      'alt'   => t('Ministry of Forests, Lands and Natural Resource Operations’ Angling, Hunting and Trapping Engagement'),
      'title' => t('Ministry of Forests, Lands and Natural Resource Operations’ Angling, Hunting and Trapping Engagement'),
    ));
  }
  $vars['linked_logo_img']  = '';
  if (!empty($vars['logo_img'])) {
    $vars['linked_logo_img'] = l($vars['logo_img'], '<front>', array(
      'attributes' => array(
        'rel'   => 'Ministry of Forests, Lands and Natural Resource Operations’ Angling, Hunting and Trapping Engagement',
        'title' => t('Ministry of Forests, Lands and Natural Resource Operations’ Angling, Hunting and Trapping Engagement'),
      ),
      'html' => TRUE,
    ));
  }
  $vars['linked_site_name'] = '';
  if (!empty($vars['site_name'])) {
    
	$vars['linked_site_name'] = l($vars['site_name'], '<front>', array(
      'attributes' => array(
        'rel'   => 'home',
        'title' => $vars['site_name'],
      ),
	  'html' => TRUE,
    ));
  }

  // Site navigation links.
  $vars['main_menu_links'] = '';
  if (isset($vars['main_menu'])) {
    $vars['main_menu_links'] = theme('links__system_main_menu', array(
      'links' => $vars['main_menu'],
      'attributes' => array(
        'id' => 'main-menu',
        'class' => array('inline', 'main-menu'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));

  }
  $vars['secondary_menu_links'] = '';
  if (isset($vars['secondary_menu'])) {
    $vars['secondary_menu_links'] = theme('links__system_secondary_menu', array(
      'links' => $vars['secondary_menu'],
      'attributes' => array(
        'id'    => 'secondary-menu',
        'class' => array('inline', 'secondary-menu'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }
  
  /*$menu_tree = menu_tree_all_data('main-menu');
  $tree_output_prepare = menu_tree_output($menu_tree);
  $vars['main_menu_tree'] = drupal_render($tree_output_prepare); */ 
  
  
  $vars['menu_footer_links'] = theme('links__system_main_menu', array(
	  'links' => menu_navigation_links('menu-footer-links'),
	  'attributes' => array(
        'id' => 'main-menu',
        'class' => array('inline', 'main-menu'),
      ),
      'heading' => array(
        'text' => t('Footer menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
	));	  

}

/*
Implements hook_preprocess_node
 
function moh_preprocess_node(&$vars) {
  
}*/

function moh_preprocess_comment(&$variables) {

  global $user;
  
  // Retrieve the node object
  if (arg(0) == 'node' && is_numeric(arg(1))) {
    $node = &$variables['node'];
	}

  $user_has_commented = db_query("SELECT cid FROM {comment} WHERE nid = :nid AND uid = :uid", array(':nid' => $node->nid, ':uid' => $user->uid))->fetchField();

  if ($user_has_commented) {
    unset($variables['content']['links']['comment']['#links']['comment-reply']);
  }
}

/**
 * Contextually adds 960 Grid System classes.
 *
 * The first parameter passed is the *default class*. All other parameters must
 * be set in pairs like so: "$variable, 3". The variable can be anything available
 * within a template file and the integer is the width set for the adjacent box
 * containing that variable.
 *
 *  class="<?php print ns('grid-16', $var_a, 6); ?>"
 *
 * If $var_a contains data, the next parameter (integer) will be subtracted from
 * the default class. See the README.txt file.
 */
function ns() {
  $args = func_get_args();
  $default = array_shift($args);
  // Get the type of class, i.e., 'grid', 'pull', 'push', etc.
  // Also get the default unit for the type to be procesed and returned.
  list($type, $return_unit) = explode('-', $default);

  // Process the conditions.
  $flip_states = array('var' => 'int', 'int' => 'var');
  $state = 'var';
  foreach ($args as $arg) {
    if ($state == 'var') {
      $var_state = !empty($arg);
    }
    elseif ($var_state) {
      $return_unit = $return_unit - $arg;
    }
    $state = $flip_states[$state];
  }

  $output = '';
  // Anything below a value of 1 is not needed.
  if ($return_unit > 0) {
    $output = $type . '-' . $return_unit;
  }
  return $output;
}


/**
* Implements hooks_links__system_main_menu.
*
* moh_links__system_main_menu overrides default main_menu function. Converts
* the menu to table so that links automatically are centered in the box. Also adds
* a spliter to the td to maintain look and feel of the Gov 2.0 style
**/


/**
 * Implements hook_menu_alter.
 *
 * This hides certain menu items based on whether the user is logged in or not.
 */
 



 
/**
 * Implements hook_css_alter.
 * 
 * This rearranges how the style sheets are included so the framework styles
 * are included first.
 *
 * Sub-themes can override the framework styles when it contains css files with
 * the same name as a framework style. This mirrors the behavior of the 6--1
 * release of moh warts and all. Future versions will make this obsolete.
 */
function moh_css_alter(&$css) {
  global $theme_info, $base_theme_info;
  	
  // Dig into the framework .info data.
  $framework = !empty($base_theme_info) ? $base_theme_info[0]->info : $theme_info->info;

  // Ensure framework CSS is always first.
  $on_top = CSS_NS_FRAMEWORK;

  // Pull framework styles from the themes .info file and place them above all stylesheets.
  if (isset($framework['stylesheets'])) {
    foreach ($framework['stylesheets'] as $media => $styles_from_960) {
      foreach ($styles_from_960 as $style_from_960) {
        // Force framework styles to come first.
        if (strpos($style_from_960, 'framework') !== FALSE) {
          $css[$style_from_960]['group'] = $on_top;
          // Handle styles that may be overridden from sub-themes.
          foreach (array_keys($css) as $style_from_var) {
            if ($style_from_960 != $style_from_var && basename($style_from_960) == basename($style_from_var)) {
              $css[$style_from_var]['group'] = $on_top;
            }
          }
        }
      }
    }
  }
}

