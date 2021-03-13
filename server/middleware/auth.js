import jwt from 'jsonwebtoken'

  

 export function auth(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access denied");

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
