import userPref from "userPref";
import * as Types from "types";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

const user = Utils.USER;

export const scriptsDir = `${App.configDir}/scripts`;
export const styleDir = `${App.configDir}/style`;
export const pywalDir = `/home/${user}/.cache/wal`;
export const optsDir = `${App.configDir}/options`;
export const cacheDir = `${Utils.CACHE_DIR}/ro`;

export const userInfo = {
    host: Variable(user.charAt(0).toUpperCase() + user.slice(1)),
    uptime: Variable("", { poll: [60_000, "uptime -p", up => up.slice(2)] }),
    avatar: Variable(userPref.left_panel.profile),
    os: Variable(await Utils.execAsync([`bash`, `-c`, `grep ^NAME= /etc/os-release | cut -d'=' -f2 | tr -d '"'s`])),
};

export function getPreferredIcon(name: string): Types.IconOption | string | null {
    const icon = userPref.icons.icons.find(i => i.name === name.toLowerCase());
    if (icon) {
        if (Utils.lookUpIcon(icon.symbolic))
            return icon;
        else return icon.font;
    }

    return null;
}

export function getPreferredIconV2(name: string): Gtk.Widget | null {
    const icon = userPref.icons.icons.find(i => i.name === name.toLowerCase());

    if (icon) {
        if (Utils.lookUpIcon(icon.symbolic))
            return Widget.Icon({ icon: icon.symbolic })
        else
            return Widget.Label({ label: icon.font })
    }

    return null;
}

export function changeWallpaperAndTheme(path: string) {
    const {
        transition_angle,
        transition_duration,
        transition_fps,
        transition_step,
        transition_type
    } = userPref.apps.wpc.swww_options;

    Utils.execAsync(`
        swww img ${path} --transition-angle ${transition_angle} \
                         --transition-duration ${transition_duration} \
                         --transition-fps ${transition_fps} \
                         --transition-step ${transition_step} \
                         --transition-type ${transition_type}
        `
    );
    Utils.timeout(transition_duration * 1000, () => {
        Utils.execAsync(`${scriptsDir}/theme-changer.sh`);
    });
}