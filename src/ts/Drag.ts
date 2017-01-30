namespace app {

    export class Drag {

        /** ドラッグしているWindow */
        public holdWindow: app.window.WindowBase;

        public x: number;
        public y: number;

        public constructor() {

            this.init();

        }

        public init() {

            console.log('Droag : 初期化');

            var elements = document.getElementsByClassName("bar");

            console.log(elements);

            document.body.addEventListener("mousemove", this.windowMove.bind(this), false);
            document.body.addEventListener("touchmove", this.windowMove.bind(this), false);

            document.body.addEventListener("mouseleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchleave", this.notFoundWindow.bind(this), false);
            
            document.body.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchend", this.notFoundWindow.bind(this), false);


        }

        /*
        public initDrag(element: Element) {

            console.log("Main : initDrag");
            console.log(element);
            var e = element.querySelector('.bar');

            e.addEventListener("mousedown", this.barClick.bind(this), false);
            e.addEventListener("touchstart", this.barClick.bind(this), false);

            e.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            e.addEventListener("touchend", this.notFoundWindow.bind(this), false);
        }*/

        /*
        public barClick(e): void {

            this.holdElement = e.target.parentNode;

            console.log('barClick');

            //タッチデイベントとマウスのイベントの差異を吸収
            if (e.type === "mousedown") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }

            //要素内の相対座標を取得
            this.x = event.pageX - this.holdElement.offsetLeft;
            this.y = event.pageY - this.holdElement.offsetTop;

        }*/

        public windowMove(e) {

            if (this.holdWindow == null) return;

            e.preventDefault();

            //同様にマウスとタッチの差異を吸収
            if (e.type === "mousemove") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }

            var y = event.pageY - this.holdWindow.offsetY;
            this.holdWindow.setY(y);
            var x = event.pageX - this.holdWindow.offsetX;
            this.holdWindow.setX(x);
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