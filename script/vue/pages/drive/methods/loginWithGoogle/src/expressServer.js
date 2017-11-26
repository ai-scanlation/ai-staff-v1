const app = require('express')();
app.get('/auth', (req, res) => {
    res.send('<script>window.close()</script>');
    process.send(req.query.code);
    process.exit(1);
});
app.listen(3000);