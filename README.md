# Perfume Shop: React storefront (v1)

The first version of an e-commerce front end for a perfume shop, built with React: catalog, categories, product pages, favourites, cart, checkout, user accounts and an admin dashboard.

> 2024 project, kept as an archive. The later, more complete version is [`reactreact-ahmed1`](https://github.com/Lallo7/reactreact-ahmed1).

## Features

- **Shop**: hero, popular products, category pages and search
- **Product pages**: details, rating, related products, favourite button
- **Concentration guide** explaining perfume strengths
- **Cart and checkout**
- **Accounts**: sign up, log in, user dashboard with order history
- **Admin dashboard**: separate admin login, product review, new admin users

## Stack

React 18 · React Router · Axios · js-cookie · Create React App

## Run it locally

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build in build/
```

The app expects a separate backend API; set its address in the API calls under `src/`. See `How_to_Run_Project.pdf` for the full setup.
