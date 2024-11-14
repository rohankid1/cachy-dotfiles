import { AppsOptions, BrowserOptions, FileManagerOptions, SystemOption, TerminalOptions, WallpaperChangerOptions } from "types";

function opt(name: string, script: string, icon: string): SystemOption {
    return {
        name,
        script,
        icon
    };
}

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
        opt("Shutdown", "poweroff", "system-shutdown-symbolic"),
        opt("Reboot", "reboot", "system-reboot-symbolic"),
        opt("Logout", "hyprctl dispatch exit", "system-log-out"),
        opt("Lock", "hyprlock", "system-lock-screen-symbolic"),
        opt("Search Applications", "/usr/bin/ags -t rolauncher", "system-search-symbolic"),
        opt("Wallpaper", "/usr/bin/ags -t WallpaperChanger", "preferences-desktop-wallpaper"),
        opt("Colour Picker", "hyprpicker -a", "color-select-symbolic"),
        opt("Reload", "/home/rohan/.config/ags/scripts/reload-ags.sh", "view-refresh"),
    ]
};


export default {
    browser,
    terminal,
    fm,
    wpc,
    sys_opts: system_options,
} as AppsOptions;