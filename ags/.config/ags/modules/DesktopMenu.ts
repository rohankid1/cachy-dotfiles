import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import userPref from "userPref";

const Separator = Widget.subclass(Gtk.SeparatorMenuItem);

function Menu() {
    return Widget.Menu({
        children: userPref.desktop.shortcuts.map(item => {
            if (item.separator)
                return Separator({});

            return Widget.MenuItem({
                hpack: "fill",
                on_activate: () => Utils.execAsync(item.script),
                child: Widget.Label({ label: item.name, hpack: "start" })
            });
        })
    });
}

export default (monitor: number = 0) => Widget.Window({
    monitor: monitor,
    name: `desktop-${monitor}`,
    layer: "background",
    exclusivity: "ignore",
    anchor: ["top", "left", "bottom", "right"],
    child: Widget.EventBox({
        vexpand: true,
        hexpand: true,
        on_secondary_click: (_self, event) => {
            Menu().popup_at_pointer(event);
        },
    }),
});