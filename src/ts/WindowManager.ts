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

        public addTextWindow(title?: string, text?: string, x?: number, y?: number) {

            var window = new app.window.WindowText();

            /*var t = <HTMLTemplateElement>document.querySelector('#text_card');

            var card = document.importNode(t.content, true);
            document.querySelector('#white_board').appendChild(card);

            var cardAdd: HTMLElement = <HTMLElement>(<HTMLElement>document.querySelector('#white_board')).lastElementChild;

            if (title != null) {
                var tElement: HTMLInputElement = <HTMLInputElement>(cardAdd.querySelector(".bar_title input"));
                tElement.value = title;
            }

            if (text != null) {
                var textElement: HTMLTextAreaElement = <HTMLTextAreaElement>(cardAdd.querySelector(".card_content textarea"));
                textElement.value = text;
            }

            cardAdd.style.top = y != null ? y + "px" : "40px";
            cardAdd.style.left = x != null ? x + "px" : "100px";
            //app.Main.drag.initDrag(<Element>cardAdd);*/

            //var window = new app.window.WindowText();

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

        public deleteWindow(window) {

            var index = this.windows.indexOf(window);
            this.windows.splice(index, 1);

        }

        public serializeWindow(): any {

            var data = {};
            data['size'] = this.windows.length;

            data['windows'] = new Array(this.windows.length);

            for (let i = 0; i < this.windows.length; i++) {

                data['windows'][i] = this.windows[i].serialize();

            }


            return data;

        }

        public deserializeWindows(data: any) {

            var size = data['size'];

            var windows = data['windows'];

            for (let i = 0; i < size; i++) {

                var w_data = windows[i];
                var window;
                if (w_data['type'] == app.window.WindowText.TYPE) {
                    window = new app.window.WindowText();
                }

                window.deserialize(w_data);

                this.windows.push(window);

            }

        }

    }

}