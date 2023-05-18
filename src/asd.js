

const AstrologyAPI = require('./asdapi')
const asyncApiCall = async () => {
    const response = await AstrologyAPI.getCompatibility('Austin', '1987-05-21', 'Taylor', '1989-09-27')
    console.log(response.data.data.Compatibility.heading)
    console.log(response.data.data.Compatibility)
}
asyncApiCall()