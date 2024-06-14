#!/bin/bash

# Function to run Composer commands as the Apache user
run_composer() {
    sudo -u apache sh -c "cd /var/www && php -d memory_limit=-1 /usr/local/bin/composer $1"
}

# Check the command provided as an argument
case "$1" in
    "update")
        run_composer "update"
        ;;
    "require")
        if [ -z "$2" ]; then
            echo "Please provide a package name to require."
            exit 1
        fi
        run_composer "require $2"
        ;;
    "install")
        run_composer "install"
        ;;
    "dump-autoload")
        run_composer "dump-autoload"
        ;;
    *)
        echo "Invalid command. Available commands: update, require, install, dump-autoload"
        exit 1
        ;;
esac
