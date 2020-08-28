
const mongoose = require('mongoose')
const User = mongoose.model("User")
const UserGoods = mongoose.model("UserGoods")
const UserPet = mongoose.model("UserPet")

exports.getUserInfo = async (req, res) => {
    let uid = req.query.uid
    let myInfo;
    if (uid.length > 10) {
        myInfo = await User.findById(uid)
    } else {
        myInfo = await User.findOne({ nickname: uid })
        uid = myInfo._id
    }
    let [userEqs, userPet] = await Promise.all([UserGoods.find({ status: 0, user: uid, eq_status: 1 }).populate("skill").populate("equipment").sort({ eq_type: 1 }),
    UserPet.find({ user: uid }).populate("skill")])//在地图中显示  1是 0否
    let obj = {
        ...myInfo.rankInfo
    }
    for (const ueq of userEqs) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (ueq[key] && !["_id", "race_type"].includes(key)) {
                    obj[key] = parseInt(obj[key]) + parseInt(ueq[key])
                }
            }
        }
    }
    return res.json({ code: 1, msg: "ok", data: { info: obj, userEqs, userPet } })
}
