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

export type Category = "Necklaces" | "Earrings" | "Crochet" | "Clay";
export const CATEGORIES: readonly Category[] = ["Necklaces", "Earrings", "Crochet", "Clay"];

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
      "Each porcelain bead is painted with a single bloom, no two flowers, no two earrings quite alike. Marigold Morning brings a little warmth to grey days and arrives gift-ready in its GulCraft Stories box. The sort of present people keep the box for, too.",
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
    images: ["festival-red.jpg"],
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
      "A bright marigold strand, the colour you see strung across doorways at every celebration, that slowly fills with millefiori glass, each tiny bead a little garden of colour pressed into it.",
    images: ["marigold-mela.jpg"],
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
      "Two little carved pillars of green, each one cut by hand with a soft leaf pattern so the light moves across them as you do, set between beads of honey-yellow jade.",
    images: ["bamboo-grove.jpg"],
    sold: false,
    madeOn: "2026-07-05",
  },
  {
    id: "rose-and-leaf-clip",
    name: "Rose & Leaf",
    category: "Crochet",
    price: 600,
    materials: ["Wool crochet blooms on coloured paper clips"],
    story:
      "Red rose and green leaf on a yellow clip",
    images: ["posy-page-clips.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Posy Page Clips",
  },
  {
    id: "blush-and-dove-clip",
    name: "Blush & Dove",
    category: "Crochet",
    price: 600,
    materials: ["Wool crochet blooms on coloured paper clips"],
    story:
      "Pink bloom and soft grey leaf on a green clip",
    images: ["posy-page-clips.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Posy Page Clips",
  },
  {
    id: "berry-and-emerald-clip",
    name: "Berry & Emerald",
    category: "Crochet",
    price: 600,
    materials: ["Wool crochet blooms on coloured paper clips"],
    story:
      "Deep berry bloom and emerald leaf on a green clip",
    images: ["posy-page-clips.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Posy Page Clips",
  },
  {
    id: "marigold-and-navy-clip",
    name: "Marigold & Navy",
    category: "Crochet",
    price: 600,
    materials: ["Wool crochet blooms on coloured paper clips"],
    story:
      "Marigold bloom and navy leaf on a white clip",
    images: ["posy-page-clips.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Posy Page Clips",
  },
  {
    id: "lilac-and-lagoon-clip",
    name: "Lilac & Lagoon",
    category: "Crochet",
    price: 600,
    materials: ["Wool crochet blooms on coloured paper clips"],
    story:
      "Lilac bloom and turquoise leaf on a pink clip",
    images: ["posy-page-clips.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Posy Page Clips",
  },
  {
    id: "the-star-and-gourd-charm",
    name: "The Star & Gourd",
    category: "Clay",
    price: 1200,
    materials: ["Hand-painted air-dry clay charms and beads", "cotton thread", "metal clip"],
    story:
      "Left in the photo: a pink painted star, polka-dot bloom and a folk-patterned drop on a green tassel",
    images: ["mela-clay-charms.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Mela Clay Charms",
  },
  {
    id: "the-toadstool-and-blossom-charm",
    name: "The Toadstool & Blossom",
    category: "Clay",
    price: 1200,
    materials: ["Hand-painted air-dry clay charms and beads", "cotton thread", "metal clip"],
    story:
      "Right in the photo: a red toadstool, painted blossom beads and a star-flower on a string of red beads",
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
      "A little river of teal, jade and red runs down a leaf-shaped magnet, finished with a silver ribbon of water.",
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
      "Deep blue rim, scattered green spots, like a lily pad seen from above.",
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
      "One tiny palm tree on a sunny cream-and-yellow pebble, a pocket-sized holiday.",
    images: ["little-palm-magnet.jpg"],
    sold: false,
    madeOn: "2026-07-03",
    collection: "Mela Magnets",
  },
  {
    id: "marmalade-cat-magnet",
    name: "Marmalade Cat",
    category: "Clay",
    price: 700,
    materials: ["Air-dry clay", "sealed with resin", "magnet back"],
    story:
      "Hand-painted and full of character, this is the one cat-lovers pick up without thinking twice.",
    images: ["marmalade-cat-magnet.jpg"],
    sold: false,
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
      "A plump little berry, glazed deep indigo with its star-crown on top. One of a pair of berries, each shaped by hand, no two quite alike.",
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
      "The flower pot curled up in a grove of yellow lemons and green leaves.",
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
      "A bold orange antelope head with long, spotted, curving horns, folk-art energy in miniature.",
    images: ["orange-ibex-magnet.jpg"],
    sold: false,
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
      "A small dog for the dog lovers, painted bright red on a white crescent and ringed with blue dots.",
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
      "A tiny, rounded pot in candy pink, scattered with blue stars.",
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
      "A little green-and-gold parrot hand-shaped and painted from clay, hanging beneath a stack of glass cube beads, a folk-painted barrel and a tiny watermelon slice.",
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
      "A hand-painted clay strawberry, freckled with little gold hearts, swinging on a green cotton cord beneath a pink blossom ring and a striped blue bead.",
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
      "A little matki, the round clay pot of every Indian kitchen, shaped and painted by hand and hung beneath a string of folk-painted beads on a bright twisted cord.",
    images: ["matki-bag-charm.jpg"],
    sold: false,
    madeOn: "2026-07-04",
    collection: "Bag charms",
  },
  // add-piece appends new pieces above this line
];
