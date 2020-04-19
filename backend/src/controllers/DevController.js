const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/ParseStringAsArray')

module.exports = {
    async index(require, response) {
        const devs = await Dev.find()

        return response.json(devs)
    },
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body
        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = github_username, avatar_url, bio } = apiResponse.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev)
    },
    async update(request, response) {
        const { github_username, techs, name,bio} = request.body
        let devupdate = await Dev.findOne({ github_username })

        if (devupdate) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            let name = name
            let bio = bio
            let techsArray = parseStringAsArray(techs)

            devupdate = await Dev.update({
               
                name,
                bio,
                techs: techsArray,
            })
        }

        return response.json(dev)
    }
}