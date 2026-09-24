import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded;
        next()

    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}
export const adminonly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" })
    }
    next()
}
