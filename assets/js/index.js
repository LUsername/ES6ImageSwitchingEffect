/**
 * 1、对图片进行分类
 * 2、生成dom元素
 * 3、绑定事件
 * 4、显示到页面上
 */
(function(window, document) {
    // 实现公共方法
    const methods = {
        appendChild(parent, ...children) {
            children.forEach(el => {
                parent.appendChild(el);
            })
        },
        $(selector, root = document) {
            return root.querySelector(selector);
        },
        $$(selector, root = document) {
            return root.querySelectorAll(selector);
        }
    };
    let Img = function(options) {
        this._init(options);
        this._createElement();
        this._bind();
        this._show();
    }
    Img.prototype._init = function({}) {

    };
    Img.prototype._createElement = function() {

    };
    Img.prototype._bind = function() {

    };
    Img.prototype._show = function() {

    };
    window.$Img = Img;
})(window, document)