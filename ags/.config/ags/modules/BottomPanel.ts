import PopupWindow from "widgets/PopupWindow";

// WIP

const Content = () => Widget.Box({
    vexpand: true,
    hexpand: true,
    spacing: 10,
    class_name: `panel_bottom_content`,
    css: `background: black;`,
    children: [
        Widget.Box({})
    ]
});

export default () => PopupWindow({
    side: "bottom",
    name: "BottomPanel",
    transition_type: "slide_up",
    height_request: 50,
    anchor: ["top", "bottom", "left", "right"],
    class_name: "panel_bottom",
    child: Content()
})