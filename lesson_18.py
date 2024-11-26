try:
  text = input('Введите текст:')
  number = int(input('Введите число:'))
  last_text = ""
  for char in text:
    if char != " ":
      ord_char = ord(char)
      k = chr(number + ord_char)
      last_text += k
    else:
      k = " "
      last_text += k
  print(last_text)
except ValueError:
  print("Введено некорретктное число для сдвига")
except Exception as e:
  print(f"Возникла ошибка: {e}")
