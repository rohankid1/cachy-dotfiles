type Transition = "none" | "crossfade" | "slide_right" | "slide_left" | "slide_up" | "slide_down";

const PopupRevealer = (windowName: string, transition: Transition, child: any) =>
    Widget.Box({
        css: `padding: 10px`,
        children: [
            Widget.Revealer({
                transition,
                child,
                transition_duration: 450,
            }).hook(App, (self, name, visible) => {
                if (name === windowName) self.reveal_child = visible;
            })
        ]
    });

export default ({ name, side, transition_type, child, ...rest }) => {
    const revealer = PopupRevealer(name, transition_type, child);
    const eb = Widget.EventBox({
        vexpand: true,
        hexpand: true,
        css: `background: transparent`,
        on_primary_click: () => App.closeWindow(name),
    });

    return Widget.Window({
        keymode: "on-demand",
        layer: "overlay",
        exclusivity: "ignore",
        hexpand: true,
        name,
        child: Widget.Box({
            children: [
                ...side === "left" ? [revealer, eb] : [eb, revealer]
            ]
        }),
        visible: false,
        setup(self) {
            self.keybind("Escape", () => App.closeWindow(name))
        },
        ...rest
    });
}