/// <reference path="./WindowBase.ts" />
namespace app.window {

    export class WindowImage extends WindowBase {

        public dbID:number = 0;

        public static get TYPE():string { return 'image'; }

        

        public constructor(animation?) {
            super(animation);
            this.dbID = 0;

        }

        public getTemplateID(): string {
            return "image_card";
        }

        //DB
        public saveedText(id){
            console.log('[WindowImage] saveedText() : id = '+id);
            this.dbID = id;
        }

        // ----------
        //DomとTSの橋渡し系
        // ----------
        public setImage(blob: Blob) {

            if (window == null) return;

            var imgElement: HTMLInputElement = <HTMLInputElement><any>(this.window.querySelector(".card_content img"));
            imgElement.src = URL.createObjectURL(blob);

        }

        public getText(): string {

            if (window == null) return "No Window instance";

            var textElement: HTMLInputElement = <HTMLInputElement><any>(this.window.querySelector(".card_content img"));
            return textElement.value;

        }

        public getType(): string {
            return WindowImage.TYPE;
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

            /*
            app.Main.dbManager.addText(this.getText(),
                function(id:number){
                    this.saveedText.bind(this)(id);
                    if(callback!=null)callback();
                }.bind(this));
                */

        };

        public saveDB(){
            console.log(this);
            //app.Main.dbManager.putText(this.getText(),this.dbID);
        }

        public loadDB(){

            /*
            app.Main.dbManager.getText(this.dbID,function(data){
                //DBの読み込み完了
                var text_ = data['body'];
                this.setText(text_);
            }.bind(this)
            );
            */

        }


    }

}