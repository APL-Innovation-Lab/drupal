#!/bin/bash

# Step 1: Install Remi Repository
sudo yum install -y epel-release
sudo yum install -y https://rpms.remirepo.net/enterprise/remi-release-9.rpm
sudo yum install -y yum-utils

# Step 2: Enable Remi Repository for PHP 7.4
sudo yum-config-manager --enable remi-modular
sudo yum-config-manager --enable remi-safe

# Step 3: Install PHP 7.4 and Required Modules
sudo yum install -y php74 php74-php-cli php74-php-common php74-php-gd php74-php-json php74-php-ldap php74-php-mbstring php74-php-mysqlnd php74-php-opcache php74-php-pdo php74-php-pecl-apcu php74-php-pecl-memcache php74-php-process php74-php-sodium php74-php-xml gd3php oniguruma5php

# Step 4: Configure Alternatives for PHP 7.4
sudo alternatives --install /usr/bin/php php /usr/bin/php74 1
sudo alternatives --install /usr/bin/phpize phpize /usr/bin/phpize74 1
sudo alternatives --install /usr/bin/php-config php-config /usr/bin/php-config74 1

# Step 5: Set PHP 7.4 as the Default Version
sudo alternatives --set php /usr/bin/php74
sudo alternatives --set phpize /usr/bin/phpize74
sudo alternatives --set php-config /usr/bin/php-config74

# Step 6: Verify the PHP Version
php -v

# Step 7: Ensure Required Modules are Enabled
php -m | grep -E 'gd|json|ldap|mbstring|mysqlnd|opcache|pdo|xml|apcu|memcache|process|sodium'

# Step 8: Restart PHP-FPM Service
sudo systemctl restart php-fpm

echo "PHP 7.4 installation and configuration complete."
