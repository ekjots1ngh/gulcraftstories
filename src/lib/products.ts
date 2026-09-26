/**
 * THE CATALOGUE. One entry per piece, nothing else. This is the only place
 * product data lives. See ADDING-PIECES.md for the plain-language guide.
 *
 * Do not edit by hand if you can help it:
 *   npm run add-piece          add one piece (asks questions)
 *   npm run add-pieces x.csv   add many from a spreadsheet
 *   npm run sold <id>          mark a piece sold  ·  npm run unsold <id>
 *   npm run images             process photos from /photos-inbox
 *   npm run check-pieces       validate everything (also runs on commit and build)
 */

export type Category = "Necklaces" | "Earrings" | "Bracelets" | "Crochet" | "Clay";
export const CATEGORIES: readonly Category[] = ["Necklaces", "Earrings", "Bracelets", "Crochet", "Clay"];

export type Product = {
  /** URL slug. Unique, lowercase letters, numbers and hyphens. */
  id: string;
  /** Up to 40 characters. */
  name: string;
  category: Category;
  /** Price in pence as a whole number: 4900 is £49.00. */
  price: number;
  /** Short material names, one per entry. */
  materials: string[];
  /** The story in the maker's words. May be empty while it is being written. */
  story: string;
  /** Photo file names as they went into /photos-inbox; the first is the main image. */
  images: string[];
  /** Flip to true when it sells. The only edit a sale needs. */
  sold: boolean;
  /** ISO date the piece was made, e.g. "2026-09-01". Newest first when sorting. */
  madeOn?: string;
  /** A set the piece belongs to, e.g. "Mela Magnets". Shown together on the site. */
  collection?: string;
  /** Manual sort position, lowest first. Leave out to sort by madeOn. */
  order?: number;
};

