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
    /bin/bash ./dependency_setup.sh
fi

if $verbose; then
    node services/query.js 
else
    node services/query.js --verbose
fi

