const isAdmin = (req, res, next) => {
    const userRole = req.user.role;
    console.log(userRole);
    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }
  
    next();
  };
  

  export default isAdmin;