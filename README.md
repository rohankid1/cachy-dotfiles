# cachy-dotfiles
Dotfiles for my CachyOS system

https://github.com/user-attachments/assets/9a7923f3-5f28-4dde-b4a7-448f0d757012

# Setup
* [Wallpaper](https://github.com/dracula/wallpaper/blob/master/second-collection/illustrations/cat-and-bats/dracula-cat-bd93f9.png)
* [Bar](https://hyprpanel.com)
* [Zoom/Scratchpad](https://hyprland-community.github.io/pyprland/)

Pywal, Starship, Kitty, Hyprland, Fuzzel, and Fish are all in the Arch repos, so you can simply run:
`sudo pacman -S python-pywal starship kitty hyprland fuzzel fish`.

I use GNU Stow to manage these dotfiles. To "stow" these dotfiles, put this repository in `$HOME` or `/home/<NAME>/`, install stow (if it isn't), which is likely in your distribution's repository. After it is installed, cd in this repo, run `stow <DIR>` where `<DIR>` is the name of the directory in this repo. For example, `stow fish`, `stow starship`, will create a symlink to the right place in ~/.config.

## Hyprland Plugins used
These also include ones that haven't appeared in the video.

* [Hyprfocus](https://github.com/pyt0xic/hyprfocus)
* [Hyprspace](https://github.com/KZDKM/Hyprspace)
* [csgo-vulkan-fix](https://github.com/hyprwm/hyprland-plugins/tree/main/csgo-vulkan-fix)
* [hyprtrails](https://github.com/hyprwm/hyprland-plugins/tree/main/hyprtrails)