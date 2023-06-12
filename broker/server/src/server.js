'use strict'

const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const memoryStore = require('memorystore');
const session = require('express-session');
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000'
};


/* --- configuring express server --- */
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

/* session */
const MemoryStore = memoryStore(session);
app.use(
  session({
    secret: 'secret123',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 86400000,
      httpOnly: true, // Ensure to not expose session cookies to clientside scripts
    },
    store: new MemoryStore({
      checkPeriod: 86_400_000, // prune expired entries every 24h
    }),
  }),
);

 
/* --- configuring express routes --- */
const adminRouter = require('./routers/adminRouter.js');
const accessRouter = require('./routers/accessRouter.js');
const registerRouter = require('./routers/registerRouter.js');
const proxyRouter = require('./routers/proxyRouter.js');

app.use('/admin', adminRouter);
app.use('/auth', accessRouter);
app.use('/register', registerRouter);
app.use('/proxy', proxyRouter);

/* --- starting the server --- */
const port = 3001;
app.listen(port, () => {
  console.log(`🚀 SecuriTeam Broker (server) is now running at http://localhost:${port}`);
});