import { IconOption } from "types";

const workspace_icons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const icons = [
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
] as IconOption[];

export default {
    icons,
    workspace_icons
} as {
    icons: IconOption[],
    workspace_icons: string[],
};