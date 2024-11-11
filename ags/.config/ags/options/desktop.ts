import { DesktopOptions, DesktopShortcutMenus } from "types";
import apps from "./apps";

function app(name: string, script: string): DesktopShortcutMenus {
    return {
        name,
        script,
        separator: false,
    };
}

const separator: DesktopShortcutMenus = {
    name: "",
    script: "",
    separator: true,
};

const shortcuts: DesktopShortcutMenus[] = [
    app("Terminal", apps.terminal.name),
    app("Codium", "codium --ozone-platform-hint=auto --ozone-platform=wayland"),
    separator,
    app("Colour Picker", "hyprpicker -a"),
];

export default {
    shortcuts,
} as DesktopOptions;