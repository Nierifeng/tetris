# tetris
俄罗斯方块大致思路
### 如何表达方块
>  俄罗斯方块可以表示为一个二维数组，0代表为没有，1代表有方块，所以 `000000` 代报这一行没有方块，`111111`代表这一行全是方块需要清除。<br/>

### 如何移动方块
> 上面表达方块的方式可以联想到二进制，于是想到了 [>>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift)与[<<](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift)，可以利用这两个运算符轻松的解决方块左右移动的问题

``` javascript
const a = 0b000001;
const b = a << 1; // 2
// 而2的二进制可以表示为 000010 所以可以用来表示方块的右移动，同理
const c = a >> 1; // 0
// 0的二进制可以表达为为 000000 所以可以用来表示方块的左移动
```
#### 判断方块是否可以移动
 
> 解决了左右移动问题，接下来就是判断方块是否可以移动，这里可以用到[&](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)运算符，因为方块是二进制表示，所以可以用这个运算符来判断方块是否可以移动，比如
``` javascript
const a = 0b000001;
const b = 0b000010;

a & 0b00001; // 1
b & 0b00001; // 0

// 结果0代表可以移动，结果不为0代表不可移动 所以判断a行不可以右移动，b行可以右移动。
// 同理判断是否可以左移动可以用 某一行的二进制 & 0b100000即可判断是否可以左移动
// 也可以简单粗暴的判断第一位或者最后一位是否为1来判断是否可以移动
```





