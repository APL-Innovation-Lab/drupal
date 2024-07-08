#sudo systemctl stop postfix
# Perform backup and restore
#drush sql-dump > backup.sql
#drush sql-cli < backup.sql
sudo systemctl start postfix
