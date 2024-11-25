import Bar from "modules/Bar";
import LeftPanel from "modules/LeftPanel";
import AppLauncher from "modules/Launcher";
import WP from "modules/WallpaperChanger";
import { styleDir, pywalDir, scriptsDir, cacheDir } from "utils";
import RightPanel from "modules/RightPanel";
import userPref from "userPref";
import Notifications from "modules/Notifications";
import DesktopMenu from "modules/DesktopMenu";
import GLib from "types/@girs/glib-2.0/glib-2.0";

const scss = `${styleDir}/style.scss`;
const css = `${styleDir}/style.css`;
const filesToMonitor = [
  `${pywalDir}/colors.css`,
  `${styleDir}/style.scss`
];

Utils.execAsync(`sass ${scss} ${css}`);

for (const file of filesToMonitor) {
  Utils.monitorFile(file, async () => {
    try {
      await Utils.execAsync(`sass ${scss} ${css}`);

      App.applyCss(css, true);
    } catch (err) {
      print(`Error transpiling scss (monitoring ${file})`);
    }
  });
}

GLib.mkdir_with_parents(cacheDir, 0o755);

if (userPref.restart_on_cfg_change) {
  Utils.monitorFile(`${App.configDir}/userPref.ts`, () => {
    Utils.execAsync(`${scriptsDir}/reload-ags.sh`);
  });
}

App.config({
  style: "./style/style.css",
  windows: [
    Bar(0),
    DesktopMenu(0),
    Notifications(),
    AppLauncher(),
    LeftPanel(),
    RightPanel(),
    WP(),
  ],
});