/*
    우수 고객의 구매 중 가장 비싼 구매를 알아내기
    1. 우수 고객(3개 이상 구메)을 거름 (filter)
    2. 우수 고객을 가장 비싼 구매로 바꿈(map)
*/

// filter, map 적용
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function(customer) {    // filter
    return customer.purchases.length >= 3;
  });
  var biggestPurchases = map(bestCustomers, function(customer) {  // map
    return //...;
  });
}

// map내에서 reduce를 사용하여 가장 비싼 구매 찾기 (중첩된 콜백 사용으로 읽기 어려움)
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function(customer) {
    return customer.purchases.length >= 3;
  });
  var biggestPurchases = map(bestCustomers, function(customer) {
                                      // 초기값(빈 객체)
    return reduce(customer.purchases, {total: 0}, function(biggestSoFar, purchase) {  //
      if(biggestSoFar.total > purchase.total)
        return biggestSoFar;
      else
        return purchase;
    });
  });
  return biggesetPurchases;
}

function reduce(array, init, f) {
    var accum = init;
    forEach(array, function(element) {
        accum = f(accum, element);
    });
    return accum;
}


// reduce 부분을 maxKey로 빼내기
maxKey(customer.purchases, {total: 0}, function(purchase) { 
    return purchase.total; 
});

function maxKey(array, init, f) {
  return reduce(array, init, function(biggestSoFar, element) {
    if(f(biggestSoFar) > f(element))    //  콜백 부르기
      return biggestSoFar;
    else
      return element;
  });
}


// 최종
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function(customer) {
    return customer.purchases.length >= 3;
  });
  var biggestPurchases = map(bestCustomers, function(customer) {
    return maxKey(customer.purchases, {total: 0}, function(purchase) {
      return purchase.total;
    });
  });
  return biggestPurchases;
}


/*
    체이닝
    1. 단계에 이름 붙이기 (각 단계의 고차 함수 빼내기)
    2. 콜백에 이름 붙이기 (단계에 이름을 붙이는 대신 콜백을 빼내기)
*/

// Original Code
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function(customer) {            // 콜백
    return customer.purchases.length >= 3;
  });
  var biggestPurchases = map(bestCustomers, function(customer) {        // 콜백
    return maxKey(customer.purchases, {total: 0}, function(purchase) {  // 콜백
      return purchase.total;
    });
  });
  return biggestPurchases;
}


// 2. 콜백에 이름 붙이기
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, isGoodCustomer);
 
  var biggestPurchases = map(bestCustomers, getBiggestPurchase);
  return biggestPurchases;
}

function isGoodCustomer(customer) {
     return customer.purchases.length >= 3;
}

function getBiggestPurchase(customer) {
    return maxKey(customer.purchases, {total: 0}, getPurchaseTotal);
}

function getPurchaseTotal(purchase) {
    return purchase,total;
}
