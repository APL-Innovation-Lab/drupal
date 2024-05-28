### Documentation for Managing Drupal Site

This documentation provides a detailed step-by-step guide for managing the Drupal site, including obtaining backups, importing databases, and ensuring the presence of necessary directories and files. This is aimed at both current and future developers to ensure continuity and ease of understanding.

### 1. Obtain a Backup of the Drupal Database

**For Production Environment:**
- We have a script that performs the backup operation from a specific server.
- Script: `dump.sh`


### 2. Import the Database

**For Local Development or Outside Contributors:**
- Ensure database sanitization for security and privacy.
  1. Import the database.
  ```
  ddev import-db --file=db.sql.gz
  or
  bash scripts/import_nightly_local.sh
  ```
  2. Run sanitization commands:
     ```sh
     drush sql-sanitize
     ```

### 4. Composer Configuration

- The Drupal site requires a `composer.json` file and the accompanying `composer.lock` file.
- **Steps to Set Up:**
  1. Ensure the `composer.json` file is present with specific software versions or acceptable ranges.
  2. Run the following commands:
     ```sh
     composer update
     composer install
     ```
  3. This ensures all necessary software modules are installed as defined by the `composer.lock` file.

### 5. Ensure Presence of Important Directories

- Verify that the following directories are present in the Drupal root directory:
  - `modules/custom`
  - `themes/custom`
  - `libraries`
  - `sync` folder (usually located at `../config`)

**Steps to Verify and Create Directories if Missing:**
1. Navigate to the Drupal root directory.
2. Run the following commands to check and create directories if necessary:
   ```sh
   mkdir -p modules/custom
   mkdir -p themes/custom
   mkdir -p libraries
   mkdir -p ../config/sync
   ```

### Additional Notes

- **Backup Regularity:** Ensure regular backups are scheduled and monitored.
- **Security:** Always perform database sanitization when working with non-production environments to protect sensitive information.
- **Version Control:** Maintain version control for all configuration files and custom code using a version control system like Git.
- **Feedback Loop:** Continuously update this documentation based on team feedback and new insights.

By following these steps, we can ensure a smooth and secure process for managing our Drupal site, keeping it consistent and reliable for all contributors.