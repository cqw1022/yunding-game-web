
const mongoose = require('mongoose')
const User = mongoose.model("User")
const UserGoods = mongoose.model("UserGoods")
const UserPet = mongoose.model("UserPet")
const Monster = mongoose.model("Monster")
const Goods = mongoose.model("Goods")
const CombatBeMonster = mongoose.model("CombatBeMonster")
const redis = require('../../game-server/app/helpers/redis')
// exports.getGoods = async (req, res) => {
//     let list = await Goods.find({}, { name: 1, info: 1, _id: 1 })
//     return res.json(list)
// }
exports.getUserInfo = async (req, res) => {
    let uid = req.query.uid
    let myInfo;
    if (!uid) {
        return res.json({ code: 0, msg: "uid error", data: null })
    }
    if (uid && uid.length > 10) {
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


exports.getAllMonster = async (req, res) => {
    let key = "all_monster";
    let old_json = await redis.get(key)
    if (old_json) {
        return res.json({ code: 1, msg: "ok", data: JSON.parse(old_json) })
    }
    let list = await Monster.find().populate("skill")
    await redis.setEx(key, JSON.stringify(list), (60 * 60 * 24))
    return res.json({ code: 1, msg: "ok", data: list })
}

exports.getAllCombatMap = async (req, res) => {
    let key = "all_combat_map";
    let old_json = await redis.get(key)
    if (old_json) {
        return res.json({ code: 1, msg: "ok", data: JSON.parse(old_json) })
    }
    let list = await CombatBeMonster.find({ is_time: { $in: [0, 1] } })
        .populate("monster")
        .populate("must_goods")
        .populate("random_goods")
    await redis.setEx(key, JSON.stringify(list), (60 * 60 * 24))
    return res.json({ code: 1, msg: "ok", data: list })
}