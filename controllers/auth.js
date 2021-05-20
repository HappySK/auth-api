import connection from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

export const signin = (req, res) => {
	const { email, password } = req.body;
	connection.query(
		"SELECT * FROM logs WHERE email = ?",
		[email],
		(err, result) => {
			if (result.length === 1)
				bcrypt.compareSync(password, result[0].password)
					? res.status(200).json({
							message: "Login Successful !",
							token: jwt.sign({ email: email }, SECRET_KEY, {
								expiresIn: "1h",
							}),
					  })
					: res.status(404).json({ message: "Incorrect Password" });
			else res.status(404).json({ message: "No Users Found" });
			err && res.status(400).json({ message: err.sqlMessage });
		}
	);
};

export const signup = (req, res) => {
	const { firstname, lastname, mobileno, email, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 2);
	connection.query(
		"SELECT * FROM logs WHERE email = ?",
		[email],
		(err, result) => {
			if (result.length !== 1) {
				connection.query(
					"INSERT INTO logs(name, mobileno, email, password) VALUES(?, ?, ?, ?)",
					[`${firstname} ${lastname}`, mobileno, email, hashedPassword],
					(err, resultant) => {
						if (err) res.status(400).json({ message: err.sqlMessage });
						if (resultant)
							res.status(200).json({
								message: "Registration Successful",
								token: jwt.sign({ email: email }, SECRET_KEY, {
									expiresIn: "1h",
								}),
							});
					}
				);
			} else
				res
					.status(400)
					.json({ message: "User Already Exists. Kindly Login !" });
		}
	);
};

export const imageUpload = (req, res) => {
	res.json({ message: `Hi ${req.user}, your image has been uploaded successfully` });
};
