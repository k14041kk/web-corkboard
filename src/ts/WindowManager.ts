/// <reference path="./window/WindowBase.ts" />

declare class componentHandler {

    static upgradeElement(h: any):void;
    
    static upgradeDom(h:any):void;

}

namespace app {


    export class WindowManager {

        public windows: Array<app.window.WindowBase>

        public constructor() {

            this.windows = new Array<app.window.WindowBase>();

        }

        public addWindow(window: app.window.WindowBase) {

            //var componentHandler: any = componentHandler;
            componentHandler.upgradeElement(window.getWindow());
            this.windows.push(window);

        }

        /** メモカードを追加 */
        public addTextWindow(title?: string, text?: string, x?: number, y?: number) {

            var window = new app.window.WindowText();
            window.createDB(function(){
                //DBの処理が終わったらJsonに書き出し
                console.log('[WindowManager] addTextWindow : saveJson');
                app.Main.save.saveJson();
            });//DBに保存

        
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

        /** Imageカードを追加 */
        public addImageWindow(title?: string, url?: Blob, x?: number, y?: number) {

            var window = new app.window.WindowImage();
            window.createDB(function(){
                //DBの処理が終わったらJsonに書き出し
                console.log('[WindowManager] addTextWindow : saveJson');
                app.Main.save.saveJson();
            });//DBに保存
            

        
            if (title != null) {
                window.setTitle(title);
            }

            if(url!=null){
                window.setImage(url);
            }

            //if (text != null) {
            //    window.setText(text);
            //}

            if (y != null) {
                window.setY(y);
            }

            if (x != null) {
                window.setX(x);
            }

            this.addWindow(window);

        }


        public deleteWindow(window) {

            var index = this.windows.indexOf(window);
            this.windows.splice(index, 1);

            (<HTMLElement><any>(document.querySelector('#white_board'))).removeChild(window.getWindow());
            
        }
        
        public allDeleteWindow(){
            
            for(let i=0;i<this.windows.length;i++){
                (<HTMLElement><any>(document.querySelector('#white_board'))).removeChild(this.windows[i].getWindow());
            }
            
            this.windows.length = 0;
            
        }

        //保存
        public serializeWindow(): any {

            var data = {};
            data['size'] = this.windows.length;

            data['windows'] = new Array(this.windows.length);

            for (let i = 0; i < this.windows.length; i++) {

                data['windows'][i] = this.windows[i].serialize();
                //this.windows[i].saveDB();

            }


            return data;

        }

        //復帰
        public deserializeWindows(data: any,animation_?:boolean) {
            
            var size = data['size'];

            var windows = data['windows'];
            
            var animation = true;
            
            if(animation_!=null)animation= animation_;

            for (let i = 0; i < size; i++) {

                var w_data = windows[i];
                var window;
                if (w_data['type'] == app.window.WindowText.TYPE) {
                    window = new app.window.WindowText(animation);
                }
                if (w_data['type'] == app.window.WindowImage.TYPE) {
                    window = new app.window.WindowImage(animation);
                }

                window.deserialize(w_data);

                this.windows.push(window);

            }

        }

        public allSaveDB(){

            for (let i = 0; i < this.windows.length; i++) {

                //保存
                this.windows[i].saveDB();

            }
            
        }

        public allLoadDB(){

            for (let i = 0; i < this.windows.length; i++) {
                //読み込み
                this.windows[i].loadDB();

            }

        }

    }

}