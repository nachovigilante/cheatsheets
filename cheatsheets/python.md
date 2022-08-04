---
title: Python
image: "/assets/images/piton.jpeg"
---

## Índice

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Índice](#índice)
- [Variables](#variables)
- [Types](#types)
  - [Type Casting](#type-casting)
- [Estructuras Básicas](#estructuras-básicas)
  - [Condicionales](#condicionales)
  - [Loops](#loops)
  - [Funciones](#funciones)
  - [List](#list)
  - [Diccionarios](#diccionarios)
  - [Otras expresiones](#otras-expresiones)
    - [List Comprehensions](#list-comprehensions)
    - [Dictionary Comprehensions](#dictionary-comprehensions)
    - [Ternary Operator](#ternary-operator)
      - [Aún mas expresiones](#aún-mas-expresiones)
- [Clases](#clases)
- [Typing](#typing)
- [Modules](#modules)

<!-- /code_chunk_output -->

<br>

## Variables
    
```python
x = 1
y = 2
z = x + y
# z = 3

a = "Hello"
b = "World"
c = a + " " + b
# c = "Hello World"

```

## Types

En Python todo es un objeto con tipo, sin embargo las variables no exigen un tipo.

Se puede checkear el tipo de un valor contenido en una variable usando la función `type()`

```python
type(10)
# <class 'int'>
type(x)
# <class 'int'>
type(Python <3")
# <class 'str'>
type(a)
# <class 'str'>
```

### Type Casting

Llamando a la clase de un tipo, se puede "castear" un valor de un tipo a otro.

```python
int("15")
# 15

int("3f", 16)
# 63

int(15.56)
# 15

float("-11.24e8")
# -11.24e8

bool(x)
# True

str(x)
# "1"

chr(64)
# "A"

bytes([72,9,64])
# b"H\x09@"

list("abc")
# ['a', 'b', 'c']

dict([(3,"three"),(1,"one")])
# {3: 'three', 1: 'one'}

set(["one","two"])
# {'one', 'two'}
```

## Estructuras Básicas

### Condicionales

```python
if x > y:
    print("x is greater than y")
elif x < y:
    print("x is less than y")
else:
    print("x is equal to y")
```

### Loops

```python
x = 0
while x < 10:
    x += 1
    print(x)

for i in range(10):
    print(i)

for i in [1,2,3,4,5]:
    print(i)

for l in "Hello World":
    print(l)
```

### Funciones

```python
def add(x, y):
    return x + y
```

### List

```python
x = [1, 2, 3]
```

### Diccionarios

```python
x = {'a': 1, 'b': 2}
```

### Otras expresiones

#### List Comprehensions

```python
x = [i for i in range(10)]
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

[int(x) for x in ('1','29','-3')]
# [1,29,-3]
```

#### Dictionary Comprehensions

```python
y = {i: i for i in range(10)}
```

#### Ternary Operator

```python
x = 1 if y > 2 else 0
```

##### Aún mas expresiones

```python
':'.join(['toto','12','pswd'])
# 'toto:12:pswd'

"words with spaces".split()
# ['words', 'with', 'spaces']

"1,4,8,2".split(",")
# ['1', '4', '8', '2']

```

## Clases

```python
class Car:
    def __init__(self, color, model):
        self.color = color
        self.model = model
    def __str__(self):
        return "This is a " + self.color + " " + self.model + "."

myCar = Car("red", "Ford")
print(myCar)
# This is a red Ford.

```

## Typing

Python 3.6+ permite el modulo `typing` para definir tipos de datos.

```python
age : int = 21
name : str = "John"
people : list = ["John", "Jane", "Bob"]


def greeting(name: str) -> str:
    return 'Hello ' + name
```

## Modules

```python
import math
math.sqrt(25)
# 5.0

import random
random.randint(1, 10)
# 8

import PIL.Image as Image
im = Image.open("/assets/images/python.jpg")
im.show()

```

