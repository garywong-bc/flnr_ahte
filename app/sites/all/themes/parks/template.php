<?php

// Adding required classes to main menu
function parks_menu_tree__main_menu($variables) {
	return '<ul class="menu nav navbar-nav">' . $variables['tree'] . '</ul>';
}