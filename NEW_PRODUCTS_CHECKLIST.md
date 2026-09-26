# New products checklist

Twenty-six new pieces added from the twenty-eight photos uploaded on
13 September 2026. Two of those photos were second views of pieces already on
the site and have been attached to them rather than listed again.

Everything below is live in `src/lib/products.ts` with a story, a price and a
processed photo. Before we go live, please confirm the materials marked with a
question, and decide on the bundle prices at the end.

## What I could not confirm from a photo

I never claim a material as fact from a picture. Anything that could be a
lookalike is written as "-tone" on the site (turquoise-tone, rose quartz-tone,
coral-tone, stone-tone) until you tell me what it actually is. Once confirmed,
each is a one-word edit in the materials list.

## The pieces

### Festive ornaments (Clay, a new collection)

| Piece | Price | From photo | To confirm |
|---|---|---|---|
| Berry Fir | £9 | 6.09.21 PM (1) | Base material: air-dry clay, or wood? Sealed or unsealed paint? |
| Snowman in a Scarf | £9 | 6.09.21 PM (2) | Same |
| Christmas Jumper | £9 | 6.09.21 PM (3) | Same |
| Snow Cottage | £9 | 6.09.21 PM (4) | Same |
| Holly Bell | £9 | 6.09.21 PM | Same |
| Snowflake Mitten | £9 | 6.10.11 PM | Same. This photo is landscape, so it sits in the frame with padding above and below; worth a portrait re-shoot |
| Reindeer Rounds, pair | £14 | 6.10.12 PM (1) | These look like painted wooden discs rather than clay. Which? Sold as a pair |
| Carol Bell | £9 | 6.10.12 PM (2) | Base material. Hung on jute, or twine? |
| Painted Bird | £9 | 6.10.12 PM | Base material |

The ornament photos have a composited Christmas backdrop (lights, baubles,
plaid). They look like a set, which is fine for now, but for the gallery look
we agreed they should be re-shot on the ivory backdrop like everything else.

### Earrings

| Piece | Price | From photo | To confirm |
|---|---|---|---|
| Rhubarb and Moss | £22 | 7.03.54 PM (1) | Pink cube: dyed quartzite, dyed jade, or glass? Green disc: glazed ceramic? Ear wires: silver-plated or sterling? |
| Lavender Pond | £20 | 7.03.54 PM (3) | Lilac discs: ceramic or glass? Turquoise-tone spacers: real turquoise, dyed howlite, or glass? |
| Honey Gourd | £24 | 7.03.54 PM (4) | Carved yellow beads: yellow jade, agate, or glass? Gold-tone wires: plated or gold-filled? |
| Confetti Loop | £22 | 7.03.54 PM | Millefiori is glass (confident). Ear wires plating |
| Sunset Shell | £22 | 7.03.55 PM (1) | Swirl beads: glass or resin? Cream coins: shell, bone, or resin? |
| Glacier Drop | £24 | 7.03.55 PM | Blue faceted bead: aquamarine, dyed quartz, or glass? Hex spacers: brass or plated? |

Photo 7.03.54 PM (2) is a second view of **Festival Red**, already on the site.
I have attached it as its second photo. Please confirm it is the same pair.

The earring photos show them on "Handmade with love" kraft cards. That is your
packaging and fine to show, but the site itself never uses that phrase.

### Bracelets and rings (a new category)

Your four categories had no home for these, so the site now has a fifth,
"Bracelets & rings". If you would rather they sat elsewhere, say so.

| Piece | Price | From photo | To confirm |
|---|---|---|---|
| Seed Bead Rings | £4 each | 7.57.51 PM (1) | Nine rings in one photo. Priced per ring; see bundles below. Stretch elastic? |
| Two Roads (necklace, listed below) | | | |
| Sky Stones | £24 | 7.57.52 PM (1) | Large blue beads: dyed quartzite, aquamarine, blue jade, or glass? |
| Tide Pool | £22 | 7.57.52 PM (2) | Mottled orange and green beads: dyed impression jasper, or glass? Turquoise-tone discs |
| Lemon Path | £20 | 7.57.52 PM (3) | Chips: turquoise-tone, rose quartz-tone, dalmatian-tone. Which are real? Clasp plating |
| Meadow Path | £20 | 7.57.52 PM (4) | Stone chips; red round bead (coral, dyed howlite, or glass?); gold-tone clasp plating |
| Chevron Knot | £22 | 7.57.52 PM (5) | Red rounds: coral, bamboo coral, or dyed? Blue rounds: sodalite or lapis-tone? Chevron beads are glass (confident) |
| Speckled Pebble | £22 | 7.57.52 PM | Dalmatian jasper? (looks right, please confirm) |
| Rose Milk | £24 | 7.57.53 PM | Pink rounds: rose quartz or dyed quartzite? Fuchsia bead: agate or glass? |

