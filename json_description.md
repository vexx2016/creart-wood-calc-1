{
    "calc": {
        "matherials": {
            "Фанера ФК-4 (1 сорт)": 4100,
            "Фанера ФК-6 (1 сорт)": 6100,
            "Фанера ФК-8 (1 сорт)": 8100,
            "Фанера ФК-4 (2 сорт)": 4200,
            "Фанера ФК-6 (2 сорт)": 6200,
            "Фанера ФК-8 (2 сорт)": 8200
        },
        "painting": 50,
        "discount": {
            "Нет": 0,
            "Постоянный": 10,
            "Оптовик": 20,
            "Крупный опт": 30
        },
        "urgently": 15,
        "rez_prices": {
            "ФК-4": 8,
            "ФК-6": 9,
            "ФК-8": 10
        },
        "grav_prices": {
            "ФК-4": 18,
            "ФК-6": 19,
            "ФК-8": 20
        }
    }
}


Это базовая структура JSON файла, она не поддерживает комментариев, одинарных скобок и вообще очень капризная.
Теперь коротко о содержании.

matherials - серия ключ/значение с названиями материалов и их ценами
painting - цена покраски за квадратный метр
discount - ключ/значение льготных категорий и процента скидки для них
urgently - процент за срочность
rez_prices, grav_prices - цены за резку и гравировку соответственно
И вот ту повнимательнее. "Ключи" тут - это часть ключа из matherials.

Как это работает:
Возьмём для примера резку. JS видит какой материал выбран (допустим это "Фанера ФК-8 (1 сорт)"), проходится по ключам из rez_prices и ищет эти ключи в названии выбранного материала. В данном случае он находит подстроку с ключём №3 ("ФК-8") в строке с названием материала (в "Фанера ФК-8 (1 сорт)") и присваивает цене резки значение по ключу. В данном случае 20.

Исходя из этого, 20 - цена резки "ФК-8" и для первого, и для второго сорта.

Если есть необходимость, скажем, для разных сортов "ФК-8" задать отдельные цены резки, то JSON преобразуется следующим образом:

...
"rez_prices": {
            "ФК-4": 8,
            "ФК-6": 9,
            "ФК-6 (1 сорт)": 20,
            "ФК-6 (2 сорт)": 30,
        }
...

Для гравировки всё аналогично.