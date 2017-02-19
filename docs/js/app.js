var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var DB = (function () {
        function DB() {
        }
        DB.prototype.init = function () {
            var db = new Dexie('app_db');
            db.version(1).stores({
                images: '++id'
            });
            db.open();
        };
        return DB;
    }());
    app.DB = DB;
})(app || (app = {}));
var app;
(function (app) {
    var Drag = (function () {
        function Drag() {
            this.init();
        }
        Drag.prototype.init = function () {
            console.log('Droag : 初期化');
            var elements = document.getElementsByClassName("bar");
            console.log(elements);
            document.body.addEventListener("mousemove", this.windowMove.bind(this), false);
            document.body.addEventListener("touchmove", this.windowMove.bind(this), false);
            document.body.addEventListener("mouseleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchend", this.notFoundWindow.bind(this), false);
        };
        Drag.prototype.windowMove = function (e) {
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
        };
        Drag.prototype.notFoundWindow = function (e) {
            this.holdWindow = null;
            this.x = 0;
            this.y = 0;
        };
        return Drag;
    }());
    app.Drag = Drag;
})(app || (app = {}));
var app;
(function (app) {
    var History = (function () {
        function History() {
            this.init();
        }
        History.prototype.init = function () {
            getWindow().addEventListener('popstate', function (e) {
                if (e.state != null && e.state != '') {
                    app.Main.save.load(e.state);
                    console.log(e.state);
                }
            }, false);
        };
        return History;
    }());
    app.History = History;
})(app || (app = {}));
function getWindow() {
    return window;
}
var app;
(function (app) {
    var window;
    (function (window) {
        var WindowBase = (function () {
            function WindowBase(animation) {
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
            WindowBase.prototype.createWindow = function (animation) {
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
            };
            WindowBase.prototype.addWindowAnimation = function () {
                this.window.classList.remove('window_none');
            };
            WindowBase.prototype.initTitleEvent = function () {
                var e = (this.window.querySelector('.bar_title'));
                e.addEventListener("dblclick", this.eventTitleDoubleClick.bind(this), false);
                var eI = (this.window.querySelector('.bar_title input'));
                eI.addEventListener("focusout", this.eventOutFocus.bind(this), false);
            };
            WindowBase.prototype.initDragEvent = function () {
                var e = (this.window.querySelector('.bar'));
                e.addEventListener("mousedown", this.eventBarClick.bind(this), false);
                e.addEventListener("touchstart", this.eventBarClick.bind(this), false);
                e.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
                e.addEventListener("touchend", this.notFoundWindow.bind(this), false);
            };
            WindowBase.prototype.initResizeEvent = function () {
                var e = (this.window.querySelector('.resizeXY'));
                e.addEventListener("mousedown", this.eventResizeClick.bind(this), false);
                e.addEventListener("touchstart", this.eventResizeClick.bind(this), false);
                var eW = (this.window.querySelector('.resizeWidth'));
                eW.addEventListener("mousedown", this.eventResizeWidthClick.bind(this), false);
                eW.addEventListener("touchstart", this.eventResizeWidthClick.bind(this), false);
                var eH = (this.window.querySelector('.resizeHeight'));
                eH.addEventListener("mousedown", this.eventResizeHeightClick.bind(this), false);
                eH.addEventListener("touchstart", this.eventResizeHeightClick.bind(this), false);
            };
            WindowBase.prototype.initBarButtonEvent = function () {
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
            };
            WindowBase.prototype.move = function (x, y) {
                this.windowX = x;
                this.windowY = y;
            };
            WindowBase.prototype.getWindow = function () {
                return this.window;
            };
            WindowBase.prototype.eventTitleDoubleClick = function (e) {
                e.preventDefault();
                var target = (this.window.querySelector('.bar_title input'));
                target.disabled = false;
                target.focus();
                return false;
            };
            WindowBase.prototype.eventOutFocus = function (e) {
                e.target.disabled = true;
            };
            WindowBase.prototype.eventBarClick = function (e) {
                app.Main.drag.holdWindow = this;
                if (e.type === "mousedown") {
                    var event = e;
                }
                else {
                    var event = e.changedTouches[0];
                }
                this.offsetX = event.pageX - this.window.offsetLeft;
                this.offsetY = event.pageY - this.window.offsetTop;
            };
            WindowBase.prototype.eventResizeClick = function (e) {
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
            };
            WindowBase.prototype.eventResizeHeightClick = function (e) {
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
            };
            WindowBase.prototype.eventResizeWidthClick = function (e) {
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
            };
            WindowBase.prototype.notFoundWindow = function (e) {
                app.Main.drag.holdWindow = null;
            };
            WindowBase.prototype.deleteWindow = function (e) {
                app.Main.windowManager.deleteWindow(this);
            };
            WindowBase.prototype.changeBarColor = function (color) {
                var toolbar = (this.window.querySelector('.bar'));
                toolbar.style.backgroundColor = color;
            };
            WindowBase.prototype.changeProtect = function () {
                var delete_ = (this.window.querySelector('.delete'));
                var deleteIcon_ = (this.window.querySelector('.delete i'));
                this.setProtect(!delete_.disabled);
            };
            WindowBase.prototype.getTemplateID = function () {
                return "none";
            };
            WindowBase.prototype.setTitle = function (title) {
                if (window == null)
                    return;
                var tElement = (this.window.querySelector(".bar_title input"));
                tElement.value = title;
            };
            WindowBase.prototype.getTitle = function () {
                if (window == null)
                    return "No Window instance";
                var tElement = (this.window.querySelector(".bar_title input"));
                return tElement.value;
            };
            WindowBase.prototype.setX = function (x) {
                var x_ = x;
                if (x < 0)
                    x_ = 2;
                this.windowX = x_;
                this.window.style.left = x_ + "px";
            };
            WindowBase.prototype.getX = function () {
                var or = this.window.style.left;
                var x_ = or.substr(0, or.length - 2);
                return x_;
            };
            WindowBase.prototype.setY = function (y) {
                var y_ = y;
                if (y < 0)
                    y_ = 2;
                this.windowY = y_;
                this.window.style.top = y_ + "px";
            };
            WindowBase.prototype.getY = function () {
                var or = this.window.style.top;
                var y_ = or.substr(0, or.length - 2);
                return y_;
            };
            WindowBase.prototype.setWidth = function (w) {
                var w_ = w;
                if (w_ < 80)
                    w_ = 80;
                this.window.style.width = w_ + 'px';
            };
            WindowBase.prototype.getWidth = function () {
                var or = this.window.style.width;
                var width_ = or.substr(0, or.length - 2);
                return width_;
            };
            WindowBase.prototype.setHeight = function (h) {
                var h_ = h;
                if (h_ < 100)
                    h_ = 100;
                this.window.style.height = h_ + 'px';
            };
            WindowBase.prototype.getHeight = function () {
                var or = this.window.style.height;
                var height_ = or.substr(0, or.length - 2);
                return height_;
            };
            WindowBase.prototype.getColor = function () {
                var toolbar = (this.window.querySelector('.bar'));
                if (toolbar.style.backgroundColor == null)
                    return '#3F51B5';
                if (toolbar.style.backgroundColor == "")
                    return '#3F51B5';
                return toolbar.style.backgroundColor;
            };
            WindowBase.prototype.setColor = function (color) {
                var menu_color = (this.window.querySelector('.menu_color'));
                if (color.indexOf('rgb') != -1) {
                    menu_color.value = converterRGB(color);
                }
                else {
                    menu_color.value = color;
                }
                this.changeBarColor(color);
            };
            WindowBase.prototype.setProtect = function (protect) {
                var delete_ = (this.window.querySelector('.delete'));
                var deleteIcon_ = (this.window.querySelector('.delete i'));
                delete_.disabled = protect;
                if (delete_.disabled) {
                    deleteIcon_.innerHTML = "lock";
                }
                else {
                    deleteIcon_.innerHTML = "close";
                }
            };
            WindowBase.prototype.getProtect = function () {
                var delete_ = (this.window.querySelector('.delete'));
                return delete_.disabled;
            };
            WindowBase.prototype.getType = function () {
                return 'normal';
            };
            WindowBase.prototype.serialize = function () {
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
            };
            WindowBase.prototype.deserialize = function (data) {
                this.setTitle(data['title']);
                this.setX(data['x']);
                this.setY(data['y']);
                this.setWidth(data['width']);
                this.setHeight(data['height']);
                this.setColor(data['toolbar_color']);
                this.setProtect(data['protect']);
            };
            return WindowBase;
        }());
        window.WindowBase = WindowBase;
    })(window = app.window || (app.window = {}));
})(app || (app = {}));
var app;
(function (app) {
    var WindowManager = (function () {
        function WindowManager() {
            this.windows = new Array();
        }
        WindowManager.prototype.addWindow = function (window) {
            componentHandler.upgradeElement(window.getWindow());
            this.windows.push(window);
        };
        WindowManager.prototype.addTextWindow = function (title, text, x, y) {
            var window = new app.window.WindowText();
            if (title != null) {
                window.setTitle(title);
            }
            if (text != null) {
                window.setText(text);
            }
            if (y != null) {
                window.setY(y);
            }
            if (x != null) {
                window.setX(x);
            }
            this.addWindow(window);
        };
        WindowManager.prototype.deleteWindow = function (window) {
            var index = this.windows.indexOf(window);
            this.windows.splice(index, 1);
            (document.querySelector('#white_board')).removeChild(window.getWindow());
        };
        WindowManager.prototype.allDeleteWindow = function () {
            for (var i = 0; i < this.windows.length; i++) {
                (document.querySelector('#white_board')).removeChild(this.windows[i].getWindow());
            }
            this.windows.length = 0;
        };
        WindowManager.prototype.serializeWindow = function () {
            var data = {};
            data['size'] = this.windows.length;
            data['windows'] = new Array(this.windows.length);
            for (var i = 0; i < this.windows.length; i++) {
                data['windows'][i] = this.windows[i].serialize();
            }
            return data;
        };
        WindowManager.prototype.deserializeWindows = function (data, animation_) {
            var size = data['size'];
            var windows = data['windows'];
            var animation = true;
            if (animation_ != null)
                animation = animation_;
            for (var i = 0; i < size; i++) {
                var w_data = windows[i];
                var window;
                if (w_data['type'] == app.window.WindowText.TYPE) {
                    window = new app.window.WindowText(animation);
                }
                window.deserialize(w_data);
                this.windows.push(window);
            }
        };
        return WindowManager;
    }());
    app.WindowManager = WindowManager;
})(app || (app = {}));
var app;
(function (app) {
    var Save = (function () {
        function Save() {
        }
        Save.prototype.load = function (data_) {
            console.log('Save : load');
            var data_text = localStorage.getItem('data');
            var animation = true;
            if (data_ != null) {
                data_text = data_;
                animation = false;
            }
            if (data_text == null)
                return;
            var data = JSON.parse(data_text);
            app.Main.windowManager.allDeleteWindow();
            app.Main.windowManager.deserializeWindows(data, animation);
            console.log('Save : loaded');
        };
        Save.prototype.save = function () {
            app.Main.saveHistory();
            var data = app.Main.windowManager.serializeWindow();
            var data_text = JSON.stringify(data);
            localStorage.setItem('data', data_text);
        };
        Save.prototype.getNowSaveDate = function () {
            var data = app.Main.windowManager.serializeWindow();
            var data_text = JSON.stringify(data);
            return data_text;
        };
        return Save;
    }());
    app.Save = Save;
})(app || (app = {}));
var app;
(function (app) {
    var Resize = (function () {
        function Resize() {
            this.init();
        }
        Resize.prototype.init = function () {
            console.log('Resize : 初期化');
            document.body.addEventListener("mousemove", this.windowResize.bind(this), false);
            document.body.addEventListener("touchmove", this.windowResize.bind(this), false);
            document.body.addEventListener("mouseleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchleave", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("mouseup", this.notFoundWindow.bind(this), false);
            document.body.addEventListener("touchend", this.notFoundWindow.bind(this), false);
        };
        Resize.prototype.windowResize = function (e) {
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
        };
        Resize.prototype.notFoundWindow = function (e) {
            this.holdWindow = null;
            this.x = 0;
            this.y = 0;
        };
        return Resize;
    }());
    app.Resize = Resize;
})(app || (app = {}));
var app;
(function (app) {
    var Main = (function () {
        function Main() {
        }
        Main.init = function () {
            console.log("アプリの初期化");
            this.windows = new Array();
            document.getElementById('new_paper').addEventListener('click', app.Main.addPaper, false);
            document.getElementById('save').addEventListener('click', app.Main.saveDate, false);
            document.getElementById('all_delete').addEventListener('click', app.Main.allDelete, false);
            document.body.addEventListener('drop', app.Main.addOtherText, false);
            document.body.addEventListener('dragover', app.Main.dropCancel, false);
            document.body.addEventListener('dragenter', app.Main.dropCancel, false);
            app.Main.drag = new app.Drag();
            app.Main.resize = new app.Resize();
            app.Main.windowManager = new app.WindowManager();
            app.Main.historyManager = new app.History();
            app.Main.save = new app.Save();
            app.Main.dbManager = new app.DB();
            setTimeout(app.Main.postInit, 1000);
        };
        Main.postInit = function () {
            var loading = (document.querySelector('#load-whopper'));
            app.Main.save.load();
            loading.style.display = 'none';
            app.Main.saveHistory();
        };
        Main.addPaper = function (e) {
            e.preventDefault();
            console.log('紙を追加');
            var d = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();
            app.Main.windowManager.addTextWindow();
            app.Main.save.save();
        };
        Main.addOtherText = function (e) {
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            if (file.type.indexOf("text") == 0) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var text = evt.target.result;
                    app.Main.windowManager.addTextWindow(file.name, text, e.clientX, e.clientY - 50);
                };
                reader.readAsText(file, 'utf-8');
            }
            return false;
        };
        Main.dropCancel = function (e) {
            e.preventDefault();
            return false;
        };
        Main.saveDate = function (e) {
            e.preventDefault();
            app.Main.save.save();
            var d = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();
        };
        Main.allDelete = function (e) {
            e.preventDefault();
            var d = document.querySelector('.mdl-layout');
            d.MaterialLayout.toggleDrawer();
            var dialog = (document.querySelector('#all_delete_dialog'));
            dialog.showModal();
            var dialogCancel = (document.querySelector('#delete_dialog_cancel'));
            dialogCancel.addEventListener('click', function () {
                dialog.close();
            });
            var dialogOK = (document.querySelector('#delete_dialog_ok'));
            dialogOK.addEventListener('click', function () {
                app.Main.windowManager.allDeleteWindow();
                dialog.close();
            });
        };
        Main.saveHistory = function () {
            history.pushState(app.Main.save.getNowSaveDate(), "Home", "");
        };
        return Main;
    }());
    app.Main = Main;
})(app || (app = {}));
window.onload = app.Main.init;
function createUUID() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-";
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}
function converterRGB(rgb) {
    var ret = eval(rgb.replace(/rgb/, "((").replace(/,/ig, ")*256+")).toString(16);
    return "#" + (("000000" + ret).substring(6 + ret.length - 6));
}
var app;
(function (app) {
    var window;
    (function (window) {
        var WindowText = (function (_super) {
            __extends(WindowText, _super);
            function WindowText(animation) {
                return _super.call(this, animation) || this;
            }
            Object.defineProperty(WindowText, "TYPE", {
                get: function () { return 'text'; },
                enumerable: true,
                configurable: true
            });
            WindowText.prototype.getTemplateID = function () {
                return "text_card";
            };
            WindowText.prototype.setText = function (text) {
                if (window == null)
                    return;
                var textElement = (this.window.querySelector(".card_content textarea"));
                textElement.value = text;
            };
            WindowText.prototype.getText = function () {
                if (window == null)
                    return "No Window instance";
                var textElement = (this.window.querySelector(".card_content textarea"));
                return textElement.value;
            };
            WindowText.prototype.getType = function () {
                return WindowText.TYPE;
            };
            WindowText.prototype.serialize = function () {
                var data = _super.prototype.serialize.call(this);
                data['text'] = this.getText();
                return data;
            };
            WindowText.prototype.deserialize = function (data) {
                _super.prototype.deserialize.call(this, data);
                this.setText(data['text']);
            };
            return WindowText;
        }(window.WindowBase));
        window.WindowText = WindowText;
    })(window = app.window || (app.window = {}));
})(app || (app = {}));
