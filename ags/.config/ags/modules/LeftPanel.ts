import PopupWindow from "../widgets/PopupWindow";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import GdkPixbuf from "types/@girs/gdkpixbuf-2.0/gdkpixbuf-2.0";
import { cacheDir, getPreferredIconV2, userInfo } from "utils";
import userPref from "../userPref";
import Grid from "widgets/Grid";

const audio = await Service.import("audio");
const { terminal, browser, fm } = userPref.apps;

const greeter = Variable("", {
    poll: [60_000, () => {
        const hour = new Date().getHours();
        let greeter = "";

        if (hour < 12)
            greeter = "Good Morning";
        else if (hour < 18)
            greeter = "Good afternoon";
        else if (hour < 22)
            greeter = "Good evening";
        else
            greeter = "Good night";

        return `${greeter}, ${userInfo.host.value}!`;
    }]
});

const Calendar = Widget.Calendar({
    class_name: "panel_left_calendar",
});

const Profile = () => {
    return Widget.Box({
        vertical: false,
        class_name: "panel_left_profile_container",
        hexpand: true,
        children: [
            Widget.Box({
                class_name: "panel_left_avatar",
                css: userInfo.avatar.bind().as(a => {
                    GdkPixbuf.Pixbuf.new_from_file(a);
                    return `background-image: url("${a}")`;
                }),
            }),
            Widget.Box({
                vertical: true,
                hexpand: true,
                vpack: "start",
                hpack: "fill",
                children: [
                    Widget.Label({ label: "System", css: `font-size: larger; font-weight: bold;` }),
                    Widget.Label({ label: userInfo.os.bind() }),
                    Widget.Label({ label: userInfo.uptime.bind() }),
                ],
            }),
        ],
    })
}

const Note = () => {
    const TextView = Widget.subclass(Gtk.TextView);

    return Widget.Box({
        vertical: true,
        spacing: 6,
        children: [
            Widget.Label({ label: "Notes", css: `font-size: 24px; font-weight: bolder;` }),
            Widget.Scrollable({
                class_name: "panel_left_scrollable_note",
                vexpand: true,
                hscroll: "never",
                vscroll: "automatic",
                child: TextView({
                    css: `background: @background;`,
                    class_name: "panel_left_note",
                    /* @ts-ignore */
                    wrap_mode: Gtk.WrapMode.WORD_CHAR,
                    setup(self) {
                        /* @ts-ignore */
                        self.bind();
                        Utils.readFileAsync(`${cacheDir}/note`)
                            .then((data) => {
                                self.buffer.set_text(data, -1);
                            })
                            .catch(print);
                    },
                }).keybind("Alt_L", (self, _e) => {
                    const start = self.buffer.get_start_iter();
                    const end = self.buffer.get_end_iter();
                    const text = self.buffer.get_text(start, end, true) || " ";
                    Utils.writeFile(text, `${cacheDir}/note`)
                        .then(_ => print("successfully updated note"))
                        .catch(print);
                }),
            })
        ]
    });
};

const Apps = () => {
    const browserIcon = getPreferredIconV2("browser") || Widget.Label(browser.icon);
    const terminalIcon = getPreferredIconV2("terminal") || Widget.Label(terminal.icon);
    const fileManagerIcon = getPreferredIconV2("file_manager") || Widget.Label(fm.icon);

    function Button({ icon, app }) {
        return Widget.Button({
            class_names: ["ro_btn", "favourite_app"],
            vexpand: false,
            hexpand: true,
            child: icon,
            tooltip_text: app.name,
            on_clicked: () => {
                if (Object.hasOwn(app, "terminal")) {
                    if (app.terminal) {
                        Utils.execAsync([terminal.name, `-e`, app.name]);
                        App.closeWindow("LeftPanel");
                        return;
                    }
                }

                Utils.execAsync(app.name);
                App.closeWindow("LeftPanel");
            }
        });
    }

    return Widget.Box({
        vertical: true,
        spacing: 6,
        children: [
            Widget.Label({ label: "Quick Access", css: `font-size: 24px; font-weight: bolder;` }),
            Widget.Box({
                vertical: false,
                spacing: 8,
                height_request: 20,
                children: [
                    Button({ icon: browserIcon, app: browser }),
                    Button({ icon: terminalIcon, app: terminal }),
                    Button({ icon: fileManagerIcon, app: fm }),
                ]
            }),
        ]
    });
};

const SystemOptions = () => {
    const grid = Grid({ vpack: "end" });
    grid.set_row_spacing(4);
    grid.set_column_spacing(4);

    let row = 1;
    let column = 1;
    for (const option of userPref.apps.sys_opts.opts) {
        if (column === 4) {
            row += 1;
            column = 1;
        }

        const button = Widget.Button({
            class_name: "ro_btn",
            css: `min-height: 24px;`,
            hexpand: true,
            child: Widget.Icon({ icon: option.icon }),
            tooltip_text: option.name,
            on_clicked: () => {
                if (userPref.left_panel.close_on_module_open)
                    App.closeWindow("LeftPanel");

                Utils.execAsync(option.script);
            }
        });

        grid.attach(button, column, row, 1, 1);

        column += 1
    }

    const VolumeAdjuster = Widget.Box({
        children: [
            Widget.Label({ label: audio["speaker"].bind("volume").as(v => Math.floor(v * 100)).as(String) }),
            Widget.Slider({
                draw_value: false,
                hexpand: true,
                value: audio["speaker"].bind("volume"),
                on_change: ({ value, dragging }) => {
                    if (dragging) {
                        audio["speaker"].volume = value;
                    }
                },
            })
        ]
    });

    return Widget.Box({
        vertical: true,
        spacing: 8,
        children: [
            Widget.Label({ label: "System", css: `font-size: 24px; font-weight: bolder;` }),
            VolumeAdjuster,
            Widget.Scrollable({
                heightRequest: 85,
                hscroll: "never",
                vscroll: "automatic",
                child: grid,
            })
        ]
    });
};

const Content = () => Widget.Box({
    vexpand: true,
    hexpand: false,
    vertical: true,
    spacing: 10,
    class_name: "panel_left_content",
    children: [
        // Header,
        Widget.Label({ label: greeter.bind(), css: `font-size: 24px; font-weight: bolder;` }),
        Profile(),
        Apps(),
        Calendar,
        Note(),
        SystemOptions(),
    ]
});

export default () =>
    PopupWindow({
        name: "LeftPanel",
        side: "left",
        transition_type: "slide_right",
        anchor: ["top", "bottom", "right", "left"],
        class_name: "panel_left",
        child: Widget.Box({
            children: [
                Content(),
            ]
        }),
    })