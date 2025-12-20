import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class QuickShutdownPrefs extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        //new settings page with title
        const settings = this.getSettings();
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({ title: 'Design' });
        page.add(group);
        //new row with description
        const row = new Adw.ActionRow({ title: 'Use red button design' });
        const toggle = new Gtk.Switch({
            active: settings.get_boolean('use-red-style'),
            valign: Gtk.Align.CENTER,
        });
        //activate css style
        toggle.connect('state-set', (_, state) => {
            settings.set_boolean('use-red-style', state);
            return false;
        });
        //add toggle button 
        row.add_suffix(toggle);
        group.add(row);
        window.add(page);
    }
}