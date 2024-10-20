# cachy-dotfiles
Dotfiles for my CachyOS system

https://github.com/user-attachments/assets/9a7923f3-5f28-4dde-b4a7-448f0d757012

# Setup
* [Wallpaper](https://github.com/dracula/wallpaper/blob/master/second-collection/illustrations/cat-and-bats/dracula-cat-bd93f9.png)
* [Bar](https://hyprpanel.com)
* [Zoom/Scratchpad](https://hyprland-community.github.io/pyprland/)
* [Terminal](https://sw.kovidgoyal.net/kitty/)
* [Browser](https://zen-browser.app)
* GTK Theme: Adwaita

For a full setup, these packages are required:
`sudo pacman -S libnotify python-pywal starship kitty hyprland fuzzel fish hyprlock hypridle ttf-mononoki-nerd otf-hermit-nerd`

Some packages are not available in the official Arch repos, but they are in the AUR. Use an AUR helper such as yay or paru:
`paru -S pyprland hyprpolkitagent-git grimshot-bin-sway`

There are two variants of the Zen browser you can install: generic and the specific. The specific one uses AVX2 for better performance. You can check if your CPU supports it [here](https://docs.zen-browser.app/guides/generic-optimized#check-whether-your-device-supports-avx2).
If your CPU does support it, run `paru -S zen-browser-avx2-bin`, otherwise run `paru -S zen-browser-bin`. You can change paru to whatever AUR wrapper you use.

## Dotfile Manager
I use GNU Stow to manage these dotfiles. To "stow" these dotfiles, put this repository in `$HOME` or `/home/<NAME>/`, install stow (if it isn't), which is likely in your distribution's repository. After it is installed, cd in this repo, run `stow <DIR>` where `<DIR>` is the name of the directory in this repo. For example, `stow fish`, `stow starship`, will create a symlink to the right place in ~/.config.

## Hyprland Plugins used
These also include ones that haven't appeared in the video.
Use hyprpm to install these, or if you are using NixOS, some of these plugins are in the nixpkgs.

* [Hyprfocus](https://github.com/pyt0xic/hyprfocus)
* [Hyprspace](https://github.com/KZDKM/Hyprspace)
* [csgo-vulkan-fix](https://github.com/hyprwm/hyprland-plugins/tree/main/csgo-vulkan-fix)
* [hyprtrails](https://github.com/hyprwm/hyprland-plugins/tree/main/hyprtrails)
