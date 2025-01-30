/*
  Integer:
  
    Рекомендации:
      Основной случай, в котором вы должны использовать isize или         usize, — это индексация какой-либо коллекции.
    
    Формы записи:
    1_000_000 <=> 1000000 - Для удобочитаемости больших чисел.
    
    Типы:
      Без знака ( sup=(2^n)-1 ):
        u8, u16, u32, u64, u128, usize;  
      Со знаком ( inf=-2^(n-1), sup=(2^(n-1)-1) ):
        i8, i16, i32, i64, i128, isize;
      
        Где n — количество битов.
      
    P.S isize и usize - соответствуют битности системы.

    Пример работы:
*/
fn example_for_nums(num_u16: u16, num_f64: f64) -> f64 {
   let num_to_i32: i32 = num_u16.into(); // Перевод первого аргумента в i32.
   
   let res_i32: i32 = num_to_i32 * -1;
   let res_f64: f64 = num_f64 * 0.000000001;
   
   let res_to_f64: f64 = res_i32.into(); // Перевод из i32 в f64 для сложения ниже.

   println!("Int-32: {}, Float-64: {}", res_i32, res_f64);
   res_to_f64 + res_f64
}


/*
Тип char в Rust имеет размер четыре байта и представляет собой скалярное значение Unicode.
 Это значит, что он может представлять гораздо больше, чем просто ASCII.
 Буквы с ударением; китайские, японские и корейские иероглифы;
 эмодзи и пробелы нулевой ширины являются допустимыми значениями char в Rust.
 Скалярные значения Unicode находятся в диапазоне от U+0000 до U+D7FF и от U+E000 до U+10FFFF включительно.
 Однако «символ» на самом деле не является концепцией в Unicode,
 поэтому интуитивно может не совпадать с тем, что такое char в Rust.

 Пример работы:
 */
fn example_for_char(_chr: char) -> char { 'b' }


/*
    Массивы: 
        Массивы полезны, когда вы хотите, чтобы ваши данные размещались в стеке,
        а не в куче. К тому же массивы статичны в отличии от вектора.

    Пример работы:
 */
fn example_for_array(n: i32) -> [i32; 5] { [n,n+1,n+2,n+3,n+4] }



/*
    Картеж

    Пример работы:
 */
fn example_for_tuple(tup: (u16, u16)) -> (i32, i32) {
    let (x, y) = tup; // деструктивное присваивание.
    let res_x: i32 = x.into();
    let res_y: i32 = y.into();

    (res_x, res_y)


fn main() {
    let example_of_sum: f64 = example_for_nums(65_535, 2.718281828);
    let example_of_char: char = example_for_char('a');
    let example_of_array: [i32; 5] = example_for_array(1);
    let example_of_tuple: (i32, i32) = example_for_tuple((128, 128));

    println!(
        "sum: {} char: {}, array: {:?}, tuple: {:?}",
         example_of_sum,
         example_of_char, 
         example_of_array,
         example_of_tuple
        );
}




// Задачи:

// Перевод градусов Цельсия в градуса Фарингейта
fn celsius_to_fahrenheit(celsius: f32) -> f32 { 
  (celsius * (9/5) as f32) + 32 as f32 
}


// Рекурсивный вариант поиска в ряду Фибоначчи числа
fn fibbonachi(n: u32) -> u32 {
  if n == 0 { return 0 };
  if n <= 2 { return 1 };

  return fibbonachi(n-1) + fibbonachi(n-2);
  
}


// Подгрузка модулей для иттеративной версии
use num_bigint::BigUint;
use num_traits::One;
use std::time::Instant;


// Иттеративный вариант поиска в ряду Фибоначчи числа
fn fibboiter(n: u32) -> BigUint {
  let mut a = BigUint::from(0u32);
  let mut b = BigUint::from(0u32);
  let mut c = BigUint::one();
  for _i in 0..n {
    let temp = a.clone();
    a = b.clone();
    b = c.clone();
    c = &temp + &b;
  }
  return c;
}


// Алгоритм поиска основанный на формуле Бине, из-за дискретности вычеслений наименее точный (квадратный корень из 5)
fn fib_bine(n: u32) -> BigUint {
    let sqrt5 = 5.0f64.sqrt();
    let phi = (1.0 + sqrt5) / 2.0;
    let psi = (1.0 - sqrt5) / 2.0;

    let fib_value = (phi.powi(n as i32) - psi.powi(n as i32)) / sqrt5;
    let rounded = fib_value.round();

    BigUint::from(rounded as u64)  // Convert to BigUint
}

fn main() {
  println!("It is fahrenheit: {}",  celsius_to_fahrenheit(419.5));
  println!("Fibbonachi for 25: {}", fibbonachi(25));
  let start = Instant::now();
  println!("Fibbonachi bine for 250000: {}", fibboiter(250000));
  let duration = start.elapsed();
  println!("Время выполнения: {:?}", duration);
}