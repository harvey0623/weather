const checkTwID = function(id) {
   //建立字母分數陣列(A~Z)
   let city = new Array(1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30)
   id = id.toUpperCase();
   //使用「正規表達式」檢驗格式
   if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
      return false;
   } else {
      //將字串分割為陣列(IE必需這麼做才不會出錯)
      id = id.split('');
      //計算總分
      let total = city[id[0].charCodeAt(0) - 65];
      for (let i = 1; i <= 8; i++) {
         total += eval(id[i]) * (9 - i);
      }
      //補上檢查碼(最後一碼)
      total += eval(id[9]);
      //檢查比對碼(餘數應為0);
      return ((total % 10 == 0));
   }
}

export default checkTwID;