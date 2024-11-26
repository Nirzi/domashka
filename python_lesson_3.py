name_student = input("Введите имя студента:")
estimation_student =  input("Введите оценку студента(от 1 до 12):")
flag = True


if estimation_student.isdigit() == False:
  print("Пожалуйства введите корректно оценку")
else:
  estimation = int(estimation_student)
  if estimation == 1 or estimation == 2 or estimation == 3:
    level_knowledge = "Начальный уровень знаний"
  elif estimation == 4 or estimation == 5 or estimation == 6:
    level_knowledge = "Средний уровень знаний"
  elif estimation == 7 or estimation == 8 or estimation == 9:
    level_knowledge = "Достаточный уровень знаний"
  elif estimation == 10 or estimation == 11 or estimation == 12:
    level_knowledge = "Высокий уровень знаний"
  else:
    flag = False
    print("Введите оценку в диапазоне от 1 до 12")

  if flag == True:
    print(f"Имя студента: {name_student}. Уровень: {level_knowledge}")





