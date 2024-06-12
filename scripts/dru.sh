#!/bin/bash

# Function to execute Drush commands as the apache user
execute_drush_command() {
  sudo -u apache sh -c "cd /var/www/html && php -d memory_limit=-1 /usr/local/bin/drush $1"
}

# Function to execute Drush commands with additional arguments
execute_drush_command_with_args() {
  sudo -u apache sh -c "cd /var/www/html && php -d memory_limit=-1 /usr/local/bin/drush $1 $2"
}

# Check if a command is provided
if [ $# -eq 0 ]; then
  echo "Please provide a command."
  exit 1
fi

# Parse the command and execute the corresponding Drush command
case "$1" in
  cex)
    execute_drush_command "cex"
    ;;
  ws)
    execute_drush_command "ws"
    ;;
  cr)
    execute_drush_command "cr"
    ;;
  cim)
    execute_drush_command "cim"
    ;;
  status)
    execute_drush_command "status"
    ;;
  user:password)
    if [ $# -ne 3 ]; then
      echo "Please provide a username and password for the 'user:password' command."
      exit 1
    fi
    execute_drush_command_with_args "user:password" "$2 '$3'"
    ;;
  *)
    echo "Invalid command: $1"
    exit 1
    ;;
esac
