export default `
function sendData (type, data) {
  if (window.postMessage) {
    window.postMessage(JSON.stringify({type: type, data: data}));
  } else {
    throw Error('postMessage接口还未注入');
  }
};

var locationUrl = window.location.href;
if ($('iframe').length == 0) {
  function dataCapture() {
    var orderBox = $('.order-list').children();
    var data = [];
    for (var i=0; i<orderBox.length; ++i) {
      var item = $(orderBox[i]);
      var json = {
        state: item.find('.state-cont .h').text(),
        price: $(item.find('.o-total-price .cont span')[1]).children('b').text(),
        skuTitle: [item.find('.item-info .title').text()]
      };
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
    if ($('.order-list').children().length == 0) {
      ++orderBoxCounter;
      setTimeout(function () { orderBoxCheck() }, 1000);
      return;
    } else {
      orderMoreCheck();
    }
  }

  var orderMoreCounter = 0;
  function orderMoreCheck () {
    if (orderMoreCounter < 10) {
      if ($('.order-cont[data-code="all"] .order-more').length == 1) {
        ++orderMoreCounter;
        $('.order-cont[data-code = "all"] .order-more').click();
        setTimeout(function () { orderMoreCheck(); }, 2000);
        return;
      } else {
        dataCapture();
      }
    } else {
      dataCapture();
    }
  }
  orderBoxCheck();
}
`