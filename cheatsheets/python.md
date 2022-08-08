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
    - [Acceso y asignación](#acceso-y-asignación)
    - [Agregar y quitar elementos](#agregar-y-quitar-elementos)
    - [Longitud](#longitud)
    - [Recorriendo listas](#recorriendo-listas)
      - [Mediante índices](#mediante-índices)
      - [Mediante elementos](#mediante-elementos)
      - [Mediante índices y elementos](#mediante-índices-y-elementos)
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
type("Python <3")
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
Las listas en Python son una estructura de datos que permite guardar muchos elementos en una  ́unica variable. Se
parecen a los arrays en otros lenguajes, pero con algunas diferencias fundamentales:
- Son de longitud variable, es decir, puedo agregar y sacar elementos de una misma lista
- Los elementos de una lista pueden ser de distinto tipo de datos, por ejemplo, `[4,8,'Mario',5.8]` es una lista válida.

#### Acceso y asignación

Para acceder a un elemento de una lista, podemos accederlo mediante su posición o índice. **Las listas en Python están indexadas desde 0, no 1**. Por ejemplo, si tengo la siguiente lista:
```python
lista = [4,5,0.25,'x']
lista[0] #4
lista[2] #0.25
lista[3] #'x'
```
Puedo no solo acceder, sino también modificar elementos en una lista. Para eso uso operadores de asignación como =, o de modificación como += sobre el elemento deseado:
```python
lista = [4,5,0.25,'x']
lista[0] = 'Ort'
lista[2] = 1
lista[3] += 'y'
lista == ['ORT',5,1,'xy']
```
#### Agregar y quitar elementos

Para agregar elementos a una lista en python, podemos usar el método `append`. Un método, por ahora, podemos pensarlo simplemente como una función pero con una sintaxis especial. `append` agrega el elemento pasado por parámetero al final de la lista.

```python
lista = [4,5,'x',9]
lista.append(11)
print(lista) #[4,5,'x',9,11]
```
Para agregar un elemento en algun posición específica de la lista se puede usar el método `insert`.

```python
#Completar ejemplo de insert
```

Para sacar elementos de la lista, podemos usar el método `pop`, que toma como parámetro el índice que se desea eliminar.

```python
lista = [4,5,'x',9]
lista.pop(1)
print(lista) #[4,'x',9]
```
Para sacar un elemento basado en su valor, se puede usar `remove`, que saca la primera aparición del elemento pasado por parámetro.

```python
#Completar ejemplo de remove
```
#### Longitud

Muchas veces cuantos elementos hay en una lista es desconocido, y para eso existe la función `len`.
```python
lista = [4,5,'x',9]
print(len(lista)) #4
```
#### Recorriendo listas

Las listas contienen muchos elementos, y en muchos casos la solución a nuestro problema implica recorrerlas. A continuación discutimos algunas formas de hacer esto.

##### Mediante índices
Los índices de una lista arrancan en 0 y terminan en la longitud - 1. Por eso, `range(len(l))` nos da los índices de la lista guardada en `l`, ya que range por default arranca en 0 y no incluye el valor final (`len(l)`). Usándolo en un `for`:

```python
l = [6,'x',9,25]
for indice in range(len(l)):
    l[indice] #Obtengo los elementos usando el índice para acceder al valor
```

Entiendo que la sintaxis es medio rara y bastante menos intuitiva que un lenguaje como `C#`, pero entiendan que el `for` necesita por parámetro estos iterables, y por eso el `range`.

##### Mediante elementos
Otras veces no necesitamos la posición del elemento, y podemos aprovechar la sintaxis del `for` a nuestro favor:

```python
l = [6,'x',9,25]
for elemento in l:
    elemento #Va a ser cada elemento de la lista de izquierda a derecha (6,'x', etc)
```

##### Mediante índices y elementos
La forma más elegante, pero a la vez menos intuitiva, de recorrer listas cuando necesito su posición además de su valor, es mediante `enumerate`. Esta función genera un iterable de pares índice, valor dada una lista, y entonces podemos usar la siguiente sintaxis:
```python
l = [6,'x',9,25]
for indice,elemento in enumerate(l):
        indice   #posición actual
        elemento #elemento actual
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

