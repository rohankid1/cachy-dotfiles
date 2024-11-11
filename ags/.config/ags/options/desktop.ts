import { DesktopOptions, DesktopShortcutMenus } from "types";

const shortcuts: DesktopShortcutMenus[] = [
    {
        name: "Colour Picker",
        script: "hyprpicker -a",
        separator: false,
    },
    {
        name: "",
        script: "",
        separator: true,
    },
    {
        name: "Codium",
        script: "codium --ozone-platform-hint=auto --ozone-platform=wayland",
        separator: false,
    }
];

export default {
    shortcuts,
} as DesktopOptions;