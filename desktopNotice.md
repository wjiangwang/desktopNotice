## 使用示例

```js
    button.addEventListener('click', () => {
    //创建一个实例对象
      var dn = new desktopNotice({
        title: '自定义的title',
        body: '消息的body体',
        icon: 'http://www.mindplus.cc/images/logo_b.png',//左侧图片

    //可选的 监听函数
        click: function (e) {
          console.log('note click');
          //如果你的页面没有被关闭或转入后台，那么在你会收到一个点击事件。

          //其他情况下会被点击会默认跳转到发起该通知的域名。

          //如果想有其他操作,可以执行以下操作
            //e.preventDefault()
            //window.open('http://...', '_blank')
        },
        close: function () {
          //右下角弹窗消失时（操作系统会在一定时间后自动关闭通知（大约5秒））之后通知会被挂起到消息列表
        },
        error: function () {
          //显示通知被阻止时  （未获取权限,用户阻止通知等）
            //可以让步的使用常规模态的 alert()
        },
        show: function () {
          // 弹窗在右下角显示时
        },

      });
    })
```
**注意** ： 在 http 协议下无法使用Notification API