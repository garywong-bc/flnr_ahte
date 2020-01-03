# AHTE Public Engagement


## Base from PAE repo
```bash
[garywong@NCM050128 ahte_stash (release/4.0.0)]$ git archive -o ../ahte-4.0.0.tar release/4.0.0 
```

```bash
[garywong@NCM050128 ahte_flnr (master)]$ mv ../ahte-4.0.0.tar app/
../ahte-4.0.0.tar -> app/ahte-4.0.0.tar
[garywong@NCM050128 ahte_flnr (master)]$ cd app
[garywong@NCM050128 app (master)]$ tar -xvf ahte-4.0.0.tar 
```

## Initial config of AHTE


sed "s/^\$databases = array();/\$databases = array (\n"\
"  'default' =>\n"\
"    array (\n"\
"     'default' =>\n"\
"     array (\n"\
"      'database' => '${MYSQL_DATABASE}',\n"\
"      'username' => '${MYSQL_USER}',\n"\
"      'password' => '${MYSQL_PASSWORD}',\n"\
"      'host' => 'db',\n"\
"      'port' => '',\n"\
"      'driver' => 'mysql',\n"\
"      'prefix' => '',\n"\
"    ),\n"\
"  ),\n"\
");/g" \
/var/www/html/sites/default/default2.settings.php > /var/www/html/sites/default/settings.php



```bash
docker-compose exec drupal /bin/bash


cat <<\EOF >> /var/www/html/sites/default/settings.php
$conf['file_temporary_path'] = '/tmp';
$conf['file_public_path'] = 'sites/default/files';
$conf['file_private_path'] = 'sites/default/files/private';
$conf['site_mail'] = 'gary.t.wong@gov.bc.ca';
$conf['update_notify_emails'] = 'gary.t.wong@gov.bc.ca';
$conf['site_name'] = 'PAE Local';
$conf['preprocess_css'] = '0';
$conf['preprocess_js'] = '0';
EOF


mkdir -p /var/www/html/sites/default/files/private && \
chown -R www-data:www-data /var/www/html/sites/default/files && \
cp /tmp/private-htaccess /var/www/html/sites/default/files/private/.htaccess

mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE} < /tmp/AHTEDelivery-2019-12-31T16-00-17.mysql 


root@11b2e46a3084:/var/www/html/sites/default/files/private# drush upwd gw_test_bceid --password="gw_test_bceid"
Changed password for gw_test_bceid    