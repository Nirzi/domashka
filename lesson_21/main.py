from cities import cities_list

city_set = []
# Создаем список всех городов
for c in cities_list:
    city_set.append(c['name'].lower())

used_cities = []

def find_city_by_letter(letter, used_cities):
    for city in city_set:
        if city.startswith(letter) and city not in used_cities:
            return city
    return None

last_letter = None
while True:
    user_city = input("Введите название города (Введите 'стоп', чтобы закончить игру): ").strip().lower()
    if user_city == 'стоп':
        print("Вы сдались! Компьютер победил!")
        break
    if user_city in used_cities:
        print("Этот город уже был назван. Вы проиграли!")
        break

    city_exists = False
    for city in city_set:
        if city == user_city:
            city_exists = True
            break

    if not city_exists:
        print("Такого города нет в списке. Вы проиграли!")
        break

    if last_letter is not None:
        if not user_city.startswith(last_letter):
            print(f"Город должен начинаться на букву '{last_letter.upper()}'. Вы проиграли!")
            break

    used_cities.append(user_city)

    last_letter = user_city[-1]
    if last_letter in ['ь', 'ъ', 'ы']:
        last_letter = user_city[-2]

    computer_city = find_city_by_letter(last_letter, used_cities)
    if computer_city is None:
        print("Компьютер не смог найти город. Вы победили!")
        break

    print(f"Компьютер выбирает город: {computer_city.capitalize()}")
    used_cities.append(computer_city)

    last_letter = computer_city[-1]
    if last_letter in ['ь', 'ъ', 'ы']:
        last_letter = computer_city[-2]
