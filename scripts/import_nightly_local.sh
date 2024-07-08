#!/bin/bash

cd ~/drupal

# Local file path where the dump is saved
#LOCAL_DUMP_FILE="/Users/bryce/nightly/db.sql.gz"
LOCAL_DUMP_FILE="/Users/bryce/drupal/scripts/db_modified.sql.gz"

# Log file path
LOG_FILE="/Users/bryce/nightly/db_import.log"

# Function to log messages with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Start the import process
log_message "Starting database import..."

# Stream the compressed dump to the remote server and import it
#gunzip -c "$LOCAL_DUMP_FILE" | ssh $REMOTE_SERVER "cd /var/www/html && sudo php /var/www/vendor/drush/drush/drush.php sql-cli"
ddev import-db --file="$LOCAL_DUMP_FILE"

# Check if the import command was successful
if [ $? -eq 0 ]; then
    log_message "Database import completed successfully."
else
    log_message "Error: Database import failed."
    exit 1
fi

log_message "Process completed successfully."
