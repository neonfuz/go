export default function mousepos(node, n) {
    let svg = node.parentNode;
    while (svg && svg.tagName !== 'svg')
        svg = svg.parentNode;

    let pt = svg.createSVGPoint();
    const getPos = e => {
        pt.x = e.clientX;
        pt.y = e.clientY;
        const pos = pt.matrixTransform(svg.getScreenCTM().inverse())
        return {
            x: Math.floor(pos.x+0.5),
            y: Math.floor(pos.y+0.5),
        };
    }
    const dispatch = (label, detail) => node.dispatchEvent(
        new CustomEvent(label, {detail}));
    const hover = e => e.isPrimary && dispatch('piece-hover', getPos(e));
    const unhover = e => dispatch('piece-unhover');
    const place = e => dispatch('piece-place', getPos(e));

    node.addEventListener('pointerover', hover);
    node.addEventListener('pointermove', hover);
    node.addEventListener('pointerleave', unhover);
    node.addEventListener('pointerup', place);
    return {
        destroy() {
            node.removeEventListener('pointerover', hover);
            node.removeEventListener('pointermove', hover);
            node.removeEventListener('pointerleave', unhover);
            node.removeEventListener('pointerup', place);
        }
    }
}
