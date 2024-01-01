// 기존 함수를 분리하고 카피온 라이트를 빼내 더 좋은 메서드 만들기

// 1. 기존 함수 (copy-on-write 사용)
function add_item(cart, name, price) {      // 인자 3개 필요
  var new_cart = cart.slice();              // 배열 복사
  new_cart.push({                           // item 객체 만듦, 복사본에 item 추가
    name: name,
    price: price
  });
  return new_cart;              // 복사본을 리턴
}

add_item(shopping_cart, "shoes", 3.45);



// 2. item 객체를 만드는 생성자 함수를 만들어 사용 하는 경우
function make_cart_item(name, price) {     // 생성자 함수
  return {
    name: name,
    price: price
  };
}

function add_item(cart, item) {     // 인자 2개 필요
  var new_cart = cart.slice();
  new_cart.push(item);
  return new_cart;
}

add_item(shopping_cart, make_cart_item("shoes", 3.45));


// 3. 일반적인 이름으로 add_item()을 바꿔석 구현
function add_element_last(array, elem) {
    var new_array = array.slice();
    new_array.push(elem);
    return new_array;
}

function add item(cart, item) {     // 간단하게 다시 구현 가능
    return add_element_last(cart, item);
}

