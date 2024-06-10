sudo yum install varnish

sudo vi /usr/lib/systemd/system/varnish.service

#change port to 80, consider updating 256m to 2G (?)
ExecStart=/usr/sbin/varnishd -a :80 -f /etc/varnish/default.vcl -s malloc,256m

sudo systemctl restart varnish