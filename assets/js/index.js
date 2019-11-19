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

    // 构造函数
    let Img = function(options) {
        this._init(options);
        this._createElement();
        this._bind();
        this._show();
    }

    // 实现init方法：初始化
    Img.prototype._init = function({ data, initType, parasitifer }) {
        this.types = ['全部']; //所有的分类
        this.all = []; //所有图片元素
        this.classified = { '全部': [] }; //按照类型分类后的图片
        this.culType = initType; //当前显示的图片分类
        this.parasitifer = methods.$(parasitifer); //挂载点
        this.imgContainer = null; // 所有图片的容器
        this._classify(data);
    };

    // 实现classify方法：对图片进行分类
    Img.prototype._classify = function(data) {
        let srcs = [];
        data.forEach(({ type, title, alt, src }) => {
            if (!this.types.includes(type)) {
                this.types.push(type);
            }
            if (!Object.keys(this.classified).includes(type)) {
                this.classified[type] = [];
            }
            if (!srcs.includes(src)) {
                // 图片没有生成过
                // 生成图片
                // 添加到 对应的分类中
                srcs.push(src);
                let figure = document.createElement('figure');
                let img = document.createElement('img');
                let figcaption = document.createElement('figcaption');
                img.src = src;
                img.setAttribute('alt', alt);
                figcaption.innerText = title;
                methods.appendChild(figure, img, figcaption);
                this.all.push(figure);
                this.classified[type].push(this.all.length - 1);
            } else {
                // 去all中 找到对应的图片
                // 添加到对应的分类中
                this.classified[type].push(srcs.findIndex(s1 => s1 === src));
            }
        })
    }

    // 根据分类获取图片
    Img.prototype.getImgsByType = function(type) {
        return type === this.culType ? [...this.all] : this.classified[type].map(index => this.all[index]);
    }

    // 生成DOM
    Img.prototype._createElement = function() {
        // 创建分类按钮
        let typesBtn = [];
        for (let type of this.types.values()) {
            typesBtn.push(
                `<li class="__Img__classify__type-btn${type===this.culType?'__Img__type-btn-active':''} ">${type}</li>`
            )
        }
        // 整体的模板
        let template = `<ul class="__Img__classisy">${typesBtn.join('')}</ul><div class="__Img__img-container"></div>`;
        let wrap = document.createElement('div');
        wrap.className = '__Img__container';
        wrap.innerHTML = template;
        this.imgContainer = methods.$('.__Img__img-container', wrap);
    };

    // 绑定事件
    Img.prototype._bind = function() {

    };

    // 显示元素
    Img.prototype._show = function() {

    };
    window.$Img = Img;
})(window, document)