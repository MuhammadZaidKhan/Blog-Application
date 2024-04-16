import express from 'express';
import { db, connectToDb } from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!!`);
    } else {
        res.send('That article doesn\'t exist');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send('That article doesn\'t exist!');
    }
});

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})


// import express from 'express';: Yeh line Express framework ko import karti hai, jo Node.js mein web applications banane ke liye istemal hota hai. express ko import keyword se import kiya jata hai.

// import { db, connectToDb } from './db.js';: Yahaan db aur connectToDb functions ko db.js file se import kiya jata hai. Yeh functions MongoDB database ke saath interaction ke liye istemal hote hain.

// const app = express();: Yeh line ek Express application object app banata hai, jo server ke functionalities ko define karta hai.

// app.use(express.json());: Yeh line Express middleware ko add karta hai jo JSON parsing ke liye istemal hota hai. Isse incoming HTTP requests ke JSON bodies ko parse kiya jata hai.

// app.get('/api/articles/:name', async (req, res) => {: Yeh line ek HTTP GET request endpoint ko define karta hai jo /api/articles/:name URL par kaam karta hai. Ye endpoint ek article ka naam lekar uska data retrieve karta hai.

// const { name } = req.params;: Yeh line se HTTP request ke parameters se name ko extract kiya jata hai.

// const article = await db.collection('articles').findOne({ name });: Yeh line MongoDB database se data retrieve karta hai. articles collection se ek specific article ka data name ke basis par retrieve kiya jata hai.

// if (article) { res.json(article); } else { res.sendStatus(404); }: Yeh lines article ke exist hone ya na hone ke basis par appropriate response bhejte hain. Agar article milta hai toh uska JSON response bheja jata hai, agar nahi milta toh 404 status code bhej diya jata hai.







































// import express from 'express';
// // const express = require('express')
// const app = express()

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//     res.send('hello world')
// })

// app.post('/home', (req, res) => {
//     res.send("hello")
// })

// app.get('/desert', (req, res) => {
//     res.send('hello desert')
// })
// app.get('/sand', (req, res) => {
//     res.send('hello sand')
// })
// app.listen(7000, () => {
//     console.log('Server is lisening at http://localhost:7000')
// })