var app;
(function (app) {
    var window;
    (function (window) {
        class WindowText extends window.WindowBase {
            constructor(animation) {
                super(animation);
            }
            static get TYPE() { return 'text'; }
            getTemplateID() {
                return "text_card";
            }
            setText(text) {
                if (window == null)
                    return;
                var textElement = (this.window.querySelector(".card_content textarea"));
                textElement.value = text;
            }
            getText() {
                if (window == null)
                    return "No Window instance";
                var textElement = (this.window.querySelector(".card_content textarea"));
                return textElement.value;
            }
            getType() {
                return WindowText.TYPE;
            }
            serialize() {
                var data = super.serialize();
                data['text'] = this.getText();
                return data;
            }
            deserialize(data) {
                super.deserialize(data);
                this.setText(data['text']);
            }
        }
        window.WindowText = WindowText;
    })(window = app.window || (app.window = {}));
})(app || (app = {}));
