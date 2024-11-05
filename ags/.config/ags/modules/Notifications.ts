import { Notification as INotification } from "types/service/notifications";
import userPref from "userPref";

// WIP section

const notifications = await Service.import("notifications");

const NotificationIcon = ({ app_entry, app_icon, image }: INotification) => {
    if (image) {
        return Widget.Box({
            vpack: "start",
            hexpand: false,
            css: `
                background-image: url("${image}");
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                min-width: 78px;
                min-height: 78px;
            `,
        });
    }

    let icon = "dialog-information-symbolic";
    if (Utils.lookUpIcon(app_icon))
        icon = app_icon;

    if (app_entry && Utils.lookUpIcon(app_entry))
        icon = app_entry;

    return Widget.Box({
        child: Widget.Icon(icon),
    });
}

export const Notification = (n: INotification) => {
    const icon = Widget.Box({
        vpack: "start",
        class_name: "notification_icon",
        child: NotificationIcon(n)
    });

    const title = Widget.Label({
        class_name: "notification_title",
        xalign: 0,
        justification: "left",
        hexpand: true,
        max_width_chars: 24,
        truncate: "end",
        wrap: true,
        label: n.summary,
        use_markup: true,
    });

    const body = Widget.Label({
        class_name: "notification_body",
        hexpand: true,
        use_markup: true,
        xalign: 0,
        justification: "left",
        label: n.body,
        wrap: true,
    });

    const actions = Widget.Box({
        class_name: "notification_actions",
        children: n.actions.map(({ id, label }) => Widget.Button({
            class_name: "notification_action_button",
            on_clicked: () => {
                n.invoke(id);
                n.dismiss();
            },
            hexpand: true,
            child: Widget.Label(label)
        })),
    });

    return Widget.EventBox(
        {
            attribute: { id: n.id },
            on_primary_click: n.dismiss,
        },
        Widget.Box(
            {
                class_name: `notification ${n.urgency}`,
                vertical: true,
            },
            Widget.Box([
                icon,
                Widget.Box(
                    { vertical: true },
                    title,
                    body
                )
            ]),
            actions
        )
    );
};

export default (monitor: number = 0) => {
    const list = Widget.Box({
        vertical: true,
        children: notifications.popups.map(Notification),
    });

    const onNotified = (_, id: number) => {
        const n = notifications.getNotification(id);
        if (n)
            list.children = [Notification(n), ...list.children];
    };

    const onDismissed = (_, id: number) => {
        list.children.find(n => n.attribute.id === id)?.destroy();
    };

    list.hook(notifications, onNotified, "notified")
        .hook(notifications, onDismissed, "dismissed");

    const revealer = Widget.Revealer({
        transition: "slide_left",
        transition_duration: 400,
        child: list,
    });

    return Widget.Window({
        monitor,
        name: `notifications-${monitor}`,
        class_name: `notification_popups`,
        anchor: userPref.notifications.position,
        child: Widget.Box({
            css: `min-width: 2px; min-height: 2px;`,
            class_name: `notifications`,
            vertical: true,
            child: revealer,
        })
    });
};