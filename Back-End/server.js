
import express from 'express';
// const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/desert', (req, res) => {
    res.send('hello desert')
})
app.get('/sand', (req, res) => {
    res.send('hello sand')
})
app.listen(7000, () => {
    console.log('Server is lisening at http://localhost:7000')
})