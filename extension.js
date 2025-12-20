import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as SystemActions from 'resource:///org/gnome/shell/misc/systemActions.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class QuickShutdownButton extends Extension {
    enable() {
        //to enable a settings dialog 
        this._settings = this.getSettings();
        this._actions = SystemActions.getDefault();
        //the new button 
        this._button = new St.Bin({
            reactive: true,
            can_focus: true,
            track_hover: true
        });
        //icon for the button
        this._icon = new St.Icon({
            icon_name: 'system-shutdown-symbolic',
            style_class: 'system-status-icon'
        });
        this._button.set_child(this._icon);

        // load css on start
        this._updateStyle();

        // update styling when settings are changed
        this._settings.connect('changed::use-red-style', () => this._updateStyle());
        this._button.connect('button-release-event', (actor, event) => {
            if (event.get_button() === 1) {
                this._actions.activatePowerOff();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });

        Main.panel._rightBox.add_child(this._button);
    }

    _updateStyle() {
        const useRed = this._settings.get_boolean('use-red-style');
        
        // set dynamic classes
        if (useRed) {
            this._button.style_class = 'panel-button quick-shutdown-button red-style';
        } else {
            this._button.style_class = 'panel-button quick-shutdown-button';
        }
    }

    disable() {
        this._button?.destroy();
        this._settings = null;
        this._actions = null;
    }
}