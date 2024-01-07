// 중첩된 데이터 구조
var shirt = {
  name: "shirt",
  price: 13,
  options: {
    color: "blue",
    size: 3
  }
};

// Original Code, 중첩된 데이터 update
function incrementSize(item) {
  var options = item.options;
  var size = options.size;
  var newSize = size + 1;                                // 사이즈를 변경하여
  var newOptions = objectSet(options, 'size', newSize);  // 'size'에 저장
  var newItem = objectSet(item, 'options', newOptions);  // 'options'에 저장
  return newItem;
}

/// Refactored
function incrementSize(item) {
  var options = item.options;
  var newOptions = update(options, 'size', increment);
  var newItem = objectSet(item, 'options', newOptions);
  return newItem;
}

/// Refactored twice
function incrementSize(item) {
  return update(item, 'options', function(options) {
    return update(options, 'size', increment);
  });
}

// updateOption 도출하기 (중첩된 데이터에 update를 두번할 수 있음)
function updateOption(item, option, modify) {
  return update(item, 'options', function(options) {
    return update(options, option, modify);
  });
}

// 일반적으로 바꾸어 원래 메서드에 적용
function update2(object, key1, key2, modify) {
    return update(object, key1, function(value1) {
        return update(value1, key2, modify);
    });
}

function incrementSize(item) {
    return update2(item, 'options', 'size', function(size) {
        return size + 1;
    })
}



/*
    더 많이 중첩된 데이터를 update하기 위해
    update3, update4, ... 등을 만들 수 있지만
    nestedUpdate()를 만들어 사용할 수 있음 (재귀)
*/


/// update3
function update3(object, key1, key2, key3, modify) {   // 3만큼의 key
  return update(object, key1, function(object2) {
    return update2(object2, key2, key3, modify);       // 3-1, 첫번째 key 제외
  });
}

// depth 사용, 일반적 인자로 변경
function updateX(object, depth, key1, key2, key3, modify) {
  return update(object, key1, function(value1) {
    return updateX(value1, depth-1, key2, key3, modify);    // 재귀 호출
  });
}
// -> depth 인자와 실제 키 개수가 달라질 수 있어 버그가 생길 수 있음
// -> !! 키를 배열로 넘기기 !! (키의 개수와 순서가 중요하기 때문)


/*
    키를 배열로 넘기기
*/
function updateX(object, keys, modify) {
  var key1 = keys[0];
  var restOfKeys = drop_first(keys);
  return update(object, key1, function(value1) {   // 첫번째 키로 update() 호출
    return updateX(value1, restOfKeys, modify);    // 나머지 키로 재귀함수 호출
  });
}

// update5, update4 등등은 같은 방식으로 호출가능하지만 update0은 다름
function update0(value, modify) {
    return modify(value);      // 재귀 호출x
}

// 배열의 길이가 0인 경우를 처리하기
function updateX(object, keys, modify) {
    if (keys.length === 0)
        return modify(object);              // 0인 경우 재귀 호출 없음
    var key1 = keys[0];
    var restOfKeys = drop_first(keys);
    return update(object, key1, function(value1) {
        return updateX(value1, restOfKeys, modify);  // 재귀 호출
    });
}
