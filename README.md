# brymonsoft-messenger-rest-api

Steps to run this project:
1. Setup database settings inside `docker-compose.yml` file
2. Run `docker-compose up -d` for database container

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

REST api definition:
-
### **Пользователи:**
- списоĸ пользователей:
  - **GET** /users - Все пользователи
  - **GET** /users/byName/:name - Все пользователи с определенным именем, где **:name** - [mysql паттерн](https://dev.mysql.com/doc/refman/5.7/en/pattern-matching.html). Символы должны быть экранированы (Пример: /users/byName/user%25 => LIKE 'user%')
  - **GET** /users/byPhone/:phone - Все пользователи с определенным номером телефона, где **:phone** - [mysql паттерн](https://dev.mysql.com/doc/refman/5.7/en/pattern-matching.html) Символы должны быть экранированы (Пример: /users/byPhone/+375%25 => LIKE '+375%')
- один пользователь:
  - **GET** /users/oneByName/:name - Получить пользователя по имени
  - **GET** /users/:id - Получить пользователя по id
- получить все диалоги пользователя
  - **GET** /users/:id/dialogs
- аутентификации пользователя:
  - **POST** /users/auth - Получить токен по имени и паролю  
  ```JSON
  BODY

  {
    "name": "userName",
    "password": "password"
  }
  ```
- добавить нового пользователя:
  - **POST** /users  
  ```JSON
  BODY

  {
    "name": "userName",
    "phone": "+375441234567",
    "picture": "http://placehold.it/100x100",
    "password": "123456",
  }
  ```
- удалить пользователя:
  - **DELETE** /users/:id

### **Диалоги:**
- открыть диалог/получить все сообщения диалога
  - **GET** /dialogs/:id - все сообщения по id выбранного диалога
- получить последнее сообщение для диалога по его id
  - **GET** /dialogs/:id/lastMessage
- создать диалог
  - **POST** /dialogs  
  ```JSON
  BODY

  {
    "userOne": "userOneId",
    "userTwo": "userTwoId"
  }
  ```
- отправить сообщение по id диалога
  - **POST** /dialogs/:id
  ```JSON
  BODY

  {
    "message": "hello, dear",
    "userId": 2 
  }
  ```
  *userId - id пользователя отправителя*
- удалить диалог
  - **DELETE** /dialogs/:id

### **Сообщения**
- обновить сообщение
  - **POST** /messages/:id
  ```JSON
  BODY

  {
    "delivered": true/false,
    "seen": true/false,
    "message": "My new message"
  }
  ```
- удалить сообщение
  - **DELETE** /messages/:id