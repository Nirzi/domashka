input_time  = int(input("Введите секунды:"))
input_temperature = int(input("Введите температуру(в градусах цельсия):"))


hours = input_time//3600
time_minutes = int(input_time)%3600
minutes = time_minutes//60
seconds = time_minutes%60

temperature_kelvin = round(input_temperature + 273.15,2)
temperature_farengeit = round(input_temperature * (9/5) + 32,2)
temperature_reimur = round(input_temperature * (4/5),2)

print(f"\nВ {input_time} секунд:\nЧасов:{hours}\nМинут:{minutes}\nСекунд:{seconds}")
print(f"\nВ {input_temperature}°С:\n{temperature_kelvin}K\n{temperature_farengeit}°F\n{temperature_reimur}°Ré")