#!/bin/bash

# Define the user and the base directory
USER="apache"
BASE_DIR="/var/www/html"
DRUSH="/usr/local/bin/drush"
PHP_OPTS="-d memory_limit=-1"

# Function to run the drush command
run_drush() {
    local cmd=$1
    sudo -u $USER sh -c "cd $BASE_DIR && php $PHP_OPTS $DRUSH $cmd"
}

# Function to run the drush enable command
run_drush_enable() {
    local module=$1
    if [ -z "$module" ]; then
        echo "Module name is required for the 'en' command"
        exit 1
    fi
    run_drush "en $module"
}

# Check for arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 {cex|ws|cr|cim|status|en <module>}"
    exit 1
fi

# Execute the corresponding drush command
case $1 in
    cex)
        run_drush "cex"
        ;;
    ws)
        run_drush "ws"
        ;;
    cr)
        run_drush "cr"
        ;;
    cim)
        run_drush "cim"
        ;;
    status)
        run_drush "status"
        ;;
    en)
        run_drush_enable "$2"
        ;;
    *)
        echo "Invalid command: $1"
        echo "Usage: $0 {cex|ws|cr|cim|status|en <module>}"
        exit 1
        ;;
esac

