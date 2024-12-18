import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import userPref from "userPref";
import { MprisPlayer } from "types/service/mpris";
import { getPreferredIcon, getPreferredIconV2 } from "utils";

const hyprland = await Service.import("hyprland");
const tray = await Service.import("systemtray");
const mpris = await Service.import("mpris");
const notifications = await Service.import("notifications");
const date = Variable("", { poll: [1000, `date +"%a %d %b %I:%M:%S %p"`] });

function Workspaces() {
  return Widget.Box({
    class_name: "workspaces",
    children: [...Array(10).keys()].map((id) => {
      const activeId = hyprland.active.workspace.bind("id");
      const idIcon = userPref.icons.workspace_icons[id];

      return Widget.Button({
        class_names: activeId.as(a => id === a - 1 ? ["ws", "focused"] : ["ws"]),
        label: userPref.workspaces.labelled ? idIcon : "",
        on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id + 1}`),
      });
    }),
  });
}

function PanelToggler() {
  return Widget.Button({
    class_name: `panel_toggler`,
    child: getPreferredIconV2("home")!,
    on_clicked: () => {
      App.toggleWindow("LeftPanel");
    },
  });
}

function SysTray() {
  const items = tray.bind("items").as((items) =>
    items.map((item) =>
      Widget.Button({
        vpack: "center",
        class_name: "tray-item",
        child: Widget.Icon({ icon: item.bind("icon") }),
        on_primary_click: (_, event) => item.activate(event),
        on_secondary_click: (_, event) => item.openMenu(event),
        tooltip_markup: item.bind("tooltip_markup"),
      }),
    ),
  );

  return Widget.Box({
    class_name: "tray",
    children: items,
  });
}

function Player(player: MprisPlayer) {
  const menu = Widget.Menu({
    children: [
      Widget.MenuItem({
        visible: player.bind("can_go_next"),
        on_activate: () => player.next(),
        child: Widget.Box({
          spacing: 20,
          children: [
            getPreferredIconV2("skip")!,
            Widget.Label("Skip")
          ]
        }),
      }),
      Widget.MenuItem({
        visible: player.bind("can_go_prev"),
        on_activate: () => player.previous(),
        child: Widget.Box({
          spacing: 20,
          children: [
            getPreferredIconV2("previous")!,
            Widget.Label("Previous")
          ],
        }),
      }),
    ],
  });

  return Widget.Button({
    class_name: "media",
    on_clicked: () => player.playPause(),
    on_secondary_click: (_, event) => {
      menu.popup_at_pointer(event);
    },
    child: Widget.Label().hook(player, (self) => {
      self.set_label("Toggle Media");
    }),
  });
}

function NotificationPanelToggler() {
  const dnd = notifications.bind("dnd");

  return Widget.Button({
    class_name: `np_toggler`,
    child: notifications.dnd ? getPreferredIconV2("dnd_bell")! : getPreferredIconV2("notification_bell")!,
    on_clicked: () => {
      App.toggleWindow("RightPanel");
    },
    on_secondary_click: self => {
      notifications.dnd = !notifications.dnd;

      const icon = (notifications.dnd ? getPreferredIcon("dnd_bell")! : getPreferredIcon("notification_bell")!) as string;
      self.set_label(icon);
    },
    tooltip_text: dnd.as(d => d ? "Silent" : "All"),
  })
}

function Left(): Gtk.Widget {
  return Widget.Box({
    class_name: "bar-left",
    children: [PanelToggler(), Workspaces()],
  });
}

function Center(): Gtk.Widget {
  return Widget.Box({
    class_name: "bar-center",
    children: mpris.bind("players").as((p) => p.map(Player)),
  });
}

function Right(): Gtk.Widget {
  const d = Widget.Box({
    class_name: "date",
    children: [Widget.Label({ label: date.bind() })]
  });

  return Widget.Box({
    class_name: "bar-right",
    hpack: "end",
    children: [SysTray(), d, NotificationPanelToggler()],
  });
}

export default function Bar(monitor: number = 0): Gtk.Window {
  return Widget.Window({
    name: `bar-${monitor}`,
    class_name: "RoBar",
    exclusivity: "exclusive",
    anchor: ["top", "left", "right"],
    child: Widget.CenterBox({
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });
}
