const public = require("../model/public")
const {
    cloudinary
} = require('../services/cloudinary')

module.exports = {
    async store(req, res) {
        const {
            owner,
            data,
            type
        } = req.body
        var content = data

        if (type == 0) {
            return
        }

        if (type == 2 && data) {
            const photo = await cloudinary.uploader.upload(data, {
                upload_preset: 'ml_default'
            })
            content = photo.url

        } else if (type == 3 && data) {
            const video = await cloudinary.uploader.upload_large(data, {
                resource_type: 'video',
                chunk_size: 600000
            })
            content = video.url
        }

        const aux = await public.create({
            photo: owner.photo,
            owner: owner.username,
            data: content,
            type: type
        })

        return res.json(aux)
    },

    async searchPosts(req, res) {
        const {
            owner,
            type
        } = req.body

        if(type.length == 0) {
            return res.json(await public.find().sort({
                createdAt: -1
            }))
        }

        if (owner) {
            if (type) {
                const aux = await public.find({
                    owner: owner,
                    type: {
                        $in: type
                    }
                }).sort({
                    createdAt: -1
                })

                if (aux) {
                    return res.json(aux)
                } else {
                    return res.json(1)
                }
            }

            const aux = await public.find({
                owner: owner
            }).sort({
                createdAt: -1
            })

            if (aux) {
                return res.json(aux)
            } else {
                return res.json(1)
            }
        } else if (type) {
            const aux = await public.find({
                type: {
                    $in: type
                }
            }).sort({
                createdAt: -1
            })

            if (aux) {
                return res.json(aux)
            } else {
                return res.json(1)
            }
        } else {
            return res.json(1)
        }
    },

    async showMany(req, res) {
        const aux = await public.find().sort({
            createdAt: -1
        })

        if (!aux) {
            return res.json(1)
        }

        return res.json(aux)
    }
}