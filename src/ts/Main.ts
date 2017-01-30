/// <reference path="./WindowManager.ts" />
/// <reference path="./Save.ts" />
/// <reference path="./Resize.ts" />
namespace app {

    export class Main {

        public static windows: Array<app.window.WindowText>;

        public static drag: app.Drag;
        
        public static resize: app.Resize;

        public static windowManager: app.WindowManager;

        public static save: app.Save;

        public static init(): void {

            console.log("アプリの初期化");

            this.windows = new Array();

            document.getElementById('new_paper').addEventListener('click', app.Main.addPaper, false);

            document.getElementById('save').addEventListener('click', app.Main.saveDate, false);

            document.body.addEventListener('drop', app.Main.addOtherText, false);
            document.body.addEventListener('dragover', app.Main.dropCancel, false);
            document.body.addEventListener('dragenter', app.Main.dropCancel, false);

            app.Main.drag = new app.Drag();
            
            app.Main.resize = new app.Resize();

            app.Main.windowManager = new app.WindowManager();

            app.Main.save = new app.Save();

            setTimeout(app.Main.postInit, 1000);
            //app.Main.postInit();

        }

        public static postInit(): void {

            var loading: HTMLElement = <HTMLElement><any>(document.querySelector('#load-whopper'));

            app.Main.save.load();

            loading.style.display = 'none';



        }

        public static addPaper(e): void {

            e.preventDefault();
            console.log('紙を追加');
            let d: any = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();

            //紙を追加
            app.Main.windowManager.addTextWindow();

        }

        public static addOtherText(e) {

            e.preventDefault();
            //console.log(e);

            var file: File = e.dataTransfer.files[0];

            //console.log(file);

            if (file.type.indexOf("text") == 0) {
                var reader = new FileReader();

                reader.onload = function(evt: any) {

                    var text = evt.target.result;

                    app.Main.windowManager.addTextWindow(file.name, text, e.clientX, e.clientY - 50);

                }

                reader.readAsText(file, 'utf-8');
            }


            return false;

        }

        public static dropCancel(e) {
            e.preventDefault();
            return false;
        }

        public static saveDate(e) {
            e.preventDefault();

            app.Main.save.save();

            let d: any = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();

        }

    }

}


window.onload = app.Main.init;

function createUUID() {
    
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}
