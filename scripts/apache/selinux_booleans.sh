# View current settings
sudo getsebool httpd_enable_homedirs
sudo getsebool httpd_can_network_connect
sudo getsebool httpd_can_network_relay
sudo getsebool httpd_can_sendmail
sudo getsebool httpd_read_user_content
sudo getsebool httpd_unified
sudo getsebool httpd_use_nfs on

# Set them to the desired state if needed
sudo setsebool -P httpd_enable_homedirs on
sudo setsebool -P httpd_can_network_connect on
sudo setsebool -P httpd_can_network_relay on
sudo setsebool -P httpd_can_sendmail on
sudo setsebool -P httpd_read_user_content on
sudo setsebool -P httpd_unified on
sudo setsebool -P httpd_use_nfs on