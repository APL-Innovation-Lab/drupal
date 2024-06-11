<?php

// @codingStandardsIgnoreFile

$databases = [];
#$settings['file_public_path'] = 'library';
$settings['file_public_path'] = 'library2';

#$settings['memcache_storage']['memcached_servers'] =  ['10.66.56.186:11211' => 'default'];
#$settings['memcache_storage']['debug'] = TRUE;

$settings['hash_salt'] = 'KpzTPqIDiM1Ziv2Qh9aNp4RA4eozNwIwafP0lpWdiwxwji6HlWD6zmIPnCjt6xDM-LXKKbenoA';

$settings['update_free_access'] = FALSE;

$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

$settings['entity_update_batch_size'] = 50;

$settings['entity_update_backup'] = TRUE;

$settings['migrate_node_migrate_type_classic'] = FALSE;

$databases['default']['default'] = array (
  'database' => 'APLCMSDB',
  'username' => 'drupaluser',
  'password' => 'Dru2024palpwd$&',
  'prefix' => '',
  'host' => 'apl-int-cms-db-d01.austintexas.gov',
  #'host' => 'aplcmsdb01b.austintexas.gov',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);
$settings['config_sync_directory'] = '../config';

#$settings['file_private_path'] = '/var/www/files/private';
$settings['file_private_path'] = '/library2/private';
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';

$settings['trusted_host_patterns'] = [
  '^library.austintexas.gov$',
  '^apl-int-cms-p0'
];

