# MERN Bus Booking

## Backend database setup

1. Copy env template:
```powershell
cd backend
copy .env.example .env
```

2. Update `backend/.env`:
- `MONGO_URI` -> your MongoDB URI (local or Atlas)
- `JWT_SECRET` -> any secure random string

3. Seed users, buses and sample bookings:
```powershell
npm install
npm run seed
```

This creates:
- `40` buses with route, fare, time, type and seats
- admin user: `admin@busbooker.com` / `Admin@123`
- demo user: `user@busbooker.com` / `User@123`
- sample bookings for the demo user

4. Start backend:
```powershell
npm run dev
```

## Frontend

```powershell
cd ../frontend
npm install
npm start
```

If needed, set `REACT_APP_API_URL` for a custom backend URL.
