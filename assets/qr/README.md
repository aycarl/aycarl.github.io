# QR code assets

QR codes pointing to <https://aycarl.com/links> for print use (CV top corner,
business cards, etc.). Not part of the site build — nothing in `/assets` is deployed.

- `aycarl-links-qr.svg` — vector, preferred for print/design tools (scales losslessly)
- `aycarl-links-qr.png` — 1200×1200 px raster fallback

Both are generated with error correction level **H** (~30% damage tolerance), so they
stay scannable through print artifacts and small sizes. Print at **1.5 cm × 1.5 cm or
larger** and keep the white quiet zone around the code intact.

Regenerate with:

```bash
npx --yes qrcode -e H -q 4 -t svg -o assets/qr/aycarl-links-qr.svg "https://aycarl.com/links"
npx --yes qrcode -e H -q 4 -w 1200 -t png -o assets/qr/aycarl-links-qr.png "https://aycarl.com/links"
```

The URL is printed on physical media — never repoint `/links` or remove the route
without accounting for CVs already in circulation.
