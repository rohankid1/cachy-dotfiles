const { query } = await Service.import("applications");
import { Application } from "resource:///com/github/Aylur/ags/service/applications.js";
const WINDOW_NAME: string = "rolauncher";

type Params = {
  width: number;
  height: number;
  spacing: number;
};

function AppItem(app: Application) {
  return Widget.Button({
    class_name: "rolauncher_item",
    on_clicked: () => {
      App.closeWindow(WINDOW_NAME);
      app.launch();
    },
    attribute: { app },
    child: Widget.Box({
      children: [
        Widget.Icon({ icon: app.icon_name || "", size: 40 }),
        Widget.Label({
          class_name: "rolauncher_title",
          label: app.name,
          xalign: 0,
          vpack: "center",
          truncate: "end",
        }),
      ],
    }),
  });
}

function Launcher(opts: Params = { width: 500, height: 500, spacing: 12 }) {
  const { width, height, spacing } = opts;

  let apps = query("").map(AppItem);

  const list = Widget.Box({
    vertical: true,
    children: apps,
    spacing,
  });

  function repopulate() {
    apps = query("").map(AppItem);
    list.children = apps;
  }

  const entry = Widget.Entry({
    class_name: "rolauncher_entry",
    hexpand: true,
    css: `margin-bottom: ${spacing}px;`,
    on_accept: ({ text }) => {
      const results = apps.filter((item) => item.visible);
      if (results[0]) App.toggleWindow(WINDOW_NAME);
      if (text?.trimStart().startsWith(":sh")) {
        App.toggleWindow(WINDOW_NAME);
        Utils.execAsync(text.slice(4));
      }
      results[0].attribute.app.launch();
    },
    on_change: ({ text }) =>
      apps.forEach(
        (app) => (app.visible = app.attribute.app.match(text ?? "")),
      ),
  });

  return Widget.Box({
    vertical: true,
    css: `margin: ${spacing * 2}px;`,
    children: [
      Widget.Label({
        label: "RoLauncher",
        css: `font-size: larger; font-weight: bold; margin-bottom: 14px;`,
      }),
      entry,
      Widget.Scrollable({
        class_name: "rolauncher_scroll",
        hscroll: "never",
        css: `min-width: ${width}px; min-height: ${height}px;`,
        child: list,
      }),
    ],
    setup: (self) =>
      self.hook(App, (_, windowName, visible) => {
        if (windowName !== WINDOW_NAME) return;

        if (visible) {
          repopulate();
          entry.text = "";
          entry.grab_focus();
        }
      }),
  });
}

export default function AppLauncher() {
  return Widget.Window({
    name: WINDOW_NAME,
    class_name: "rolauncher",
    setup: (self) =>
      self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME);
      }),
    visible: false,
    keymode: "exclusive",
    child: Launcher(),
  });
}
