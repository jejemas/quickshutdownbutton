import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as SystemActions from 'resource:///org/gnome/shell/misc/systemActions.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class QuickShutDownButton extends Extension {
    enable() {
        this._actions = SystemActions.getDefault();
        this._button = new St.Bin({
            style_class: 'panel-button quick-shutdown-button',
            reactive: true,
            can_focus: true,
            track_hover: true
        });

        this._button.set_child(new St.Icon({
            icon_name: 'system-shutdown-symbolic',
            style_class: 'system-status-icon quick-shutdown-icon'
        }));

        this._button.connect('button-release-event', (actor, event) => {
            if (event.get_button() === 1) { 
                this._triggerShutdown();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });

        Main.panel._rightBox.add_child(this._button);
    }

    _triggerShutdown() {
        if (this._actions) {
            this._actions.activatePowerOff();
        }
    }

    disable() {
        if (this._button) {
            Main.panel._rightBox.remove_child(this._button);
            this._button.destroy();
            this._button = null;
        }
        this._actions = null;
    }
}