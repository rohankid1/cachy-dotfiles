import { Notification } from "types/service/notifications";
import { getPreferredIconV2 } from "utils";
import PopupWindow from "widgets/PopupWindow";
import Pango from "types/@girs/pango-1.0/pango-1.0";

const notifications = await Service.import("notifications");

function Animated(n: Notification) {
    return Widget.Revealer({
        transition: "slide_down",
        child: NotificationItem(n),
        setup: self => Utils.timeout(200, () => {
            if (!self.is_destroyed)
                self.reveal_child = true;
        }),
    })
}

function NotificationItem(n: Notification) {
    return Widget.Box({
        attribute: { id: n.id },
        spacing: 10,
        hexpand: true,
        vexpand: false,
        vertical: true,
        class_name: `panel_right_notification_item`,
        children: [
            Widget.Label({
                class_name: `panel_right_notification_summary`,
                vpack: "start",
                hpack: "start",
                vexpand: false,
                hexpand: true,
                max_width_chars: 32,
                wrap_mode: Pango.WrapMode.WORD_CHAR,
                ellipsize: Pango.EllipsizeMode.END,
                tooltip_text: n.summary,
                label: n.summary,
            }),
            Widget.Label({
                class_name: `panel_right_notification_body`,
                vpack: "center",
                hpack: "start",
                wrap: true,
                max_width_chars: 32,
                wrap_mode: Pango.WrapMode.WORD_CHAR,
                label: n.body,
            }),
            Widget.Button({
                class_name: `panel_right_notification_close`,
                hexpand: true,
                vpack: "end",
                child: getPreferredIconV2("close") || Widget.Label("X"),
                on_clicked: () => n.close(),
            }),
        ]
    });
}

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
                class_name: "ro_btn",
                hexpand: false,
                vexpand: false,
                hpack: "end",
                sensitive: notifications.bind("notifications").as(n => n.length > 0),
                child: getPreferredIconV2("clear_all")!,
                tooltip_text: "Clear Notifications",
                on_clicked: notifications.clear,
            })
        ]
    })
}

function Notifications() {
    const map: Map<number, ReturnType<typeof Animated>> = new Map;

    function remove(_: unknown, id: number) {
        const n = map.get(id);

        if (n) {
            n.reveal_child = false;
            Utils.timeout(200, () => {
                n.destroy();
                map.delete(id);
            });
        }
    }

    const box = Widget.Box({
        vertical: true,
        children: notifications.notifications.map(n => {
            const animated = Animated(n);
            map.set(n.id, animated);
            return animated;
        }),
        visible: notifications.bind("notifications").as(n => n.length > 0),
    });

    return box
        .hook(notifications, remove, "closed")
        .hook(notifications, (_, id) => {
            if (id) {
                if (map.has(id))
                    remove(null, id);

                const n = notifications.getNotification(id)!;
                const anim = Animated(n);
                map.set(id, anim);
                box.children = [anim, ...box.children];
            }
        }, "notified");
}

function ActualContent() {
    return Widget.Stack({
        class_name: "right_panel_content_stack",
        transition: "slide_left_right",
        children: {
            "notifications": Widget.Box({
                vertical: true,
                class_name: `right_panel_notifications`,
                children: [
                    Header(),
                    Widget.Scrollable({
                        hscroll: "never",
                        vscroll: "automatic",
                        vexpand: true,
                        child: Notifications(),
                    }),
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