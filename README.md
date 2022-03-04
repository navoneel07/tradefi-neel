# TradeFi take home text - Navoneel

## 0. Important Notes

- Please enter valid dates when creating new shipment/slot (no input validation right now).
- Please don't enter duplicate Sot Number/ Shipment Number.
- Please enter all details while creating new shipment/slot.

## 1. Tech Stack

The following main technologies have been used:

- MongoDb
- Express
- React
- Nodejs
- Mongoose

## 2. Folder Structure

### tradefi-neel

- [backend/](./tradefi-neel/backend)
  - [models/](./tradefi-neel/backend/models)
    - [shipments.model.js](./tradefi-neel/backend/models/shipments.model.js)
    - [slots.model.js](./tradefi-neel/backend/models/slots.model.js)
  - [routes/](./tradefi-neel/backend/routes)
    - [shipment.js](./tradefi-neel/backend/routes/shipment.js)
    - [slots.js](./tradefi-neel/backend/routes/slots.js)
    - [users.js](./tradefi-neel/backend/routes/users.js)
  - [.env](./tradefi-neel/backend/.env)
  - [app.js](./tradefi-neel/backend/app.js)
  - [package-lock.json](./tradefi-neel/backend/package-lock.json)
  - [package.json](./tradefi-neel/backend/package.json)
- [frontend/](./tradefi-neel/frontend)
  - [public/](./tradefi-neel/frontend/public)
    - [favicon.ico](./tradefi-neel/frontend/public/favicon.ico)
    - [index.html](./tradefi-neel/frontend/public/index.html)
    - [logo192.png](./tradefi-neel/frontend/public/logo192.png)
    - [logo512.png](./tradefi-neel/frontend/public/logo512.png)
    - [manifest.json](./tradefi-neel/frontend/public/manifest.json)
    - [robots.txt](./tradefi-neel/frontend/public/robots.txt)
  - [src/](./tradefi-neel/frontend/src)
    - [components/](./tradefi-neel/frontend/src/components)
      - [Alert.js](./tradefi-neel/frontend/src/components/Alert.js)
      - [Book.js](./tradefi-neel/frontend/src/components/Book.js)
      - [CreateShipment.js](./tradefi-neel/frontend/src/components/CreateShipment.js)
      - [CreateSlot.js](./tradefi-neel/frontend/src/components/CreateSlot.js)
      - [Login.js](./tradefi-neel/frontend/src/components/Login.js)
      - [LoginForm.js](./tradefi-neel/frontend/src/components/LoginForm.js)
      - [Shipment.js](./tradefi-neel/frontend/src/components/Shipment.js)
      - [Slot.js](./tradefi-neel/frontend/src/components/Slot.js)
    - [constants/](./tradefi-neel/frontend/src/constants)
      - [countries.js](./tradefi-neel/frontend/src/constants/countries.js)
    - [App.css](./tradefi-neel/frontend/src/App.css)
    - [App.js](./tradefi-neel/frontend/src/App.js)
    - [App.test.js](./tradefi-neel/frontend/src/App.test.js)
    - [index.css](./tradefi-neel/frontend/src/index.css)
    - [index.js](./tradefi-neel/frontend/src/index.js)
    - [reportWebVitals.js](./tradefi-neel/frontend/src/reportWebVitals.js)
    - [setupTests.js](./tradefi-neel/frontend/src/setupTests.js)
  - [.gitignore](./tradefi-neel/frontend/.gitignore)
  - [package-lock.json](./tradefi-neel/frontend/package-lock.json)
  - [package.json](./tradefi-neel/frontend/package.json)
- [.gitignore](./tradefi-neel/.gitignore)
- [readme.md](./tradefi-neel/readme.md)

## 3. How to use locally

- Navigate to `tradefi/backend` and start server with `nodemon`
- In a seperaate terminal window, navigate to `tradefi/frontend` and start the server with `npm start`
- Login with email: `gregoria.miller30@ethereal.email`. This has been set up to test the mailing service. Password can be anything as no auth.
- To use the app:
  - Create new slots and shipments
  - Select the shipment you want to book a slot for from the right-hand side drop down
  - Find the slot you want to book for the selected shipment
  - Click on the book button
- To view the email sent, navigate to the terminal which has the backend running. A preview link should be available there. No real email is sent in this, and ethereal.email is used for email testing.

## 4. Libraries/Modules used

Following are the main libraries/modules used:

- MUI React
- axios
- react-router-dom
- date-fns
- cors
- dotenv
- express
- mongoose
- nodemailer

## 5. API Documentation

#### Get All Slots

```http
  GET http://localhost:5000/slots/get-slots
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
|           | `string` | Get all slots |

#### Create Slot

```http
  POST http://localhost:5000/slots/create-slot
```

| Parameter | Type     | Description       |
| :-------- | :------- | :---------------- |
|           | `string` | Create a new slot |

#### Book Slot

```http
  POST http://localhost:5000/slots/book-slot
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
|           | `string` | Book a slot |

#### Get shipments

```http
  GET http://localhost:5000/shipments/get-shipments
```

| Parameter | Type     | Description       |
| :-------- | :------- | :---------------- |
|           | `string` | Get all shipments |

#### Create new shipments

```http
  GET http://localhost:5000/shipments/create-shipment
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
|           | `string` | Create a new shipment |

## 5. Recommendations

- Adding authentication
- Adding input validation
- Adding proper alerts
- Ability to logout (not added as login is dummy)
- Adding filter that gets slots by date range
- Adding user page to see previous activity (slots booked)
- Adding filter to see all slots (booked/available)
