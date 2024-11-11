import { AppsOptions, BrowserOptions, FileManagerOptions, TerminalOptions, WallpaperChangerOptions } from "types";

const browser: BrowserOptions = {
    name: "zen-browser",
    icon: "",
}

const terminal: TerminalOptions = {
    name: "kitty",
    icon: "",
}

const fm: FileManagerOptions = {
    name: "yazi",
    terminal: true,
    icon: ""
};

const wpc: WallpaperChangerOptions = {
    wallpaper_directory: "/home/rohan/Pictures/wallpapers",
    swww_options: {
        transition_angle: 30,
        transition_fps: 75,
        transition_duration: 1,
        transition_step: 100,
        transition_type: "grow",
    }
};

const system_options = {
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
};


export default {
    browser,
    terminal,
    fm,
    wpc,
    sys_opts: system_options,
} as AppsOptions;