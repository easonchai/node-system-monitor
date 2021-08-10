#!/bin/bash

if ! node -v > /dev/null
then
    /bin/bash ./setup.sh
fi

node services/daemon.js
