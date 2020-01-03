<?php

/**
 * @file
 * Default print module template
 *
 * @ingroup print
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php print $print['language']; ?>" xml:lang="<?php print $print['language']; ?>">
	<head>
		<?php print $print['head']; ?>
		<?php print $print['base_href']; ?>
		<title><?php print $print['title']; ?></title>
		<?php print $print['scripts']; ?>
		<?php print $print['sendtoprinter']; ?>
		<?php print $print['robots_meta']; ?>
		<?php print $print['favicon']; ?>
		<?php print $print['css']; ?>
	</head>
	<body>
  
		<div class="print-content container-16">
			<div class ="grid-12">
				<h2 id="site-name">
					<?php print $print['original_site_name']; ?>
				</h2>
			</div>
			<div class="grid-4">
				<h3>
					<a class="print-page-button" href="#" onclick="window.print(); return false;">
						<img title="Print Page" alt="Print Page" src="/drupal/sites/all/modules/print/icons/print_icon.gif">
						Print Page
					</a>
				</h3>
			</div>
			<div class ="grid-12">
				<?php print $print['content']?>
			</div>
			<div class="grid-4">			
				<?php if ($print['sidebar_second']): ?>
					<div id="sidebar-right" class="column sidebar region grid-4"> <?php print render($print['sidebar_second']); ?> </div>
				<?php endif; ?>
			</div>
		</div>
	</body>
</html>

