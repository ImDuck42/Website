const loginsec=document.querySelector('.login-section')
const loginlink=document.querySelector('.login-link')
const registerlink=document.querySelector('.register-link')
registerlink.addEventListener('click',()=>{
    loginsec.classList.add('active')
})
loginlink.addEventListener('click',()=>{
    loginsec.classList.remove('active')
})

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Create a database connection (replace 'your-database-name.db' with your actual database file)
const db = new sqlite3.Database('./database/user_accounts.db');

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Handle POST requests for login
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check the database for the provided email and password
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (row) {
            // User with matching email and password found
            return res.json({ message: 'Login successful' });
        } else {
            // No user found with the provided credentials
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
