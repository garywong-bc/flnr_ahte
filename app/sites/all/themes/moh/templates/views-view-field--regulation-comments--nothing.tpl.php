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

    $cid = $row->comment_node_cid;

    $uid = db_query("SELECT uid FROM {comment} WHERE cid = :cid", array(':cid' => $cid))->fetchField();
    $nid = db_query("SELECT nid FROM {comment} WHERE cid = :cid", array(':cid' => $cid))->fetchField();

    if ($uid) {
        $vote = db_query("SELECT value FROM {votingapi_vote} WHERE uid = :uid AND entity_id = :node", array(':uid' => $uid, ':node' => $nid))->fetchField();

        switch ($vote) {
            case 1:
                print "Support";
                break;
            case 2:
                print "Neutral";
                break;
            case 3:
                print "Oppose";
                break;
            default:
                print "Vote unavailable";
        }
    }
    else {
        print "Vote unavailable";
    }
    
?>