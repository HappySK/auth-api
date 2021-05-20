import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const { SECRET_KEY } = process.env

const fileValidator = (req, res, next) => {
	if (typeof req.file == "undefined")
		return res.status(404).json({ message: "File Not Found" });
	!(
		req.file.mimetype == "image/jpeg" ||
		req.file.mimetype == "image/png" ||
		req.file.mimetype == "image/jpg"
	) && res.status(400).json({ message: "Please  upload an image file" });
	if (req.file.size > 500 * 1024)
		return res
			.status(400)
			.json({ message: "File Size too big. Upload only images with 500kb" });

   const token = req.headers.authorization.split(" ")[1]
   jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if(err) 
         return res.status(400).json({ message : err.message })
      else
      {
         req.user = decodedToken.email
         next();
      }
   })
};

export default fileValidator;
