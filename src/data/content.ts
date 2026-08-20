/* ─── scroll-scrub videos ─── */
/* 720p first (cheaper to seek-decode), 1080p fallback */
export const VIDEO1_SRCS = [
  'https://videos.pexels.com/video-files/6073401/6073401-hd_1280_720_25fps.mp4',
  'https://videos.pexels.com/video-files/6073401/6073401-hd_1920_1080_25fps.mp4',
];
export const VIDEO1_POSTER =
  'https://images.pexels.com/videos/6073401/aerial-footage-beach-beach-sunset-beautiful-sunset-6073401.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200';

export const VIDEO2_SRCS = [
  'https://videos.pexels.com/video-files/35371141/14986646_1920_1080_30fps.mp4',
];
export const VIDEO2_POSTER =
  'https://images.pexels.com/videos/35371141/pexels-photo-35371141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200';

/* Kitchen — fish grilling over charcoal (1080p, 10s). The catch meets the coals.
   BBQ close-up kept as fallback. Light files → capture never stalls. */
export const VIDEO3_SRCS = [
  'https://videos.pexels.com/video-files/11801343/11801343-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/8477263/8477263-hd_1920_1080_24fps.mp4',
];
export const VIDEO3_POSTER =
  'https://images.pexels.com/videos/11801343/asia-asian-bbq-cooking-11801343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200';

/* Bar — bartender preparing a cocktail (1080p, 10s — shorter = fewer frames,
   smaller file, faster capture). The shaking clip is the fallback. */
export const VIDEO4_SRCS = [
  'https://videos.pexels.com/video-files/28931116/12520521_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/28931125/12520456_1920_1080_24fps.mp4',
];
export const VIDEO4_POSTER =
  'https://images.pexels.com/videos/28931116/pexels-photo-28931116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200';

/* ─── photography ─── */
export const IMG = {
  aerial: 'https://images.pexels.com/photos/18936488/pexels-photo-18936488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  pool: 'https://images.pexels.com/photos/29289153/pexels-photo-29289153.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  poolLounge: 'https://images.pexels.com/photos/35236021/pexels-photo-35236021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  dining1: 'https://images.pexels.com/photos/36870866/pexels-photo-36870866.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  dining2: 'https://images.pexels.com/photos/35382686/pexels-photo-35382686.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  dining3: 'https://images.pexels.com/photos/15146940/pexels-photo-15146940.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  suite: 'https://images.pexels.com/photos/27626174/pexels-photo-27626174.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  suiteView: 'https://images.pexels.com/photos/14025909/pexels-photo-14025909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  corporate: 'https://images.pexels.com/photos/14851464/pexels-photo-14851464.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  spa: 'https://images.pexels.com/photos/37719548/pexels-photo-37719548.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  sunset: 'https://images.pexels.com/photos/12446345/pexels-photo-12446345.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  beach: 'https://images.pexels.com/photos/18915964/pexels-photo-18915964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  teens: 'https://images.pexels.com/photos/1197373/pexels-photo-1197373.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
};

export const CONTACT = {
  phone: '09458450205',
  phoneHref: 'tel:+639458450205',
  facebook: 'Sea Guinon',
  facebookHref: 'https://www.facebook.com/search/top?q=Sea%20Guinon',
  address1: 'Zone 7 Taragonna Street',
  address2: 'Brgy. Poblacion District 3',
  address3: 'Macarthur, Leyte, Philippines',
  checkIn: '1:00 PM',
  checkOut: '11:00 AM',
};

