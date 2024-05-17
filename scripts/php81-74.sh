# Reset the PHP module
sudo dnf module reset php

# Remove the existing PHP 8.1 packages
sudo dnf remove php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml

# Enable the PHP 7.4 module
sudo dnf module enable php:remi-7.4

# Install PHP 7.4 and required modules
sudo dnf install -y php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml gd3php oniguruma5php

# Verify the PHP version
php -v
