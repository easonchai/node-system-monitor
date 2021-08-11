#!/bin/bash

cp services/daemon.js /etc/systemd/system/nsm-daemon.service
chmod +x /etc/systemd/system/nsm-daemon.service
systemctl enable nsm-daemon
systemctl start nsm-daemon
