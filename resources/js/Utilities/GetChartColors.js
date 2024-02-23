export const GetChartColors = (numColors) => {
    let colors = new Set();
    while (colors.size < numColors) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 128);
        const b = Math.floor(Math.random() * 256);
        colors.add([`rgba(${r}, ${g}, ${b}, 0.5)`, `rgba(${r}, ${g}, ${b}, 1)`]);
    }
    return Array.from(colors);
}
