namespace app {

    export class Save{
     
        public load(){
            
            console.log('Save : load');
         
            var data_text = localStorage.getItem('data');
            
            if(data_text==null)return;
            
            var data = JSON.parse(data_text);
            
            app.Main.windowManager.deserializeWindows(data);
            
            console.log('Save : loaded');
            
        }
        
        public save(){
            
            var data = app.Main.windowManager.serializeWindow();
            
            var data_text = JSON.stringify(data);
            
            localStorage.setItem('data',data_text);
            
        }
        
    }
    

}