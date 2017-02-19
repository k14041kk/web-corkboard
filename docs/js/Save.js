var app;
(function (app) {
    class Save {
        load(data_) {
            console.log('Save : load');
            var data_text = localStorage.getItem('data');
            var animation = true;
            if (data_ != null) {
                data_text = data_;
                animation = false;
            }
            if (data_text == null)
                return;
            var data = JSON.parse(data_text);
            app.Main.windowManager.allDeleteWindow();
            app.Main.windowManager.deserializeWindows(data, animation);
            console.log('Save : loaded');
        }
        save() {
            app.Main.saveHistory();
            var data = app.Main.windowManager.serializeWindow();
            var data_text = JSON.stringify(data);
            localStorage.setItem('data', data_text);
        }
        getNowSaveDate() {
            var data = app.Main.windowManager.serializeWindow();
            var data_text = JSON.stringify(data);
            return data_text;
        }
    }
    app.Save = Save;
})(app || (app = {}));
