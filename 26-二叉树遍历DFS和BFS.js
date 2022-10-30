let arr = [
  {
    name: 'a',
    children: [
      {
        name: 'aa',
        children: [
          {
            name: 'aaa',
            children: [
              {
                name: 'aaaa',
              },
            ],
          },
        ],
      },
      {
        name: 'ab',
        children: [
          {
            name: 'aba',
          },
        ],
      },
    ],
  },
  {
    name: 'b',
    children: [
      {
        name: 'ba',
        children: [
          {
            name: 'baa',
          },
        ],
      },
      {
        name: 'bb',
        children: [
          {
            name: 'bba',
          },
        ],
      },
    ],
  },
];

// 深度优先遍历 (递归)
function DFS(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    console.log(item.name);
    if (item?.children?.length) {
      DFS(item.children);
    }
  }
}
// DFS(arr);

// 广度优先遍历 (栈)
function BFS(arr) {
  let array = [...arr];
  while (array.length) {
    const item = array.shift();
    console.log(item.name);
    array.push(...(item?.children || []));
  }
}
BFS(arr);
