// Упражнения по 6-й главе. Перечисления, Option, if let.
//
// Формат как в твоём примере: перед каждым заданием — описание и цель,
// ниже — заготовка функций. В конце файла — модуль тестов.
//
// Запуск:
//   cargo test      — прогон тестов (изначально будут падать, пока не решишь)
//   cargo run       — опционально, если добавишь какие-то println! в main()


// ------------------------------------------------------------
// Задание 1. Option — чётные числа
//
// Напишите функцию `even_number`, которая принимает целое число `n`.
// Если `n` чётное — верните `Some(n)`, если нечётное — `None`.
// Проверьте на нескольких значениях.
//
// Цель: понять базовое использование `Option` и ветвление по условию.
// ------------------------------------------------------------
fn even_number(n: i32) -> Option<i32> {
    match n % 2 {
        0 => return Some(n),
        _ => return None
    }
}


// ------------------------------------------------------------
// Задание 2. Извлечение Option через `if let`
//
// Напишите функцию `string_length`, принимающую `Option<String>`.
// Если строка есть — верните её длину (`usize`), иначе — `0`.
// Обязательно используйте конструкцию `if let` для извлечения.
//
// Цель: попрактиковаться в безопасном извлечении значения из `Option`.
// ------------------------------------------------------------
fn string_length(opt: Option<String>) -> usize {
    if let Some(s) = opt {
        return s.len() as usize
    }
    return 0
}


// ------------------------------------------------------------
// Задание 3. Простое перечисление Direction
//
// Опишите перечисление `Direction` с вариантами: `Up`, `Down`, `Left`, `Right`.
// Напишите функцию `move_dir`, которая принимает `Direction` и
// возвращает строку: "Moving Up", "Moving Down", "Moving Left", "Moving Right".
//
// Цель: попрактиковаться в `match` по enum без данных.
// ------------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

fn move_dir(dir: Direction) -> String {
    match dir {
        Direction::Up => String::from("Moving Up"),
        Direction::Down => String::from("Moving Down"),
        Direction::Left => String::from("Moving Left"),
        Direction::Right => String::from("Moving Right")
    }
}


// ------------------------------------------------------------
// Задание 4. Enum с данными внутри (варианты с полезной нагрузкой)
//
// Опишите перечисление `Status`:
//   - `Success(u32)` — хранит код успеха,
//   - `Error(String)` — хранит текст ошибки.
// Напишите функцию `handle_status`, которая принимает `Status` и
// возвращает строку:
//   - "Success with code N" для `Success(N)`,
//   - "Error: message" для `Error(message)`.
//
// Цель: понять, как класть данные внутрь вариантов enum и извлекать их через `match`.
// ------------------------------------------------------------
#[derive(Debug, Clone, PartialEq, Eq)]
enum Status {
    Success(u32),
    Error(String),
}

fn handle_status(status: Status) -> String {
    match status {
        Status::Success(n) => format!("Success with code {n}"),
        Status::Error(s) => format!("Error: {s}")
    }
}


// ------------------------------------------------------------
// Задание 5. Option + enum Symbol (диапазоны и сопоставление)
//
// Опишите перечисление `Symbol`:
//   - `Letter(char)`
//   - `Exclamation`
//   - `Question`
//   - `Space`
//
// Напишите функцию `from_code(code: u32) -> Option<Symbol>`, которая
// преобразует код в символ по правилам обратного алфавита:
//   1..=26  => Letter('z'..'a')  (1 -> 'z', 26 -> 'a')
//   27      => Exclamation ('!')
//   28      => Question   ('?')
//   29      => Space      (' ')
//   иначе   => None
//
// Цель: объединить `Option` и enum, потренироваться в диапазонах `match`.
// ------------------------------------------------------------
#[derive(Debug, Clone, PartialEq, Eq)]
enum Symbol {
    Letter(char),
    Exclamation,
    Question,
    Space,
}

fn from_code(code: u32) -> Option<Symbol> {
    match code {
        1..=26 => Some(Symbol::Letter((b'z' - (code - 1) as u8) as char)),
        27 => Some(Symbol::Exclamation),
        28 => Some(Symbol::Question),
        29 => Some(Symbol::Space),
        _ => None
    }
}


