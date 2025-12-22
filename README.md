# Havana Bikes

<img width="1419" alt="Bildschirmfoto 2023-02-20 um 00 03 31" src="https://user-images.githubusercontent.com/53151968/219977847-2cc28467-bc4c-4de9-bc55-80b672f2d0ff.png">

This is a webApp for a bike rental family business in Havana. It enables people who travel to Havana (Cuba) to rent bikes. In this capstone project you can see the MVP (Minimal Viable Product) of this webApp, which has been first developed for small mobile devices (Iphone SE) and will be developed continuously with more functionalities and also for other screen sizes.

## Demo

See the Deployment in Vercel [here](https://havana-bikes.vercel.app/). (Please see it in an Iphone SE)

## Tech Stack

- React 
- Next.js
- Styled Components
- React Hooks
- React Router
- Node.js
- MongoDB Atlas
- Mongoose
- Cloudinary
- Atom
- Jest

## Setup

To run project commands locally, you need to install the dependencies using `npm i` first.

You can then use the following commands:

- `npm run dev` to start the development server
- `npm run build` to create a production build
- `npm run start` to start the production build
- `npm run test` to run the tests in watch mode (if available)

> 💡 This project requires a bundler. You can use `npm run dev` to start the development server. You can then view the project in the browser at `http://localhost:3000`. The Live Preview Extension for Visual Studio Code will **not** work for this project.

## Debugging image issues on Vercel / Cloudinary

If images don't load in production (Vercel) but load locally with mock data, check the following:

- Vercel logs: In your Vercel dashboard, open the deployment and check the server logs for `Image Optimization error` or network errors.
- Cloudinary URLs: verify that `imageSource` values in your DB are full HTTPS URLs (e.g. `https://res.cloudinary.com/...`).
- Next.js domains: confirm `next.config.js` includes all remote image domains under `images.domains` (e.g. `res.cloudinary.com`).
- CORS / hotlink protection: ensure Cloudinary account settings or any CDN rules do not block requests originating from Vercel's hosts.
- Environment on Vercel: set `MONGODB_URI` in Project → Settings → Environment Variables, and optionally set `USE_MOCKS=false` for production.

If you want, I can provide exact Vercel steps or a script to validate image URLs from the DB.

## Seeding the database (dev)

If you recreate the cluster and need example data, run the provided seed script:

1. Ensure `MONGODB_URI` is set in `.env.local`.
2. Run:

```bash
npm run seed
```

This will clear the `bikes` collection and insert three sample bikes with image URLs. Adjust `scripts/seed.js` if you want different data or image sources.
