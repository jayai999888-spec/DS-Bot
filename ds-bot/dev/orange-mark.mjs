// The brand mark: the little orange from the 橘巴拉 IP, drawn on a 100 box. With its leaf it
// spans x 9..91 and y 4..94; ORANGE_BOX is that square, for fitting the whole mark.
// `id` prefixes the gradient and mask ids, so several marks can sit in one SVG. `ink` draws a one-colour silhouette with the face cut out (tray template, Android
// monochrome), since those are painted by the system.
export const ORANGE_BOX = { cx: 50, cy: 49, width: 90 }

const BODY = 'M50 23C73 21 90 36 90 57C90 78 72 93 50 93C28 93 10 78 10 57C10 36 27 21 50 23Z'
const LEAF = 'M51 21C53 10 64 4 78 6C76 17 66 24 51 21Z'
const STEM = 'M47.5 13.5a2.5 2.5 0 0 1 5 0V23h-5Z'
const MOUTH = 'M41 63.5Q50 78 59 63.5Z'

export function orangeMarkup({ id = 'om', ink = null } = {}) {
  if (ink) {
    return `<defs><mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/><ellipse cx="37" cy="54" rx="4.6" ry="5.8" fill="#000"/><ellipse cx="63" cy="54" rx="4.6" ry="5.8" fill="#000"/><path d="${MOUTH}" fill="#000"/><path d="M51 21C55 15 62 11 70 9" fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round"/></mask></defs><g mask="url(#${id}m)" fill="${ink}"><path d="${BODY}"/><path d="${LEAF}"/><path d="${STEM}"/></g>`
  }
  return `<defs><radialGradient id="${id}b" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#FFC24A"/><stop offset=".55" stop-color="#FF9F1C"/><stop offset="1" stop-color="#F07800"/></radialGradient><linearGradient id="${id}l" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3FA34D"/><stop offset="1" stop-color="#6CCB5F"/></linearGradient></defs>`
    + `<path d="${STEM}" fill="#7A4A1C"/>`
    + `<path d="${BODY}" fill="url(#${id}b)" stroke="#C25A00" stroke-width="2.4"/>`
    + `<ellipse cx="31" cy="38" rx="9" ry="5" transform="rotate(-32 31 38)" fill="#fff" fill-opacity=".55"/>`
    + `<path d="${LEAF}" fill="url(#${id}l)" stroke="#2E7D32" stroke-width="1.6" stroke-linejoin="round"/>`
    + `<path d="M51 21C55 15 62 11 70 9" fill="none" stroke="#2E7D32" stroke-width="1.4" stroke-linecap="round"/>`
    + `<ellipse cx="25" cy="65" rx="6.5" ry="4" fill="#FF5A5A" fill-opacity=".45"/><ellipse cx="75" cy="65" rx="6.5" ry="4" fill="#FF5A5A" fill-opacity=".45"/>`
    + `<ellipse cx="37" cy="54" rx="4.6" ry="5.8" fill="#2B1A0E"/><ellipse cx="63" cy="54" rx="4.6" ry="5.8" fill="#2B1A0E"/>`
    + `<circle cx="38.6" cy="51.8" r="1.6" fill="#fff"/><circle cx="64.6" cy="51.8" r="1.6" fill="#fff"/>`
    + `<path d="${MOUTH}" fill="#7A2414" stroke="#5A1A0E" stroke-width="1.2" stroke-linejoin="round"/>`
    + `<path d="M45.2 70.2Q50 66.5 54.8 70.2Q50 74.2 45.2 70.2Z" fill="#FF7A7A"/>`
}
