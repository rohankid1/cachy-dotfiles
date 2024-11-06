
import Config from "./types";

// change these to your likings
export default {
    restart_on_cfg_change: true,
    left_panel: {
        profile: "/home/rohan/Pictures/modern-logo.png",
        close_on_module_open: true,
    },
    right_panel: {},
    notifications: {
        position: ["top", "right"]
    },
    workspaces: {
        labelled: false,
    },
    apps: {
        browser: "zen-browser",
        terminal: "kitty",
        fm: {
            name: "yazi",
            terminal: true,
        },
        wpc: {
            wallpaper_directory: "/home/rohan/Pictures/wallpapers",
            swww_options: {
                transition_angle: 30,
                transition_fps: 75,
                transition_duration: 1,
                transition_step: 100,
                transition_type: "grow"
            },
        },
        sys_opts: {
            show_first: "ws",
            show_default_after_clicked: true,
            opts: [
                {
                    name: "Shutdown",
                    script: "poweroff",
                    icon: "system-shutdown-symbolic",
                },
                {
                    name: "Reboot",
                    script: "reboot",
                    icon: "system-reboot-symbolic"
                },
                {
                    name: "Logout",
                    script: "hyprctl dispatch exit",
                    icon: "system-log-out"
                },
                {
                    name: "Lock",
                    script: "hyprlock",
                    icon: "system-lock-screen-symbolic"
                },
                {
                    name: "Search Applications",
                    script: "/usr/bin/ags -t rolauncher",
                    icon: "system-search-symbolic"
                },
                {
                    name: "Wallpaper",
                    script: "/usr/bin/ags -t WallpaperChanger",
                    icon: "preferences-desktop-wallpaper"
                },
                {
                    name: "Color Picker",
                    script: "hyprpicker -a",
                    icon: "color-select-symbolic"
                },
                {
                    name: "Reload",
                    script: "/home/rohan/.config/ags/scripts/reload-ags.sh",
                    icon: "view-refresh",
                }
            ]
        }
    },
    icons: {
        workspace_icons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        // dont remove items in here, they are needed in main code,
        // unless you want to modify the code, but feel free to change how the icon
        // looks or add new ones.
        icons: [
            {
                name: "home",
                font: "",
                symbolic: "user-home-symbolic"
            },
            {
                name: "close",
                font: "",
                symbolic: "window-close"
            },
            {
                name: "start",
                font: "",
                symbolic: "media-playback-start-symbolic"
            },
            {
                name: "pause",
                font: "",
                symbolic: "media-playback-pause-symbolic"
            },
            {
                name: "plus",
                font: "",
                symbolic: "list-add-symbolic"
            },
            {
                name: "skip",
                font: "󰒭",
                symbolic: "media-skip-forward"
            },
            {
                name: "previous",
                font: "󰒮",
                symbolic: "media-skip-backward"
            },
            {
                name: "notification_bell",
                font: "",
                symbolic: ""
            },
            {
                name: "clear_all",
                font: "󰎟",
                symbolic: "edit-clear-all-symbolic"
            }
        ]
    }
} as Config;
