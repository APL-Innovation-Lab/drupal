#!/bin/bash

# Enable error handling
set -e

# Remote server address
REMOTE_SERVER="prod01c"

# Local file path where the dump is saved
LOCAL_DUMP_FILE="db_modified.sql.gz"

# Log file path
LOG_FILE="db_import.log"

# Function to log messages with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Start the import process
log_message "Starting database import to $REMOTE_SERVER..."

# Stream the compressed dump to the remote server and import it
gunzip -c "$LOCAL_DUMP_FILE" | ssh $REMOTE_SERVER "cd /var/www/html && sudo php /var/www/vendor/drush/drush/drush.php sql-cli"


# Check if the import command was successful
if [ $? -eq 0 ]; then
    log_message "Database import completed successfully on $REMOTE_SERVER."
else
    log_message "Error: Database import failed on $REMOTE_SERVER."
    exit 1
fi

log_message "Process completed successfully."
