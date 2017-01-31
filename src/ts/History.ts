namespace app {

    export class History {

        public constructor() {

            this.init();

        }

        public init() {

            getWindow().addEventListener('popstate',function(e) {

                //if (!e.o.state) return;

                if (e.state != null && e.state != '') {

                  app.Main.save.load(e.state);  
                  console.log(e.state);
                    
                }

            },false);

        }

    }
}

function getWindow(){
    return window;
}