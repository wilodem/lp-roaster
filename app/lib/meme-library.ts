export type MemeTag =
  | "unclear-cta"
  | "generic-copy"
  | "missing-trust"
  | "visual-chaos"
  | "overpromising"
  | "slow-decision";

export type MemeMediaType = "image" | "video";

export type MemeTemplate = {
  id: string;
  sourceId: string;
  name: string;
  localPath: string;
  sourceUrl: string;
  sourcePageUrl: string;
  width: number;
  height: number;
  boxCount: number;
  mediaType: MemeMediaType;
  byteSize: number;
  tags: MemeTag[];
};

export const MEME_TEMPLATES = [
  {
    "id": "imgflip-181913649",
    "sourceId": "181913649",
    "name": "Drake Hotline Bling",
    "localPath": "/memes/imgflip/181913649-drake-hotline-bling.jpg",
    "sourceUrl": "https://i.imgflip.com/30b1gx.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/181913649/drake-hotline-bling",
    "width": 1200,
    "height": 1200,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 92771,
    "tags": [
      "generic-copy"
    ]
  },
  {
    "id": "imgflip-87743020",
    "sourceId": "87743020",
    "name": "Two Buttons",
    "localPath": "/memes/imgflip/87743020-two-buttons.jpg",
    "sourceUrl": "https://i.imgflip.com/1g8my4.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/87743020/two-buttons",
    "width": 600,
    "height": 908,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 64963,
    "tags": [
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-112126428",
    "sourceId": "112126428",
    "name": "Distracted Boyfriend",
    "localPath": "/memes/imgflip/112126428-distracted-boyfriend.jpg",
    "sourceUrl": "https://i.imgflip.com/1ur9b0.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/112126428/distracted-boyfriend",
    "width": 1200,
    "height": 800,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 96791,
    "tags": [
      "visual-chaos"
    ]
  },
  {
    "id": "imgflip-217743513",
    "sourceId": "217743513",
    "name": "UNO Draw 25 Cards",
    "localPath": "/memes/imgflip/217743513-uno-draw-25-cards.jpg",
    "sourceUrl": "https://i.imgflip.com/3lmzyx.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/217743513/uno-draw-25-cards",
    "width": 500,
    "height": 494,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 29275,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-124822590",
    "sourceId": "124822590",
    "name": "Left Exit 12 Off Ramp",
    "localPath": "/memes/imgflip/124822590-left-exit-12-off-ramp.jpg",
    "sourceUrl": "https://i.imgflip.com/22bdq6.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/124822590/left-exit-12-off-ramp",
    "width": 804,
    "height": 767,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 64547,
    "tags": [
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-252600902",
    "sourceId": "252600902",
    "name": "Always Has Been",
    "localPath": "/memes/imgflip/252600902-always-has-been.png",
    "sourceUrl": "https://i.imgflip.com/46e43q.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/252600902/always-has-been",
    "width": 960,
    "height": 540,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 429625,
    "tags": [
      "overpromising"
    ]
  },
  {
    "id": "imgflip-131087935",
    "sourceId": "131087935",
    "name": "Running Away Balloon",
    "localPath": "/memes/imgflip/131087935-running-away-balloon.jpg",
    "sourceUrl": "https://i.imgflip.com/261o3j.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/131087935/running-away-balloon",
    "width": 761,
    "height": 1024,
    "boxCount": 5,
    "mediaType": "image",
    "byteSize": 85750,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-135256802",
    "sourceId": "135256802",
    "name": "Epic Handshake",
    "localPath": "/memes/imgflip/135256802-epic-handshake.jpg",
    "sourceUrl": "https://i.imgflip.com/28j0te.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/135256802/epic-handshake",
    "width": 900,
    "height": 645,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 93130,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-131940431",
    "sourceId": "131940431",
    "name": "Gru's Plan",
    "localPath": "/memes/imgflip/131940431-gru-s-plan.jpg",
    "sourceUrl": "https://i.imgflip.com/26jxvz.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/131940431/gru-s-plan",
    "width": 700,
    "height": 449,
    "boxCount": 4,
    "mediaType": "image",
    "byteSize": 47785,
    "tags": [
      "generic-copy"
    ]
  },
  {
    "id": "imgflip-322841258",
    "sourceId": "322841258",
    "name": "Anakin Padme 4 Panel",
    "localPath": "/memes/imgflip/322841258-anakin-padme-4-panel.png",
    "sourceUrl": "https://i.imgflip.com/5c7lwq.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/322841258/anakin-padme-4-panel",
    "width": 768,
    "height": 768,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 780741,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-4087833",
    "sourceId": "4087833",
    "name": "Waiting Skeleton",
    "localPath": "/memes/imgflip/4087833-waiting-skeleton.jpg",
    "sourceUrl": "https://i.imgflip.com/2fm6x.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/4087833/waiting-skeleton",
    "width": 298,
    "height": 403,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 30511,
    "tags": [
      "missing-trust",
      "slow-decision"
    ]
  },
  {
    "id": "imgflip-97984",
    "sourceId": "97984",
    "name": "Disaster Girl",
    "localPath": "/memes/imgflip/97984-disaster-girl.jpg",
    "sourceUrl": "https://i.imgflip.com/23ls.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/97984/disaster-girl",
    "width": 500,
    "height": 375,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 28992,
    "tags": [
      "overpromising"
    ]
  },
  {
    "id": "imgflip-80707627",
    "sourceId": "80707627",
    "name": "Sad Pablo Escobar",
    "localPath": "/memes/imgflip/80707627-sad-pablo-escobar.jpg",
    "sourceUrl": "https://i.imgflip.com/1c1uej.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/80707627/sad-pablo-escobar",
    "width": 720,
    "height": 709,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 50676,
    "tags": [
      "missing-trust"
    ]
  },
  {
    "id": "imgflip-91538330",
    "sourceId": "91538330",
    "name": "X, X Everywhere",
    "localPath": "/memes/imgflip/91538330-x-x-everywhere.jpg",
    "sourceUrl": "https://i.imgflip.com/1ihzfe.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/91538330/x-x-everywhere",
    "width": 2118,
    "height": 1440,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 168696,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-129242436",
    "sourceId": "129242436",
    "name": "Change My Mind",
    "localPath": "/memes/imgflip/129242436-change-my-mind.jpg",
    "sourceUrl": "https://i.imgflip.com/24y43o.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/129242436/change-my-mind",
    "width": 482,
    "height": 361,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 80400,
    "tags": [
      "generic-copy"
    ]
  },
  {
    "id": "imgflip-188390779",
    "sourceId": "188390779",
    "name": "Woman Yelling At Cat",
    "localPath": "/memes/imgflip/188390779-woman-yelling-at-cat.jpg",
    "sourceUrl": "https://i.imgflip.com/345v97.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/188390779/woman-yelling-at-cat",
    "width": 680,
    "height": 438,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 32637,
    "tags": [
      "visual-chaos"
    ]
  },
  {
    "id": "imgflip-247375501",
    "sourceId": "247375501",
    "name": "Buff Doge vs. Cheems",
    "localPath": "/memes/imgflip/247375501-buff-doge-vs-cheems.png",
    "sourceUrl": "https://i.imgflip.com/43a45p.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/247375501/buff-doge-vs-cheems",
    "width": 937,
    "height": 720,
    "boxCount": 4,
    "mediaType": "image",
    "byteSize": 220113,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-102156234",
    "sourceId": "102156234",
    "name": "Mocking Spongebob",
    "localPath": "/memes/imgflip/102156234-mocking-spongebob.jpg",
    "sourceUrl": "https://i.imgflip.com/1otk96.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/102156234/mocking-spongebob",
    "width": 502,
    "height": 353,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 41424,
    "tags": [
      "generic-copy"
    ]
  },
  {
    "id": "imgflip-93895088",
    "sourceId": "93895088",
    "name": "Expanding Brain",
    "localPath": "/memes/imgflip/93895088-expanding-brain.jpg",
    "sourceUrl": "https://i.imgflip.com/1jwhww.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/93895088/expanding-brain",
    "width": 857,
    "height": 1202,
    "boxCount": 4,
    "mediaType": "image",
    "byteSize": 107509,
    "tags": [
      "visual-chaos"
    ]
  },
  {
    "id": "imgflip-55311130",
    "sourceId": "55311130",
    "name": "This Is Fine",
    "localPath": "/memes/imgflip/55311130-this-is-fine.jpg",
    "sourceUrl": "https://i.imgflip.com/wxica.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/55311130/this-is-fine",
    "width": 580,
    "height": 282,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 51090,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-309868304",
    "sourceId": "309868304",
    "name": "Trade Offer",
    "localPath": "/memes/imgflip/309868304-trade-offer.jpg",
    "sourceUrl": "https://i.imgflip.com/54hjww.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/309868304/trade-offer",
    "width": 607,
    "height": 794,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 55139,
    "tags": [
      "unclear-cta",
      "overpromising"
    ]
  },
  {
    "id": "imgflip-178591752",
    "sourceId": "178591752",
    "name": "Tuxedo Winnie The Pooh",
    "localPath": "/memes/imgflip/178591752-tuxedo-winnie-the-pooh.png",
    "sourceUrl": "https://i.imgflip.com/2ybua0.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/178591752/tuxedo-winnie-the-pooh",
    "width": 800,
    "height": 582,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 283334,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-124055727",
    "sourceId": "124055727",
    "name": "Y'all Got Any More Of That",
    "localPath": "/memes/imgflip/124055727-y-all-got-any-more-of-that.jpg",
    "sourceUrl": "https://i.imgflip.com/21uy0f.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/124055727/y-all-got-any-more-of-that",
    "width": 600,
    "height": 471,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 25761,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-101470",
    "sourceId": "101470",
    "name": "Ancient Aliens",
    "localPath": "/memes/imgflip/101470-ancient-aliens.jpg",
    "sourceUrl": "https://i.imgflip.com/26am.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/101470/ancient-aliens",
    "width": 500,
    "height": 437,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 23754,
    "tags": [
      "generic-copy"
    ]
  },
  {
    "id": "imgflip-79132341",
    "sourceId": "79132341",
    "name": "Bike Fall",
    "localPath": "/memes/imgflip/79132341-bike-fall.jpg",
    "sourceUrl": "https://i.imgflip.com/1b42wl.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/79132341/bike-fall",
    "width": 500,
    "height": 680,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 38418,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-180190441",
    "sourceId": "180190441",
    "name": "They're The Same Picture",
    "localPath": "/memes/imgflip/180190441-they-re-the-same-picture.jpg",
    "sourceUrl": "https://i.imgflip.com/2za3u1.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/180190441/they-re-the-same-picture",
    "width": 1363,
    "height": 1524,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 210042,
    "tags": [
      "generic-copy"
    ]
  },
  {
    "id": "imgflip-148909805",
    "sourceId": "148909805",
    "name": "Monkey Puppet",
    "localPath": "/memes/imgflip/148909805-monkey-puppet.jpg",
    "sourceUrl": "https://i.imgflip.com/2gnnjh.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/148909805/monkey-puppet",
    "width": 923,
    "height": 768,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 66826,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-100777631",
    "sourceId": "100777631",
    "name": "Is This A Pigeon",
    "localPath": "/memes/imgflip/100777631-is-this-a-pigeon.jpg",
    "sourceUrl": "https://i.imgflip.com/1o00in.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/100777631/is-this-a-pigeon",
    "width": 1587,
    "height": 1425,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 220315,
    "tags": [
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-61579",
    "sourceId": "61579",
    "name": "One Does Not Simply",
    "localPath": "/memes/imgflip/61579-one-does-not-simply.jpg",
    "sourceUrl": "https://i.imgflip.com/1bij.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/61579/one-does-not-simply",
    "width": 568,
    "height": 335,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 30671,
    "tags": [
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-3218037",
    "sourceId": "3218037",
    "name": "This Is Where I'd Put My Trophy If I Had One",
    "localPath": "/memes/imgflip/3218037-this-is-where-i-d-put-my-trophy-if-i-had-one.jpg",
    "sourceUrl": "https://i.imgflip.com/1wz1x.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/3218037/this-is-where-i-d-put-my-trophy-if-i-had-one",
    "width": 300,
    "height": 418,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 23697,
    "tags": [
      "missing-trust"
    ]
  },
  {
    "id": "imgflip-427308417",
    "sourceId": "427308417",
    "name": "0 days without (Lenny, Simpsons)",
    "localPath": "/memes/imgflip/427308417-0-days-without-lenny-simpsons.png",
    "sourceUrl": "https://i.imgflip.com/72epa9.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/427308417/0-days-without-lenny-simpsons",
    "width": 619,
    "height": 403,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 295996,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-505705955",
    "sourceId": "505705955",
    "name": "Absolute Cinema",
    "localPath": "/memes/imgflip/505705955-absolute-cinema.png",
    "sourceUrl": "https://i.imgflip.com/8d317n.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/505705955/absolute-cinema",
    "width": 936,
    "height": 725,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 405050,
    "tags": [
      "overpromising"
    ]
  },
  {
    "id": "imgflip-177682295",
    "sourceId": "177682295",
    "name": "You Guys are Getting Paid",
    "localPath": "/memes/imgflip/177682295-you-guys-are-getting-paid.png",
    "sourceUrl": "https://i.imgflip.com/2xscjb.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/177682295/you-guys-are-getting-paid",
    "width": 520,
    "height": 358,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 161952,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-161865971",
    "sourceId": "161865971",
    "name": "Marked Safe From",
    "localPath": "/memes/imgflip/161865971-marked-safe-from.jpg",
    "sourceUrl": "https://i.imgflip.com/2odckz.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/161865971/marked-safe-from",
    "width": 618,
    "height": 499,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 14488,
    "tags": [
      "missing-trust"
    ]
  },
  {
    "id": "imgflip-195515965",
    "sourceId": "195515965",
    "name": "Clown Applying Makeup",
    "localPath": "/memes/imgflip/195515965-clown-applying-makeup.jpg",
    "sourceUrl": "https://i.imgflip.com/38el31.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/195515965/clown-applying-makeup",
    "width": 750,
    "height": 798,
    "boxCount": 4,
    "mediaType": "image",
    "byteSize": 211145,
    "tags": [
      "visual-chaos"
    ]
  },
  {
    "id": "imgflip-110163934",
    "sourceId": "110163934",
    "name": "I Bet He's Thinking About Other Women",
    "localPath": "/memes/imgflip/110163934-i-bet-he-s-thinking-about-other-women.jpg",
    "sourceUrl": "https://i.imgflip.com/1tl71a.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/110163934/i-bet-he-s-thinking-about-other-women",
    "width": 1654,
    "height": 930,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 75439,
    "tags": [
      "unclear-cta",
      "slow-decision"
    ]
  },
  {
    "id": "imgflip-28251713",
    "sourceId": "28251713",
    "name": "Oprah You Get A",
    "localPath": "/memes/imgflip/28251713-oprah-you-get-a.jpg",
    "sourceUrl": "https://i.imgflip.com/gtj5t.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/28251713/oprah-you-get-a",
    "width": 620,
    "height": 465,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 25534,
    "tags": [
      "overpromising"
    ]
  },
  {
    "id": "imgflip-370867422",
    "sourceId": "370867422",
    "name": "Megamind peeking",
    "localPath": "/memes/imgflip/370867422-megamind-peeking.png",
    "sourceUrl": "https://i.imgflip.com/64sz4u.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/370867422/megamind-peeking",
    "width": 540,
    "height": 540,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 170503,
    "tags": [
      "generic-copy"
    ]
  },
  {
    "id": "imgflip-67452763",
    "sourceId": "67452763",
    "name": "Squidward window",
    "localPath": "/memes/imgflip/67452763-squidward-window.jpg",
    "sourceUrl": "https://i.imgflip.com/145qvv.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/67452763/squidward-window",
    "width": 598,
    "height": 420,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 32000,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-1035805",
    "sourceId": "1035805",
    "name": "Boardroom Meeting Suggestion",
    "localPath": "/memes/imgflip/1035805-boardroom-meeting-suggestion.jpg",
    "sourceUrl": "https://i.imgflip.com/m78d.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/1035805/boardroom-meeting-suggestion",
    "width": 500,
    "height": 649,
    "boxCount": 4,
    "mediaType": "image",
    "byteSize": 58155,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-27813981",
    "sourceId": "27813981",
    "name": "Hide the Pain Harold",
    "localPath": "/memes/imgflip/27813981-hide-the-pain-harold.jpg",
    "sourceUrl": "https://i.imgflip.com/gk5el.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/27813981/hide-the-pain-harold",
    "width": 480,
    "height": 601,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 30850,
    "tags": [
      "missing-trust"
    ]
  },
  {
    "id": "imgflip-84341851",
    "sourceId": "84341851",
    "name": "Evil Kermit",
    "localPath": "/memes/imgflip/84341851-evil-kermit.jpg",
    "sourceUrl": "https://i.imgflip.com/1e7ql7.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/84341851/evil-kermit",
    "width": 700,
    "height": 325,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 133508,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-226297822",
    "sourceId": "226297822",
    "name": "Panik Kalm Panik",
    "localPath": "/memes/imgflip/226297822-panik-kalm-panik.png",
    "sourceUrl": "https://i.imgflip.com/3qqcim.png",
    "sourcePageUrl": "https://imgflip.com/memegenerator/226297822/panik-kalm-panik",
    "width": 640,
    "height": 881,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 166680,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-119139145",
    "sourceId": "119139145",
    "name": "Blank Nut Button",
    "localPath": "/memes/imgflip/119139145-blank-nut-button.jpg",
    "sourceUrl": "https://i.imgflip.com/1yxkcp.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/119139145/blank-nut-button",
    "width": 600,
    "height": 446,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 15611,
    "tags": [
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-61520",
    "sourceId": "61520",
    "name": "Futurama Fry",
    "localPath": "/memes/imgflip/61520-futurama-fry.jpg",
    "sourceUrl": "https://i.imgflip.com/1bgw.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/61520/futurama-fry",
    "width": 552,
    "height": 414,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 15810,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-155067746",
    "sourceId": "155067746",
    "name": "Surprised Pikachu",
    "localPath": "/memes/imgflip/155067746-surprised-pikachu.jpg",
    "sourceUrl": "https://i.imgflip.com/2kbn1e.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/155067746/surprised-pikachu",
    "width": 1893,
    "height": 1893,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 82736,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-206151308",
    "sourceId": "206151308",
    "name": "Spider Man Triple",
    "localPath": "/memes/imgflip/206151308-spider-man-triple.jpg",
    "sourceUrl": "https://i.imgflip.com/3eqjd8.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/206151308/spider-man-triple",
    "width": 600,
    "height": 551,
    "boxCount": 3,
    "mediaType": "image",
    "byteSize": 65845,
    "tags": [
      "generic-copy",
      "unclear-cta"
    ]
  },
  {
    "id": "imgflip-89370399",
    "sourceId": "89370399",
    "name": "Roll Safe Think About It",
    "localPath": "/memes/imgflip/89370399-roll-safe-think-about-it.jpg",
    "sourceUrl": "https://i.imgflip.com/1h7in3.jpg",
    "sourcePageUrl": "https://imgflip.com/memegenerator/89370399/roll-safe-think-about-it",
    "width": 702,
    "height": 395,
    "boxCount": 2,
    "mediaType": "image",
    "byteSize": 30728,
    "tags": [
      "unclear-cta",
      "missing-trust"
    ]
  },
  {
    "id": "imgflip-222516354",
    "sourceId": "222516354",
    "name": "Disappearing kid gif",
    "localPath": "/memes/imgflip/222516354-disappearing-kid-gif.mp4",
    "sourceUrl": "https://i.imgflip.com/3ohapu.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/222516354/disappearing-kid-gif",
    "width": 360,
    "height": 360,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 111924,
    "tags": [
      "slow-decision"
    ]
  },
  {
    "id": "imgflip-304768047",
    "sourceId": "304768047",
    "name": "talking to wall",
    "localPath": "/memes/imgflip/304768047-talking-to-wall.mp4",
    "sourceUrl": "https://i.imgflip.com/51g8j3.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/304768047/talking-to-wall",
    "width": 640,
    "height": 360,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 707687,
    "tags": [
      "slow-decision"
    ]
  },
  {
    "id": "imgflip-511357979",
    "sourceId": "511357979",
    "name": "Confused Monkey",
    "localPath": "/memes/imgflip/511357979-confused-monkey.mp4",
    "sourceUrl": "https://i.imgflip.com/8gg6cb.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/511357979/confused-monkey",
    "width": 468,
    "height": 498,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 182155,
    "tags": [
      "slow-decision"
    ]
  },
  {
    "id": "imgflip-367782046",
    "sourceId": "367782046",
    "name": "William Dafoe looking up",
    "localPath": "/memes/imgflip/367782046-william-dafoe-looking-up.mp4",
    "sourceUrl": "https://i.imgflip.com/62yufy.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/367782046/william-dafoe-looking-up",
    "width": 498,
    "height": 336,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 41990,
    "tags": [
      "slow-decision",
      "visual-chaos"
    ]
  },
  {
    "id": "imgflip-306216142",
    "sourceId": "306216142",
    "name": "Chef Skinner Reading a Letter",
    "localPath": "/memes/imgflip/306216142-chef-skinner-reading-a-letter.mp4",
    "sourceUrl": "https://i.imgflip.com/52b9vy.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/306216142/chef-skinner-reading-a-letter",
    "width": 420,
    "height": 236,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 168831,
    "tags": [
      "missing-trust",
      "slow-decision"
    ]
  },
  {
    "id": "imgflip-324040475",
    "sourceId": "324040475",
    "name": "Shrek running",
    "localPath": "/memes/imgflip/324040475-shrek-running.mp4",
    "sourceUrl": "https://i.imgflip.com/5cxb8b.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/324040475/shrek-running",
    "width": 400,
    "height": 224,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 245262,
    "tags": [
      "slow-decision",
      "visual-chaos"
    ]
  },
  {
    "id": "imgflip-628238188",
    "sourceId": "628238188",
    "name": "John Hamm dancing",
    "localPath": "/memes/imgflip/628238188-john-hamm-dancing.mp4",
    "sourceUrl": "https://i.imgflip.com/ae1bos.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/628238188/john-hamm-dancing",
    "width": 1080,
    "height": 720,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 1191844,
    "tags": [
      "slow-decision",
      "visual-chaos"
    ]
  },
  {
    "id": "imgflip-565419535",
    "sourceId": "565419535",
    "name": "scream if you love",
    "localPath": "/memes/imgflip/565419535-scream-if-you-love.mp4",
    "sourceUrl": "https://i.imgflip.com/9cmwi7.mp4",
    "sourcePageUrl": "https://imgflip.com/gif-templates/565419535/scream-if-you-love",
    "width": 260,
    "height": 224,
    "boxCount": 1,
    "mediaType": "video",
    "byteSize": 63943,
    "tags": [
      "slow-decision",
      "visual-chaos"
    ]
  }
] satisfies MemeTemplate[];

export const MEME_TEMPLATE_IDS = MEME_TEMPLATES.map((template) => template.id);

export function getMemeTemplate(templateId: string) {
  return MEME_TEMPLATES.find((template) => template.id === templateId) ?? null;
}

export function formatMemeTemplateOptions() {
  return MEME_TEMPLATES.map(
    (template) =>
      `- ${template.id}: ${template.name}; media=${template.mediaType}; tags=${template.tags.join(", ")}`,
  ).join("\n");
}
