let search = '?id=856&name=%E6%B4%97%E7%89%8C';

// 1.转为map
function searchParams(search) {
  search = decodeURI(search).slice(1);
  const paramsArr = search.split('&');
  const paramsMap = new Map(paramsArr.map(params => params.split('=')));
  console.log(paramsMap.get('id'));
  console.log(paramsMap.get('name'));
}

// 2.转为对象
function searchParams1(search) {
  search = decodeURI(search).slice(1);
  const paramsArr = search.split('&');
  const paramsMap = Object.fromEntries(paramsArr.map(params => params.split('=')));
  console.log(paramsMap['id']);
  console.log(paramsMap['name']);
}

// 3.使用UrlSearchParams
function searchParams2(search) {
  const params = new URLSearchParams(search);
  console.log(params.get('id'));
  console.log(params.get('name'));
}
