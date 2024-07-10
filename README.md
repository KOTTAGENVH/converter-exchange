# Converter Exchange
## Demo Link: 
>
## Hosted Link(Frontend): https://converter-exchange.vercel.app/
>
## Hosted Link(Backend): https://tecsota-assessment.vercel.app/
>
## Desktop View
>![Screenshot 2024-07-10 at 15 26 35](https://github.com/KOTTAGENVH/converter-exchange/assets/87430226/5e228187-9caa-4857-8cf4-c787db7f3904)
>>
>![Screenshot 2024-07-10 at 15 26 58](https://github.com/KOTTAGENVH/converter-exchange/assets/87430226/3d68fb0a-7f7c-49c6-8786-6ab45ede2851)
## Mobile View
>![Screenshot 2024-07-10 at 15 28 11](https://github.com/KOTTAGENVH/converter-exchange/assets/87430226/b8f5ff08-9c73-45a3-b3ef-771770129da6)
>>
>![Screenshot 2024-07-10 at 15 28 38](https://github.com/KOTTAGENVH/converter-exchange/assets/87430226/5ccf4f73-6c57-43e3-807f-9ff3c621f90e)
>>
>![Screenshot 2024-07-10 at 15 28 55](https://github.com/KOTTAGENVH/converter-exchange/assets/87430226/656f4919-2ba1-49ff-baeb-4600b4add84b)
>>
>![Screenshot 2024-07-10 at 15 29 04](https://github.com/KOTTAGENVH/converter-exchange/assets/87430226/b31b268a-aa5b-4615-a187-3599d2bd8dbd)


>Converter Exhange is a small webapplication which could transfer payment to a reciepent registered in the system and also convert based on the exchange rate data provided by ExchangeRate-API.
## Technologies used
- Backend: Node js
- Hashing: Bcrypt js
- Authentication: JWT
- Frontend: Next js
- Styles: Tailwind CSS
- Validation: Yup
- Forms: Formik
- Chart: Material React Table
- Database: Mongo DB(NoSQL)
- Email: Email js

## Project Structure
>
## Frontend
```
CONVERTER-EXCHANGE/
├── README.md
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── converter.png
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   └── components
├── tailwind.config.ts
└── tsconfig.json
```
>
## Backend
```
├── package-lock.json
├── package.json
├── src
│   ├── db.ts
│   ├── index.ts
│   ├── middleware
│   ├── nodemailer
│   ├── transferRecord
│   └── user
├── tsconfig.json
└── vercel.json
```
>
##Instructions
- Clone Repository
```
git clone https://github.com/KOTTAGENVH/converter-exchange
```
- Navigate to backend
  ```
  cd converter-exchange/backend
  ```
- Install Dependencies
```
npm i 
```
- Add environment varaibles
```
database = "Add your mongo db url here"
PORT = 5050
secret = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdmVua290dGFnZUBnbWFpbC5jb20iLCJpZCI6IjY2ODYzNTg3ZmE0NzIyMDdlY2NlZGNhYSIsImlhdCI6MTcyMDExNzAxNywiZXhwIjoxNzIwMTUzMDE3fQ.c85vb8djYTs3C6kMrCCpHGHqtLR-NO_5ZgeH8FfgGwk
refreshtoken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdmVua290dGFnZUBnbWFpbC5jb20iLCJpZCI6IjY2ODYzNTg3ZmE0NzIyMDdlY2NlZGNhYSIsImlhdCI6MTcyMDExNzAxNywiZXhwIjoxNzIwMTIwNjE3fQ.3RTL8FTGbIfWbf_oTt71lPtWNm8_qekRafGXTwCFY8s
emailPass = Add your gmail third part access token here
email = Add you email here
```
- Run
```
npm run dev
```
- Navigate to backend
  ```
  cd converter-exchange/backend
  ```
- Install Dependencies
```
npm i 
```
- Add environment varaibles
```
database = "Add your mongo db url here"
PORT = 5050
secret = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdmVua290dGFnZUBnbWFpbC5jb20iLCJpZCI6IjY2ODYzNTg3ZmE0NzIyMDdlY2NlZGNhYSIsImlhdCI6MTcyMDExNzAxNywiZXhwIjoxNzIwMTUzMDE3fQ.c85vb8djYTs3C6kMrCCpHGHqtLR-NO_5ZgeH8FfgGwk
refreshtoken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdmVua290dGFnZUBnbWFpbC5jb20iLCJpZCI6IjY2ODYzNTg3ZmE0NzIyMDdlY2NlZGNhYSIsImlhdCI6MTcyMDExNzAxNywiZXhwIjoxNzIwMTIwNjE3fQ.3RTL8FTGbIfWbf_oTt71lPtWNm8_qekRafGXTwCFY8s
emailPass = Add your gmail third part access token here
email = Add you email here
```
- Run
```
npm run dev
```
- Navigate to frontend 
  ```
  cd converter-exchange/frontend/converter-exchange
  ```
- Install Dependencies
```
npm i 
```
- Run
```
npm run dev
```



