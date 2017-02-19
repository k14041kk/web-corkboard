var app;
(function (app) {
    class Main {
        static init() {
            console.log("アプリの初期化");
            this.windows = new Array();
            document.getElementById('new_paper').addEventListener('click', app.Main.addPaper, false);
            document.getElementById('save').addEventListener('click', app.Main.saveDate, false);
            document.getElementById('all_delete').addEventListener('click', app.Main.allDelete, false);
            document.body.addEventListener('drop', app.Main.addOtherText, false);
            document.body.addEventListener('dragover', app.Main.dropCancel, false);
            document.body.addEventListener('dragenter', app.Main.dropCancel, false);
            app.Main.drag = new app.Drag();
            app.Main.resize = new app.Resize();
            app.Main.windowManager = new app.WindowManager();
            app.Main.historyManager = new app.History();
            app.Main.save = new app.Save();
            setTimeout(app.Main.postInit, 1000);
        }
        static postInit() {
            var loading = (document.querySelector('#load-whopper'));
            app.Main.save.load();
            loading.style.display = 'none';
            app.Main.saveHistory();
        }
        static addPaper(e) {
            e.preventDefault();
            console.log('紙を追加');
            let d = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();
            app.Main.windowManager.addTextWindow();
            app.Main.save.save();
        }
        static addOtherText(e) {
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            if (file.type.indexOf("text") == 0) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var text = evt.target.result;
                    app.Main.windowManager.addTextWindow(file.name, text, e.clientX, e.clientY - 50);
                };
                reader.readAsText(file, 'utf-8');
            }
            return false;
        }
        static dropCancel(e) {
            e.preventDefault();
            return false;
        }
        static saveDate(e) {
            e.preventDefault();
            app.Main.save.save();
            let d = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();
        }
        static allDelete(e) {
            e.preventDefault();
            let d = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();
            var dialog = (document.querySelector('#all_delete_dialog'));
            dialog.showModal();
            var dialogCancel = (document.querySelector('#delete_dialog_cancel'));
            dialogCancel.addEventListener('click', function () {
                dialog.close();
            });
            var dialogOK = (document.querySelector('#delete_dialog_ok'));
            dialogOK.addEventListener('click', function () {
                app.Main.windowManager.allDeleteWindow();
                dialog.close();
            });
        }
        static saveHistory() {
            history.pushState(app.Main.save.getNowSaveDate(), "Home", "");
        }
    }
    app.Main = Main;
})(app || (app = {}));
window.onload = app.Main.init;
function createUUID() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-";
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}
function converterRGB(rgb) {
    var ret = eval(rgb.replace(/rgb/, "((").replace(/,/ig, ")*256+")).toString(16);
    return "#" + (("000000" + ret).substring(6 + ret.length - 6));
}
