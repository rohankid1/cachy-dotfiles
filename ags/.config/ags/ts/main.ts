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

function monitorCssFiles(files: Array<string>) {
  for (const file of files) {
    Utils.monitorFile(file, async () => {
      try {
        await Utils.execAsync(`sass ${scss} ${css}`);

        App.applyCss(css, true);
      } catch (err) {
        print(`Error transpiling scss (monitoring ${file})`);
      }
    });
  }
}

Utils.execAsync(`sass ${scss} ${css}`);

const filesToMonitor = [
  `${pywalDir}/colors.css`,
  `${styleDir}/style.scss`
];

monitorCssFiles(filesToMonitor);

if (userPref.restart_on_cfg_change) {
  Utils.monitorFile(`${App.configDir}/userPref.ts`, () => {
    Utils.execAsync(`${scriptsDir}/reload-ags.sh`);
  });
}

App.config({
  style: "./style/style.css",
  windows: [
    Notifications(),
    Bar(0),
    AppLauncher(),
    LeftPanel(),
    RightPanel(),
    WP(),
  ],
});
