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
        
        public static historyManager : app.History;
        
        public static dbManager  :app.DB;

        public static init(): void {

            console.log("アプリの初期化");

            this.windows = new Array();

            document.getElementById('new_paper').addEventListener('click', app.Main.addPaper, false);
            document.getElementById('new_image').addEventListener('click', app.Main.addImage, false);

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
            
            app.Main.dbManager = new app.DB();
            
            app.Main.initEventChangeImageFile();

            setTimeout(app.Main.postInit, 1000);
            //app.Main.postInit();

        }

        public static postInit(): void {

            var loading: HTMLElement = <HTMLElement><any>(document.querySelector('#load-whopper'));

            //Jsonで保存しているやつの読み込み　
            app.Main.save.load();

            //DBを使っているやつの読み込み
            app.Main.save.loadDB();

            loading.style.display = 'none';
            
            app.Main.saveHistory();



        }

        public static addPaper(e): void {

            e.preventDefault();
            console.log('紙を追加');
            let d: any = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();

            //紙を追加
            app.Main.windowManager.addTextWindow();
            
            //app.Main.save.saveJson();

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

        public static addImage(e): void {

            e.preventDefault();

            var element = document.getElementById("new_image_input");
            element.click();

            console.log('紙を追加');
            let d: any = document.querySelector('.mdl-layout');
            //d.MaterialLayout.toggleDrawer();

            

            //紙を追加
            //app.Main.windowManager.addTextWindow();
            
            //app.Main.save.saveJson();

        }

        public static initEventChangeImageFile():void {

            var input_file = document.getElementById("new_image_input") as HTMLInputElement;

            input_file.onchange = function () {

                // ファイルが選択されたか
                if (input_file.value) {

                    var url = input_file.files[0];
                    app.Main.windowManager.addImageWindow('新しい画像',url);

                    console.log("ファイルが選択された:" + input_file.value);
                    input_file.value = null;

                } else {

                    console.log("ファイルが未選択");

                }

            };

        }

        public static dropCancel(e) {
            e.preventDefault();
            return false;
        }

        public static saveDate(e) {
            e.preventDefault();

            app.Main.save.saveJson();
            app.Main.save.saveDB();

            let d: any = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();

        }

        public static allDelete(e) {

            e.preventDefault();
            let d: any = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();

            var dialog : any = <any>(document.querySelector('#all_delete_dialog'));
            dialog.showModal();

            var dialogCancel : HTMLButtonElement = <HTMLButtonElement><any>(document.querySelector('#delete_dialog_cancel'));
            dialogCancel.addEventListener('click', function() {
                dialog.close();
            });
            
            var dialogOK : HTMLButtonElement = <HTMLButtonElement><any>(document.querySelector('#delete_dialog_ok'));
            dialogOK.addEventListener('click', function() {
                app.Main.windowManager.allDeleteWindow();
                dialog.close();
                /*setTimeout(function(){
                    var dialog : any = <any>(document.querySelector('#all_delete_dialog'));
                    dialog.close();
                },100);*/
                
            });

        }
        
        public static saveHistory(){
            
            history.pushState(app.Main.save.getNowSaveDate(), "Home" ,"");
            
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

function converterRGB(rgb) { 
    var ret = eval(rgb.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
    return "#" + (("000000" + ret).substring( 6 + ret.length - 6));
}