Five bracelet photos are square; they sit in the 4:5 frame with a little
padding top and bottom.

### Necklaces

| Piece | Price | From photo | To confirm |
|---|---|---|---|
| Two Roads | £38 | 7.57.51 PM | Deep red rounds: garnet, or dyed? Filigree ball and charms: brass or brass-plated? Cord: cotton? |
| Parrot in the Garden | £45 | 7.57.53 PM (1) | The embroidered pocket: your own embroidery? Fabric and thread? |
| Chevron Sea Set | £58 | 7.57.53 PM (2) | Red rounds: coral, bamboo coral, or dyed? Blue: sodalite? Large striped focal: glass or resin? Clasp and wires plating |

Photo 7.57.53 PM (3) is a second view of **Marigold Mela**, already on the site,
now attached as its second photo. Please confirm.

## Bundles and sets to decide

The site has one price per piece. These are the set prices I suggest; the
buy flow for sets is explained separately before it is built.

- Festive ornaments: any three for £24 (£9 each otherwise).
- Reindeer Rounds are already priced as a pair, £14.
- Seed Bead Rings: £4 each, three for £10.
- Chevron Sea Set: £58 for necklace and earrings together. If you want them
  separately, I suggest £48 and £14.
- Lemon Path and Meadow Path: the pair for £36 (£20 each otherwise).

## Photos, honestly

All twenty-eight are 1086 or 1254 pixels wide, under the 1200 the pipeline
asks for on the tall ones, so they will look slightly soft on a phone. They
also carry composited backgrounds (Christmas scene, beach, garden), which are
the "AI-looking" style we agreed to move away from. They are good enough to
list with, and the re-shoot on the ivory backdrop can replace them one at a
time: drop the new photo in `photos-inbox` with the same file name and run
`npm run images`.

## Names, in case you want to change any

Berry Fir, Snowman in a Scarf, Christmas Jumper, Snow Cottage, Holly Bell,
Snowflake Mitten, Reindeer Rounds pair, Carol Bell, Painted Bird, Rhubarb and
Moss, Lavender Pond, Honey Gourd, Confetti Loop, Sunset Shell, Glacier Drop,
Seed Bead Rings, Sky Stones, Tide Pool, Lemon Path, Meadow Path, Chevron
Knot, Speckled Pebble, Rose Milk, Two Roads, Parrot in the Garden, Chevron
Sea Set. A rename is one edit to the `name` line; the slug and photo can stay.

## Stories rewritten on 26 September, please read

Twenty-one older pieces had a caption or a single sentence where the story
should be. Each now has a two to four sentence story written only from the
materials line and the name, in the same voice as the rest. Nothing new is
claimed about materials. If any of these is wrong about what the piece is,
tell me and it is a one-line edit.

Marigold Mela, Bamboo Grove, the five Posy Page Clips (Rose & Leaf, Blush &
Dove, Berry & Emerald, Marigold & Navy, Lilac & Lagoon), the two Mela Clay
Charms (The Star & Gourd, The Toadstool & Blossom), nine Mela Magnets (Peacock
Stream, Lily Pebble, Little Palm, Pink Cat, Blueberry I, Lemon Grove,
Orange Ibex, Red Dog, Starry Pot), and the three bag charms (Tota, Strawberry
Fields, Matki).

Update, later the same day: the five Posy Page Clips are now one listing,
"Posy Page Clips", £6 per clip, and the two Mela Clay Charms are one listing,
"Mela Clay Charms", £12 per charm. Each story lists the options in the order
they appear in the photo and the buyer says which they want in the note box
on the payment page. The old addresses redirect. If you would rather each had
its own page, photograph each clip and charm on its own and I will split them
back out.
