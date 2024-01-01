// 제품이름으로 장바구니에서 제품 빼내기

//기본 함수
function remove_item_by_name(cart, name) {
  var idx = null;
  for(var i = 0; i < cart.length; i++) {
    if(cart[i].name === name)
      idx = i;
  }
  if(idx !== null)
    cart.splice(idx, 1);
}


// 복사본 만들고 변경 - cart를 복사해서 지역변수에 저장하여 new_cart를 사용
function remove_item_by_name(cart, name) {
  var new_cart = cart.slice();              // 복사본 사용
  var idx = null;
  for(var i = 0; i < new_cart.length; i++) {
    if(new_cart[i].name === name)
      idx = i;
  }
  if(idx !== null)
    new_cart.splice(idx, 1);    // idx의 원소를 하나씩 삭제 (변경)
}


// 복사본 리턴하기
function remove_item_by_name(cart, name) {
  var new_cart = cart.slice();
  var idx = null;
  for(var i = 0; i < new_cart.length; i++) {
    if(new_cart[i].name === name)
      idx = i;
  }
  if(idx !== null)
    new_cart.splice(idx, 1);
  return new_cart;
}




/*
  splice() 메서드를 일반화하여 재사용 하기
*/

// 원래 코드에 splice()를 메서드화한 removeItems() 사용
/// Original
function remove_item_by_name(cart, name) {
  var new_cart = cart.slice();
  var idx = null;
  for(var i = 0; i < new_cart.length; i++) {
    if(new_cart[i].name === name)
      idx = i;
  }
  if(idx !== null)
    removeItems(cart, idx, 1);        // * splice()를 메서드화해서 사용
  return new_cart;
}

function removeItems(array, idx, count) {
  array.splice(idx, count);
}


// removeItems()를 카피온 라이트로 구현
function removeItems(array, idx, count) {
  var copy = array.slice();
  copy.splice(idx, count);
  return copy;
}


// splice()를 일반화한 메서드를 사용한 함수 버전
function remove_item_by_name(cart, name) {
    var idx = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name)
            idx = i;
    }

    if (idx !== null) {
        return removeItems(cart, idx, 1);
    }

    return copy;    // 값을 바꾸지 않은 경우 복사하지 않은 것을 그대로 씀
}
