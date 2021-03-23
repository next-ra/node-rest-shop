###  node-rest-shop

### v1.0.0

### Используемые технологии:

JS, GIT, node.js, express.js, mongoose, mongoDB

#### Начало работы:

Убедитесь, что у вас установлен `Node.js`.

Скопируйте проект: 

```
git clone git@github.com:next-ra/node-rest-shop.git
```

Установите зависимости:

```
npm i
```

#### Используйте следующие команды:

Запуск сервера:

```
 npm run start
```

Запуск сервера с функцией "hot reload":

```
npm run dev
```

#### Создать пользователя

**POST** /signup

_Content-Type: application/json_

```
{
"name": "Zak De La Rocha",
"email": "Zak@yandex.ru",
"password": "password123"
}
```

#### Авторизация пользователя

**POST** /signin

_Content-Type: application/json_

```
{
  "email": "Zak@yandex.ru",
  "password": "password123"
}
```
#### Получить информацию о пользователе

**GET** /users/me 

#### Обновить информацию пользователя

**PATCH** /users/me

```
{
  "location": {
      "country": "Russia",
      "city": "Moscow",
  }
  "phone": "+7666 123 45 67"
}
```

#### Создать продукт

**POST** /products 

_Content-Type: application/json_

```
{
    "name": "PRODUCT",
    "price": "number",
    "image": "string"
}
```

#### Удалить продукт

**DELETE** /products/:id


#### Создать заказ

**POST** /orders

```
{
    "product": "product ID",
    "quantity": "number"
}
```

#### Несуществующий адрес

**ALL** /abc_xyz