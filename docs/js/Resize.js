var app;
(function (app) {
    class Resize {
        constructor() {
            this.init();
        }
        init() {
            console.log('Resize : 初期化');
            document.body.addEventListener("mousemove", this.windowResize.bind(this), false);
            document.body.addEventListener("touchmove", this.windowResize.bind(this), false);
            document.body.addEventListener("mouseleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchend", this.notFoundWindow.bind(this), false);
        }
        windowResize(e) {
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
            var x = event.pageX - this.holdWindow.offsetX;
            if (this.holdWindow.offsetX != -1)
                this.holdWindow.setWidth(x);
            if (this.holdWindow.offsetY != -1)
                this.holdWindow.setHeight(y);
        }
        notFoundWindow(e) {
            this.holdWindow = null;
            this.x = 0;
            this.y = 0;
        }
    }
    app.Resize = Resize;
})(app || (app = {}));
