<?php

// Extend the Migration Class
class ActivePermitsMigration extends Migration {
  public function __construct($arguments) {

    parent::__construct($arguments);

	//The definition of the CSV File. Keys are integers. values are array(field name, description).
    $columns[0] = array('authorization_number', 'Id');
    $columns[1] = array('sections', 'Sections');
    $columns[2] = array('management_areas', 'Management Areas');
    $columns[3] = array('permit_type', 'Permit Type');
    $columns[4] = array('permittee', 'Permittee');
    $columns[5] = array('parks', 'Parks');
    $columns[6] = array('details', 'Details');
    $columns[7] = array('term', 'Term');
    $columns[8] = array('issue_date', 'Issue Date YYYY MM DD');
    $columns[9] = array('permit_document', 'Permit Document');

    //The Description of the import. This description is shown on the Migrate GUI
    $this->description = t('ePUPS-generated CSV file, Active Permits, every morning at 6:00am PST.');

    //The Source of the import
	if (variable_get('epups_xfer_env',PAE_SRC) == 'prod')
       $this->source = new MigrateSourceCSV('http://borage.idir.bcgov/doc/ams/activepermits.csv', $columns, array('header_rows' => 1));
	elseif (variable_get('epups_xfer_env',PAE_SRC) == 'test')
       $this->source = new MigrateSourceCSV('http://acorn.idir.bcgov/doc/test2/ams/activepermits.csv', $columns, array('header_rows' => 1));
	else /* (variable_get('epups_xfer_env',PAE_SRC) == 'local') */
       $this->source = new MigrateSourceCSV('./sites/default/files/epups/activepermits.csv', $columns, array('header_rows' => 1));
	   
	$this->destination = new MigrateDestinationNode('active_permit');   
	   
	$this->map = new MigrateSQLMap(
		$this->machineName,
		array(
			'authorization_number' => array(
				'type' => 'varchar',
				'length' => 6,
				'not null' => TRUE,
				'description' => 'This is the authorization number from the CSV file',
			)
		),
		MigrateDestinationNode::getKeySchema()
	);

    $this->addFieldMapping('title', 'authorization_number');
	$this->addFieldMapping('field_sections', 'sections')
		->separator('|');
	$this->addFieldMapping('field_mgmtarea', 'management_areas')
		->separator('|');
	$this->addFieldMapping('field_permittype', 'permit_type');
		//->callbacks(array($this, 'convertPermitType'));
	$this->addFieldMapping('field_proponent', 'permittee');
	$this->addFieldMapping('field_parks', 'parks');
	$this->addFieldMapping('field_details', 'details');
	$this->addFieldMapping('field_term', 'term');
	$this->addFieldMapping('field_issuedate', 'issue_date');
		//->callbacks(array($this, 'convertDate'));
	$this->addFieldMapping('field_document', 'permit_document');

}

// Prepare the row by changing the date into a unix timestamp format
public function prepareRow($row) {
	$id = $row->authorization_number;
	
	switch($row->permit_type) {
		case ('BC Hydro - Land Use/Occupancy'):
		case ('Trapline LRMP'):
		case ('Trapline'):
			$row->permit_type = 'Land Use Occupancy'; // PAE - Land Use Occupancy
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
	
	$parks = str_replace(chr(193), 'Á', $row->parks); // Encode 1st Nations accent char
    $row->parks = str_replace(',', ', ', $parks); // Add space b/w commas
	$row->parks = str_replace(chr(34), '"', $parks);

	$date_human = $row->issue_date;
	$date = str_replace(' ', '', $date_human);
	$row->issue_date = strtotime($date);
	//dsm($row);

	// Define the log file that will be created
	/*$log_file = "./sites/default/files/epups/log/active-permits-log-" . date('Y-m-d') . ".txt";
	$handle = fopen($log_file, 'a') or die('Cannot open file:  '. $log_file);
	if (($id == "") || ($id == " ")) {
		drupal_set_message('An authorization number was not imported.', 'warning');
		$data = 'A field with no authorization number was NOT imported. Here are a few details from that record.' . "\n" . "Issue Date: " . $date_human . ", Permittee: " . $row->permittee . ' - Details: ' . $row->details . "\n";
		fwrite($handle, $data);
		return FALSE;
	}*/

}

}
