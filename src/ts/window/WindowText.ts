/// <reference path="./WindowBase.ts" />
namespace app.window {

    export class WindowText extends WindowBase {

        public dbID:number = 0;

        public static get TYPE():string { return 'text'; }

        public constructor(animation?) {
            super(animation);
            this.dbID = 0;

        }

        public getTemplateID(): string {
            return "text_card";
        }

        //DB
        public saveedText(id){
            console.log('[WindowText] saveedText() : id = '+id);
            this.dbID = id;
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

            //data['text'] = this.getText();
            data['dbtext'] = this.dbID;

            return data;

        }


        public deserialize(data: any) {

            super.deserialize(data);

            //this.setText(data['text']);

            this.dbID = data['dbtext'];

        }

        public createDB(callback?:Function){

            app.Main.dbManager.addText(this.getText(),
                function(id:number){
                    this.saveedText.bind(this)(id);
                    if(callback!=null)callback();
                }.bind(this));

        };

        public saveDB(){
            console.log(this);
            app.Main.dbManager.putText(this.getText(),this.dbID);
        }

        public loadDB(){

            app.Main.dbManager.getText(this.dbID,function(data){
                //DBの読み込み完了
                var text_ = data['body'];
                this.setText(text_);
            }.bind(this)
            );

        }


    }

}