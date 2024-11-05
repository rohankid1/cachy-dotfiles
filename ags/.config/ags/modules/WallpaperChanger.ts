import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import RegularWindow from "../widgets/RegularWindow";
import userPref from "userPref";
import Gio from "types/@girs/gio-2.0/gio-2.0";
import Grid from "widgets/Grid";
import GdkPixbuf from "types/@girs/gdkpixbuf-2.0/gdkpixbuf-2.0";
import { changeWallpaperAndTheme, getPreferredIconV2 } from "utils";
import wallpaper from "services/wallpaper";

// See https://github.com/LGFae/swww?tab=readme-ov-file#features
const SUPPORTED_TYPES = [".png", ".jpeg", "jpg", ".gif", ".pnm", ".tga", ".tiff", ".webp", ".bmp"];
const WALL_DIR = Variable(userPref.apps.wpc.wallpaper_directory);

const Header = () => {
  return Widget.Box({
    class_name: "wpc_header",
    hexpand: true,
    vertical: false,
    vpack: "start",
    spacing: 20,
    children: [
      Widget.Button({
        class_name: `wpc_button`,
        hpack: "end",
        hexpand: false,
        child: getPreferredIconV2("close")!,
        on_clicked: () => {
          App.closeWindow("WallpaperChanger");
        }
      }),
      Widget.Label("RoPaper Changer"),
    ]
  });
}

const Wallpapers = () => {
  const grid = Grid({});
  grid.set_column_spacing(10);
  grid.set_row_spacing(10);

  const dir = Gio.File.new_for_path(WALL_DIR.value);
  let enumerator = dir.enumerate_children("standard::*", Gio.FileQueryInfoFlags.NONE, null);

  let column = 1;
  let row = 1;
  let fileInfo: Gio.FileInfo | null;
  while ((fileInfo = enumerator.next_file(null)) != null) {
    let fileName = fileInfo.get_name();

    if (SUPPORTED_TYPES.some(ty => fileName.endsWith(ty))) {
      let filePath = dir.get_child(fileName).get_path();
      const img = Widget.Box({
        class_name: `wpc_grid_item_container`,
        children: [
          Widget.Box({
            class_name: `wpc_grid_item`,
            css: WALL_DIR.bind().as(_ => {
              GdkPixbuf.Pixbuf.new_from_file(filePath!);
              return `background-image: url("${filePath!}")`;
            })
          }),
          Widget.Box({
            vertical: true,
            hexpand: true,
            spacing: 10,
            children: [
              Widget.Label({
                label: fileName,
                css: `margin-left: 6px;`,
                hpack: "center",
              }),
              Widget.Button({
                class_name: "wpc_button",
                label: wallpaper.bind("wallpaper_path").as(w => w === filePath ? "Applied" : "Apply"),
                sensitive: wallpaper.bind("wallpaper_path").as(w => !(w === filePath)),
                vexpand: false,
                hexpand: true,
                vpack: "start",
                hpack: "center",
                on_clicked: () => {
                  changeWallpaperAndTheme(filePath!);
                }
              })
            ],
          }),
        ],
      });

      grid.attach(img, column, row, 1, 1);

      column++;
      if (column === 4) {
        column = 1;
        row++;
      }
    }
  }

  return Widget.Scrollable({
    css: `padding: 4px;`,
    hscroll: "never",
    vscroll: "automatic",
    hexpand: true,
    vexpand: true,
    child: Widget.Box({
      children: [
        grid
      ]
    })
  })
};

const Content = () =>
  Widget.Box({
    class_name: `wpc_content`,
    children: [
      Wallpapers()
    ]
  });

export default function WP() {
  const win = RegularWindow({
    name: "WallpaperChanger",
    child: Widget.Box({
      vertical: true,
      children: [Header(), Content()],
    }),
    setup: (win) => {
      win.set_default_size(200, 300);
    },
  });

  win.keybind("Escape", () => {
    App.closeWindow("WallpaperChanger");
  });

  return win;
}
