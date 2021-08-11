#!/bin/bash

cp services/daemon.js /etc/systemd/system/nsm-daemon.js
chmod +x /etc/systemd/system/nsm-daemon.js
systemctl enable nsm-daemon
systemctl start nsm-daemon
