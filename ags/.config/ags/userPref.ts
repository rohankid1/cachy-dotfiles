import Config from "./types";
import apps from "options/apps";
import notification from "options/notification";
import workspace from "options/workspace";
import panels from "options/panels";
import icons from "options/icons";
import desktop from "options/desktop";

// You can modify the configuration in the options directory

export default {
    apps,
    desktop,
    icons,
    left_panel: panels.left,
    right_panel: panels.right,
    notifications: notification,
    workspaces: workspace,
    restart_on_cfg_change: false,
} as Config;