// ------------------------------------------------------------
// Задание 6 (бонус). "Switcher": сборка строки из вектора числовых строк
//
// Напишите функцию `switcher(xs: Vec<&str>) -> String`, которая принимает
// вектор строковых чисел и строит строку-результат, используя правила
// из Задания 5 (обратный алфавит + спецсимволы 27/28/29).
//
// Пример: ["24","12","23","22","4","26","9","8"] => "codewars"
//
// Цель: связать всё вместе — парсинг, `Option`, собственный enum и сборка строки.
// ------------------------------------------------------------
fn switcher(codes: Vec<&str>) -> String {
    let mut result: Vec<char> = Vec::new();

    for item in codes {
      let code = item.parse::<u32>().unwrap();

      result.push(match code {
        1..=26 => (b'z' - (code - 1) as u8) as char,
        27 => '!',
        28 => '?',
        29 => ' ',
        _ => unreachable!(),
      })
    }
    result.into_iter().collect()
}


// ------------------------------------------------------------
// main — опционально для ручных экспериментов.
// Можешь добавлять сюда println! по мере решения.
// ------------------------------------------------------------
fn main() {
    // пример: раскомментируй после реализации
    // println!("{:?}", even_number(4));
    // println!("{}", string_length(Some("hello".into())));
    // println!("{}", move_dir(Direction::Left));
    // println!("{}", handle_status(Status::Success(200)));
    // println!("{:?}", from_code(1));
    // println!("{}", switcher(vec!["24","12","23","22","4","26","9","8"]));
}


// ------------------------------------------------------------
// Тесты: запускай `cargo test`. Снимай комментарии/правь по мере прохождения.
// ------------------------------------------------------------
#[cfg(test)]
mod tests {
    use super::*;

    // --- Задание 1 ---
    #[test]
    fn t1_even_number() {
        assert_eq!(even_number(4), Some(4));
        assert_eq!(even_number(7), None);
        assert_eq!(even_number(0), Some(0));
        assert_eq!(even_number(-2), Some(-2));
        assert_eq!(even_number(-3), None);
    }

    // --- Задание 2 ---
    #[test]
    fn t2_string_length() {
        assert_eq!(string_length(Some("hello".to_string())), 5);
        assert_eq!(string_length(Some(String::new())), 0);
        assert_eq!(string_length(None), 0);
    }

    // --- Задание 3 ---
    #[test]
    fn t3_move_dir() {
        assert_eq!(move_dir(Direction::Up), "Moving Up");
        assert_eq!(move_dir(Direction::Down), "Moving Down");
        assert_eq!(move_dir(Direction::Left), "Moving Left");
        assert_eq!(move_dir(Direction::Right), "Moving Right");
    }

    // --- Задание 4 ---
    #[test]
    fn t4_handle_status() {
        assert_eq!(handle_status(Status::Success(200)), "Success with code 200");
        assert_eq!(handle_status(Status::Success(0)), "Success with code 0");
        assert_eq!(handle_status(Status::Error("Not found".to_string())), "Error: Not found");
        assert_eq!(handle_status(Status::Error(String::new())), "Error: ");
    }

    // --- Задание 5 ---
    #[test]
    fn t5_from_code_letters() {
        // 1 -> 'z', 26 -> 'a'
        match from_code(1) {
            Some(Symbol::Letter(c)) => assert_eq!(c, 'z'),
            _ => panic!("Expected Some(Letter('z'))"),
        }
        match from_code(26) {
            Some(Symbol::Letter(c)) => assert_eq!(c, 'a'),
            _ => panic!("Expected Some(Letter('a'))"),
        }
        // Пара промежуточных значений
        match from_code(24) {
            Some(Symbol::Letter(c)) => assert_eq!(c, 'c'),
            _ => panic!("Expected Some(Letter('c'))"),
        }
        match from_code(12) {
            Some(Symbol::Letter(c)) => assert_eq!(c, 'o'),
            _ => panic!("Expected Some(Letter('o'))"),
        }
    }

    #[test]
    fn t5_from_code_specials_and_none() {
        assert_eq!(from_code(27), Some(Symbol::Exclamation));
        assert_eq!(from_code(28), Some(Symbol::Question));
        assert_eq!(from_code(29), Some(Symbol::Space));
        assert_eq!(from_code(0), None);
        assert_eq!(from_code(30), None);
        assert_eq!(from_code(999), None);
    }

    // --- Задание 6 ---
    #[test]
    fn t6_switcher_basic() {
        // классический пример с Codewars: "codewars"
        let xs = vec!["24","12","23","22","4","26","9","8"];
        assert_eq!(switcher(xs), "codewars");
    }

    #[test]
    fn t6_switcher_with_specials() {
        let xs = vec!["29","27","28"]; // ' ', '!', '?'
        assert_eq!(switcher(xs), " !?");
    }

    #[test]
    fn t6_switcher_mixed() {
        // "a z" -> 26 ('a'), 29 (' '), 1 ('z')
        let xs = vec!["26","29","1"];
        assert_eq!(switcher(xs), "a z");
    }
}
