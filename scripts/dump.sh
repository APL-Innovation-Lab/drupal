#!/bin/bash

# Set variables
REMOTE_SERVER="prod01b"
REMOTE_DIR="/var/www/html"
DRUSH_PATH="/var/www/vendor/drush/drush/drush.php"
LOCAL_DUMP_FILE="/Users/bryce/nightly/db.sql.gz"

# Function to handle errors
handle_error() {
    echo "Error on line $1"
    exit 1
}

# Trap errors and call the handle_error function
trap 'handle_error $LINENO' ERR

# SSH and dump command
echo "Starting database dump from $REMOTE_SERVER..."

# Ensure the dump directory exists
mkdir -p "$(dirname "$LOCAL_DUMP_FILE")"

ssh $REMOTE_SERVER "cd $REMOTE_DIR && sudo php $DRUSH_PATH sql-dump --extra-dump=\"--no-tablespaces\"" | gzip > "$LOCAL_DUMP_FILE"

if [[ $? -eq 0 ]]; then
    echo "Database dump saved to $LOCAL_DUMP_FILE"
else
    echo "Database dump failed"
    exit 1
fi

