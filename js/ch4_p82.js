/*
ch.4 액션에서 계산 빼내기 p.82
1. 계산 코드를 찾아 빼내기
2. 새 함수에 암묵적 입력과 출력 찾아내기
3. 암묵적 입력은 인자로 암묵적 출력은 리턴값을 바꿈
*/


// 기본 함수
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for(var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if(item.price + shopping_cart_total >= 20)
      button.show_free_shipping_icon();
    else
      button.hide_free_shipping_icon();
  }
}


// 1. 계산 코드를 빼내기
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for(var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if(gets_free_shipping(item.price))  // *
      button.show_free_shipping_icon();
    else
      button.hide_free_shipping_icon();
  }
}

function gets_free_shipping(item_price) {
  return item_price + shopping_cart_total >= 20;
}


// 2. 새 함수에서 암묵적 입력, 출력 찾아내기
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for(var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if(gets_free_shipping(item.price))
      button.show_free_shipping_icon();
    else
      button.hide_free_shipping_icon();
    }
  }

function gets_free_shipping(item_price) {
  return item_price + shopping_cart_total >= 20; // * 전역변수를 읽는 암묵적 입력
}


// 3. 암묵적 입력은 인자로 암묵적 출력은 리턴값을 바꿈
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for(var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if(gets_free_shipping(item.price, shopping_cart_total)) // * 전역변수를 인자로 전달
      button.show_free_shipping_icon();
    else
      button.hide_free_shipping_icon();
    }
  }

function gets_free_shipping(item_price, total) {
  return item_price + total >= 20; // * 전역변수를 인자로 받아 처리
}
