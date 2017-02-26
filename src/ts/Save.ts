namespace app {

    export class Save{
     
        public load(data_?:string){
            
            console.log('Save : load');
         
            var data_text = localStorage.getItem('data');
            
            var animation = true;
            
            if(data_!=null){
                data_text = data_;
                animation= false;
            }
            
            if(data_text==null)return;
            
            var data = JSON.parse(data_text);
            
            
            
            app.Main.windowManager.allDeleteWindow();
            
            app.Main.windowManager.deserializeWindows(data,animation);


            
            console.log('Save : loaded');
            
        }

        public loadDB(){

            console.log('[Save] loadDB() : load');

            app.Main.windowManager.allLoadDB();
            
        }
        
        public saveJson(){
            
            app.Main.saveHistory();
            
            var data = app.Main.windowManager.serializeWindow();
            
            var data_text = JSON.stringify(data);
            
            localStorage.setItem('data',data_text);
            
        }

        public saveDB(){

            //WindowsManagerに保存処理を委託
            app.Main.windowManager.allSaveDB();

        }
        
        public getNowSaveDate(){
            
            var data = app.Main.windowManager.serializeWindow();
            
            var data_text = JSON.stringify(data);
            
            return data_text;
            
        }
        
    }
    

}