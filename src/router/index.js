let express = require('express');
let router = express.Router();
const UsersDB = require('../models/user')
router.get('/', (req, res) => {
    res.render('index');
})
router.get('/dich-vu-bao-ve-nick-facebook', (req, res) => {
    res.render('AccountSecurityService');
})
router.get('/tang-follow-facebook-tang-sub-facebook', (req, res) => {
    res.render('buffsFollowAndSub')
})
router.get('/tang-like-fanpage-facebook', (req, res) => {
    res.render('BuffsLikePage')
})
router.get('/mua-fanpage-facebook-gia-re', (req, res) => {
    res.render('BuyPagesPriceCheap')
})
router.get('/mua-fanpage-tich-xanh-facebook-gia-re', (req, res) => {
    res.render('BuyPagesGreenArea')
})
router.get('/dich-vu-rip-nick-khoa-nick-facebook', (req, res) => {
    res.render('ServiceBlockFace')
})
router.get('/cach-loc-ban-be-khong-tuong-tac-facebook', (req, res) => {
    res.render('FilterFriends')
})
router.get('/tang-like', (req, res) => {
    res.render('BuffsLikes')
})
router.get('/tang-seeding-bai-viet-facebook', (req, res) => {
    res.render('BuffsSeedingPostsFage')
})
router.get('/tang-nguoi-xem-livestream-facebook', (req, res) => {
    res.render('BuffsViewerFage')
})
router.get('/tang-view-youtube-mua-view-youtube', (req, res) => {
    res.render('BuffsViewYoutube')
})
router.get('/tang-sub-youtube-mua-sub-youtube', (req, res) => {
    res.render('BuffsSubYoutube')
})
router.get('/tang-4000-gio-xem-video-youtube', (req, res) => {
    res.render('Buffs4000ViewerYoutube')
})
router.get('/mua-kenh-youtube-da-bat-kiem-tien', (req, res) => {
    res.render('BuyChannelsYoutubeMoney')
})
router.get('/tang-comment-binh-luan-youtube', (req, res) => {
    res.render('BuffsCmtYoutube')
})
router.get('/dich-vu-tang-like-youtube', (req, res) => {
    res.render('ServiceBuffsLikeYoutube')
})
router.get('/tang-follow-instagram', (req, res) => {
    res.render('ServiceBuffsFollowInsta')
})
router.get('/tang-like-instagram', (req, res) => {
    res.render('BuffsLikeInsta')
})
router.get('/tang-view-video-instagram', (req, res) => {
    res.render('BuffsViewInsta')
})
router.get('/tang-follow-tiktok', (req, res) => {
    res.render('BuffsFollowTiktok')
})
router.get('/tang-view-tik-tok', (req, res) => {
    res.render('BuffsViewTiktok')
})
router.get('/tang-like-tym-tik-tok', (req, res) => {
    res.render('BuffsLikeTiktok')
})
router.get('/mua-nick-tik-tok-2', (req, res) => {
    res.render('BuyAccTiktok')
})
router.get('/tich-xanh-tik-tok', (req, res) => {
    res.render('GreenTiktok')
})
router.get('/tang-mat-xem-live-stream-tik-tok', (req, res) => {
    res.render('BuffsViewerStramTiktok')
})
router.get('/chay-quang-cao-tik-tok', (req, res) => {
    res.render('MarketingTiktok')
})
router.get('/tang-follow-shopee', (req, res) => {
    res.render('BuffsFollowShopee')
})
router.get('/tang-mat-xem-livestream-shopee', (req, res) => {
    res.render('BuffsViewerStreamShopee')
})

router.get('/testmysql', async (req, res) => {
    const result =await UsersDB.findAll()
    console.log(result)
})
module.exports = router;
