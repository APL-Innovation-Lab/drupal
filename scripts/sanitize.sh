#!/bin/bash

# Script to manage a Drupal site development environment using DDEV

# Sanitize the database
echo "Sanitizing database..."
ddev drush sql-sanitize -y
echo "Database sanitized."

# Update the admin password for convenience
echo "Updating admin password..."
ddev drush user:password drupaladmin '111'
echo "Admin password updated to 111."

# Clear Drupal's cache
echo "Clearing Drupal's cache..."
ddev drush cr
echo "Drupal's cache cleared."

# Launch the site
echo "Launching the site..."
ddev launch
echo "Site launched."

# Export the database
echo "Exporting the db to aplcms-minus.sql.gz..."
ddev export-db --file=aplcms-minus.sql.gz

# Print the end time
echo "Script ended at: $(date)"
