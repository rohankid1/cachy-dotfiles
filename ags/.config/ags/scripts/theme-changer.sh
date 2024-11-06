#!/bin/sh

if [ ! $(command -v swww) ]; then
  url="https://github.com/LGFae/swww"
  echo "swww not found, but can be installed from your package manager (if available) or $url"
  exit -1
fi

imgpath=$(swww query | awk -F 'image: ' '{print $2}')
wal -i $imgpath

if [ $(command -v pywalfox) ]; then
  pywalfox update
fi