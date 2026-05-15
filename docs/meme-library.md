# Meme Library

This project keeps a local Imgflip-derived template library so the runtime app does not call Imgflip, does not need Imgflip credentials, and still works with only `OPENROUTER_API_KEY` configured.

## Import Rules

- Source endpoint: `https://api.imgflip.com/get_memes` with `type=image` and `type=gif`.
- Captioning endpoints are intentionally not used because `/caption_image` requires an Imgflip account and `/caption_gif` is Premium.
- The importer keeps a small private-MVP library, filters obvious politics, violent wording, adult wording, and very large assets, then stores files under `public/memes/imgflip/`.
- The model classifies the finished roast into one local `templateId` and writes a short overlay `caption`; it does not generate meme images.

## Templates

| ID | Name | Media | Size | Tags | Source |
| --- | --- | --- | --- | --- | --- |
| `imgflip-181913649` | Drake Hotline Bling | image | 1200x1200 | generic-copy | [Imgflip](https://imgflip.com/memegenerator/181913649/drake-hotline-bling) |
| `imgflip-87743020` | Two Buttons | image | 600x908 | unclear-cta | [Imgflip](https://imgflip.com/memegenerator/87743020/two-buttons) |
| `imgflip-112126428` | Distracted Boyfriend | image | 1200x800 | visual-chaos | [Imgflip](https://imgflip.com/memegenerator/112126428/distracted-boyfriend) |
| `imgflip-217743513` | UNO Draw 25 Cards | image | 500x494 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/217743513/uno-draw-25-cards) |
| `imgflip-124822590` | Left Exit 12 Off Ramp | image | 804x767 | unclear-cta | [Imgflip](https://imgflip.com/memegenerator/124822590/left-exit-12-off-ramp) |
| `imgflip-252600902` | Always Has Been | image | 960x540 | overpromising | [Imgflip](https://imgflip.com/memegenerator/252600902/always-has-been) |
| `imgflip-131087935` | Running Away Balloon | image | 761x1024 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/131087935/running-away-balloon) |
| `imgflip-135256802` | Epic Handshake | image | 900x645 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/135256802/epic-handshake) |
| `imgflip-131940431` | Gru's Plan | image | 700x449 | generic-copy | [Imgflip](https://imgflip.com/memegenerator/131940431/gru-s-plan) |
| `imgflip-322841258` | Anakin Padme 4 Panel | image | 768x768 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/322841258/anakin-padme-4-panel) |
| `imgflip-4087833` | Waiting Skeleton | image | 298x403 | missing-trust, slow-decision | [Imgflip](https://imgflip.com/memegenerator/4087833/waiting-skeleton) |
| `imgflip-97984` | Disaster Girl | image | 500x375 | overpromising | [Imgflip](https://imgflip.com/memegenerator/97984/disaster-girl) |
| `imgflip-80707627` | Sad Pablo Escobar | image | 720x709 | missing-trust | [Imgflip](https://imgflip.com/memegenerator/80707627/sad-pablo-escobar) |
| `imgflip-91538330` | X, X Everywhere | image | 2118x1440 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/91538330/x-x-everywhere) |
| `imgflip-129242436` | Change My Mind | image | 482x361 | generic-copy | [Imgflip](https://imgflip.com/memegenerator/129242436/change-my-mind) |
| `imgflip-188390779` | Woman Yelling At Cat | image | 680x438 | visual-chaos | [Imgflip](https://imgflip.com/memegenerator/188390779/woman-yelling-at-cat) |
| `imgflip-247375501` | Buff Doge vs. Cheems | image | 937x720 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/247375501/buff-doge-vs-cheems) |
| `imgflip-102156234` | Mocking Spongebob | image | 502x353 | generic-copy | [Imgflip](https://imgflip.com/memegenerator/102156234/mocking-spongebob) |
| `imgflip-93895088` | Expanding Brain | image | 857x1202 | visual-chaos | [Imgflip](https://imgflip.com/memegenerator/93895088/expanding-brain) |
| `imgflip-55311130` | This Is Fine | image | 580x282 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/55311130/this-is-fine) |
| `imgflip-309868304` | Trade Offer | image | 607x794 | unclear-cta, overpromising | [Imgflip](https://imgflip.com/memegenerator/309868304/trade-offer) |
| `imgflip-178591752` | Tuxedo Winnie The Pooh | image | 800x582 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/178591752/tuxedo-winnie-the-pooh) |
| `imgflip-124055727` | Y'all Got Any More Of That | image | 600x471 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/124055727/y-all-got-any-more-of-that) |
| `imgflip-101470` | Ancient Aliens | image | 500x437 | generic-copy | [Imgflip](https://imgflip.com/memegenerator/101470/ancient-aliens) |
| `imgflip-79132341` | Bike Fall | image | 500x680 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/79132341/bike-fall) |
| `imgflip-180190441` | They're The Same Picture | image | 1363x1524 | generic-copy | [Imgflip](https://imgflip.com/memegenerator/180190441/they-re-the-same-picture) |
| `imgflip-148909805` | Monkey Puppet | image | 923x768 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/148909805/monkey-puppet) |
| `imgflip-100777631` | Is This A Pigeon | image | 1587x1425 | unclear-cta | [Imgflip](https://imgflip.com/memegenerator/100777631/is-this-a-pigeon) |
| `imgflip-61579` | One Does Not Simply | image | 568x335 | unclear-cta | [Imgflip](https://imgflip.com/memegenerator/61579/one-does-not-simply) |
| `imgflip-3218037` | This Is Where I'd Put My Trophy If I Had One | image | 300x418 | missing-trust | [Imgflip](https://imgflip.com/memegenerator/3218037/this-is-where-i-d-put-my-trophy-if-i-had-one) |
| `imgflip-427308417` | 0 days without (Lenny, Simpsons) | image | 619x403 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/427308417/0-days-without-lenny-simpsons) |
| `imgflip-505705955` | Absolute Cinema | image | 936x725 | overpromising | [Imgflip](https://imgflip.com/memegenerator/505705955/absolute-cinema) |
| `imgflip-177682295` | You Guys are Getting Paid | image | 520x358 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/177682295/you-guys-are-getting-paid) |
| `imgflip-161865971` | Marked Safe From | image | 618x499 | missing-trust | [Imgflip](https://imgflip.com/memegenerator/161865971/marked-safe-from) |
| `imgflip-195515965` | Clown Applying Makeup | image | 750x798 | visual-chaos | [Imgflip](https://imgflip.com/memegenerator/195515965/clown-applying-makeup) |
| `imgflip-110163934` | I Bet He's Thinking About Other Women | image | 1654x930 | unclear-cta, slow-decision | [Imgflip](https://imgflip.com/memegenerator/110163934/i-bet-he-s-thinking-about-other-women) |
| `imgflip-28251713` | Oprah You Get A | image | 620x465 | overpromising | [Imgflip](https://imgflip.com/memegenerator/28251713/oprah-you-get-a) |
| `imgflip-370867422` | Megamind peeking | image | 540x540 | generic-copy | [Imgflip](https://imgflip.com/memegenerator/370867422/megamind-peeking) |
| `imgflip-67452763` | Squidward window | image | 598x420 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/67452763/squidward-window) |
| `imgflip-1035805` | Boardroom Meeting Suggestion | image | 500x649 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/1035805/boardroom-meeting-suggestion) |
| `imgflip-27813981` | Hide the Pain Harold | image | 480x601 | missing-trust | [Imgflip](https://imgflip.com/memegenerator/27813981/hide-the-pain-harold) |
| `imgflip-84341851` | Evil Kermit | image | 700x325 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/84341851/evil-kermit) |
| `imgflip-226297822` | Panik Kalm Panik | image | 640x881 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/226297822/panik-kalm-panik) |
| `imgflip-119139145` | Blank Nut Button | image | 600x446 | unclear-cta | [Imgflip](https://imgflip.com/memegenerator/119139145/blank-nut-button) |
| `imgflip-61520` | Futurama Fry | image | 552x414 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/61520/futurama-fry) |
| `imgflip-155067746` | Surprised Pikachu | image | 1893x1893 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/155067746/surprised-pikachu) |
| `imgflip-206151308` | Spider Man Triple | image | 600x551 | generic-copy, unclear-cta | [Imgflip](https://imgflip.com/memegenerator/206151308/spider-man-triple) |
| `imgflip-89370399` | Roll Safe Think About It | image | 702x395 | unclear-cta, missing-trust | [Imgflip](https://imgflip.com/memegenerator/89370399/roll-safe-think-about-it) |
| `imgflip-222516354` | Disappearing kid gif | video | 360x360 | slow-decision | [Imgflip](https://imgflip.com/gif-templates/222516354/disappearing-kid-gif) |
| `imgflip-304768047` | talking to wall | video | 640x360 | slow-decision | [Imgflip](https://imgflip.com/gif-templates/304768047/talking-to-wall) |
| `imgflip-511357979` | Confused Monkey | video | 468x498 | slow-decision | [Imgflip](https://imgflip.com/gif-templates/511357979/confused-monkey) |
| `imgflip-367782046` | William Dafoe looking up | video | 498x336 | slow-decision, visual-chaos | [Imgflip](https://imgflip.com/gif-templates/367782046/william-dafoe-looking-up) |
| `imgflip-306216142` | Chef Skinner Reading a Letter | video | 420x236 | missing-trust, slow-decision | [Imgflip](https://imgflip.com/gif-templates/306216142/chef-skinner-reading-a-letter) |
| `imgflip-324040475` | Shrek running | video | 400x224 | slow-decision, visual-chaos | [Imgflip](https://imgflip.com/gif-templates/324040475/shrek-running) |
| `imgflip-628238188` | John Hamm dancing | video | 1080x720 | slow-decision, visual-chaos | [Imgflip](https://imgflip.com/gif-templates/628238188/john-hamm-dancing) |
| `imgflip-565419535` | scream if you love | video | 260x224 | slow-decision, visual-chaos | [Imgflip](https://imgflip.com/gif-templates/565419535/scream-if-you-love) |

## Refreshing

Run:

```bash
pnpm memes:import
```

Review the generated manifest and this document before committing, because Imgflip's popular-template order can change over time.
