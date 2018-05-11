### 微信小程序-模板消息实例
#### 1.模板消息是什么？
- 模板消息是微信为小程序提供的消息推送能力。小程序可以向用户发送重要的消息通知，类似于App的推送通知。

#### 2.限制
- 限制1.固定格式，模板化的消息
  - 酒店预订成功消息包含订单号、入住时间、房费
  - 日程提醒消息会包含日程时间、日程内容、地点
  - 只能按照模板的规定内容进行发送。
- 限制2.前提条件
  - (1)支付
    > 当用户在小程序内完成过支付行为，可允许开发者向用户在7天内推送有限条数的模板消息（1次支付可下发3条，多次支付下发条数独立，互相不影响）
  - (2)提交表单
    > 当用户在小程序内发生过提交表单行为且该表单声明为要发模板消息的，开发者需要向用户提供服务时，可允许开发者向用户在7天内推送有限条数的模板消息（1次提交表单可下发1条，多次提交下发条数独立，相互不影响）

    > 此项规定是为了让用户在使用开发者的小程序过程中，发生过交互行为（表单提交事件），才能获取fromId，开发者才有权限给用户发送模板消息。

---
##### wxml:
```html
<form bind:submit="submitTest" report-submit="true">
    <button form-type="submit">发送模板消息</button>
</form>
```

##### js:
```javascript
submitTest (e){
  console.log(e.detail.formId);
}
```
*详情请看源码，[index.js](pages/index/index.js)文件*

**注意:**拟器测试下获取不到formId，会提示“this formId is a mock one”，真机可以获取到具体的formId。


#### 3.获取access_token地址:
> [https://mp.weixin.qq.com/debug/](https://mp.weixin.qq.com/debug/)

>填入appid 和secret，点击“检查问题”
> 成的access_token 和 expires_in
>“expires_in” 为到期时间，默认为2小时，如果过期重新生成下即可
-----------------------
