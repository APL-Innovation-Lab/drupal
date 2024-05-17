# Reset the PHP module
sudo dnf module reset php

# Remove the existing PHP 7.4 packages
sudo dnf remove php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml

# Enable the PHP 8.1 module
sudo dnf module enable php:remi-8.1

# Install PHP 8.1 and required modules
sudo dnf install -y php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml gd3php oniguruma5php

# Verify the PHP version
php -v
