##!/bin/bash

# Remote server address
REMOTE_SERVER="prod01b"

# Local file path where you want to save the initial dump
LOCAL_DUMP_FILE="db.sql.gz"

# SSH and dump command
#ssh $REMOTE_SERVER "cd /var/www/html && sudo php /var/www/vendor/drush/drush/drush.php sql-dump --extra-dump=\"--no-tablespaces\"" | gzip > "$LOCAL_DUMP_FILE"

#echo "Database dump saved to $LOCAL_DUMP_FILE"

# Local file path where you want to save the modified dump
MODIFIED_DUMP_FILE="db_modified.sql.gz"

# Set locale to C to handle illegal byte sequences
export LC_ALL=C

# Gunzip, modify, and gzip the dump
gunzip -c "$LOCAL_DUMP_FILE" | \
sed -e '/LOCK TABLES .* WRITE;/d' \
    -e '/^INSERT INTO `cache_/d' | \
awk '/^INSERT INTO `cache_/ { skip=1 } /);$/ { if (skip) { skip=0; next } } !skip' | \
tee >(gzip > "$MODIFIED_DUMP_FILE") > >(logger -t sql_modification)



echo "Modified database dump saved to $MODIFIED_DUMP_FILE"
