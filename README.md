# brymonsoft-messenger-rest-api

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

REST api definition:
-
### **Пользователи:**
- списоĸ пользователей:
  - **GET** /users - Все пользователи
  - **GET** /users/byName/:name - Все пользователи с определенным именем, где **:name** - [mysql паттерн](https://dev.mysql.com/doc/refman/5.7/en/pattern-matching.html)
  - **GET** /users/byPhone/:phone - Все пользователи с определенным номером телефона, где **:phone** - [mysql паттерн](https://dev.mysql.com/doc/refman/5.7/en/pattern-matching.html)
- один пользователь:
  - **GET** /users/oneByName/:name - Получить пользователя по имени
  - **GET** /users/:id - Получить пользователя по id
- аутентификации пользователя:
  - **POST** /users/auth - Получить токен по имени и паролю  
  ```JSON
  {"name": "userName", "password": "password"}
  ```
- добавить нового пользователя:
  - **POST** /users  
  ```JSON
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
- получить все диалоги пользователя
  - **GET** /dialogs/byUser/:id
- открыть диалог/получить все сообщения диалога
  - **GET** /dialogs/:id - все сообщения по id выбранного диалога
- создать диалог
  - **POST** /dialogs
  ```JSON
  {
    "userOne": "userOneId",
    "userTwo": "userTwoId"
  }
  ```
- удалить диалог
 - **DELETE** /dialogs/:id

### **Сообщения**
- получить последнее сообщение для диалога по его id
  - **GET** /dialogs/:id/lastMessage
- получить все сообщения для диалога по его id
  - **GET** /dialogs/:id/messages