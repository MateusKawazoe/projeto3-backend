const user = require("../model/user")
const auth_token = require('../services/auth')
const md5 = require("md5");
const {
	cloudinary
} = require('../services/cloudinary');
const {
	update
} = require("../model/user");

module.exports = {
	async signup(req, res) {
		const {
			foto,
			usuario,
			email,
			senha,
			admin
		} = req.body;
		var photo = ''

		const userExists = await user.findOne({
			usuario
		})

		if (userExists) {
			return res.json(1)
		}

		const emailExists = await user.findOne({
			email: email
		})

		if (emailExists) {
			return res.json(2)
		}

		const token = await auth_token.generateToken({
			usuario: usuario,
			senha: md5(senha + global.SALT_KEY)
		})

		if (foto) {
			photo = await cloudinary.uploader.upload(foto, {
				upload_preset: 'ml_default'
			})
		}

		const aux = await user.create({
			foto: {
				url: photo.url,
				_id: photo.public_id
			},
			usuario: usuario,
			email: email,
			senha: md5(senha + global.SALT_KEY),
			token: token,
			admin: admin
		})

		return res.json(aux)
	},

	async signin(req, res) {
		const {
			usuario,
			senha,
			token
		} = req.body

		const userExists = await user.findOne({
			usuario
		})

		if (!userExists) {
			return res.json(1)
		}

		if (userExists.token) {
			if (userExists.token == token) {
				return res.json(token)
			} else {
				if (userExists.senha == md5(senha + global.SALT_KEY)) {
					var auxToken

					if (token) {
						auxToken = token
					} else {
						auxToken = await auth_token.generateToken({
							usuario: userExists.usuario,
							senha: md5(userExists.senha + global.SALT_KEY)
						})
					}

					await user.updateOne({
						usuario
					}, {
						$set: {
							token: auxToken
						}
					})

					const aux = await user.findOne({ usuario })

					return res.json(aux)
				} else {
					return res.json(2)
				}
			}
		}
	},

	async showAll(req, res) {
		return res.json(await user.find())
	},

	async showOne(req, res) {
		const {
			username
		} = req.body

		const exists = await user.findOne({
			usuario: username
		})

		if (!exists) {
			return res.json(1)
		}

		return res.json(exists)
	},

	async update(req, res) {
		const {
			usuario,
			email,
			foto
		} = req.body

		const exists = await user.findOne({ usuario })

		if(!exists) {
			return res.json(1)
		}

		var equals = {
			email: '',
			foto: {
				url: '',
				_id: ''
			}
		}

		if(foto != exists.foto.url) {
			if(exists.foto.url) {
				await cloudinary.uploader.destroy(exists.foto._id, {
					upload_preset: 'ml_default'
				})
			}
			const aux = await cloudinary.uploader.upload(foto, {
				upload_preset: 'ml_default'
			})
			equals.foto.url = aux.url
			equals.foto._id = aux.public_id
		} else {
			equals.foto._id = 1
		}
 
		if(email != exists.email) {
			equals.email = email
		} else {
			equals.email = exists.email
		}

		if(equals.foto._id == 1) {
			await user.updateOne({
				_id: exists._id
			}, {
				$set: {
					email: equals.email
				}
			})
		} else {
			await user.updateOne({
				_id: exists._id
			}, {
				$set: {
					'foto.url': equals.foto.url,
					'foto._id': equals.foto._id,
					email: equals.email
				}
			})
		}

		const aux = await user.findOne({
			usuario
		})

		return res.json(aux)
	},

	async delete(req, res) {
		const {
			usuario
		} = req.body

		const exists = await user.findOne({
			usuario
		})

		if (!exists) {
			return res.json(1)
		}

		if (exists.foto._id) {
			await cloudinary.uploader.destroy(exists.foto._id, {
				upload_preset: 'ml_default'
			})
		}

		await user.deleteOne({
			usuario
		})

		return res.json(2)
	}
}