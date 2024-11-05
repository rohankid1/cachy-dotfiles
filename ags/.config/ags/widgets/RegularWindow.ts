import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

export default Widget.subclass<
  typeof Gtk.Window,
  Gtk.Window.ConstructorProperties
>(Gtk.Window);
