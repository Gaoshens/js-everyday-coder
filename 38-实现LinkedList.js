class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node(); // 头结点
    this.last = null;
    this._size = 0; // 链表长度
  }
  // 添加节点
  append(val) {
    let head = this.head;
    while (head.next) {
      head = head.next;
    }
    const node = new Node(val);
    head.next = node;
    this._size += 1;
    return node;
  }
  // 添加到指定位置
  insert(index, val) {
    if (index < 0 || index >= this._size) return false; // 超过边界

    let head = this.head;
    while (index-- >= 0) {
      if (head.next) head = head.next;
      else break;
    }
    const node = new Node(val);
    node.next = head.next;
    head.next = node;
    this._size += 1;
  }
  // 返回链表长度
  size() {
    return this._size;
  }
  // 是否为空链表
  isEmpty() {
    return this._size === 0;
  }
  // 删除某个位置的节点
  removeAt(index) {
    if (index < 0 || index >= this._size) return false; // 超过边界
    let [prev, head] = [null, this.head];
    while (index-- >= 0) {
      if (head.next) {
        [prev, head] = [head, head.next];
      }
    }
    this._size -= 1;
    prev.next = head.next;
  }
}

const list = new LinkedList();
list.append('1');
list.append('2');
list.append('3');

// console.log(list.size()); // 获取链表长度
// console.log(list.isEmpty()); // 是否为空

list.insert(2, '4'); // 添加到指定位置
// console.log(list.size()); // 获取链表长度
// list.removeAt(2); // 删除指定位置
// console.log(list.size()); // 获取链表长度

list.removeAt(0);
list.removeAt(0);
list.removeAt(0);

console.log(list.head);
