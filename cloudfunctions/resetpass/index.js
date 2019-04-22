const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('UsersMess')
    .where({
      tel: "13750009307"
    }).
      update({
        data: {
          password: event.newpass
        },
      })
  } catch (e) {
    console.error(e)
  }
}