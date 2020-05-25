func closure(x int) (func() int) {
  return func() int {
    x++
    return x;
  }
}

var y (func() int) = closure(0);
var z int = y();



func main() {
  fmt.Println(z);
  var i = 0;

  for i < 100 {
    fmt.Println(y())
    i++;
  }
  fmt.Println(i)
}
