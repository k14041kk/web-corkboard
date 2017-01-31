/// <reference path="./WindowBase.ts" />
namespace app.window {

    export class WindowText extends WindowBase {

        public static get TYPE():string { return 'text'; }

        public constructor(animation?) {
            super(animation);

        }

        public getTemplateID(): string {
            return "text_card";
        }

        // ----------
        //DomとTSの橋渡し系
        // ----------
        public setText(text: string) {

            if (window == null) return;

            var textElement: HTMLInputElement = <HTMLInputElement><any>(this.window.querySelector(".card_content textarea"));
            textElement.value = text;

        }

        public getText(): string {

            if (window == null) return "No Window instance";

            var textElement: HTMLInputElement = <HTMLInputElement><any>(this.window.querySelector(".card_content textarea"));
            return textElement.value;

        }

        public getType(): string {
            return WindowText.TYPE;
        }

        public serialize(): any {

            var data = super.serialize();

            data['text'] = this.getText();

            return data;

        }


        public deserialize(data: any) {

            super.deserialize(data);

            this.setText(data['text']);

        }


    }

}