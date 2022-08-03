---
title: Python
image: "/assets/images/piton.jpeg"
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Variables](#variables)
- [Types](#types)
- [Conditionals](#conditionals)
- [Loops](#loops)
- [Functions](#functions)
- [List](#list)
- [Dictionaries](#dictionaries)
- [List and Dictionary Comprehensions](#list-and-dictionary-comprehensions)
- [Classes](#classes)
- [Typing](#typing)

<!-- /code_chunk_output -->

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

```python
type(x)
# <class 'int'>
type(y)
# <class 'int'>
type(z)
# <class 'int'>
type(a)
# <class 'str'>
type(b)
# <class 'str'>
type(c)
# <class 'str'>

int("15")
# 15

int("3f",16)
# 63

int(15.56)
# 15

float("-11.24e8")
# -11.24e8

round(15.56,1)
# 15.6

bool(x)
# True

str(x)
# "1"

chr(64)
# "A"

repr(x)
# "1"

bytes([72,9,64])
# b"H\x09@"

list("abc")
# ['a', 'b', 'c']

dict([(3,"three"),(1,"one")])
# {3: 'three', 1: 'one'}

set(["one","two"])
# {'one', 'two'}

':'.join(['toto','12','pswd'])
# 'toto:12:pswd'

"words with spaces".split()
# ['words', 'with', 'spaces']

"1,4,8,2".split(",")
# ['1', '4', '8', '2']

[int(x) for x in ('1','29','-3')]
# [1,29,-3]
```

## Conditionals

```python
if x > y:
    print("x is greater than y")
elif x < y:
    print("x is less than y")
else:
    print("x is equal to y")
```

## Loops

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

## Functions

```python
def add(x, y):
    return x + y
```

## List

```python
x = [1, 2, 3]
```

## Dictionaries

```python
x = {'a': 1, 'b': 2}
```

## List and Dictionary Comprehensions

```python
x = [i for i in range(10)]
y = {i: i for i in range(10)}
```

## Classes

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
    
```python

age : int = 21
name : str = "John"
people : list = ["John", "Jane", "Bob"]


def greeting(name: str) -> str:
    return 'Hello ' + name

