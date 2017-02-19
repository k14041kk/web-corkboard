var app;
(function (app) {
    class WindowManager {
        constructor() {
            this.windows = new Array();
        }
        addWindow(window) {
            componentHandler.upgradeElement(window.getWindow());
            this.windows.push(window);
        }
        addTextWindow(title, text, x, y) {
            var window = new app.window.WindowText();
            if (title != null) {
                window.setTitle(title);
            }
            if (text != null) {
                window.setText(text);
            }
            if (y != null) {
                window.setY(y);
            }
            if (x != null) {
                window.setX(x);
            }
            this.addWindow(window);
        }
        deleteWindow(window) {
            var index = this.windows.indexOf(window);
            this.windows.splice(index, 1);
            (document.querySelector('#white_board')).removeChild(window.getWindow());
        }
        allDeleteWindow() {
            for (let i = 0; i < this.windows.length; i++) {
                (document.querySelector('#white_board')).removeChild(this.windows[i].getWindow());
            }
            this.windows.length = 0;
        }
        serializeWindow() {
            var data = {};
            data['size'] = this.windows.length;
            data['windows'] = new Array(this.windows.length);
            for (let i = 0; i < this.windows.length; i++) {
                data['windows'][i] = this.windows[i].serialize();
            }
            return data;
        }
        deserializeWindows(data, animation_) {
            var size = data['size'];
            var windows = data['windows'];
            var animation = true;
            if (animation_ != null)
                animation = animation_;
            for (let i = 0; i < size; i++) {
                var w_data = windows[i];
                var window;
                if (w_data['type'] == app.window.WindowText.TYPE) {
                    window = new app.window.WindowText(animation);
                }
                window.deserialize(w_data);
                this.windows.push(window);
            }
        }
    }
    app.WindowManager = WindowManager;
})(app || (app = {}));
