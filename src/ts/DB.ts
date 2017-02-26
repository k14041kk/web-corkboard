/// <reference types="dexie" />

namespace app {

    export class DB {


        private db: Dexie;

        public constructor() {

            this.init();

        }

        public init() {



            this.db = new Dexie('AppDatabase');
            console.log('[DB] init() : Dexie');

            this.db.version(1).stores({
                texts: '++id,body',
                images: '++id,body'
            });

            this.db.open();

            console.log('[DB] init() : Dexie open');

        }

        /**
         * DBへTextを新規登録
         * 
         */
        public addText(text: string, callback: Function): void {

            console.log('[DB] addText() : add table = texts, body = ' + text);
            this.db.table("texts")
                .add({
                    'body': text
                }).then((id) => {
                    console.log('[DB] addText() : record saved =', id);
                    callback(id);
                });

        }

        /**
         * DBの値を更新
         * 
         */
        public putText(text: string, id: number): void {

            if (id == 0 || id == null) return;
            console.log(id + " : " + text);
            this.db.table("texts")
                .put({
                    id: id,
                    body: text
                });

        }

        public getText(id:number, callback:Function):void{

            this.db.table("texts").get(id)
                .then((text) => {
                    callback(text);
                });

        }

    }
}

