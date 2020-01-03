<?php

	function load_element( $id ) {
		
		$url = 'http://www2.gov.bc.ca';
		$theme_path = drupal_get_path( 'theme', 'moh' ) . '/includes/gov_menu';
		
		$file_name 	= $theme_path . '/includes/' . $id . '.inc';

		// If the file exists, return the contents
		if ( file_exists( $file_name ) ) {			

			$file = file_get_contents( $file_name );
			return $file;
		
		// If the file doesn't exist let's grad the html, save it and return it
		} else {

			$webPage = file_get_contents( $url );
			$doc = new DOMDocument();
			@$doc->loadHTML( $webPage );
			$div = $doc->getElementById( $id );
		
			// Create temporary document
			$tmpdoc = new DOMDocument();
			
			// Import the div element
			$copydiv = $tmpdoc->importNode( $div, true );
			
			// Append it to temporary document
			$tmpdoc->appendChild( $copydiv );
			
			// Remove the <?xml header
			$str = str_replace( '<?xml version="1.0"?>'. "\n", '', $tmpdoc->saveXML() );
					
			// Ensure all image paths are pointing locally
			$str = str_replace( '/assets/gov/images/', $theme_path . '/images/', $tmpdoc->saveXML() );
						
			// Clean up path to gov home page
			$str = str_replace( '/en/index.page?', 'http://www2.gov.bc.ca/', $tmpdoc->saveXML() );
			
			// Save the File
			file_put_contents( $file_name, $str );
			return $str;
			
		}

	}