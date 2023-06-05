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


