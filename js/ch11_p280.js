
// Original code (로그를 남기지 않음)
saveUserData(user);
fetchProduct(productId);


// 1. 로그를 남기기 위해 수동으로 감싸주기, 2번 감싸야 함
try {
  saveUserData(user);
} catch (error) {
  logToSnapErrors(error);
}

try {
  fetchProduct(productId);
} catch (error) {
  logToSnapErrors(error);
}


// 2. 번거로우니 withLogging() 사용 -> 여전히 2번 적용해야 함
function withLogging(f) {
  try {
    f();
  } catch (error) {
    logToSnapErrors(error);
  }
}

withLogging(function() {
  saveUserData(user);
});

withLogging(function() {
  fetchProduct(productID);
});


// 3-1. 원래코드의 이름을 명확하게 바꿔주기 (로그를 사용하지 않음을 명확히 표현)
try {
  saveUserDataNoLogging(user);
} catch (error) {
  logToSnapErrors(error);
}

try {
  fetchProductNoLogging(productId);
} catch (error) {
  logToSnapErrors(error);
}


// 3-2. 전체를 감싸고 전체 코드는 로그를 남기므로 로그를 남긴다는 이름을 붙여줌
function saveUserDataWithLogging(user) {
  try {
    saveUserDataNoLogging(user);
  } catch (error) {
    logToSnapErrors(error);
  }
}

function fetchProductWithLogging(productId) {
  try {
    fetchProductNoLogging(productId);
  } catch (error) {
    logToSnapErrors(error);
  }
}


// 3-3. 이름을 없애고 익명 함수로 바꿔서 중복되는 부분 확실히 보기
function(arg) {
  try {
    saveUserDataNoLogging(arg);
  } catch (error) {
    logToSnapErrors(error);
  }
}

function(arg) {
  try {
    fetchProductNoLogging(arg);
  } catch (error) {
    logToSnapErrors(error);
  }
}


// 3-4. 함수에 콜백인자를 추가하는 대신 wrapLogging 함수로 감싸기
function wrapLogging(f) {
  return function(arg) {
    try {
      f(arg);
    } catch (error) {
      logToSnapErrors(error);
    }
  }
}

var saveUserDataWithLogging = wrapLogging(saveUserDataNoLogging);
var fetchProductWithLogging = wrapLogging(fetchProductNoLogging);
// -> 로그 남기기를 원하는 코드를 호출하는 것만으로 로그를 남기도록 자동화 가능
