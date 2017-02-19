var app;
(function (app) {
    class Drag {
        constructor() {
            this.init();
        }
        init() {
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
        windowMove(e) {
            if (this.holdWindow == null)
                return;
            e.preventDefault();
            if (e.type === "mousemove") {
                var event = e;
            }
            else {
                var event = e.changedTouches[0];
            }
            var y = event.pageY - this.holdWindow.offsetY;
            this.holdWindow.setY(y);
            var x = event.pageX - this.holdWindow.offsetX;
            this.holdWindow.setX(x);
        }
        notFoundWindow(e) {
            this.holdWindow = null;
            this.x = 0;
            this.y = 0;
        }
    }
    app.Drag = Drag;
})(app || (app = {}));
