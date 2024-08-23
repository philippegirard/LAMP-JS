module.exports = (req, res, next) => {
    /* You can control which HTTP methods are allowed by adding this code:
       allowedMethod = ['GET', 'POST', 'PUT', 'DELETE'];
       if (!allowedMethod.includes(req.method)) {
            return res.status(405).send('Method Not Allowed');
       }
    */

    return res.json({message: `${req.method} request to /api/users`});
};