export const NAV_LINKS = [
  { label: 'The Resort', to: '/resort' },
  { label: 'Dining', to: '/dining' },
  { label: 'Rates', to: '/packages' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
];

/* ─── resort: spec moments (count-up) ─── */
export const SPECS = [
  { to: 3, suffix: '', label: 'room types — standard, family, barkada' },
  { to: 24, suffix: '', label: 'pax in the barkada room for the whole barkada' },
  { to: 4, suffix: '', label: 'cottage setups, seaside to gazebo' },
  { to: 150, suffix: '', label: 'PHP adult entrance, pool included' },
];

/* ─── resort: amenities for the pinned column ─── */
export const AMENITIES = [
  { n: '01', name: 'The Beach', copy: 'Two hundred forty meters of sand that stays empty. Kayaks, paddleboards, and snorkel gear live in the shed — take them, rinse them, done.' },
  { n: '02', name: 'The Pool', copy: 'A 30-meter infinity edge that dissolves into the horizon, two waterslides into the deep end, and the shallow cove pool for small humans.' },
  { n: '03', name: 'The Spa', copy: 'Open-air tables under the palms. Hilot massage with coconut oil pressed two villages over. Book the sunset slot — it goes first.' },
  { n: '04', name: 'The Adventure Shed', copy: 'Surf school every morning at 9. Island hikes, night snorkels, and the bonfire kit. Teenagers are supervised; adults barely are.' },
  { n: '05', name: 'The Rooms', copy: 'Hardwood, linen, and a veranda wide enough for two chairs and one long view. No TVs. The water is the screen.' },
];

/* ─── dining: tonight's menu (changes daily), grouped ─── */
export const MENU_GROUPS = [
  {
    group: 'Raw & Cold',
    note: 'never travels further than the morning it was caught',
    dishes: [
      { name: 'Kinilaw na Tanigue', note: 'spanish mackerel, calamansi, coconut cream, bird\u2019s eye chili', price: '₱520', tag: '' },
      { name: 'Oysters, Half Dozen', note: 'calamansi mignonette, crushed ice, sea lettuce', price: '₱680', tag: '' },
      { name: 'Tuna Tartare', note: 'yellowfin, green mango, chili, sesame, grilled pandesal', price: '₱640', tag: '' },
    ],
  },
  {
    group: 'From the Fire',
    note: 'coconut-husk charcoal, ten steps from the tide line',
    dishes: [
      { name: 'Grilled Lapu-lapu', note: 'whole grouper, coconut vinegar, sea grapes, charred lime', price: '₱980', tag: 'the classic' },
      { name: 'Half Lobster', note: 'coconut butter, garlic, grilled over the shell', price: '₱1,450', tag: '' },
      { name: 'Garlic-Butter Prawns', note: 'sizzling plate, calamansi, rice on the side', price: '₱820', tag: '' },
      { name: 'Charred Squid', note: 'cane vinegar, pickled papaya, chili oil', price: '₱560', tag: '' },
    ],
  },
  {
    group: 'Long & Slow',
    note: 'the kitchen\u2019s patience, on your plate',
    dishes: [
      { name: '12-Hour Pork Belly', note: 'calamansi glaze, charred pineapple, crispy rice', price: '₱720', tag: '' },
      { name: 'Chicken Inasal', note: 'annatto marinade, lemongrass, garlic-vinegar dip', price: '₱580', tag: '' },
      { name: 'Sinigang na Hipon', note: 'river prawns, sour tamarind broth, farm water spinach', price: '₱640', tag: '' },
      { name: 'The Seafood Platter', note: 'whatever the boats brought — oysters, prawns, tuna, grilled to order', price: '₱2,400', tag: 'for two' },
    ],
  },
  {
    group: 'Sweet',
    note: 'small, sharp, and mostly citrus',
    dishes: [
      { name: 'Calamansi Tart', note: 'torched meringue, coconut sorbet, cacao nib', price: '₱380', tag: '' },
      { name: 'Turon', note: 'caramelized banana, jackfruit, brown-butter ice cream', price: '₱320', tag: '' },
      { name: 'Coconut Sorbet', note: 'buko, toasted flakes, a little sea salt', price: '₱280', tag: '' },
    ],
  },
];

export const DRINKS = [
  { name: 'Lambanog Sour', note: 'coconut spirit, calamansi, palm sugar, egg white', price: '₱380' },
  { name: 'Calamansi Spritz', note: 'prosecco, calamansi, basil from the garden', price: '₱340' },
  { name: 'House Rum Punch', note: 'aged local rum, pineapple, nutmeg — the sunset one', price: '₱420' },
  { name: 'Buko Cold Brew', note: 'coconut water, 18-hour brew, coconut cream', price: '₱280' },
  { name: 'San Miguel, Frost Cold', note: 'exactly what it says on the bottle', price: '₱180' },
  { name: 'Fresh from the Trees', note: 'buko juice, watermelon, mango — ask what\u2019s ripe', price: '₱160' },
];

export const TASTING = {
  name: 'The Guinon Table',
  courses: 7,
  price: '₱3,200',
  per: 'per person',
  pairing: 'wine pairing +₱1,800',
  note: 'Seven courses from the morning catch, decided at 07:00 and gone by 23:00. Whole table only — seatings at 18:00 and 20:30.',
};

/* ─── resort: activities ─── */
export const ACTIVITIES = [
  {
    n: 'A',
    name: 'ATV Trail Rides',
    meta: '45 min · ₱1,200 · ages 12+',
    copy: 'A loop over the ridge and through the coconut farm, ending at the viewpoint above the bay. Helmets, gloves, and a guide on every ride.',
    img: 'https://images.pexels.com/photos/26568791/pexels-photo-26568791.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    n: 'B',
    name: 'Jet Skis',
    meta: '20 min · ₱1,500 · ages 16+',
    copy: 'Two laps of the bay at whatever speed your nerve allows. Life vests mandatory, bravado optional. Tandem seats for passengers.',
    img: 'https://images.pexels.com/photos/35421798/pexels-photo-35421798.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    n: 'C',
    name: 'Pickleball',
    meta: '2 courts · free for guests · floodlit till 22:00',
    copy: 'Paddles and balls at the court box, chalk board for challenges, and a house rule: winners buy the next round of buko juice.',
    img: 'https://images.pexels.com/photos/17299528/pexels-photo-17299528.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    n: 'D',
    name: 'The Pool & Slides',
    meta: 'always free · 6:00 – 19:00',
    copy: 'A 30-meter infinity edge, two waterslides into the deep end, and the shallow cove pool for small humans. Towels appear when you need them.',
    img: 'https://images.pexels.com/photos/29289153/pexels-photo-29289153.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
];

export const DINING_ROOMS = [
  { name: 'The Terrace', when: 'Breakfast & lunch · 6:00 – 14:30', note: 'Long tables under the palms. Coffee that keeps arriving, waves underneath.' },
  { name: 'Chef\u2019s Table', when: 'Dinner seatings · 18:00 & 20:30', note: 'Eight seats facing the pass. Watch the kitchen work and eat what it sends.' },
  { name: 'Sunset Tables', when: 'Golden hour · 20 tables, west-facing', note: 'The ones everyone asks for. Reserve when you book your room, not after.' },
];

export const DAY = [
  { time: '06:30', label: 'First light', place: 'The Beach', desc: 'Empty sand, still water. The resort is yours before anyone wakes.' },
  { time: '08:00', label: 'Morning', place: 'The Restaurant', desc: 'Breakfast on the terrace, coffee, waves underneath.' },
  { time: '10:30', label: 'Mid-morning', place: 'Infinity Pool', desc: 'The pool blends into the horizon. Bring a book or don\'t.' },
  { time: '13:00', label: 'Lunch', place: 'Chef\'s Table', desc: 'Whatever the fishermen brought this morning. Marco decides the rest.' },
  { time: '15:00', label: 'Afternoon', place: 'Adventure Zone', desc: 'Surf lesson, kayak circuit, or the island hike. Teens run this part.' },
  { time: '17:30', label: 'Golden hour', place: 'Sunset Cruise', desc: 'Catamaran, cocktails, the sky turning orange. Thursday to Sunday.' },
  { time: '20:00', label: 'Dinner', place: 'Oceanside Tables', desc: 'Twenty sunset tables. Reserve when you book your room.' },
  { time: '22:00', label: 'Night', place: 'Beach Bonfire', desc: 'Guitar, stars, the sound of waves. The day ends where it started.' },
];

/* ─── resort: the wandering mosaic (each tile drifts at its own speed) ─── */
export const MOSAIC = [
  {
    n: '01', cap: 'The private beach, 07:12',
    img: 'https://images.pexels.com/photos/18915964/pexels-photo-18915964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    span: 'col-span-12 md:col-span-7', h: 'h-[42vh] sm:h-[48vh]', par: -10,
  },
  {
    n: '02', cap: 'The beach villas, down the palm path',
    img: 'https://images.pexels.com/photos/14025909/pexels-photo-14025909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    span: 'col-span-12 md:col-span-5 md:mt-20', h: 'h-[42vh] sm:h-[48vh]', par: -18,
  },
  {
    n: '03', cap: 'The spa, under the almonds',
    img: 'https://images.pexels.com/photos/37719548/pexels-photo-37719548.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    span: 'col-span-12 sm:col-span-6 md:col-span-4', h: 'h-[34vh] sm:h-[40vh]', par: -6,
  },
  {
    n: '04', cap: 'The retreat hall, for teams of 100',
    img: 'https://images.pexels.com/photos/14851464/pexels-photo-14851464.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    span: 'col-span-12 sm:col-span-6 md:col-span-8 md:-mt-10', h: 'h-[34vh] sm:h-[40vh]', par: -14,
  },
  {
    n: '05', cap: 'The adventure crew, mid-lesson',
    img: 'https://images.pexels.com/photos/1197373/pexels-photo-1197373.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    span: 'col-span-12 md:col-span-6 md:mt-14', h: 'h-[36vh] sm:h-[44vh]', par: -16,
  },
  {
    n: '06', cap: 'The pool deck, golden hour',
    img: 'https://images.pexels.com/photos/35236021/pexels-photo-35236021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    span: 'col-span-12 md:col-span-6', h: 'h-[36vh] sm:h-[44vh]', par: -8,
  },
];

export const REVIEWS = [
  { quote: 'We brought our executive team for three days. The meeting rooms were good — the sunset cruise is what made everyone actually connect.', name: 'James M.', role: 'CEO, TechVenture · Singapore', stars: 5 },
  { quote: 'I\'ve been to resorts in 40 countries. The seafood platter here is the reason I booked a return trip before I checked out.', name: 'Sofia A.', role: 'Travel Writer · Copenhagen', stars: 5 },
  { quote: 'My teenagers didn\'t want to leave. The surf school, the bonfire nights — they still talk about it. We\'re going back in December.', name: 'Marcus C.', role: 'Family traveler · Melbourne', stars: 5 },
  { quote: 'Came for a family holiday, left with a surfing habit. The instructors are patient, the boards are new, and the water is never crowded.', name: 'Lila R.', role: 'Age 16 · Manila', stars: 5 },
  { quote: 'I\'ve organized off-sites at twenty-plus venues. Sea Guinon is the only one where the team still brings up the trip a year later.', name: 'Priya N.', role: 'People Ops Lead · Bengaluru', stars: 5 },
  { quote: 'Three years in a row now. The sunset tables, the staff who remember how you take your coffee — it genuinely feels like ours for a week.', name: 'Daniel & Ruth', role: 'Returning guests · London', stars: 5 },
];

export const PACKAGES = [
  { name: 'Quick Escape', price: '299', unit: '/ night', items: ['Ocean-view room', 'Breakfast buffet', 'Beach & pool access', 'Welcome drink', 'High-speed WiFi'] },
  { name: 'Holiday Retreat', price: '499', unit: '/ night', items: ['Premium suite', 'All meals', 'Spa treatment', 'Sunset cruise', 'Airport transfer', 'Late checkout'], featured: true },
  { name: 'Corporate Elite', price: '899', unit: '/ person · 3 nights', items: ['Meeting room & AV', 'All meals', 'Team building', 'Event coordinator', 'Welcome & farewell dinner', 'Photographer'] },
];

export const FAQS = [
  { q: 'How do I get there?', a: '45-minute drive from the nearest international airport. Complimentary transfer for 3+ night bookings. Detailed directions are sent with your confirmation.' },
  { q: 'Is it suitable for teenagers?', a: 'Yes — supervised surf school, island hikes, beach volleyball, and bonfire nights for ages 13–19. Parents can relax knowing their teens are having a blast.' },
  { q: 'What makes the restaurant special?', a: 'Chef Marco changes the menu daily based on the morning catch. Sunset tables seat 20 — reserve early.' },
  { q: 'Can you handle corporate groups?', a: 'Groups of 10 to 100+. Conference room, breakout areas, full event coordination, and team activities.' },
  { q: 'Do you offer all-inclusive options?', a: 'Yes — Holiday Retreat and Corporate Elite packages cover meals, drinks, activities, and premium amenities. We also customize packages for your specific needs and budget.' },
  { q: 'Cancellation policy?', a: 'Free cancellation 72 hours before check-in. Custom terms for group bookings.' },
];
