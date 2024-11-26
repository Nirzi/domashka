small_dict = {
    'Человек-муравей и Оса: Квантомания': 2023,
    'Стражи Галактики. Часть 3': 2023,
    'Капитан Марвел 2': 2023,
    'Дэдпул 3': 2024,
    'Капитан Америка: Дивный новый мир': 2024,
    'Громовержцы': 2024,
    'Блэйд': 2025,
    'Фантастическая четвёрка': 2025,
    'Мстители: Династия Канга': 2026,
    'Мстители: Секретные войны': 2027,
    'Безымянный фильм о Человеке-пауке': None,
    'Безымянный фильм о Шан-Чи': None,
    'Безымянный фильм о Вечных': None,
    'Безымянный фильм о мутантах': None
}

def first_task():
  name_film = input('Введите название фильма:').lower()

  found_movies = []
  for title in small_dict:
      if name_film in title.lower():
          found_movies.append(title)
      
  if found_movies:
      print("\nНайденные фильмы:")
      for movie in found_movies:
        print(f"- {movie}")
  else:
      print("\nФильмы по вашему запросу не найдены.")


def filter_movies():
    try:
        year = int(input("Введите год для фильтрации (после какого года): "))
        filtered = {}
        for title, y in small_dict.items():
            if y and y > year:
                filtered[title] = y
        print("\nФильмы, вышедшие после заданного года:" if filtered else "\nНет подходящих фильмов.")
        for title, y in filtered.items():
            print(f"- {title} ({y})")
    except ValueError:
        print("Введите корректное числовое значение года.")


print("1. Поиск фильма по названию")
print("2. Фильтрация фильма по заданному году")

try:
    action = int(input("Выберите действие(введите число):"))
except ValueError:
    print("Введите числовое значение (1 или 2).")
    exit()

if action == 1:
    first_task()
elif action == 2:
    filter_movies()
else:
    print("Неверный выбор. Пожалуйста, выберите 1 или 2.")
