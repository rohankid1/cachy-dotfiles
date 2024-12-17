import { IconOption } from "types";

const workspace_icons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function i(name: string, font: string, symbolic: string): IconOption {
    return {
        name,
        font,
        symbolic
    }
}

const icons = [
    i("home", "", "user-home-symbolic"),
    i("close", "", "window-close"),
    i("start", "", "media-playback-start-symbolic"),
    i("pause", "", "media-playback-pause-symbolic"),
    i("plus", "", "list-add-symbolic"),
    i("skip", "󰒭", "media-skip-forward"),
    i("previous", "󰒮", "media-skip-backward"),
    i("notification_bell", "", ""),
    i("dnd_bell", "", ""),
    i("clear_all", "󰎟", "edit-clear-all-symbolic"),
    i("refresh", "󰑐", "view-refresh-symbolic")
] as IconOption[];

export default {
    icons,
    workspace_icons
} as {
    icons: IconOption[],
    workspace_icons: string[],
};