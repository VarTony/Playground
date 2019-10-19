
const example1 = acc => (flag = true) => console.log(flag? ++acc: --acc);
const count = example1(0);
count();
count();
count();
count(false);
count(false);
count(false);
count();
