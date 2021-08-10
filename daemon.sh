#!/bin/bash

verbose=false
while getopts :v opt; do
    case $opt in 
        v) verbose=true ;;
       \?) echo "Unknown option -$OPTARG"; exit 1;;
    esac
done

if ! node -v > /dev/null
then
    /bin/bash ./setup.sh
fi

if $verbose; then
    node services/daemon.js 
else
    node services/daemon.js --verbose
fi
