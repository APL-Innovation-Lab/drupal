#!/bin/bash

# Navigate to conf.d/ directory
cd /etc/httpd/conf.d/

# Copy the welcome.conf file from the home directory
sudo cp ~/welcome.conf .

# Navigate to the conf directory
cd /etc/httpd/conf/

# Copy the httpd.conf file from the home directory
sudo cp ~/httpd.conf .