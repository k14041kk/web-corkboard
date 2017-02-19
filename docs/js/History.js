var app;
(function (app) {
    class History {
        constructor() {
            this.init();
        }
        init() {
            getWindow().addEventListener('popstate', function (e) {
                if (e.state != null && e.state != '') {
                    app.Main.save.load(e.state);
                    console.log(e.state);
                }
            }, false);
        }
    }
    app.History = History;
})(app || (app = {}));
function getWindow() {
    return window;
}
