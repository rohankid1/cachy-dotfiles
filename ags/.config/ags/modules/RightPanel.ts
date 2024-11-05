import { IconOption } from "types";
import Gio from "types/@girs/gio-2.0/gio-2.0";
import { Notification } from "types/service/notifications";
import userPref from "userPref";
import { getPreferredIconV2 } from "utils";
import PopupWindow from "widgets/PopupWindow";
import { Notification as Notif } from "./Notifications";

// WIP section

const notifications = await Service.import("notifications");

function Header() {
    return Widget.Box({
        vpack: "start",
        hpack: "start",
        class_name: `panel_right_header`,
        spacing: 50,
        children: [
            Widget.Label({
                label: `Notifications`,
                css: `font-size: 24px; font-weight: bolder;`,
            }),
            Widget.Button({
                hexpand: false,
                vexpand: false,
                hpack: "end",
                child: getPreferredIconV2("clear_all")!,
                tooltip_text: "Clear Notifications",
                on_clicked: () => {
                    // clear notifications
                },
            })
        ]
    })
}

function Notifications() {
    return Widget.Box({
        vertical: true,
        spacing: 10,
        children: [
            Widget.Switch({
                active: notifications.bind("dnd").as(Boolean),
                on_activate: ({ active }) => {
                    notifications.dnd = active;
                    print(`dnd is ${notifications.dnd}`);
                }
            }),
            Widget.Scrollable({
                hscroll: "never",
                vscroll: "automatic",
                hpack: "center",
                child: Widget.Box({
                    vertical: true,
                    children: notifications.notifications.map(Notif),
                    setup: self => {
                        // on notified
                        self.hook(notifications, (_: any, id: number) => {
                            const n = notifications.getNotification(id);
                            if (n)
                                self.children = [Notif(n), ...self.children];
                        }, "notified");

                        // on dismiss
                        self.hook(notifications, (_: any, id: number) => {
                            self.children.find(n => n.attribute.id)?.destroy();
                        }, "dismissed");
                    }
                }),
            }),
        ]
    });
}

function ActualContent() {
    return Widget.Stack({
        class_name: "right_panel_content_stack",
        children: {
            "notifications": Widget.Box({
                vertical: true,
                class_name: `right_panel_notifications`,
                children: [
                    Header(),
                    Notifications(),
                ]
            })
        },
        shown: "notifications"
    });
}

function Content() {
    return Widget.Box({
        vexpand: true,
        hexpand: false,
        vertical: true,
        spacing: 10,
        class_name: `panel_right_content`,
        children: [
            ActualContent(),
        ],
    });
}

export default () =>
    PopupWindow({
        name: "RightPanel",
        side: "right",
        transition_type: "slide_left",
        anchor: ["top", "bottom", "right", "left"],
        class_name: "panel_right",
        child: Widget.Box({
            children: [
                Content()
            ]
        })
    });