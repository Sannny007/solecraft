# SoleCraft Redesign — Progress Tracker

Design system: "sneaker atelier" — deep charcoal bg (#0c0b0a), volt-lime accent (#c8ff3d),
molten-orange accent-2 (#ff5a36), Anton (display) + Manrope (body) fonts, grain texture bg,
shoebox price tags, angled dividers. All tokens in client/src/index.css.

## DONE
- [x] index.html — added Google Fonts (Anton + Manrope)
- [x] index.css — full design token system, animations, .btn-primary/.btn-secondary/.btn-danger,
      .card, .shoe-tag, .input-field, grain background, scrollbar
- [x] App.jsx — removed old gradient, using body bg
- [x] Navbar.jsx — redesigned + FIXED BUG: Cart/My Orders/Login/Register links were all
      pointing to "/" — now correctly point to their routes
- [x] Home.jsx — new hero section + animated product grid with shoebox tags
- [x] Spinner.jsx — themed to new accent color
- [x] Login.jsx — redesigned card form
- [x] Register.jsx — redesigned card form

- [x] Cart.jsx — redesigned + FIXED BUG: was showing `items.name` (undefined) instead of
      `item.name` inside the .map()
- [x] Checkout.jsx — redesigned
- [x] OrderSuccess.jsx — redesigned
- [x] Dashboard.jsx — was a placeholder heading only, now a real quick-links dashboard
- [x] MyOrders.jsx — redesigned
- [x] Configurator.jsx — redesigned UI (3D canvas + mesh/color logic untouched, still
      targets rb1004_rb_r_0 / rb1000_rb_r_0)
- [x] seed.js — added 3 more products (6 total), reusing the 3 existing .glb models with
      new color options since no new 3D assets were provided
- [x] Deployment prep:
      - client/src/redux/api/axios.js now reads `VITE_API_URL` env var instead of hardcoded localhost
      - client/.env + client/.env.example added
      - client/vercel.json added (SPA rewrite rule)
      - server/server.js CORS now restricted via `CLIENT_URL` env var (comma-separated origins)
      - server/.env.example added
- [x] Production build tested locally — `npm run build` succeeds with no errors

## Not done yet (next session if you want to continue)
- [ ] Actually deploy: push to GitHub, connect Vercel (client) + Render (server) + MongoDB Atlas
- [ ] Test responsiveness on a real phone (only tested via build, not visually walked every
      breakpoint on device)
- [ ] Google/Facebook OAuth + real email verification (the feature you asked about earlier —
      still pending, this session focused on the redesign request)

## How to run locally
```
cd server && npm install && npm run dev   # (or: node server.js)
cd client && npm install && npm run dev
```
Run `node server/seed.js` once to (re)populate the 6 products in MongoDB.

## If resuming in a new chat
Tell Claude: "Continue SoleCraft from PROGRESS.md" and re-upload the project zip.
