<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php 

    if ($view->name == 'export_comments') {

        $cid = $row->cid;

        $nid = db_query("SELECT nid FROM {comment} WHERE cid = :cid", array(':cid' => $cid))->fetchField();

        $type = db_query("SELECT bundle FROM {field_data_field_hunting_reg_number} WHERE entity_id = :node", array(':node' => $nid))->fetchField();

        if ($type == "hunting_regulation") {
            $reg = db_query("SELECT field_hunting_reg_number_value FROM {field_data_field_hunting_reg_number} WHERE entity_id = :node", array(':node' => $nid))->fetchField();
            print '"' . $reg . '"';
        }
        else {
            $reg = db_query("SELECT field_angling_reg_number_value FROM {field_data_field_angling_reg_number} WHERE entity_id = :node", array(':node' => $nid))->fetchField();
            print '"' . $reg . '"';
        }
    }
?>