// Defines the Schema and Model for Product


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    oldprice: { type: Number, required: true },
    currentprice: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0  },
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);


// // Your JSON data
// const products = [
//     {
//         "products": [
//           {
//             "title": "Handmade Wool Pullover",
//             "oldprice": 45.99,
//             "currentprice": 39.99,
//             "description": "A cozy handmade wool pullover, crafted with soft yarn for ultimate comfort and warmth.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829067/Fashion1_zivw50.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handwoven Wool Scarf",
//             "oldprice": 30.0,
//             "currentprice": 25.99,
//             "description": "Soft and warm handwoven wool scarf, available in various colors and patterns.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829054/Fashion2_lfb5sb.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.1,
//               "count": 259
//             }
//           },
//           {
//             "title": "Chunky Knit Infinity Scarf",
//             "oldprice": 35.99,
//             "currentprice": 29.99,
//             "description": "Cozy chunky knit infinity scarf, handmade from premium soft yarn for extra warmth.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829051/Fashion3_la2m9m.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.9,
//               "count": 180
//             }
//           },
//           {
//             "title": "Knitted Cotton Sweater",
//             "oldprice": 55.0,
//             "currentprice": 47.99,
//             "description": "Stylish knitted cotton sweater with a unique handmade pattern, perfect for any season.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829096/Fashion_ro5dhc.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 2.1,
//               "count": 430
//             }
//           },
//           {
//             "title": "Handmade Pullover",
//             "oldprice": 45.99,
//             "currentprice": 39.99,
//             "description": "A cozy handmade pullover, crafted with soft yarn for ultimate comfort and warmth.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829064/Fashion5_sigamq.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Wool Ice Cap",
//             "oldprice": 25.99,
//             "currentprice": 19.99,
//             "description": "Cozy and warm handmade wool ice cap, perfect for winter wear.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829055/Fashion6_t8wvxq.jpg",
//             "quantity": 5,
//             "rating": {
//               "rate": 3.9,
//               "count": 70
//             }
//           },
//           {
//             "title": "Multicolor Patchwork Scarf",
//             "oldprice": 38.99,
//             "currentprice": 32.99,
//             "description": "Unique handmade patchwork scarf, featuring vibrant colors and a stylish design.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829055/Fashion7_pogpxd.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.6,
//               "count": 140
//             }
//           },
//           {
//             "title": "Knitted Cotton Sweater",
//             "oldprice": 55.0,
//             "currentprice": 47.99,
//             "description": "Stylish knitted cotton sweater with a unique handmade pattern, perfect for any season.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829052/Fashion8_r5pz1h.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 3.9,
//               "count": 100
//             }
//           },
//           {
//             "title": "Boho Crochet Fringe Scarf",
//             "oldprice": 40.0,
//             "currentprice": 33.99,
//             "description": "Stylish handmade crochet scarf with a bohemian fringe design, perfect for layering.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829055/Fashion9_puejuq.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handwoven Cashmere Scarf",
//             "oldprice": 50.0,
//             "currentprice": 44.99,
//             "description": "Luxurious handwoven cashmere scarf, soft and lightweight for everyday elegance.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829052/Fashion10_ggjuea.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 3.9,
//               "count": 470
//             }
//           },
//           {
//             "title": "Handmade Wool Pullover",
//             "oldprice": 45.99,
//             "currentprice": 39.99,
//             "description": "A cozy handmade wool pullover, crafted with soft yarn for ultimate comfort and warmth.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829065/Fashion11_he592e.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.8,
//               "count": 319
//             }
//           },
//           {
//             "title": "Handmade Crochet Cardigan",
//             "oldprice": 65.99,
//             "currentprice": 54.99,
//             "description": "Beautiful crochet cardigan made with high-quality yarn, featuring a bohemian design.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829066/Fashion12_cqbbwr.jpg",
//             "quantity": 5,
//             "rating": {
//               "rate": 4.8,
//               "count": 400
//             }
//           },
//           {
//             "title": "Handmade Wool Pullover",
//             "oldprice": 45.99,
//             "currentprice": 39.99,
//             "description": "A cozy handmade wool pullover, crafted with soft yarn for ultimate comfort and warmth.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829068/Fashion13_ombfo8.jpg",
//             "quantity": 7,
//             "rating": {
//               "rate": 2.9,
//               "count": 250
//             }
//           },
//           {
//             "title": "Fingerless Knit Gloves",
//             "oldprice": 19.99,
//             "currentprice": 15.99,
//             "description": "Trendy fingerless knit gloves with a cozy feel, great for casual wear.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829067/Fashion14_kbzo4l.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 1.2,
//               "count": 140
//             }
//           },
//           {
//             "title": "Handmade Wool Ice Cap",
//             "oldprice": 19.99,
//             "currentprice": 15.99,
//             "description": "Warm and cozy handmade wool ice cap, perfect for winter and cold weather.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829050/Fashion15_zmkaee.jpg",
//             "quantity": 8,
//             "rating": {
//               "rate": 2.6,
//               "count": 235
//             }
//           },
//           {
//             "title": "Handwoven Boho Bag",
//             "oldprice": 34.99,
//             "currentprice": 29.99,
//             "description": "A stylish handwoven boho bag made from natural fibers, perfect for everyday use.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829051/Fashion16_qvpqls.jpg",
//             "quantity": 4,
//             "rating": {
//               "rate": 2.9,
//               "count": 340
//             }
//           },
//           {
//             "title": "Handmade Wool Pullover",
//             "oldprice": 45.99,
//             "currentprice": 39.99,
//             "description": "A cozy handmade wool pullover, crafted with soft yarn for ultimate comfort and warmth.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829064/Fashion17_aaqopm.jpg",
//             "quantity": 5,
//             "rating": {
//               "rate": 3.8,
//               "count": 679
//             }
//           },
//           {
//             "title": "Slouchy Handmade Ice Cap",
//             "oldprice": 22.99,
//             "currentprice": 18.99,
//             "description": "Casual and stylish slouchy handmade ice cap with a relaxed fit.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829066/Fashion18_mbuqaa.jpg",
//             "quantity": 9,
//             "rating": {
//               "rate": 4.7,
//               "count": 130
//             }
//           },
//           {
//             "title": "Boho Knit Gloves",
//             "oldprice": 24.99,
//             "currentprice": 19.99,
//             "description": "Stylish boho-inspired handmade knit gloves with unique patterns.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829053/Fashion19_vmqjdh.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.5,
//               "count": 146
//             }
//           },
//           {
//             "title": "Fleece-Lined Crochet Ice Cap",
//             "oldprice": 24.99,
//             "currentprice": 19.99,
//             "description": "Handmade crochet ice cap with soft fleece lining for extra insulation.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829069/Fashion20_xtitno.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 3.6,
//               "count": 145
//             }
//           },
//           {
//             "title": "Rustic Wooden Table",
//             "oldprice": 16.99,
//             "currentprice": 12.99,
//             "description": "A handcrafted rustic wooden table with a sturdy oak finish, ideal for cozy living spaces.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829015/Furniture1_owerqn.jpg",
//             "quantity": 4,
//             "rating": {
//               "rate": 4.7,
//               "count": 150
//             }
//           },
//           {
//             "title": "Velvet Accent Chair",
//             "oldprice": 249.99,
//             "currentprice": 199.99,
//             "description": "A luxurious velvet accent chair with a stylish gold metal frame, ideal for a modern home.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829013/Furniture2_tjefkf.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.6,
//               "count": 160
//             }
//           },
//           {
//             "title": "Ergonomic Chair",
//             "oldprice": 149.99,
//             "currentprice": 129.99,
//             "description": "A comfortable and adjustable office chair with lumbar support, perfect for long working hours.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740828997/Furniture3_hzwnal.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.8,
//               "count": 250
//             }
//           },
//           {
//             "title": "Rustic Wooden Nightstand",
//             "oldprice": 79.99,
//             "currentprice": 59.99,
//             "description": "A charming wooden nightstand with a rustic finish, featuring a spacious drawer and open shelf.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829005/Furniture4_ihntak.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 3.6,
//               "count": 145
//             }
//           },
//           {
//             "title": "Windsor Chair",
//             "oldprice": 120.99,
//             "currentprice": 99.99,
//             "description": "A classic wooden chair with a curved back and spindle supports, perfect for dining rooms.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829014/Furniture5_enowll.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.5,
//               "count": 140
//             }
//           },
//           {
//             "title": "Rocking Chair",
//             "oldprice": 150.0,
//             "currentprice": 129.99,
//             "description": "A comfortable wooden rocking chair with a smooth gliding motion, ideal for relaxation.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829023/Furniture6_rvgr9n.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.7,
//               "count": 200
//             }
//           },
//           {
//             "title": "Adirondack Chair",
//             "oldprice": 130.0,
//             "currentprice": 109.99,
//             "description": "A wide-seated outdoor wooden chair with a slanted back, perfect for gardens and patios.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829022/Furniture7_ioetzm.jpg",
//             "quantity": 5,
//             "rating": {
//               "rate": 4.6,
//               "count": 150
//             }
//           },
//           {
//             "title": "Elegant Bed Frame",
//             "oldprice": 349.99,
//             "currentprice": 299.99,
//             "description": "A sturdy and elegant bed frame made of solid wood with a modern aesthetic.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829022/Furniture8_ulj4i1.jpg",
//             "quantity": 8,
//             "rating": {
//               "rate": 4.6,
//               "count": 190
//             }
//           },
//           {
//             "title": "Bar Stool",
//             "oldprice": 85.0,
//             "currentprice": 69.99,
//             "description": "A stylish wooden bar stool with a high seat, ideal for kitchen counters and home bars.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829012/Furniture9_gtehoe.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.3,
//               "count": 130
//             }
//           },
//           {
//             "title": "Scandinavian Table",
//             "oldprice": 159.99,
//             "currentprice": 139.99,
//             "description": "A Scandinavian-inspired coffee table with a white surface and wooden legs, blending simplicity and function.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829005/Furniture10_ixyr3z.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.4,
//               "count": 170
//             }
//           },
//           {
//             "title": "Wingback Chair",
//             "oldprice": 200.0,
//             "currentprice": 179.99,
//             "description": "An elegant wooden chair with a tall back and cushioned seat, offering comfort and style.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829003/Furniture11_bm481v.jpg",
//             "quantity": 7,
//             "rating": {
//               "rate": 4.9,
//               "count": 220
//             }
//           },
//           {
//             "title": "Adirondack Chair",
//             "oldprice": 130.0,
//             "currentprice": 109.99,
//             "description": "A wide-seated outdoor wooden chair with a slanted back, perfect for gardens and patios.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829024/Furniture12_i8pm9k.jpg",
//             "quantity": 5,
//             "rating": {
//               "rate": 4.6,
//               "count": 150
//             }
//           },
//           {
//             "title": "Antique Mirror",
//             "oldprice": 200.0,
//             "currentprice": 179.99,
//             "description": "A beautifully crafted antique wooden mirror with intricate carvings for a vintage touch.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829021/Furniture13_scepyw.jpg",
//             "quantity": 4,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Hanging Swing Chair",
//             "oldprice": 250.0,
//             "currentprice": 219.99,
//             "description": "A stylish wooden hanging swing chair, perfect for indoor relaxation or garden spaces.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829002/Furniture14_c3gcp6.jpg",
//             "quantity": 5,
//             "rating": {
//               "rate": 4.5,
//               "count": 120
//             }
//           },
//           {
//             "title": "Slat-Back Chair",
//             "oldprice": 95.0,
//             "currentprice": 79.99,
//             "description": "A traditional slat-back wooden chair, great for dining and kitchen settings.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829022/Furniture15_fcpv7j.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 3.6,
//               "count": 145
//             }
//           },
//           {
//             "title": "Bentwood Chair",
//             "oldprice": 140.0,
//             "currentprice": 119.99,
//             "description": "An elegant bentwood chair with a lightweight yet durable design, ideal for modern spaces.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829000/Furniture16_hic5qg.jpg",
//             "quantity": 4,
//             "rating": {
//               "rate": 4.4,
//               "count": 105
//             }
//           },
//           {
//             "title": "Cross-Back Chair",
//             "oldprice": 125.0,
//             "currentprice": 104.99,
//             "description": "A rustic cross-back chair with a sturdy wooden frame, perfect for dining and bistro settings.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829004/Furniture17_trfzpb.jpg",
//             "quantity": 4,
//             "rating": {
//               "rate": 4.6,
//               "count": 95
//             }
//           },
//           {
//             "title": "Wingback Chair",
//             "oldprice": 200.0,
//             "currentprice": 179.99,
//             "description": "A cozy wingback wooden chair with cushioned upholstery, ideal for reading corners.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740828997/Furniture18_wa6ovk.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.8,
//               "count": 130
//             }
//           },
//           {
//             "title": "Hanging Swing Chair",
//             "oldprice": 250.0,
//             "currentprice": 219.99,
//             "description": "A stylish wooden hanging swing chair, perfect for indoor relaxation or garden spaces.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829013/Furniture19_rvb6jg.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 3.6,
//               "count": 145
//             }
//           },
//           {
//             "title": "Vanity Mirror and Chair",
//             "oldprice": 120.0,
//             "currentprice": 99.99,
//             "description": "A stylish vanity mirror with a wooden chair and LED lights, perfect for makeup and grooming.",
//             "categoryId": "67c11684e8a1c3314b82b37c",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829021/Furniture20_raqzxb.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 130
//             }
//           },
//           {
//             "title": "Handmade Beaded Necklace",
//             "oldprice": 24.99,
//             "currentprice": 19.99,
//             "description": "A vibrant, handmade beaded necklace featuring an intricate pattern of colorful beads.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829097/acc1_i9rhxs.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Bohemian Beaded Earrings",
//             "oldprice": 18.99,
//             "currentprice": 14.99,
//             "description": "Beautiful handmade bohemian earrings with colorful beads and a lightweight design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829101/acc2_cjut4h.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Macramé Pendant Necklace",
//             "oldprice": 26.99,
//             "currentprice": 21.99,
//             "description": "A boho-style handmade macramé necklace with a unique handwoven pendant.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829099/acc3_nrwblq.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Minimalist Gold Wire Necklace",
//             "oldprice": 25.99,
//             "currentprice": 20.99,
//             "description": "A sleek and elegant handmade gold wire necklace with a minimalist design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829103/acc4_cgq3oc.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Macramé Hoop Earrings",
//             "oldprice": 22.99,
//             "currentprice": 18.99,
//             "description": "Intricately handwoven macramé hoop earrings with a natural boho aesthetic.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829107/acc5_p56weh.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Resin Flower Earrings",
//             "oldprice": 20.99,
//             "currentprice": 16.99,
//             "description": "Handmade resin earrings featuring delicate pressed flowers for a unique touch.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829094/acc6_h0iazl.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Beaded Bracelet",
//             "oldprice": 18.99,
//             "currentprice": 14.99,
//             "description": "A colorful beaded bracelet made from high-quality glass beads with an adjustable strap.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829100/acc7_vxqvhr.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Minimalist Gold Wire Earrings",
//             "oldprice": 19.99,
//             "currentprice": 15.99,
//             "description": "Elegant handmade gold wire earrings with a simple and modern minimalist design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829101/acc8_bkti7x.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Bohemian Beaded Earrings",
//             "oldprice": 18.99,
//             "currentprice": 14.99,
//             "description": "Beautiful handmade bohemian earrings with colorful beads and a lightweight design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829106/acc9_eguymz.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Minimalist Gold Wire Earrings",
//             "oldprice": 19.99,
//             "currentprice": 15.99,
//             "description": "Elegant handmade gold wire earrings with a simple and modern minimalist design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829101/acc10_islgrf.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Gold Wire Earrings",
//             "oldprice": 19.99,
//             "currentprice": 15.99,
//             "description": "Elegant handmade gold wire earrings with a simple and modern minimalist design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829104/acc11_vnymyr.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Crystal Healing Bracelet",
//             "oldprice": 24.99,
//             "currentprice": 19.99,
//             "description": "A handmade bracelet featuring real healing crystals to promote positive energy and balance.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829104/acc12_rdut3d.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Bohemian Beaded Earrings",
//             "oldprice": 18.99,
//             "currentprice": 14.99,
//             "description": "Beautiful handmade bohemian earrings with colorful beads and a lightweight design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829096/acc13_p3ktgo.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Earrings",
//             "oldprice": 28.99,
//             "currentprice": 22.99,
//             "description": "Beautiful earrings with colorful beads and a lightweight design.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829105/acc14_cdoszq.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Macramé Pendant Necklace",
//             "oldprice": 26.99,
//             "currentprice": 21.99,
//             "description": "A boho-style handmade macramé necklace with a unique handwoven pendant.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829096/acc15_k9m3u6.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Pendant Necklace",
//             "oldprice": 26.99,
//             "currentprice": 21.99,
//             "description": "A boho-style handmade necklace with a unique handwoven pendant.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829100/acc16_btsv65.jpg",
//             "quantity": 3,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Necklace",
//             "oldprice": 26.99,
//             "currentprice": 21.99,
//             "description": "A handmade necklace with a unique handwoven pendant.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829106/acc17_fj9ylc.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Crystal Bracelet",
//             "oldprice": 24.99,
//             "currentprice": 19.99,
//             "description": "A handmade bracelet featuring real healing crystals to promote positive energy and balance.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829098/acc18_yws5aw.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Accessories",
//             "oldprice": 27.99,
//             "currentprice": 19.99,
//             "description": "A handmade bracelet featuring real healing crystals to promote positive energy and balance.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829104/acc19_cffx1b.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Accessories",
//             "oldprice": 25.99,
//             "currentprice": 19.99,
//             "description": "A handmade bracelet featuring real healing crystals to promote positive energy and balance.",
//             "categoryId": 3,
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829103/acc20_bksiwt.jpg",
//             "quantity": 2,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Hand-Painted Ceramic Vase",
//             "oldprice": 45.99,
//             "currentprice": 39.99,
//             "description": "A beautifully hand-painted ceramic vase with intricate floral designs, perfect for home decor.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829081/homeware-1_npl2a5.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Driftwood Candle Holder",
//             "oldprice": 28.99,
//             "currentprice": 22.99,
//             "description": "A unique handmade candle holder crafted from natural driftwood, perfect for rustic and coastal decor.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829080/homeware-2_ivwvac.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Resin Art Coasters (Set of 4)",
//             "oldprice": 32.99,
//             "currentprice": 26.99,
//             "description": "Handmade resin coasters with stunning ocean wave designs, adding an artistic touch to your table.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829078/homeware-3_ujgghj.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Antique Mirror",
//             "oldprice": 200.0,
//             "currentprice": 179.99,
//             "description": "A beautifully crafted antique wooden mirror with intricate carvings for a vintage touch.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829076/homeware-4_llasqj.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "World ball",
//             "oldprice": 500.0,
//             "currentprice": 400.99,
//             "description": "A beautifully crafted antique with intricate carvings for a vintage touch.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829074/homeware-5_gpnx2w.jpg",
//             "quantity": 4,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Driftwood Candle Holder",
//             "oldprice": 28.99,
//             "currentprice": 22.99,
//             "description": "A unique handmade candle holder crafted from natural driftwood, perfect for rustic and coastal decor.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829072/homeware-6_vrjxga.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Ceramic Vase",
//             "oldprice": 34.99,
//             "currentprice": 27.99,
//             "description": "An elegant handmade ceramic vase, decorated with artistic engravings inspired by Eastern heritage, perfect for decorating tables and corners.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829071/homeware-7_c1p8ry.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Vase",
//             "oldprice": 34.99,
//             "currentprice": 27.99,
//             "description": "An handmade vase, decorated with artistic engravings inspired by Eastern heritage, perfect for decorating tables and corners.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829069/homeware-8_hnioc0.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Ceramic Plates",
//             "oldprice": 25.99,
//             "currentprice": 19.99,
//             "description": "A beautifully handcrafted ceramic plate with intricate floral designs, perfect for home decor or serving.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829083/homeware-9_a0dbjz.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Ceramic Coffee Cup Set",
//             "oldprice": 49.99,
//             "currentprice": 39.99,
//             "description": "A handcrafted ceramic coffee cup set, elegantly decorated with oriental patterns. Perfect for serving Arabic or Turkish coffee.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829083/homeware-10_hzpc5t.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Hand-Painted Ceramic Vase",
//             "oldprice": 45.99,
//             "currentprice": 39.99,
//             "description": "A beautifully hand-painted ceramic vase with intricate floral designs, perfect for home decor.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829079/homeware-11_a5f5iv.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Driftwood Candle Holder",
//             "oldprice": 28.99,
//             "currentprice": 22.99,
//             "description": "A unique handmade candle holder crafted from natural driftwood, perfect for rustic and coastal decor.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829078/homeware-12_baqfmz.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Resin Art Coasters (Set of 4)",
//             "oldprice": 32.99,
//             "currentprice": 26.99,
//             "description": "Handmade resin coasters with stunning ocean wave designs, adding an artistic touch to your table.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829076/homeware-13_mskxn4.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Antique Mirror",
//             "oldprice": 200.0,
//             "currentprice": 179.99,
//             "description": "A beautifully crafted antique wooden mirror with intricate carvings for a vintage touch.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829074/homeware-14_ik7qe4.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "World ball",
//             "oldprice": 500.0,
//             "currentprice": 400.99,
//             "description": "A beautifully crafted antique with intricate carvings for a vintage touch.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829072/homeware-15_abi4hj.jpg",
//             "quantity": 4,
//             "rating": {
//               "rate": 4.9,
//               "count": 95
//             }
//           },
//           {
//             "title": "Driftwood Candle Holder",
//             "oldprice": 28.99,
//             "currentprice": 22.99,
//             "description": "A unique handmade candle holder crafted from natural driftwood, perfect for rustic and coastal decor.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829070/homeware-16_elsu41.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Ceramic Vase",
//             "oldprice": 34.99,
//             "currentprice": 27.99,
//             "description": "An elegant handmade ceramic vase, decorated with artistic engravings inspired by Eastern heritage, perfect for decorating tables and corners.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829069/homeware-17_esuq9w.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Vase",
//             "oldprice": 34.99,
//             "currentprice": 27.99,
//             "description": "An handmade vase, decorated with artistic engravings inspired by Eastern heritage, perfect for decorating tables and corners.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829082/homeware-18_mlayxc.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Ceramic Plates",
//             "oldprice": 25.99,
//             "currentprice": 19.99,
//             "description": "A beautifully handcrafted ceramic plate with intricate floral designs, perfect for home decor or serving.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829080/homeware-19_njwwhb.jpg",
//             "quantity": 1,
//             "rating": {
//               "rate": 4.7,
//               "count": 110
//             }
//           },
//           {
//             "title": "Handmade Ceramic Coffee Cup Set",
//             "oldprice": 49.99,
//             "currentprice": 39.99,
//             "description": "A handcrafted ceramic coffee cup set, elegantly decorated with oriental patterns. Perfect for serving Arabic or Turkish coffee.",
//             "categoryId": "67c11684e8a1c3314b82b37e",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829078/homeware-20_flzsxn.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Hand-Painted Canvas Art",
//             "oldprice": 79.99,
//             "currentprice": 64.99,
//             "description": "A stunning handmade canvas painting featuring abstract designs, perfect for modern home decor.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829024/painting-21_y9wgcp.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Canvas Art",
//             "oldprice": 79.99,
//             "currentprice": 64.99,
//             "description": "A stunning handmade canvas painting featuring abstract designs, perfect for modern home decor.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829036/painting-2_rnjwzo.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Hand-Painted Canvas Art",
//             "oldprice": 89.99,
//             "currentprice": 74.99,
//             "description": "A stunning handmade canvas painting featuring abstract designs, perfect for modern home decor.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829032/painting-3_fhzcpo.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Hand-Painted Art",
//             "oldprice": 79.99,
//             "currentprice": 64.99,
//             "description": "A stunning handmade painting featuring abstract designs, perfect for modern home decor.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829030/painting-4_vnn3sf.jpg",
//             "quantity": 5,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Nature Landscape Painting",
//             "oldprice": 89.99,
//             "currentprice": 74.99,
//             "description": "A beautifully detailed nature landscape painting on high-quality canvas, bringing a peaceful vibe to any room.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829029/painting-5_b5aalu.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Boho Minimalist Line Art",
//             "oldprice": 69.99,
//             "currentprice": 54.99,
//             "description": "A unique handmade bohemian-style line art painting on canvas, adding a modern and artistic touch to your space.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829027/painting-6_tf9y0i.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Watercolor Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral watercolor painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829026/painting-7_ufknhz.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Golden Leaf Abstract Painting",
//             "oldprice": 109.99,
//             "currentprice": 89.99,
//             "description": "A luxurious handmade abstract painting featuring golden leaves on a deep-textured background, bringing elegance to your decor.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829037/painting-8_iojcxp.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829035/painting-9_evxya2.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829032/painting-10_f7qrsx.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829030/painting-11_flq1ip.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829028/painting-12_qokhnj.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829026/painting-13_k4jd0g.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829025/painting-14_hz6vf5.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829036/painting-15_cbfhsv.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829034/painting-16_lpyka9.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829031/painting-17_z8pkxe.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829029/painting-18_om8myg.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829028/painting-19_pqmm7d.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           },
//           {
//             "title": "Handmade Floral Painting",
//             "oldprice": 59.99,
//             "currentprice": 45.99,
//             "description": "A delicate handmade floral painting, perfect for brightening up any room with soft and elegant colors.",
//             "categoryId": "67c11684e8a1c3314b82b37f",
//             "image": "https://res.cloudinary.com/dojq1nxqw/image/upload/v1740829026/painting-20_efv2tw.jpg",
//             "quantity": 6,
//             "rating": {
//               "rate": 4.9,
//               "count": 120
//             }
//           }
//         ]
//       }
      
// ];

// const result = await Product.insertMany(products[0].products);
// console.log(`${result.length} documents inserted`);