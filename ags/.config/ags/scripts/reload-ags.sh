if pgrep -l ags; then
  pkill ags
  /usr/bin/ags
else
  /usr/bin/ags
fi
