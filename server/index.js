import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-steam'

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(
  new Strategy(
    {
      returnURL: process.env.RETURN_URL,
      realm: process.env.REALM,
      apiKey: process.env.API_KEY,
    },
    function (identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier
        return done(null, profile)
      })
    }
  )
)
var app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  })
)

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/login', passport.authenticate('steam'), function (req, res) {
  // The request will be redirected to Steam for authentication, so
  // this function will not be called.
})

app.get(
  '/auth/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('Returning to Steam for authentication')
    console.log(req.user)
    // Successful authentication, redirect home.
    // if (req != null) {
    //   console.log(req)
    //   res.json({ user: req.user })
    // }
    res.json({ user: req.user })
    // res.redirect('/')
  }
)

app.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = {
  path: '/api',
  handler: app,
}
