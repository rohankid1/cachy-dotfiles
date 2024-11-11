export type SystemOption = {
    name: string,
    script: string,
    icon: string,
};

export type BrowserOptions = {
    name: string,
    icon: string,
};

export type TerminalOptions = {
    name: string,
    icon: string,
};

export type FileManagerOptions = {
    /**
     * The name of the terminal to execute.
    */
    name: string,
    /** 
     * Whether the terminal should run in a terminal.
     * Needed if your terminal is a TUI such as Yazi, Ranger, etc.
     */
    terminal: boolean,
    icon: string,
};

export type AppsOptions = {
    browser: BrowserOptions,
    terminal: TerminalOptions,
    fm: FileManagerOptions,
    sys_opts: {
        show_first: "ws" | "sys",
        show_default_after_clicked: boolean,
        opts: SystemOption[]
    }
    wpc: WallpaperChangerOptions,
}

export type IconOption = {
    name: string,
    /** You can put anything here to represet the name such as icons from nerd icons */
    font: string,
    /** This should be the gtk icon name. For example, "system-search-symbolic".
     * You can find a list of icons available in gtk3-icon-browser, available in
     * the gtk3-demos package. If icon isn't available, the `font` field will be
     * used instead.
    */
    symbolic: string,
};

export type LeftPanelOptions = {
    /** Path to an image that will be used in the panel */
    profile: string,
    close_on_module_open: boolean,
};

export type RightPanelOptions = {};

export type WorkspaceOptions = {
    labelled: boolean,
};

export type SwwwTransitionType = "none"
    | "simple"
    | "fade"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "outer"
    | "any"
    | "random"
    | "wipe"
    | "wave"
    | "grow";

export type SwwwOptions = {
    transition_fps: number,
    transition_step: number,
    transition_angle: number,
    transition_duration: number,
    transition_type: SwwwTransitionType,
};

export type WallpaperChangerOptions = {
    wallpaper_directory: string,
    swww_options: SwwwOptions,
};

export type NotificationOptions = {
    position: Array<"top" | "right" | "bottom" | "left">,
};

export type DesktopShortcutMenus = {
    /**
     * The name of the item that will appear in the desktop menu
     */
    name: string,
    /**
     * The script that will be executed when the user clicks on this item
     */
    script: string,
    /**
     * Should this item be a separator instead of an item?
     * 
     * If true, the name and the script properties will be ignored
     * if you have them set.
     */
    separator: boolean,
};

export type DesktopOptions = {
    shortcuts: DesktopShortcutMenus[];
};

export type Config = {
    restart_on_cfg_change: boolean,
    apps: AppsOptions,
    left_panel: LeftPanelOptions,
    right_panel: RightPanelOptions,
    notifications: NotificationOptions,
    desktop: DesktopOptions,
    icons: {
        icons: IconOption[],
        workspace_icons: string[],
    },
    workspaces: WorkspaceOptions,
};

export default Config;