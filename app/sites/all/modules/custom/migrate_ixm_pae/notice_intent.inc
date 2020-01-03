<?php

class NoticeIntentMigration extends Migration {
	public function __construct($arguments) {
		parent::__construct($arguments);

		//The defintion of the CSV File. Keys are integers. values are array(field name, description).
		$columns[0] = array('tracking_number', 'Id');
		$columns[1] = array('post_start_date', 'Post Start Date YYYY MM DD');
		$columns[2] = array('closing_date', 'Closing Date YYYY MM DD');
		$columns[3] = array('sections', 'Sections');
		$columns[4] = array('management_areas', 'management Area');
		$columns[5] = array('permit_type', 'Permit Type');
		$columns[6] = array('application_type', 'Application Type');
		$columns[7] = array('proponent', 'Proponent');
		$columns[8] = array('parks', 'Parks');
		$columns[9] = array('details', 'Details');
		$columns[10] = array('term', 'Term');

		//The Description of the import. This desription is shown on the Migrate GUI
		$this->description = t('ePUPS-generated CSV file, Notices of Intent, every morning at 6:00am PST.');
	
		//The Source of the import
		if (variable_get('epups_xfer_env',PAE_SRC) == 'prod')
			$this->source = new MigrateSourceCSV('http://borage.idir.bcgov/doc/ams/noticeofintent.csv', $columns, array('header_rows' => 1));
		elseif (variable_get('epups_xfer_env',PAE_SRC) == 'test')
			$this->source = new MigrateSourceCSV('http://acorn.idir.bcgov/doc/test2/ams/noticeofintent.csv', $columns, array('header_rows' => 1));
		else /* (variable_get('epups_xfer_env',PAE_SRC) == 'local') */
			$this->source = new MigrateSourceCSV('./sites/default/files/epups/noticeofintent.csv', $columns, array('header_rows' => 1));
	   
		$this->destination = new MigrateDestinationNode('notice_of_intent');   
		   
		$this->map = new MigrateSQLMap(
			$this->machineName,
			array(
				'tracking_number' => array(
					'type' => 'varchar',
					'length' => 6,
					'not null' => TRUE,
					'description' => 'This is the tracking number from the CSV file'
				)
			),
			MigrateDestinationNode::getKeySchema()
		);
	
		$this->addFieldMapping('title', 'tracking_number');
		$this->addFieldMapping('field_poststartdate', 'post_start_date');
		$this->addFieldMapping('field_closingdate', 'closing_date');
		$this->addFieldMapping('field_sections', 'sections')
			->separator('|');
		$this->addFieldMapping('field_mgmtarea', 'management_areas')
			->separator('|');
		$this->addFieldMapping('field_permittype', 'permit_type');
			//->callbacks(array($this, 'convertPermitType'));
		$this->addFieldMapping('field_jobtype', 'application_type');	
		$this->addFieldMapping('field_proponent', 'proponent');
		$this->addFieldMapping('field_parks', 'parks');
		$this->addFieldMapping('field_details', 'details');
		$this->addFieldMapping('field_term', 'term');
	}

	// This runs the prepareRow function to modify the data before import
	// This does two main items
	// 1) Prepare the row by changing the date into a unix timestamp format
	// 2) Adds a space after the comma on the Parks field.
	public function prepareRow($row) {
	
		switch($row->permit_type) {
			case ('BC Hydro - Land Use/Occupancy'):
			case ('Trapline LRMP'):
			case ('Trapline'):
				$row->permit_type[$key] = 'Land Use Occupancy'; // PAE - Land Use Occupancy
				break;
			case ('Research'):
			case ('BC Hydro - Research'):
				$row->permit_type = 'Research'; // PAE - Research
				break;
			case ('Film'):
				$row->permit_type = 'Commercial Filming'; // PAE - Commercial Filming
				break;
			case ('Ecological Reserve'):
				$row->permit_type = 'Ecological Reserve'; // PAE - Ecological Reserve
				break;
			case ('Commercial Recreation (short term)'):
			case ('Commercial Recreation (multi year)'):
				$row->permit_type = 'Commercial Recreation'; // PAE - Commercial Recreation
				break;
			default:
				break;
		}
		
		// used to convert the JobType ePUPs into PAE format (Application Type)
		switch($row->application_type) {
			case ('Assignment, Sub-tenure or Transfer'):
				$term = 'Transfer'; // PAE Term - Tranfser
				break;
			case ('Major Amendment'):
			case ('Minor Amendment'):
			case ('M Amendment'):
				$term = 'Amendment'; // PAE Term - Amendment
				break;
			case ('New Permit'):
				$term = 'New Application'; // PAE Term - New Application
				break;
			case ('Renewal'):
				$term = 'Renewal';  // PAE Term - Renewal
				break;
			default:
				break;
		}
		 // End JobType function
		
		// Add a space between commas on the parks field.
		// This is because the data coming in is 'squished'
		//    $parks = $row->parks;
		$parks = str_replace(chr(193), '&Aacute;', $row->parks); // Encode Latin capital letter A
		$parks = str_replace(chr(225), '&aacute;', $row->parks); // Encode Latin small letter a
		$row->parks = str_replace(',', ', ', $parks); // Add space b/w commas

		// Convert the time to a something that can be used for unix time stamp conversion
		$post_date_human = $row->post_start_date;
		$closing_date_human = $row->closing_date;
		$post_date = str_replace(' ', '', $post_date_human);
		$closing_date = str_replace(' ', '', $closing_date_human);

		$row->post_start_date = strtotime($post_date);
		$row->closing_date = strtotime($closing_date);

		// Define the log file that will be created
		/*$log_file = "./sites/default/files/epups/log/notice-intent-log-" . date('Y-m-d') . ".txt";
		$handle = fopen($log_file, 'a') or die('Cannot open file:  '. $log_file);*/

		/*if ((time() > $row->closing_date) || (!isset($row->tracking_number)) || (!isset($row->post_start_date))) {
		drupal_set_message('The tracking number ' . $row->tracking_number . ' was not imported.', 'warning');
		$data = ' The tracking number ' . $row->tracking_number . ' was not imported. -- Closing Date: ' . $closing_date_human . " Post Start Date: " . $post_date_human . " Tracking Number: " . $row->tracking_number . "\n";
		fwrite($handle, $data);
		return FALSE;
		}*/
	} // End of Prepare Row

    // This function is called after prepareRow
    // It is used to convert the JobType ePUPs into PAE format (Application Type)
    public function PermitType($term) {
        switch($term) {
          case ('BC Hydro - Land Use/Occupancy'):
          case ('Trapline LRMP'):
          case ('Trapline'):
          case ('Land Use Occupancy'):
            $term = 253; // PAE - Land Use Occupancy
            break;
          case ('Research'):
          case ('BC Hydro - Research'):
            $term = 254; // PAE - Research
            break;
          case ('Film'):
            $term = 251; // PAE - Commercial Filming
            break;
          case ('Ecological Reserve'):
            $term = 393; // PAE - Ecological Reserve
            break;
          case ('Commercial Recreation (short term)'):
          case ('Commercial Recreation (multi year)'):
            $term = 252; // PAE - Commercial Recreation
            break;
          default:
            break;
          }
        return $term;
      } // End PermitType function
        
} // End of Migration Constuct
