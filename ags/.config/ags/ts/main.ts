import Bar from "modules/Bar";
import LeftPanel from "modules/LeftPanel";
import AppLauncher from "modules/Launcher";
import WP from "modules/WallpaperChanger";
import { styleDir, pywalDir, scriptsDir } from "utils";
import RightPanel from "modules/RightPanel";
import userPref from "userPref";
import Notifications from "modules/Notifications";

const scss = `${styleDir}/style.scss`;
const css = `${styleDir}/style.css`;

Utils.execAsync(`sass ${scss} ${css}`);

Utils.monitorFile(`${pywalDir}/colors.css`, async () => {
  try {
    await Utils.execAsync(`sass ${scss} ${css}`);

    App.applyCss(css, true);
  } catch (err) {
    print(`Error transpiling scss: ${err} (monitoring style dir)`)
  }
});

Utils.monitorFile(`${styleDir}/style.scss`, async () => {
  try {
    await Utils.execAsync(`sass ${scss} ${css}`);

    App.applyCss(css, true);
  } catch (err) {
    print(`Error transpiling scss: ${err} (monitoring style dir)`)
  }
});

if (userPref.restart_on_cfg_change) {
  Utils.monitorFile(`${App.configDir}/userPref.ts`, () => {
    Utils.execAsync(`${scriptsDir}/reload-ags.sh`);
  });
}

App.config({
  style: "./style/style.css",
  windows: [Bar(0), AppLauncher(), WP(), LeftPanel(), RightPanel(), Notifications()],
});
