import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'

const generateAuthToken = (rows: any) => {
    // Create token for user and return it
    const userForToken = {
        username: rows[0].username,
        id: rows[0].id
    }

    const token = jwt.sign(userForToken, JWT_SECRET)
    return { token, username: userForToken.username, id: userForToken.id}
}

export default generateAuthToken;