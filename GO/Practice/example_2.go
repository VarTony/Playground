package main
import "fmt"

func fucktorial(num int) int {
  if num <= 1 {
    return 1;
  }

  return num * fucktorial(num - 1);
}

var fuck = fucktorial(5);


func main() {
  fmt.Println(fuck)
}
