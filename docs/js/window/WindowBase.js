var app;
(function (app) {
    var window;
    (function (window) {
        class WindowBase {
            constructor(animation) {
                this.windowX = 0;
                this.windowY = 0;
                this.offsetX = 0;
                this.offsetY = 0;
                this.createWindow(animation == null ? true : animation);
                this.initTitleEvent();
                this.initDragEvent();
                this.initResizeEvent();
                this.initBarButtonEvent();
            }
            createWindow(animation) {
                var t = document.querySelector('#' + this.getTemplateID());
                var card = document.importNode(t.content, true);
                (document.querySelector('#white_board')).appendChild(card);
                var cardAdd = (document.querySelector('#white_board')).lastElementChild;
                if (!animation)
                    cardAdd.classList.add('not_animation');
                setTimeout(this.addWindowAnimation.bind(this), 100);
                cardAdd.style.top = "40px";
                cardAdd.style.left = "100px";
                var button = cardAdd.querySelector('.bar .menu-lower-right');
                var uuid_ = createUUID();
                button.setAttribute("id", uuid_);
                componentHandler.upgradeElement(button);
                var menu = cardAdd.querySelector('.bar .mdl-menu');
                menu.setAttribute("for", uuid_);
                componentHandler.upgradeElement(menu);
                this.window = cardAdd;
                this.setWidth(340);
                this.setHeight(240);
            }
            addWindowAnimation() {
                this.window.classList.remove('window_none');
            }
            initTitleEvent() {
                var e = (this.window.querySelector('.bar_title'));
                e.addEventListener("dblclick", this.eventTitleDoubleClick.bind(this), false);
                var eI = (this.window.querySelector('.bar_title input'));
                eI.addEventListener("focusout", this.eventOutFocus.bind(this), false);
            }
            initDragEvent() {
                var e = (this.window.querySelector('.bar'));
                e.addEventListener("mousedown", this.eventBarClick.bind(this), false);
                e.addEventListener("touchstart", this.eventBarClick.bind(this), false);
                e.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
                e.addEventListener("touchend", this.notFoundWindow.bind(this), false);
            }
            initResizeEvent() {
                var e = (this.window.querySelector('.resizeXY'));
                e.addEventListener("mousedown", this.eventResizeClick.bind(this), false);
                e.addEventListener("touchstart", this.eventResizeClick.bind(this), false);
                var eW = (this.window.querySelector('.resizeWidth'));
                eW.addEventListener("mousedown", this.eventResizeWidthClick.bind(this), false);
                eW.addEventListener("touchstart", this.eventResizeWidthClick.bind(this), false);
                var eH = (this.window.querySelector('.resizeHeight'));
                eH.addEventListener("mousedown", this.eventResizeHeightClick.bind(this), false);
                eH.addEventListener("touchstart", this.eventResizeHeightClick.bind(this), false);
            }
            initBarButtonEvent() {
                var e = (this.window.querySelector('.delete'));
                e.addEventListener("click", this.deleteWindow.bind(this), false);
                var color = (this.window.querySelector('.color_change'));
                color.addEventListener("click", function () {
                    var menu_color = (this.window.querySelector('.menu_color'));
                    var event = document.createEvent("MouseEvents");
                    event.initEvent("click", false, true);
                    menu_color.dispatchEvent(event);
                    menu_color.style.display = "";
                }.bind(this), false);
                var menu_color = (this.window.querySelector('.menu_color'));
                menu_color.addEventListener("input", function (event) {
                    var color_ = menu_color.value;
                    this.changeBarColor(color_);
                }.bind(this), false);
                var protect = (this.window.querySelector('.protect'));
                protect.addEventListener("click", this.changeProtect.bind(this), false);
            }
            move(x, y) {
                this.windowX = x;
                this.windowY = y;
            }
            getWindow() {
                return this.window;
            }
            eventTitleDoubleClick(e) {
                e.preventDefault();
                var target = (this.window.querySelector('.bar_title input'));
                target.disabled = false;
                target.focus();
                return false;
            }
            eventOutFocus(e) {
                e.target.disabled = true;
            }
            eventBarClick(e) {
                app.Main.drag.holdWindow = this;
                if (e.type === "mousedown") {
                    var event = e;
                }
                else {
                    var event = e.changedTouches[0];
                }
                this.offsetX = event.pageX - this.window.offsetLeft;
                this.offsetY = event.pageY - this.window.offsetTop;
            }
            eventResizeClick(e) {
                app.Main.resize.holdWindow = this;
                if (e.type === "mousedown") {
                    var event = e;
                }
                else {
                    var event = e.changedTouches[0];
                }
                var area_ = e.target;
                this.offsetX = event.pageX - (area_.offsetLeft + area_.offsetWidth);
                this.offsetY = event.pageY - (area_.offsetTop + area_.offsetHeight);
            }
            eventResizeHeightClick(e) {
                app.Main.resize.holdWindow = this;
                console.log('barClick');
                if (e.type === "mousedown") {
                    var event = e;
                }
                else {
                    var event = e.changedTouches[0];
                }
                var area_ = e.target;
                this.offsetX = -1;
                this.offsetY = event.pageY - (area_.offsetTop + area_.offsetHeight);
            }
            eventResizeWidthClick(e) {
                app.Main.resize.holdWindow = this;
                console.log('barClick');
                if (e.type === "mousedown") {
                    var event = e;
                }
                else {
                    var event = e.changedTouches[0];
                }
                var area_ = e.target;
                this.offsetX = event.pageX - (area_.offsetLeft + area_.offsetWidth);
                this.offsetY = -1;
            }
            notFoundWindow(e) {
                app.Main.drag.holdWindow = null;
            }
            deleteWindow(e) {
                app.Main.windowManager.deleteWindow(this);
            }
            changeBarColor(color) {
                var toolbar = (this.window.querySelector('.bar'));
                toolbar.style.backgroundColor = color;
            }
            changeProtect() {
                var delete_ = (this.window.querySelector('.delete'));
                var deleteIcon_ = (this.window.querySelector('.delete i'));
                this.setProtect(!delete_.disabled);
            }
            getTemplateID() {
                return "none";
            }
            setTitle(title) {
                if (window == null)
                    return;
                var tElement = (this.window.querySelector(".bar_title input"));
                tElement.value = title;
            }
            getTitle() {
                if (window == null)
                    return "No Window instance";
                var tElement = (this.window.querySelector(".bar_title input"));
                return tElement.value;
            }
            setX(x) {
                var x_ = x;
                if (x < 0)
                    x_ = 2;
                this.windowX = x_;
                this.window.style.left = x_ + "px";
            }
            getX() {
                var or = this.window.style.left;
                var x_ = or.substr(0, or.length - 2);
                return x_;
            }
            setY(y) {
                var y_ = y;
                if (y < 0)
                    y_ = 2;
                this.windowY = y_;
                this.window.style.top = y_ + "px";
            }
            getY() {
                var or = this.window.style.top;
                var y_ = or.substr(0, or.length - 2);
                return y_;
            }
            setWidth(w) {
                var w_ = w;
                if (w_ < 80)
                    w_ = 80;
                this.window.style.width = w_ + 'px';
            }
            getWidth() {
                var or = this.window.style.width;
                var width_ = or.substr(0, or.length - 2);
                return width_;
            }
            setHeight(h) {
                var h_ = h;
                if (h_ < 100)
                    h_ = 100;
                this.window.style.height = h_ + 'px';
            }
            getHeight() {
                var or = this.window.style.height;
                var height_ = or.substr(0, or.length - 2);
                return height_;
            }
            getColor() {
                var toolbar = (this.window.querySelector('.bar'));
                if (toolbar.style.backgroundColor == null)
                    return '#3F51B5';
                if (toolbar.style.backgroundColor == "")
                    return '#3F51B5';
                return toolbar.style.backgroundColor;
            }
            setColor(color) {
                var menu_color = (this.window.querySelector('.menu_color'));
                if (color.indexOf('rgb') != -1) {
                    menu_color.value = converterRGB(color);
                }
                else {
                    menu_color.value = color;
                }
                this.changeBarColor(color);
            }
            setProtect(protect) {
                var delete_ = (this.window.querySelector('.delete'));
                var deleteIcon_ = (this.window.querySelector('.delete i'));
                delete_.disabled = protect;
                if (delete_.disabled) {
                    deleteIcon_.innerHTML = "lock";
                }
                else {
                    deleteIcon_.innerHTML = "close";
                }
            }
            getProtect() {
                var delete_ = (this.window.querySelector('.delete'));
                return delete_.disabled;
            }
            getType() {
                return 'normal';
            }
            serialize() {
                var data = {};
                data['type'] = this.getType();
                data['title'] = this.getTitle();
                data['x'] = this.getX();
                data['y'] = this.getY();
                data['width'] = this.getWidth();
                data['height'] = this.getHeight();
                data['toolbar_color'] = this.getColor();
                data['protect'] = this.getProtect();
                return data;
            }
            deserialize(data) {
                this.setTitle(data['title']);
                this.setX(data['x']);
                this.setY(data['y']);
                this.setWidth(data['width']);
                this.setHeight(data['height']);
                this.setColor(data['toolbar_color']);
                this.setProtect(data['protect']);
            }
        }
        window.WindowBase = WindowBase;
    })(window = app.window || (app.window = {}));
})(app || (app = {}));
