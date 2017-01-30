namespace app {

    export class Resize {

        /** リサイズしているWindow */
        public holdWindow: app.window.WindowBase;

        public x: number;
        public y: number;

        public constructor() {

            this.init();

        }

        public init() {

            console.log('Resize : 初期化');

            document.body.addEventListener("mousemove", this.windowResize.bind(this), false);
            document.body.addEventListener("touchmove", this.windowResize.bind(this), false);

            document.body.addEventListener("mouseleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchleave", this.notFoundWindow.bind(this), false);
            
            document.body.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchend", this.notFoundWindow.bind(this), false);


        }

        public windowResize(e) {

            if (this.holdWindow == null) return;

            e.preventDefault();

            //同様にマウスとタッチの差異を吸収
            if (e.type === "mousemove") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }

            var y = event.pageY - this.holdWindow.offsetY;
            //this.holdWindow.setY(y);
            var x = event.pageX - this.holdWindow.offsetX;
            
            console.log('event.pageX : '+event.pageX + ' : ' +x);
            
            this.holdWindow.setWidth(x);
            this.holdWindow.setHeight(y);
            
            //this.holdWindow.setX(x);
            //this.holdWindow.window.style.top = event.pageY - this.holdWindow.offsetY + "px";
            //this.holdWindow.window.style.left = event.pageX - this.holdWindow.offsetX + "px";

        }

        public notFoundWindow(e) {

            this.holdWindow = null;
            this.x = 0;
            this.y = 0;

        }


    }

}