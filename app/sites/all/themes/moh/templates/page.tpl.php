<?php
// $Id: page.tpl.php,v 1.1.2.2.4.2 2011/01/11 01:08:49 dvessel Exp $

	
?>

<div id="page">
	
	<?php if ( $gov_menu ): ?>
	<div id="gov-menu-wrapper">
		<div id="gov-menu" class="container-12 clearfix">
			<div id="overlay"></div>
			<?php print $navigation; ?>
			<?php print $flyouts; ?>
		</div>
	</div>
	<?php endif; ?>
	
	<!-- site-header -->
	<div id="site-header" class="clearfix">
		<div id="branding" class="container-12 clearfix">
			
			<?php if ($linked_logo_img): ?>
				<span id="logo" class="grid-3 alpha"><?php print $linked_logo_img; ?></span>
			<?php endif; ?>
      
			<?php if ($linked_site_name): ?>
				<h1 id="site-name" class="grid-4 alpha"><?php print $linked_site_name; ?></h1>
			<?php endif; ?>
			
			<?php if ($page['search_box']): ?>
				<div id="search-box" class="grid-5 omega"><?php print render($page['search_box']); ?></div>
			<?php endif; ?>
		</div>
	</div>
	<!-- /site-header -->
  
  
	<!-- header -->
	<?php if ($page['header']): ?>
		<div id="header-region" class="region clearfix"> 
		<div id="site-menu">
	<!-- navigation -->
		
			<div id="main-nav">
				<div class="container-12">
					<?php print render($page['header']); ?>
				</div>
			</div>			
		
		  
		<?php if ($secondary_menu_links): ?>
			<div id="second-nav"> 
				<div class="container-12">
					<?php print $secondary_menu_links; ?>
				</div>
			</div>
		<?php endif; ?>
	</div>  
	
	
	</div>
	<?php endif; ?>
    <!-- /header -->
  
</div>
  
<?php if ($breadcrumb || $page['print_share_email']): ?>
	<div id="breadcrumb-share" class="container-16 clearfix">
		<!-- breadcrumb -->
		<div id="breadcrumbs" class="grid-12 column alpha clearfix"> 
			<?php print $breadcrumb; ?>
		</div>
		<!-- breadcrumb -->

		<!-- print-share-email -->
		<?php if ($page['print_share_email']): ?>
		<div id="print-email-share" class="grid-4 column omega clearfix <?php if (!$breadcrumb) echo "no-breadcrumbs"; ?>"> 
			<span class="share"><a class="addthis_button" href="http://www.addthis.com/bookmark.php">Share</a></span>
			<?php print render($page['print_share_email']); ?> 
		</div>
		<?php endif; ?>
		<!-- /print-share-email -->
		
	</div>
<?php endif; ?>
  
<!-- main -->
<div id="content" class="container-16 clearfix">
		
	<!-- sidebar-first -->
	<?php if ($page['sidebar_first']): ?>
		<div id="sidebar-left" class="column sidebar region grid-3 alpha">
			<?php print render($page['sidebar_first']); ?>
		</div>
	<?php endif; ?>
	<!-- /sidebar-first -->
	
	<div id="main" class="column <?php print ns('grid-16', $page['sidebar_first'], 3, $page['sidebar_second'], 5) ?>">
		
		<!-- page title -->
		<?php print render($title_prefix); ?>
		<?php if ($title): ?>
			<h1 class="title" id="page-title">
				<?php print $title; ?>
			</h1>
		<?php endif; ?>
		<?php print render($title_suffix); ?>
		
		<!-- /page-title -->
			
		<!-- page messages -->
		<?php print $messages; ?> <?php print render($page['help']); ?>
		<!-- /page messages -->		
		
		<!-- tabs -->
		<?php if ($tabs): ?>
			<div class="tabs">
				<?php print render($tabs); ?>
			</div>
		<?php endif; ?>
		<!-- /tabs -->
		
		<!-- highlighted -->
		<?php if ($page['highlighted']): ?>
			<div id="highlighted" class="grid-12">
				<?php print render($page['highlighted']); ?>
			</div>
		<?php endif; ?>
		<!-- /highlighted -->
		
		<!-- content -->
		<div id="main-content" class="region clearfix">
			<?php print render($page['content']); ?>
			<?php print render($page['lower_content']); ?>
		</div>
		<!-- /contentn -->
		
		<!-- feed -->
		<?php print $feed_icons; ?>
		<!-- /feed -->

	</div>
	<!-- /main -->
					
	<!-- sidebar-second -->
	<?php if ($page['sidebar_second']): ?>
		<div id="sidebar-right" class="grid-5 column sidebar region omega clear-fix"> 
			<?php print render($page['sidebar_second']); ?>
		</div>
	<?php endif; ?>
	<!-- /sidebar-second -->

</div>
<!-- /content container -->
  
<div id="site-menu-footer">
<!-- navigation -->
	<?php if ($menu_footer_links): ?>
		<div id="main-nav-footer">
			<div class="container-12">
				<?php print $menu_footer_links; ?> 
			</div>
		</div>			
	<?php endif; ?>				
</div>

<!-- footer -->


<div id="footer" style="min-height: 105px">

</div> 
<!-- footer -->