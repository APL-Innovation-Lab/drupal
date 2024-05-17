
# PHP Version Switcher Scripts

## Preliminary Steps and Prerequisites

1. **Update System Packages**:
   Start by updating all system packages to ensure you have the latest updates and security patches.

   ```bash
   sudo yum update -y
   ```

2. **Install Required Utilities**:
   Install `dnf-utils` to manage repository configurations and other useful tools.

   ```bash
   sudo yum install -y dnf-utils
   ```

3. **Add the Remi Repository**:
   The Remi repository provides the latest versions of PHP. You need to add and enable this repository.

   ```bash
   sudo yum install -y http://rpms.remirepo.net/enterprise/remi-release-9.rpm
   sudo dnf config-manager --set-enabled remi
   ```

4. **Disable Existing PHP Module**:
   Reset any currently enabled PHP modules to avoid conflicts.

   ```bash
   sudo dnf module reset php
   ```

## Switching from PHP 8.1 to PHP 7.4

```bash
# Reset the PHP module
sudo dnf module reset php

# Remove the existing PHP packages
sudo dnf remove php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml

# Enable the PHP 7.4 module
sudo dnf module enable php:remi-7.4

# Install PHP 7.4 and required modules
sudo dnf install -y php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml gd3php oniguruma5php

# Verify the PHP version
php -v
```

## Switching from PHP 7.4 to PHP 8.1

```bash
# Reset the PHP module
sudo dnf module reset php

# Remove the existing PHP packages
sudo dnf remove php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml

# Enable the PHP 8.1 module
sudo dnf module enable php:remi-8.1

# Install PHP 8.1 and required modules
sudo dnf install -y php php-cli php-common php-gd php-json php-ldap php-mbstring php-mysqlnd php-opcache php-pdo php-pecl-apcu php-pecl-memcache php-process php-sodium php-xml gd3php oniguruma5php

# Verify the PHP version
php -v
```
