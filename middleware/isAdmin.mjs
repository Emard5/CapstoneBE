export const isAdmin = (req, res, next) => {
  try {
    // req.user must be populated by verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: admins only" });
    }

    next();
  } catch (err) {
    next(err);
  }
};
