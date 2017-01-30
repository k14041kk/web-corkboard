namespace app.window {

    export class WindowBase {

        protected window: HTMLElement;

        public windowX = 0;
        public windowY = 0;

        public offsetX = 0;
        public offsetY = 0;


        public constructor() {

            //this.window = window_;

            this.createWindow();
            
            this.initTitleEvent();

            this.initDragEvent();
            
            this.initResizeEvent();

            this.initBarButtonEvent();

        }

        public createWindow() {

            var t: HTMLTemplateElement = <any>document.querySelector('#' + this.getTemplateID());

            var card = document.importNode(t.content, true);
            (<HTMLElement><any>(document.querySelector('#white_board'))).appendChild(card);

            var cardAdd: HTMLElement = <HTMLElement><any>(<HTMLElement><any>(document.querySelector('#white_board'))).lastElementChild;

            setTimeout(this.addWindowAnimation.bind(this), 100);

            //デフォルトの位置を設定
            cardAdd.style.top = "40px";
            cardAdd.style.left = "100px";


            var button: HTMLElement = <any>cardAdd.querySelector('.bar .menu-lower-right');
            var uuid_ = createUUID();
            button.setAttribute("id", uuid_);
            componentHandler.upgradeElement(button);

            var menu: HTMLElement = <any>cardAdd.querySelector('.bar .mdl-menu');
            menu.setAttribute("for", uuid_);
            componentHandler.upgradeElement(menu);

            //console.log(cardAdd.querySelector('.bar .mdl-menu'));
            //componentHandler.upgradeElement(cardAdd.querySelector('.bar'));
            //componentHandler.upgradeDom(cardAdd.querySelector('.bar'));

            this.window = cardAdd;

            this.setWidth(340);
            this.setHeight(240);

        }


        public addWindowAnimation() {

            this.window.classList.remove('window_none');

        }
        
        public initTitleEvent() {
            
            var e: HTMLElement = <HTMLElement><any>(this.window.querySelector('.bar_title'));

            e.addEventListener("dblclick", this.eventTitleDoubleClick.bind(this), false);
            
            var eI: HTMLElement = <HTMLElement><any>(this.window.querySelector('.bar_title input'));

            eI.addEventListener("focusout", this.eventOutFocus.bind(this), false);
            
        }

        public initDragEvent() {

            var e: HTMLElement = <HTMLElement><any>(this.window.querySelector('.bar'));

            e.addEventListener("mousedown", this.eventBarClick.bind(this), false);
            e.addEventListener("touchstart", this.eventBarClick.bind(this), false);

            e.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            e.addEventListener("touchend", this.notFoundWindow.bind(this), false);

        }
        
        public initResizeEvent(){
            
            var e: HTMLElement = <HTMLElement><any>(this.window.querySelector('.resizeXY'));

            e.addEventListener("mousedown", this.eventResizeClick.bind(this), false);
            e.addEventListener("touchstart", this.eventResizeClick.bind(this), false);
            
            var eW: HTMLElement = <HTMLElement><any>(this.window.querySelector('.resizeWidth'));

            eW.addEventListener("mousedown", this.eventResizeWidthClick.bind(this), false);
            eW.addEventListener("touchstart", this.eventResizeWidthClick.bind(this), false);
            
            var eH: HTMLElement = <HTMLElement><any>(this.window.querySelector('.resizeHeight'));

            eH.addEventListener("mousedown", this.eventResizeHeightClick.bind(this), false);
            eH.addEventListener("touchstart", this.eventResizeHeightClick.bind(this), false);

            //e.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            //e.addEventListener("touchend", this.notFoundWindow.bind(this), false);
            
        }

        public initBarButtonEvent() {

            var e: HTMLElement = <HTMLElement><any>(this.window.querySelector('.delete'));

            e.addEventListener("click", this.deleteWindow.bind(this), false);

        }

        public move(x: number, y: number) {

            this.windowX = x;
            this.windowY = y;

        }

        public getWindow(): HTMLElement {
            return this.window;
        }
        
        public eventTitleDoubleClick(e):boolean{
            
            e.preventDefault();
            
            var target: HTMLInputElement = <HTMLInputElement><any>(this.window.querySelector('.bar_title input'));
            
            target.disabled = "";
            target.focus();
            
            return false;
        }
        
        public eventOutFocus(e):void{
            
            e.target.disabled = true;
            
            }

        public eventBarClick(e): void {

            //this.holdElement = e.target.parentNode;

            app.Main.drag.holdWindow = this;

            console.log('barClick');

            //タッチデイベントとマウスのイベントの差異を吸収
            if (e.type === "mousedown") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }

            //要素内の相対座標を取得
            this.offsetX = event.pageX - this.window.offsetLeft;
            this.offsetY = event.pageY - this.window.offsetTop;
            

        }

        public eventResizeClick(e): void {

            app.Main.resize.holdWindow = this;

            console.log('barClick');

            //タッチデイベントとマウスのイベントの差異を吸収
            if (e.type === "mousedown") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }
            
            var area_ = e.target;

            //要素内の相対座標を取得 リサイズエリアの長さを追加
            this.offsetX = event.pageX - (area_.offsetLeft + area_.offsetWidth);
            this.offsetY = event.pageY - (area_.offsetTop + area_.offsetHeight);
            
        }
        
        public eventResizeHeightClick(e): void {

            app.Main.resize.holdWindow = this;

            console.log('barClick');

            //タッチデイベントとマウスのイベントの差異を吸収
            if (e.type === "mousedown") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }
            
            var area_ = e.target;

            //要素内の相対座標を取得 リサイズエリアの長さを追加
            this.offsetX = -1;
            this.offsetY = event.pageY - (area_.offsetTop + area_.offsetHeight);
            
        }
        
        public eventResizeWidthClick(e): void {

            app.Main.resize.holdWindow = this;

            console.log('barClick');

            //タッチデイベントとマウスのイベントの差異を吸収
            if (e.type === "mousedown") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }
            
            var area_ = e.target;

            //要素内の相対座標を取得 リサイズエリアの長さを追加
            this.offsetX = event.pageX - (area_.offsetLeft + area_.offsetWidth);
            this.offsetY = -1;
            
        }

        public notFoundWindow(e) {

            console.log('WindowBase : notFoundWindow');

            app.Main.drag.holdWindow = null;

        }

        public deleteWindow(e) {


            app.Main.windowManager.deleteWindow(this);

            (<HTMLElement><any>(document.querySelector('#white_board'))).removeChild(this.window);


        }

        public getTemplateID(): string {
            return "none";
        }

        // ----------
        //DomとTSの橋渡し系
        // ----------
        public setTitle(title: string) {

            if (window == null) return;

            var tElement: HTMLInputElement = <HTMLInputElement><any>(this.window.querySelector(".bar_title input"));
            tElement.value = title;

        }

        public getTitle(): string {

            if (window == null) return "No Window instance";

            var tElement: HTMLInputElement = <HTMLInputElement><any>(this.window.querySelector(".bar_title input"));
            return tElement.value;

        }

        public setX(x) {

            var x_ = x
            if (x < 0) x_ = 2;

            this.windowX = x_;

            this.window.style.left = x_ + "px";

        }

        public getX() {
            var or = this.window.style.left;
            var x_ = or.substr(0, or.length - 2);
            return x_;
        }

        public setY(y) {

            var y_ = y;
            if (y < 0) y_ = 2;

            this.windowY = y_;

            this.window.style.top = y_ + "px";

        }

        public getY() {
            var or = this.window.style.top;
            var y_ = or.substr(0, or.length - 2);
            return y_;
        }

        public setWidth(w: number) {
            
            var w_ : number = w;
            
            if (w_ < 80) w_ = 80;
            
            this.window.style.width = w_ + 'px';

        }
        
        public getWidth() {
            var or = this.window.style.width;
            var width_ = or.substr(0, or.length - 2);
            return width_;
        }

        public setHeight(h: number) {
            
             var h_ : number = h;
            
            if (h_ < 100) h_ = 100;

            this.window.style.height = h_ + 'px';

        }
        
        public getHeight() {
            var or = this.window.style.height;
            var height_ = or.substr(0, or.length - 2);
            return height_;
        }

        public getType(): string {
            return 'normal';
        }

        public serialize(): any {

            var data = {};

            data['type'] = this.getType();
            data['title'] = this.getTitle();
            data['x'] = this.getX();
            data['y'] = this.getY();
            data['width'] = this.getWidth();
            data['height'] = this.getHeight();

            //data['title'] = 

            return data;

        }

        public deserialize(data: any) {

            this.setTitle(data['title']);
            this.setX(data['x']);
            this.setY(data['y']);
            this.setWidth(data['width']);
            this.setHeight(data['height']);

        }


    }

}