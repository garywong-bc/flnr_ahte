<?php


/**
 * Common mappings for the Drupal 6 node migrations.
 */
class DefaultNodeMigration extends DrupalNode6Migration {
  public function __construct(array $arguments) {
    parent::__construct($arguments);

/*    $this->addFieldMapping('field_legacy_nid', 'nid')
      ->description('We have a common field to save the D6 nid');*/
  }
}