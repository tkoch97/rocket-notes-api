const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = riquire('../configs/auth.js');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("token inexistente.", 401);
  }
  
  const [, token] = authHeader.split(" ")
  
  try {
    const {sub: user_id} = verify(token, authConfig.jwt.secret);
    
    request.user = {
      id: Number(user_id)
    };
    
    return next()
    
  }catch{
    throw new AppError("JWT token inválido.", 401);
  }
}