export const products: Product[] = [
  {
    id: "bazaar-song",
    name: "Bazaar Song",
    category: "Necklaces",
    price: 4900,
    materials: ["Glazed ceramic beads", "antiqued brass Tuareg-style pendant and crescent spacers", "waxed cord"],
    story:
      "Worn long enough to graze the heart, Bazaar Song carries every colour of a morning market, ochre, cobalt, coral and gold. A piece for the woman who collects places, not things.",
    images: ["bazaar-song.jpg"],
    sold: false,
    madeOn: "2026-06-05",
    order: 1,
  },
  {
    id: "desert-ember",
    name: "Desert Ember",
    category: "Necklaces",
    price: 4600,
    materials: ["Mookaite jasper (mustard, plum and cream)", "red jasper point beads", "brass focal charm and spacers"],
    story:
      "Mookaite is the stone of slow, sun-warmed earth, and Desert Ember strings it in every shade of a canyon at dusk. Two red jasper points frame a small brass charm like a fire kept burning. Grounding, earthy and quietly bold, it pairs as easily with linen as with leather.",
    images: ["desert-ember.jpg"],
    sold: false,
    madeOn: "2026-06-04",
  },
  {
    id: "himalayan-bloom",
    name: "Himalayan Bloom",
    category: "Necklaces",
    price: 3500,
    materials: ["Dyed chalcedony cube beads", "natural turquoise pendant", "barrel ceramic beads", "a Tibetan turquoise-inlay capped bead", "and brass spacers"],
    story:
      "Hot pink meets cool turquoise the way a wildflower meets a mountain sky. The centrepiece is a single turquoise nugget, veined and unrepeatable, finished with a hand-inlaid Tibetan bead. A joyful, unexpected colour story for anyone who refuses to dress quietly.",
    images: ["himalayan-bloom.jpg"],
    sold: false,
    madeOn: "2026-06-03",
    order: 2,
  },
  {
    id: "coral-shore",
    name: "Coral Shore",
    category: "Necklaces",
    price: 4400,
    materials: ["Pink coral rounds and heishi discs", "turquoise cabochons", "silver arrow-and-feather pendant"],
    story:
      "Soft as a shell found at the tide line, Coral Shore drops to a slim silver arrow set with three turquoise stones. It is beachy without trying, the kind of necklace that lives on bare skin all summer. For the free spirit who is always half-packed for somewhere warmer.",
    images: ["coral-shore.jpg"],
    sold: false,
    madeOn: "2026-06-02",
  },
  {
    id: "caravan-tales",
    name: "Caravan Tales",
    category: "Necklaces",
    price: 5200,
    materials: ["Vintage Kuchi tribal coin charms", "lac and glass beads", "cotton tassel", "and adjustable red cord"],
    story:
      "Every coin on Caravan Tales has travelled before it reached you, reclaimed tribal silver, strung with glass and a hand-tied cotton tassel on an adjustable cord. It rings softly when you move, like jewellery with a memory. A true one-of-a-kind for the collector of stories.",
    images: ["caravan-tales.jpg"],
    sold: false,
    madeOn: "2026-06-01",
    order: 3,
  },
  {
    id: "patchwork-garden",
    name: "Patchwork Garden",
    category: "Necklaces",
    price: 3400,
    materials: ["Hand-stitched kantha cotton band", "recycled fabric blossom charms", "wooden beads"],
    story:
      "Featherlight and entirely plastic-free, Patchwork Garden is sewn from offcuts of cotton and sari fabric, each tiny blossom knotted by hand. It is the necklace that gets the compliments, 'where is that from?', because there is genuinely nothing else like it. Sustainable, playful, and kind on the skin.",
    images: ["patchwork-garden.jpg"],
    sold: false,
    madeOn: "2026-05-31",
  },
  {
    id: "confetti-trail",
    name: "Confetti Trail",
    category: "Necklaces",
    price: 2700,
    materials: ["Multicoloured glass seed beads and African trade beads", "a red millefiori glass focal bead"],
    story:
      "A fine scatter of colour that sits close to the throat, finished with one little millefiori flower bead at the side. Confetti Trail is the everyday piece you reach for without thinking, light, happy, and easy to layer. The kind of small thing that makes a plain day feel like a celebration.",
    images: ["confetti-trail.jpg"],
    sold: false,
    madeOn: "2026-05-30",
  },
  {
    id: "mountain-dusk",
    name: "Mountain Dusk",
    category: "Necklaces",
    price: 3500,
    materials: ["Frosted recycled glass beads in blues", "red glass beads", "a carved cinnabar-red focal bead", "and silver Bali-style spacers"],
    story:
      "Deep blue and warm red, the exact colours of the last light on a mountain. Each frosted glass bead is recycled and softened by hand, leading down to a carved red focal bead like a small sun setting. Bold but wearable, a quiet kind of drama.",
    images: ["mountain-dusk.jpg"],
    sold: false,
    madeOn: "2026-05-29",
  },
  {
    id: "peacock-hour",
    name: "Peacock Hour",
    category: "Necklaces",
    price: 4200,
    materials: ["Hand-glazed ceramic square beads", "peacock-feather motif beads", "black onyx rounds", "antiqued brass spacers"],
    story:
      "Every bead holds a tiny painted peacock eye, glazed so it shifts between teal and indigo as you turn. Set against black onyx and warm brass, Peacock Hour feels regal without weighing a thing. For the person who has always been drawn to that impossible blue-green.",
    images: ["peacock-hour.jpg"],
    sold: true,
    madeOn: "2026-05-28",
    order: 4,
  },
  {
    id: "meadow-cascade",
    name: "Meadow Cascade",
    category: "Necklaces",
    price: 4500,
    materials: ["Mixed gemstone chips", "amethyst", "rose quartz", "green aventurine", "carnelian", "citrine", "lapis and turquoise", "on a hand-embroidered band", "with brass coin and teardrop dangles"],
    story:
      "A whole wildflower meadow gathered at the collarbone: dozens of real gemstone chips cascading from a hand-embroidered band, weighted with brass drops and a single coin. This is the showpiece, the necklace worn to be remembered. One exists, and then it is gone.",
    images: ["meadow-cascade.jpg"],
    sold: false,
    madeOn: "2026-05-27",
    order: 5,
  },
  {
    id: "tidewater-moon",
    name: "Tidewater Moon",
    category: "Necklaces",
    price: 3500,
    materials: ["Recycled sea-glass-style beads", "glazed ceramic focal beads", "brass crescent pendant and tube spacers"],
    story:
      "Cool teal glass, the colour of shallow water, falling to a brass crescent moon. Tidewater Moon is calm, made wearable, the piece you put on and immediately feel a little more settled. Beautiful with white linen, a tan, and salt in your hair.",
    images: ["tidewater-moon.jpg"],
    sold: false,
    madeOn: "2026-05-26",
  },
  {
    id: "cornflower-drops",
    name: "Cornflower Drops",
    category: "Earrings",
    price: 1800,
    materials: ["Blue millefiori glass beads", "warm carnelian-tone accents", "silver-plated ear wires"],
    story:
      "A pair of tiny stained-glass windows for your ears, cobalt glass scattered with hand-set millefiori flowers. Light enough to forget you are wearing them, bright enough that you won't want to. Everyday wildflowers, all year round.",
    images: ["cornflower-drops.jpg"],
    sold: false,
    madeOn: "2026-05-25",
  },
  {
    id: "porcelain-sky",
    name: "Porcelain Sky",
    category: "Earrings",
    price: 1500,
    materials: ["Hand-painted blue-and-white porcelain beads", "cobalt glass crystals", "silver-plated ear wires"],
    story:
      "Blue-and-white china, the kind you grew up seeing on a grandmother's shelf, reborn as a delicate drop earring. Porcelain Sky is gentle, classic and quietly nostalgic. A lovely little gift that feels like more than its price.",
    images: ["porcelain-sky.jpg"],
    sold: false,
    madeOn: "2026-05-24",
  },
  {
    id: "marigold-morning",
    name: "Marigold Morning",
    category: "Earrings",
    price: 2000,
    materials: ["Hand-painted floral porcelain beads", "red glass accents", "silver-plated ear wires"],
    story:
      "Each porcelain bead is painted with a single bloom, no two flowers, no two earrings quite alike. Marigold Morning brings a little warmth to grey days and arrives gift-ready in its GulCraftStories box. The sort of present people keep the box for, too.",
    images: ["marigold-morning.jpg"],
    sold: false,
    madeOn: "2026-05-23",
    order: 6,
  },
  {
    id: "orchard-green",
    name: "Orchard Green",
    category: "Earrings",
    price: 1500,
    materials: ["Speckled green-glazed ceramic discs", "green aventurine nuggets", "clear glass tube beads", "silver-plated ear wires"],
    story:
      "Fresh as a sliced kiwi, speckled green ceramic and a chip of aventurine, the stone of new beginnings. Orchard Green is crisp, modern and a little bit cheeky. Spring in a pair of earrings, whatever the calendar says.",
    images: ["orchard-green.jpg"],
    sold: false,
    madeOn: "2026-05-22",
  },
  {
    id: "festival-red",
    name: "Festival Red",
    category: "Earrings",
    price: 1800,
    materials: ["Red millefiori glass beads", "blue-and-white chevron trade beads", "glass accents", "silver-plated ear wires"],
    story:
      "Old trade beads that once crossed deserts and seas, paired with rich red millefiori flowers. Festival Red is small but full of character, the earrings that make a plain shirt look intentional. For the lover of colour and a good origin story.",
    images: ["festival-red.jpg", "festival-red-2.jpg"],
    sold: false,
    madeOn: "2026-05-21",
  },
  {
    id: "storm-and-ember",
    name: "Storm & Ember",
    category: "Earrings",
    price: 2400,
    materials: ["Labradorite rectangle beads", "red Czech fluted glass beads", "silver-plated ear wires"],
    story:
      "Labradorite flashes blue and grey like light through a storm cloud, grounded by one warm fluted red bead beneath. Storm & Ember is moody and elegant, understated until it catches the light, and then it is all anyone notices. For everyday wear with a little mystery.",
    images: ["storm-and-ember.jpg"],
    sold: false,
    madeOn: "2026-05-20",
    order: 7,
  },
  {
    id: "spice-route",
    name: "Spice Route",
    category: "Necklaces",
    price: 2000,
    materials: ["Multicoloured seed beads in hand-blocked colour sections", "turquoise nugget accents", "two etched fossil-pattern focal beads", "a cream bone-tone bead and a turquoise centre bead drop", "Silver-plated lobster clasp"],
    story:
      "Spice Route is a journey strung on a thread, each block of colour a different stop, from sun-yellow and turquoise to chilli-red and ink-black. At its heart hangs a single painted bead, the kind of focal piece you keep turning to the light. Designed from a sketchbook and beaded entirely by hand, it's a one-of-a-kind that layers beautifully or stands alone. For the wearer who treats getting dressed as a small act of storytelling.",
    images: ["spice-route.jpg"],
    sold: false,
    madeOn: "2026-07-05",
    order: 8,
  },
  {
    id: "kathmandu-line",
    name: "Kathmandu Line",
    category: "Necklaces",
    price: 2800,
    materials: ["Black and white glass seed beads in hand-graded sections", "with gemstone chip accents (green aventurine, turquoise, frosted rose quartz and carnelian)", "brass tube spacers", "a frosted clear-glass tube and a magenta glass cushion bead"],
    story:
      "Kathmandu Line reads like a quiet trek across high country, long runs of black and white beads broken by little finds along the way: a chip of turquoise here, rose quartz and carnelian there. It all leads down to a single Tibetan medallion, lapis-blue around a turquoise heart, with a filigree brass bead resting beneath.",
    images: ["kathmandu-line.jpg"],
    sold: false,
    madeOn: "2026-07-05",
  },
  {
    id: "marigold-mela",
    name: "Marigold Mela",
    category: "Necklaces",
    price: 2200,
    materials: ["Yellow glass seed beads", "multicolour millefiori glass beads", "a hand-wrapped blue thread bail", "a brass openwork lotus charm", "and a cobalt-blue glass drop bead", "Gold-tone clasp"],
    story:
      "A bright marigold strand, the colour you see strung across doorways at every celebration, that slowly fills with millefiori glass, each tiny bead a little garden of colour pressed into it. A brass lotus and a single cobalt drop hang from a bail wrapped by hand in blue thread. Light to wear and happiest over something plain.",
    images: ["marigold-mela.jpg", "marigold-mela-2.jpg"],
    sold: false,
    madeOn: "2026-07-05",
  },
  {
    id: "amber-twilight",
    name: "Amber Twilight",
    category: "Necklaces",
    price: 2900,
    materials: ["Purple dragon-vein agate cube beads", "brass spacers", "a Tibetan amber-resin focal bead with turquoise and coral inlay and brass caps", "pink rhodonite rounds", "red bamboo-coral tubes", "yellow jade beads", "white mother-of-pearl and white agate", "green aventurine chips", "Gold-tone clasp"],
    story:
      "The heart of the piece is a hand-inlaid Tibetan bead the colour of warm amber, set with turquoise and tiny coral flowers, flanked by coral, rhodonite and a flash of green like the last of the daylight. Saanjh is the hour between day and night, and this is what it looks like worn around the throat.",
    images: ["amber-twilight.jpg"],
    sold: false,
    madeOn: "2026-07-05",
  },
  {
    id: "bamboo-grove",
    name: "Bamboo Grove",
    category: "Earrings",
    price: 2600,
    materials: ["Hand-carved green jade tubes with leaf pattern", "honey-yellow jade beads", "gold-tone ear wires"],
    story:
      "Two little carved pillars of green, each one cut by hand with a soft leaf pattern so the light moves across them as you do, set between beads of honey-yellow jade. Quiet, cool earrings that sit close to the face. Strung on gold-tone wires and made once.",
    images: ["bamboo-grove.jpg"],
    sold: false,
    madeOn: "2026-07-05",
  },
  {
    id: "posy-page-clips",
    name: "Posy Page Clips",
    category: "Crochet",
    price: 600,
    materials: ["Wool crochet blooms on coloured paper clips"],
    story:
      "Tiny wool blooms, each with its leaf, crocheted by hand and fixed to a coloured paper clip. They mark a page, hold a recipe to the fridge, or sit in the fold of a letter. Five pairings, shown top to bottom in the photograph: red rose and green leaf on a yellow clip; pink bloom and grey leaf on a green clip; deep berry and emerald on a green clip; marigold and navy on a white clip; lilac and turquoise on a pink clip. The price is per clip. Tell us which ones you would like in the note on the payment page.",
    images: ["posy-page-clips.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Posy Page Clips",
  },
  {
    id: "mela-clay-charms",
    name: "Mela Clay Charms",
    category: "Clay",
    price: 1200,
    materials: ["Hand-painted air-dry clay charms and beads", "cotton thread", "metal clip"],
    story:
      "Two bag charms, each a string of beads shaped and painted by hand in air-dry clay, finished with a clip for a bag strap or a bunch of keys. On the left in the photograph, the Star and Gourd: a pink painted star, a polka-dot bloom and a folk-patterned drop on a green tassel. On the right, the Toadstool and Blossom: a red toadstool with white spots, painted blossom beads and a star-flower on a string of red beads. The price is per charm. Tell us which one you would like in the note on the payment page; every bead is painted freehand, so no two are the same.",
    images: ["mela-clay-charms.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Mela Clay Charms",
  },
  {
    id: "peacock-stream-magnet",
    name: "Peacock Stream",
    category: "Clay",
    price: 700,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A little river of teal, jade and red runs down a leaf-shaped magnet, finished with a silver ribbon of water. Shaped from air-dry clay, painted by hand and sealed with resin so the colours stay bright on the fridge door. The name comes from the peacock colours she reaches for most.",
    images: ["peacock-stream-magnet.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "lily-pebble-magnet",
    name: "Lily Pebble",
    category: "Clay",
    price: 600,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A deep blue rim and scattered green spots, like a lily pad seen from above on still water. A small pebble of air-dry clay, painted by hand and sealed with resin, with a magnet on the back. One of the Mela magnets, made in small numbers and never quite the same twice.",
    images: ["lily-pebble-magnet.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "little-palm-magnet",
    name: "Little Palm",
    category: "Clay",
    price: 500,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "One tiny palm tree on a sunny cream-and-yellow pebble, a pocket-sized holiday for a fridge door or a filing cabinet. Air-dry clay shaped and painted by hand, sealed with resin, magnet on the back. The smallest and cheapest thing on the table, and often the first to go.",
    images: ["little-palm-magnet.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "marmalade-cat-magnet",
    name: "Pink Cat",
    category: "Clay",
    price: 700,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A candy-pink cat with yellow tabby stripes and a face full of character, painted by hand on a small pebble of air-dry clay and sealed with resin. This is the one cat lovers pick up without thinking twice. Magnet on the back; each one painted a little differently.",
    images: ["marmalade-cat-magnet.jpg"],
    sold: true,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "blueberry-magnet-i",
    name: "Blueberry I",
    category: "Clay",
    price: 500,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A plump little berry, glazed deep indigo with its star-crown on top. One of a pair of berries, each shaped by hand from air-dry clay and sealed with resin, no two quite alike. Magnet on the back, so it lives on the fridge next to the shopping list.",
    images: ["blueberry-magnet-i.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "blueberry-magnet-ii",
    name: "Blueberry II",
    category: "Clay",
    price: 500,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A plump little berry, glazed deep indigo with its star-crown on top. The second of the pair, shaped by hand, with a character all its own.",
    images: ["blueberry-magnet-ii.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "lemon-grove-magnet",
    name: "Lemon Grove",
    category: "Clay",
    price: 600,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A flower pot curled up in a grove of yellow lemons and green leaves, painted by hand on air-dry clay and sealed with resin. Sunny colours for a kitchen that could use a bit of the Mediterranean. Magnet on the back; one of the Mela magnets.",
    images: ["lemon-grove-magnet.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "orange-ibex-magnet",
    name: "Orange Ibex",
    category: "Clay",
    price: 800,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A bold orange antelope head with long, spotted, curving horns, folk-art energy in miniature. Shaped from air-dry clay, painted freehand and sealed with resin, with a magnet on the back. The design borrows from the painted animals of Indian folk art, where nothing is ever left plain.",
    images: ["orange-ibex-magnet.jpg"],
    sold: true,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "red-dog-magnet",
    name: "Red Dog",
    category: "Clay",
    price: 700,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A small dog for the dog lovers, painted bright red on a white crescent and ringed with blue dots. Air-dry clay shaped and painted by hand, sealed with resin, magnet on the back. Cheerful on a fridge, and a good small present for someone with a good small dog.",
    images: ["red-dog-magnet.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "starry-pot-magnet",
    name: "Starry Pot",
    category: "Clay",
    price: 500,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "A tiny, rounded pot in candy pink, scattered with blue stars. Shaped from air-dry clay, painted by hand and sealed with resin, with a magnet on the back. One of the Mela magnets, the little things made between bigger pieces.",
    images: ["starry-pot-magnet.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "tota-bag-charm",
    name: "Tota",
    category: "Clay",
    price: 1200,
    materials: ["Hand-painted air-dry clay", "glass and acrylic beads", "painted resin barrel beads", "cotton thread tassel", "stainless lobster clip with split ring"],
    story:
      "A little green-and-gold parrot, the tota of a hundred Indian folk paintings, hand-shaped and painted from clay and hanging beneath a stack of glass cube beads, a folk-painted barrel and a tiny watermelon slice. It clips to a bag strap or a set of keys and swings as you walk. Made by hand in small numbers, each parrot painted a little differently.",
    images: ["tota-bag-charm.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Bag charms",
  },
  {
    id: "strawberry-fields-bag-charm",
    name: "Strawberry Fields",
    category: "Clay",
    price: 1200,
    materials: ["Hand-painted air-dry clay", "painted clay beads", "cotton cord and tassel", "stainless lobster clip with split ring"],
    story:
      "A hand-painted clay strawberry, freckled with little gold hearts, swinging on a green cotton cord beneath a pink blossom ring and a striped blue bead. It clips to a bag, a pencil case or a set of keys. Summery, a little sweet, and made by hand in small numbers.",
    images: ["strawberry-fields-bag-charm.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Bag charms",
  },
  {
    id: "matki-bag-charm",
    name: "Matki",
    category: "Clay",
    price: 1200,
    materials: ["Hand-painted air-dry clay", "glass and acrylic beads", "painted resin barrel beads", "twisted cotton cord", "stainless lobster clip with split ring"],
    story:
      "A little matki, the round clay pot of every Indian kitchen, shaped and painted by hand and hung beneath a string of folk-painted beads on a bright twisted cord. It clips to a bag strap or keys and carries a small piece of home around with you. Made by hand in small numbers, each pot painted a little differently.",
    images: ["matki-bag-charm.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Bag charms",
  },
  {
    id: "berry-fir",
    name: "Berry Fir",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "hanging loop"],
    story:
      "A little fir tree grown from a single brushstroke, its branches heavy with red berries. Painted by hand in one sitting, so the green is never quite the same twice. Hang it low on the tree where it can be seen.",
    images: ["berry-fir.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "snowman-in-a-scarf",
    name: "Snowman in a Scarf",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "hanging loop"],
    story:
      "A round fellow in a green bobble hat and a red striped scarf, painted with the cheeks of someone who has just come in from the cold. He is the kind of ornament children find first. Made and painted by hand.",
    images: ["snowman-in-a-scarf.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "christmas-jumper",
    name: "Christmas Jumper",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "hanging loop"],
    story:
      "The jumper everyone pretends not to want and secretly loves, in red with white snowflakes and a small snowman on the front. Shaped and painted by hand, so the knit pattern wobbles just as a real one does.",
    images: ["christmas-jumper.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "snow-cottage",
    name: "Snow Cottage",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "hanging loop"],
    story:
      "A blue house on a snowy night, fairy lights strung along the eaves and a green door left ajar for whoever is coming home late. Hand-painted with a fine brush, with a star cut into the roof so the tree lights show through.",
    images: ["snow-cottage.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "holly-bell",
    name: "Holly Bell",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "hanging loop"],
    story:
      "A cream bell edged in yellow and blue, with a sprig of holly and a scatter of red berries. It does not ring, but it looks as though it might. Hand-painted, one of a small festive batch.",
    images: ["holly-bell.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "snowflake-mitten",
    name: "Snowflake Mitten",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "hanging loop"],
    story:
      "One red mitten with a white snowflake stitched in paint across the back, the way a grandmother might have embroidered it. Painted by hand and finished with a white cuff. The odd mitten is always the one you keep.",
    images: ["snowflake-mitten.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "reindeer-rounds-pair",
    name: "Reindeer Rounds, pair",
    category: "Clay",
    price: 1400,
    materials: ["Hand-painted discs", "sealed paint", "hanging loops"],
    story:
      "Two painted rounds, sold together: a reindeer in a pink and green wood on one, a brown stag under blue snowflakes on the other. Painted freehand, so each animal has its own expression. Hang them a little apart and let them look at each other.",
    images: ["reindeer-rounds-pair.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "carol-bell",
    name: "Carol Bell",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "jute hanging cord"],
    story:
      "A white bell with a bold black outline and a yellow rim, holly in the middle and a few red berries scattered like notes. Painted by hand and hung on a length of jute. Bright enough to find on a crowded tree.",
    images: ["carol-bell.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "painted-bird",
    name: "Painted Bird",
    category: "Clay",
    price: 900,
    materials: ["Hand-painted clay", "sealed paint", "hanging loop"],
    story:
      "A folk bird in flight, its wings and tail crowded with red flowers, blue leaves and a yellow feather, the same bird that sits on our roundel. Shaped and painted by hand in the manner of Rajasthani folk painting, where no bird is ever plain.",
    images: ["painted-bird.jpg"],
    sold: false,
    madeOn: "2026-09-13",
    collection: "Festive ornaments",
  },
  {
    id: "rhubarb-and-moss",
    name: "Rhubarb and Moss",
    category: "Earrings",
    price: 2200,
    materials: ["Pink cube beads (stone-tone)", "green glazed ceramic disc beads", "silver-tone ear wires"],
    story:
      "A pink cube over a round of mossy green ceramic, the colours of a kitchen garden in May. Light enough to wear all day and simple enough to go with everything. Made by hand in London.",
    images: ["rhubarb-and-moss.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "lavender-pond",
    name: "Lavender Pond",
    category: "Earrings",
    price: 2000,
    materials: ["Lilac disc beads", "turquoise-tone disc spacers", "silver-tone ear wires"],
    story:
      "Two soft lilac discs held between slivers of turquoise-tone, like lily pads on still water at dusk. Quiet earrings for someone who does not need to be loud. Strung by hand.",
    images: ["lavender-pond.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "honey-gourd",
    name: "Honey Gourd",
    category: "Earrings",
    price: 2400,
    materials: ["Carved yellow gourd beads (stone-tone)", "pink and green accent beads", "gold-tone ear wires"],
    story:
      "A carved bead shaped like a small ripe gourd, the colour of honey held up to the light, with pink and green beads above and below like the flowers it grew from. Warm, a little playful, and hand-strung on gold-tone wires.",
    images: ["honey-gourd.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "confetti-loop",
    name: "Confetti Loop",
    category: "Earrings",
    price: 2200,
    materials: ["Millefiori glass beads", "yellow glass seed beads", "silver-tone ear wires"],
    story:
      "A slender column of millefiori glass, each bead a tiny pressed garden, ending in a loop of sunny yellow seed beads that swings as you walk. Made bead by bead on a wire. For the person who likes a bit of movement.",
    images: ["confetti-loop.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "sunset-shell",
    name: "Sunset Shell",
    category: "Earrings",
    price: 2200,
    materials: ["Pink and yellow swirl beads", "cream coin beads (shell-tone)", "silver-tone spacers and ear wires"],
    story:
      "A swirl of pink and yellow like the last minute of a beach sunset, resting on a pale cream coin. Simple, summery and hand-assembled. They travel well.",
    images: ["sunset-shell.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "glacier-drop",
    name: "Glacier Drop",
    category: "Earrings",
    price: 2400,
    materials: ["Pale blue faceted round beads (stone-tone)", "gold-tone hexagon spacers", "silver-tone ear wires"],
    story:
      "One faceted bead the blue of glacier ice, caught between two small gold-tone hexagons. Cool and clean against the skin, with just enough sparkle in the cut to notice. Made by hand.",
    images: ["glacier-drop.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "seed-bead-rings",
    name: "Seed Bead Rings",
    category: "Bracelets",
    price: 400,
    materials: ["Glass seed beads", "elastic thread"],
    story:
      "Tiny rings of glass seed beads, threaded by hand and finished with a single contrasting bead, in white, orange, cobalt, green and mixed colours. Price is per ring; they are made to be stacked. Tell us which colours you would like.",
    images: ["seed-bead-rings.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "sky-stones",
    name: "Sky Stones",
    category: "Bracelets",
    price: 2400,
    materials: ["Large pale blue round beads (stone-tone)", "black glass seed spacers", "elastic"],
    story:
      "Big smooth beads the blue of a clear winter sky, spaced with tiny black glass beads so each stone has room to breathe. Stretches on and off, no clasp to fiddle with. Strung by hand.",
    images: ["sky-stones.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "tide-pool",
    name: "Tide Pool",
    category: "Bracelets",
    price: 2200,
    materials: ["Orange and turquoise-tone mottled beads", "turquoise-tone disc beads", "elastic"],
    story:
      "Mottled beads in orange and sea green, like the small stones you find in a rock pool and cannot leave behind. Threaded on elastic with turquoise-tone discs between. Handmade and easy to wear in the water.",
    images: ["tide-pool.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "lemon-path",
    name: "Lemon Path",
    category: "Bracelets",
    price: 2000,
    materials: ["Yellow glass seed beads", "mixed gemstone chips (turquoise-tone", "rose quartz-tone", "dalmatian-tone)", "silver-tone lobster clasp"],
    story:
      "A line of yellow seed beads broken by little finds: a chip of turquoise-tone, a blush of rose quartz-tone, a speckled stone. It reads like a path through a summer meadow. Closes with a small clasp.",
    images: ["lemon-path.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "meadow-path",
    name: "Meadow Path",
    category: "Bracelets",
    price: 2000,
    materials: ["Green glass seed beads", "mixed stone chips", "one red round bead", "gold-tone lobster clasp"],
    story:
      "Green seed beads with small stone chips set along the way and one red bead like a poppy at the field edge. Made by hand with a gold-tone clasp. Sister to Lemon Path; they are often bought together.",
    images: ["meadow-path.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "chevron-knot",
    name: "Chevron Knot",
    category: "Bracelets",
    price: 2200,
    materials: ["Red round beads (coral-tone)", "blue round beads (sodalite-tone)", "glass chevron trade beads", "blue cotton macrame cord"],
    story:
      "Red and deep blue beads knotted on a blue cord, with one large chevron bead at the centre, the striped glass that once crossed continents as currency. The macrame slide means it fits any wrist. Hand-knotted.",
    images: ["chevron-knot.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "speckled-pebble",
    name: "Speckled Pebble",
    category: "Bracelets",
    price: 2200,
    materials: ["Round beads (dalmatian jasper-tone)", "black glass seed spacers", "elastic"],
    story:
      "Cream beads freckled with black, like pebbles from a shingle beach, with tiny black glass beads between. Calm and a little wild at once. Threaded by hand on elastic.",
    images: ["speckled-pebble.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "rose-milk",
    name: "Rose Milk",
    category: "Bracelets",
    price: 2400,
    materials: ["Round beads (rose quartz-tone)", "green glass seed spacers", "one fuchsia faceted bead", "elastic"],
    story:
      "Soft pink rounds the colour of rose milk, spaced with green seed beads and one bright fuchsia bead, like a single petal in a glass. Stretches on and off. Made by hand in London.",
    images: ["rose-milk.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "two-roads",
    name: "Two Roads",
    category: "Necklaces",
    price: 3800,
    materials: ["Deep red round beads (garnet-tone)", "mixed small glass and stone beads", "brass-tone filigree ball", "brass-tone charms", "adjustable green cotton cord"],
    story:
      "An uneven necklace on purpose: one side a run of deep red beads, the other a busy road of small glass and stone, meeting at a brass-tone filigree ball. The green cord slides to any length, and two little charms hang from its ends. For someone who likes their symmetry a little off.",
    images: ["two-roads.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "parrot-in-the-garden",
    name: "Parrot in the Garden",
    category: "Necklaces",
    price: 4500,
    materials: ["Green glass seed beads with white and red sections", "hand-embroidered fabric pendant", "painted parrot", "red bead drop"],
    story:
      "A long strand of green seed beads leading to a small hand-embroidered pocket of fabric with a painted parrot inside it, the tota of a hundred Indian miniatures, still telling stories. Blanket-stitched by hand around the edge, with a red bead drop beneath. Wear it long over a plain dress.",
    images: ["parrot-in-the-garden.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  {
    id: "chevron-sea-set",
    name: "Chevron Sea Set",
    category: "Necklaces",
    price: 5800,
    materials: ["Red round beads (coral-tone)", "blue round beads (sodalite-tone)", "glass chevron trade beads", "large striped chevron focal bead", "silver-tone clasp and ear wires"],
    story:
      "A necklace and matching earrings, sold together. Red and deep blue beads alternate down to a large striped chevron, the old trade glass of the sea routes, with small chevrons either side. The earrings echo it in miniature. Set price; the necklace alone can be arranged.",
    images: ["chevron-sea-set.jpg"],
    sold: false,
    madeOn: "2026-09-13",
  },
  // add-piece appends new pieces above this line
];
