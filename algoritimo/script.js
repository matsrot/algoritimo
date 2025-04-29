const videos = [
    { id: 1, title: "Como tocar violão", tags: ["música"], views: 1000 },
    { id: 2, title: "Gols da rodada", tags: ["esporte"], views: 900 },
    { id: 3, title: "Piadas engraçadas", tags: ["comédia"], views: 800 },
    { id: 4, title: "Aula de bateria", tags: ["música"], views: 700 },
    { id: 5, title: "Desafio de futebol", tags: ["esporte", "comédia"], views: 950 },
    { id: 6, title: "Stand-up show", tags: ["comédia"], views: 1200 },
];

let historico = [];

function renderVideos() {
    const container = document.getElementById("video-list");
    container.innerHTML = "";
    videos.forEach(video => {
        const div = document.createElement("div");
        div.className = "video";
        div.innerHTML = `<strong>${video.title}</strong><br><small>${video.tags.join(", ")}</small>`;
        div.onclick = () => assistirVideo(video);
        container.appendChild(div);
    });
}

function assistirVideo(video) {
    alert(`Você assistiu: ${video.title}`);
    historico.push(video);
    atualizarRecomendacoes();
}

function atualizarRecomendacoes() {
    const container = document.getElementById("recommendation-list");
    container.innerHTML = "";

    const tagsAssistidas = new Set(historico.flatMap(v => v.tags));
    const assistidosIds = new Set(historico.map(v => v.id));

    const recomendados = videos
        .filter(v => !assistidosIds.has(v.id) && v.tags.some(tag => tagsAssistidas.has(tag)))
        .sort((a, b) => b.views - a.views)
        .slice(0, 3);

    recomendados.forEach(video => {
        const div = document.createElement("div");
        div.className = "video";
        div.innerHTML = `<strong>${video.title}</strong><br><small>${video.tags.join(", ")}</small>`;
        container.appendChild(div);
    });
}

renderVideos();
