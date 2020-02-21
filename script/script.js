const Config = {
    name: "user",
    scale: 1,
    Links: [
        [
            "site",
            [
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"]
            ]
        ],
        [
            "site",
            [
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"]
            ]
        ],
        [
            "site",
            [
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"]
            ]
        ],
        [
            "site",
            [
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"],
                ["link", "https://www.example.com"]
            ]
        ]
    ]
}

const Main = (() => {
    const list = document.getElementById("list");
    const names = document.querySelectorAll("[data-Name]");
    const search = document.getElementById("search");
    const main = document.getElementsByTagName("main")[0];
    const html = document.getRootNode().children[0];
    const form = document.forms[0];

    const init = () => {
        list.innerHTML = Config.Links.map(([gName, Links]) => `
            <li>
                <h1 onclick="this.parentNode.classList.toggle('hideChildren')">${gName}</h1>
                    <ul class="ulWrap" style="--linkCount: ${Links.length};">
                    ${Links.map(([lName, url]) => `
                        <li>
                            <a href="${url}">${lName}</a>
                        </li>`
                    ).join("")}
                    </ul>
            </li>` 
        ).join("")
        
        names.forEach(el => {
            el.innerText = Config.name;
        });

        document.addEventListener("keydown", e => e.key.length === 1 && search.focus());
        search.addEventListener("keydown", () => (window.event ? event.keyCode : e.which) == 13 && form.submit());

        main.style.setProperty("--categorys", Config.Links.length);
        main.style.setProperty("--totalLinks", Config.Links.reduce((prev, cur) => prev + cur[1].length, 0));
        html.style.fontSize = Config.scale * 20 + "px";
    };

    return {
        init,
    };
})();

Main.init()
