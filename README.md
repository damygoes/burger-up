# Burger UP!

#### _Ecommerce Website_

Burger UP! is a fullstack ecommerce website that sells various kinds of burger. Customers can visit the website, choose any burger of their liking, add to cart and place an order.

## Tools

The website was built using the following tools and the following reasons:

- **Next JS**: to harness the power of SEO
- **Redux Toolkit**: for easy global state management
- **MongoDB**: for creating and storing the data
- **Toastify**: for easy management of alerts and notifications
- **CSS**: for styling the website

## Challenges

I encountered a lot of challenges while building this website; mostly regarding the backend. Some of the issues I faced include querying and updating the MongoDB database, extracting my MongoDB connection function to a separate file; which didn't work, Next JS compatibilty with some libraries like AOS (Animate On Scroll) amongst others.

## Features under development

The website is current the Minimum Viable Product (MVP) or version with almost all of the frontend implementation done. However, the backend is still under development and some of the backend features that I'm currently developing are: **login and user authentication**, **querying and updating database for admin** and **database creation for signed up customers.**

## Future Improvements

In the future, I would like to optimize the website for SEO, lightweight and efficiency. It would also be nice to migrate to cloud services like Microsoft Azure or Amazon Web Services.

## Development

#### File Structure

```
├── README.md
├── app
│   └── store.js
├── assets
│   ├── burger-wing.png
│   ├── burger1.svg
│   ├── burger3.svg
│   ├── contact.jpg
│   ├── header.png
│   ├── header1.jpg
│   ├── header2.jpg
│   ├── header3.jpg
│   ├── header4.jpg
│   ├── header5.jpg
│   └── logo.svg
├── components
│   ├── burgerCard
│   │   ├── Burgercard.js
│   │   └── Burgercard.module.css
│   ├── footer
│   │   ├── Footer.js
│   │   └── Footer.module.css
│   ├── layout
│   │   ├── Layout.js
│   │   └── Layout.module.css
│   ├── navbar
│   │   ├── Navbar.js
│   │   └── Navbar.module.css
│   └── specialCard
│       ├── Specialcard.js
│       └── Specialcard.module.css
├── features
│   └── cartSlice.js
├── next.config.js
├── package.json
├── pages
│   ├── _app.js
│   ├── api
│   │   ├── create.js
│   │   ├── getburger
│   │   └── updateburger
│   ├── burger
│   │   ├── Burger.module.css
│   │   ├── Burgerdetails.module.css
│   │   ├── [slug].js
│   │   └── index.js
│   ├── cart
│   │   ├── Cart.module.css
│   │   └── index.js
│   ├── contact
│   │   ├── Contact.module.css
│   │   └── index.js
│   ├── create
│   │   ├── Newburger.module.css
│   │   └── index.js
│   ├── getburger
│   │   ├── Getburger.module.css
│   │   └── index.js
│   └── index.js
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── styles
│   ├── Home.module.css
│   └── globals.css
├── utils
│   └── mongodbconnect.js
├── yarn-error.log
└── yarn.lock
```

## Credit

> Big thanks to Adeola Bada for helping out with code revision and backend development. Check out his profile for some awesome projects and inspiration - https://github.com/codeDeeAi

## License

MIT

**Free Software? Hell Yeah!**
