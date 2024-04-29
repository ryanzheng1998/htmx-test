import { createServer } from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'

const jsx = (
  <html>
    <head>
      <script
        src="https://unpkg.com/htmx.org@1.9.12"
        integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
        crossOrigin="anonymous"
      />
    </head>
    <body>
      <div hx-target="this" hx-swap="outerHTML">
        <div>
          <label>First Name</label>: Joe
        </div>
        <div>
          <label>Last Name</label>: Blow
        </div>
        <div>
          <label>Email</label>: joe@blow.com
        </div>
        <button hx-get="/edit" className="btn btn-primary">
          Click To Edit
        </button>
      </div>
    </body>
  </html>
)

const jsx2 = (
  <form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
    <div>
      <label>First Name</label>
      <input type="text" name="firstName" defaultValue="Joe" />
    </div>
    <div className="form-group">
      <label>Last Name</label>
      <input type="text" name="lastName" defaultValue="Blow" />
    </div>
    <div className="form-group">
      <label>Email Address</label>
      <input type="email" name="email" defaultValue="joe@blow.com" />
    </div>
    <button className="btn">Submit</button>
    <button className="btn" hx-get="/">
      Cancel
    </button>
  </form>
)

const server = createServer(function (req, res) {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(renderToString(jsx))
      res.end()
      break
    case '/edit':
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(renderToString(jsx2))
      res.end()
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('Not Found')
      res.end()
  }
})

server.listen(8080, function () {
  console.log('Server is running on port 8080')
})
