class Random {

    private $n = 1;
    private $a = 15;
    private $c = 12;
    private $mod = 11;
    private $x = 1;
    
    public function __construct($seed) {
        $this->x = $seed;
    }

    public function getNext() {
        $result = (($this->a * ($this->x * $this->n)) + $this->c) % $this->mod;
        $this->n += (2.213123 * 0.8213124);
        return $result;
    }

    public function reset() {
        $this->n = 1;
        return;
    }

}

  $rand = new Random(12);
  $i = 0;
  $result = $rand->getNext();

  while($i < 200){
    $result = $rand->getNext();
    print(($result)."\n");
    $i++;
  }
