vcl 4.1;
import std;
import directors;

# This Varnish VCL has been adapted from the Four Kitchens VCL for Varnish 3.
# This VCL is for using cache tags with drupal 8. Minor changes of VCL provided by Jeff Geerling.

# Default backend definition. Points to Apache, normally. 
# Apache is in this config on port 80.
backend default {
    .host = "localhost";
    .port = "8080";
    .connect_timeout = 25s;
    .first_byte_timeout = 300s;
    .between_bytes_timeout = 60s;
    .probe = {
        .url = "/";
        .timeout = 1s;
        .interval = 5s;
        .window = 5;
        .threshold = 3;
    }
}

# Access control list for PURGE requests.
# Here you need to put the IP address of your web server
acl purge {
    "10.66.56.43";
    #"library.austintexas.gov";
}

# Respond to incoming requests.
sub vcl_recv {
    # Add an X-Forwarded-For header with the client IP address.
    if (req.restarts == 0) {
        if (req.http.X-Forwarded-For) {
            set req.http.X-Forwarded-For = req.http.X-Forwarded-For + ", " + client.ip;
        }
        else {
            set req.http.X-Forwarded-For = client.ip;
        }
    }

    # Only allow PURGE requests from IP addresses in the 'purge' ACL.
    if (req.method == "PURGE") {
        if (!client.ip ~ purge) {
            return (synth(405, "Not allowed."));
        }
        return (purge);
    }

    # Only allow BAN requests from IP addresses in the 'purge' ACL.
    if (req.method == "BAN") {
        # Same ACL check as above:
#        if (!client.ip ~ purge) {
#            return (synth(403, "Not allowed..."));
#        }

        # Logic for the ban, using the Cache-Tags header. For more info
        # see https://github.com/geerlingguy/drupal-vm/issues/397.
        if (req.http.Cache-Tags) {
            ban("obj.http.Cache-Tags ~ " + req.http.Cache-Tags);
        }
        else {
            return (synth(403, "Cache-Tags header missing."));
        }

        # Throw a synthetic page so the request won't go to the backend.
        return (synth(200, "Ban added."));
    }

    # Only cache GET and HEAD requests.
    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }

    # Don't cache authenticated requests.
    if (req.http.Authorization) {
        return (pass);
    }

    # Remove cookies from static files.
    if (req.url ~ "(?i)\\.(pdf|asc|dat|txt|doc|xls|ppt|tgz|csv|png|gif|jpeg|jpg|ico|swf|css|js)(\\?.*)?$") {
        unset req.http.Cookie;
    }

    return (hash);
}

sub vcl_backend_response {
    # Set ban-lurker friendly custom headers.
    set beresp.http.X-Url = bereq.url;
    set beresp.http.X-Host = bereq.http.host;

    # Cache 404s, 301s, and 500s with a short lifetime to protect the backend.
    if (beresp.status == 404 || beresp.status == 301 || beresp.status == 500) {
        set beresp.ttl = 10m;
    }

    # Don't allow static files to set cookies.
    # (?i) denotes case insensitive in PCRE (perl compatible regular expressions).
    # This list of extensions appears twice, once here and again in vcl_recv so
    # make sure you edit both and keep them equal.
    if (bereq.url ~ "(?i)\\.(pdf|asc|dat|txt|doc|xls|ppt|tgz|csv|png|gif|jpeg|jpg|ico|swf|css|js)(\\?.*)?$") {
        unset beresp.http.set-cookie;
    }

    # Allow items to remain in cache up to 6 hours past their cache expiration.
    set beresp.grace = 6h;
}

sub vcl_deliver {
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
}
