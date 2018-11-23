//对window.Notification的接口的一些基本封装  

 class desktopNotice {
  constructor(options) {
    //设置弹窗的默认的配置选项
    this.defaultConfig = {
      'title': 'hello',
      'body': 'Im here ',
      'icon': 'http://www.mindplus.cc/images/logo_b.png',
      click () { },
      error () { },
      show () { },
      close () { }
    };
    //设置是否允许弹窗的属性
    this.isPermission = true;
    //用于保存弹窗的实例
    this._instance = null;
    //将属性添加到这个实例上面
    this.options = Object.assign(this.defaultConfig, options);
    //创建弹窗
    this.create(this.options);
  }

  _isPermission () {
    return Notification.permission === 'granted';
  }

  _isSupported () {
    return 'Notification' in window;
  }

  _addEvent (obj, type, fn) {
    if (typeof fn !== 'function') {
      throw new Error('事件的监听器应该是一个函数');
    }
    obj.addEventListener(type, () => {
      fn.call(this);
    }, false)
  }

  //create弹窗的方法
  create (options) {
    //先判断 是否支持
    if (!this._isSupported()) {
      throw new Error('浏览器不支持Notification');
    }
    //再判断是否允许
    if (!(this.isPermission = this._isPermission())) {
      //说明不被允许--获取请求
      Notification.requestPermission().then((permission) => {
        this.isPermission = permission === 'granted' ? true : false;
      })
    }

    //走到这里--就说明能够创建弹窗了--创建弹窗
    this._instance = new Notification(options.title, options); 
    return this.show().click().close().error();
  }

  
  //下面是添加事件的几个方法--添加事件不仅可以在选项里面指定事件监听函数，也可以链式调用事件的处理方法
  click (callback = this.options.click) {
    this._addEvent(this._instance, 'click', callback);
    return this;
  }

  error (callback = this.options.error) {
    this._addEvent(this._instance, 'error', callback);
    return this;
  }

  show (callback = this.options.show) {
    this._addEvent(this._instance, 'show', callback);
    return this;
  }

  close (callback = this.options.close) {
    this._addEvent(this._instance, 'close', callback);
    return this;
  }

  //关闭弹窗的方法
  shut () {
    this._instance && this._instance.close();
  }

}

  