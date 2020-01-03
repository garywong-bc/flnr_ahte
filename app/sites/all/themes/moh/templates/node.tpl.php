<?php

/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined, e.g. $node->body becomes $body. When needing to access
 * a field's raw values, developers/themers are strongly encouraged to use these
 * variables. Otherwise they will have to explicitly specify the desired field
 * language, e.g. $node->body['en'], thus overriding any language negotiation
 * rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 */

global $base_path;

$date = date('Y-m-d');
$current_date = new DateTime($date);
$closing_date = null;
if ( !empty($node->field_closing_date) ) {
	$closing = $node->field_closing_date['und'][0]['value'];
	$closing_date = new DateTime($closing);
}
else {
	$closing_date = FALSE;
}

  global $user;

  $admin = user_role_load_by_name('administrator');
  $ahte_admin = user_role_load_by_name('ahte_administrator');
?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php print $user_picture; ?>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted): ?>
    <div class="submitted">
      <?php print $submitted; ?>
    </div>
  <?php endif; ?>

  <div class="content"<?php print $content_attributes; ?>>
    <?php
		global $user;
		// We hide the comments and links now so that we can render them later.
		hide($content['comments']);
		hide($content['links']);
		hide($content['rate_support_tally']);
	?>
		
	<?php
		if ($type == 'angling_regulation' || $type == 'hunting_regulation') {

			if (user_has_role($admin->rid) || user_has_role($ahte_admin->rid)) {
				print '<p><strong><a class="export-button" href="' . $base_path . 'export-comments/all/' . $node->nid . '">Export comments</a></strong></p>';
			}

			//print '<p><strong><a href="#comments">Post comments</a></strong></p>';
		}
		print render($content);
	?>
	</div>

	<div class="rate-wrapper"<?php print $content_attributes; ?>>
    <?php	
		// Display voting widget if user is logged in, otherwise display link to login page
		if ( $user->uid ) {						
			if ( $closing_date ) {				
				if ($current_date <= $closing_date) {
					echo "<h2 class=\"title\">Level of Support</h2><p><strong>Please Note: You must select your level of support before you can leave a comment.</strong></p>";
					print render($content['rate_support_tally']);
				}
			} else {
				hide($content['rate_support_tally']);
			}			
		} else {
			hide($content['rate_support_tally']);
			hide($content['rate_support_tally']['#title']);
		}		
    ?>
	</div>

	<?php
		/*	
			Set the comment section to hide by default.
			If the user has voted on the regulation display the comment section, otherwise keep it hidden.
		*/	
		$comment_style = 'none';
		$user_has_voted = db_query("SELECT vote_id FROM {votingapi_vote} WHERE entity_id = :nid AND uid = :uid", array(':nid' => $node->nid, ':uid' => $user->uid))->fetchField();

		if ($user_has_voted || user_has_role($ahte_admin->rid)) {
			$comment_style = 'block';
		}

		$user_has_commented = db_query("SELECT cid FROM {comment} WHERE nid = :nid AND uid = :uid", array(':nid' => $node->nid, ':uid' => $user->uid))->fetchField();

	?>

	<div class="comment-wrapper" id="comment-wrapper" style="display:<?php print $comment_style; ?>" <?php print $content_attributes; ?>>
	<?php	
		// Display comments if user is logged in, otherwise display link to login page
		if ( $user->uid) {			
			//if ( ) {
				
				// If the regulation isn't closed, or the user is an AHTE administrator, display the comments
				if (user_has_role($ahte_admin->rid)) {
					print render($content['comments']['comments']);
				}
				elseif ( $closing_date && $current_date <= $closing_date) {

					// Hide the comment submission form if the user has already left a comment
					if ($user_has_commented) {
						echo "<h2 class=\"title\">Comments</h2>";
						hide($content['comments']['comment_form']);
					}
					else {
						echo "<h2 class=\"title\">Leave a Comment</h2>";
						print render($content['comments']['comment_form']);
					}
					
					print render($content['comments']['comments']);
				} 
				else {
					print('<strong id="comments">Comments are closed.</strong>');
				}
			//} /*else {
				//hide($content['comments']);
			//}*/			
		} else {
			print '<div id="comments">';
			print l("Log in to post comments","account",array(
				'query' => drupal_get_destination(),
				'fragment' => 'comments')
			);
			print '</div>';
		}		
    ?>
  </div>

</div>
