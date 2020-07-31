export default function getTextWidth (txt) {
    const el = document.createElement('span');
    el.setAttribute("id", "widthInfo");
    el.innerHTML = txt;
    const elem = document.body.appendChild(el);
    const result = elem.offsetWidth;
    document.body.removeChild(el);
    return result;
}
