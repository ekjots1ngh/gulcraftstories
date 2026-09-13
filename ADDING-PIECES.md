# Adding pieces to the website

This is the whole routine. Four commands, in this order, and the website
updates itself when the changes are sent up. If anything goes wrong, the
last section says what to do.

## 1. Take the photos

- One ivory backdrop (a large sheet of card or a plain cloth), the same one every time.
- Window light, no flash. Morning or afternoon by a window is perfect.
- Phone camera is fine. Hold it steady, or lean on something.
- Portrait orientation (phone upright), the piece filling most of the frame.
- One photo per piece is enough. A second angle is a bonus.
- Send the photos as JPEGs, not HEIC. On an iPhone, export or share as "JPEG"
  or "Most compatible".

## 2. Name the photo files

Each file is named after the piece, in lowercase with hyphens:

    marigold-morning.jpg
    marigold-morning-2.jpg      (a second photo of the same piece)

Put them in the folder called `photos-inbox`.

## 3. Add the piece

For one piece, in the terminal at the project folder:

    npm run add-piece

It asks for the name, the category (Necklaces, Earrings, Crochet or Clay), the
price in pounds, the materials (separated by semicolons), and the story.
Press Enter to accept a suggestion shown in brackets. It writes the piece into
the list for you.

For a batch, fill in a spreadsheet with these columns and save it as CSV:

    name, category, price, materials, story, images, madeOn, collection

There is an example in `pieces-template.csv`. Materials go in one cell
separated by semicolons. Leave `images` empty to use `<name>.jpg`. Then:

    npm run add-pieces the-file.csv

If any row has a problem, nothing is added and it tells you which row.

## 4. Process the photos, then check everything

    npm run images
    npm run check-pieces

`images` makes the web-sized versions and moves your originals into
`photos-archive` (keep that folder, it is your backup). It will tell you if a
photo was not portrait 4:5 (it gets padded, and is worth re-shooting) or is
small (under 1200 px wide, will look soft on a phone).

`check-pieces` looks at every piece and says "OK" or lists what is wrong.

## 5. Send it up

    git add -A
    git commit -m "Add Marigold Morning"
    git push

The check runs again automatically when you commit and when the site builds,
so a broken entry cannot reach the website.

## When a piece sells

    npm run sold marigold-morning

Then commit and push as above. To put it back on sale: `npm run unsold marigold-morning`.

## If the check fails

It prints the piece and the reason. The reasons it can give:

- **image files missing**: the photo was not in `photos-inbox` when you ran
  `npm run images`, or the file name does not match the slug. Put it in and run
  `npm run images` again.
- **not 4:5**: run `npm run images` again; if it keeps saying so, re-shoot in portrait.
- **price must be above zero**: fix the price in `src/lib/products.ts` or delete and re-add.
- **story is empty**: write the story, even a short one, in `src/lib/products.ts`.
- **name over 40 characters**: shorten the name.
- **duplicate slug**: two pieces have the same name. Give one a different name.

The list of pieces lives in one file, `src/lib/products.ts`. Each piece is one
block between `{` and `},`. You can edit it by hand with a text editor if you
need to, then run `npm run check-pieces` to make sure it is still right.
