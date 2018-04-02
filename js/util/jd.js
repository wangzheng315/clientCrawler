export default `
function sendData (type, data) {
  if (window.postMessage) {
    window.postMessage(JSON.stringify({type: type, data: data}));
  } else {
    throw Error('postMessage接口还未注入');
  }
}

setTimeout(function () {
  var locationUrl = window.location.href;
  if (locationUrl.indexOf('https://wqs.jd.com/order') == 0) {
    function dataCapture() {
      var orderBox = $('.order_box');
      var data = [];
      for (var i=0; i<orderBox.length; ++i) {
        var item = $(orderBox[i]);
        var json = {
          state: item.find('.co_blue').text(),
          price: item.find('.co_red').text(),
          skuTitle: []
        };
        for (var j=0; j<item.find('.skuTitle').length; ++j) {
          json.skuTitle.push($(item.find('.skuTitle')[j]).text());
        }
        data.push(json);
      }
      sendData('data', data);
    }
  
    var orderBoxCounter = 0;
    function orderBoxCheck () {
      if (orderBoxCounter == 3) {
        var json = {
          state: '无数据',
          price: '无数据',
          skuTitle: ['无数据']
        };
        sendData('data', json);
        return;
      }
      if ($('.order_box').length == 0) {
        ++orderBoxCounter;
        setTimeout(function () { orderBoxCheck() }, 1000);
        return;
      } else {
        dataCapture();
      }
    }
    orderBoxCheck();
  }
}, 100);
`