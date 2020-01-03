<?php
// $Id: page.tpl.php,v 1.1.2.2.4.2 2011/01/11 01:08:49 dvessel Exp $
?>


<div id="page">
<div id="header">
	<div class="container">
		<a id="top" name="top"></a>
		<div id="header-main-row1">
			<div id="site-logo">
				<a href="http://www2.gov.bc.ca/">
					<img id="bc-logo" src="sites/all/themes/parks/images/logos/logo-bc.png" alt="Government of B.C." title="Government of B.C.">
				</a>
				<img id="bcparks-text" src="sites/all/themes/parks/images/logos/logo-bcparks-text.png" alt="BC Parks" title="BC Parks">
				<?php print render($page['header_row_1']); ?>
			</div>
		</div>
		
		<div id="header-main-row2">
			<div id="banner-nav">
				<?php print render($page['header_row_2']); ?>
			</div>
		</div>
	</div>
</div>

<div id="topNavContainer">
	<nav class="navbar navbar-inverse">
		<div class="container">
			<div id="myNavbar" class="collapse navbar-collapse">
				<?php print render($page['navigation']); ?>
			</div>
		</div>
	</nav>
</div>

<div id="container">
	<div id="content" class="<?php $page["left_sidebar"] ? print "twoCol" : print "oneCol" ?>">
		<!-- page messages -->
		<?php print $messages; ?> <?php print render($page['help']); ?>
		<!-- /page messages -->
		
		<div id="general">
			<?php if ($page['left_sidebar']): ?>
				<div id="leftCol">
					<div id="primaryMenu">
						<?php print render($page['left_sidebar']); ?>
					</div>
				</div>
			<?php endif; ?>
			
			<div id="mainCol">
				
				<?php if ($page['breadcrumb']): ?>
					<div id="breadcrumbs">
						<?php print render($page['breadcrumb']); ?>
					</div>
					<?php print $breadcrumb; ?>
				<?php endif; ?>

				<div id="breadcrumbs">
					<?php print $breadcrumb; ?>
				</div>
				
				<?php if ($page['right_sidebar']): ?>
					<div class="sideBarContainer">
						<div class="sideBar">
							<?php print render($page['right_sidebar']); ?>
						</div>
					</div>
				<?php endif; ?>
				
				<h1><?php print $title; ?></h1>
				
				<?php print render($page['content']); ?>
			</div>
		</div>
	</div>
</div>



<div id="footer">
	<div id="social-media">
		<p>Follow Us On</p>
		<div id="social-media-icons">
			<?php print render($page['social_media']); ?>
		</div>
	</div>
	
	<div id="footerLinksContainer">
		<div id="footerLinks">
			<?php print render($page['footer_links']); ?>
		</div>
	</div>
</div>
</div>

