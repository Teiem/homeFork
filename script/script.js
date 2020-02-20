const Config = {
    name: "user",
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

    const init = () => {
        list.innerHTML = Config.Links.map(([gName, Links]) => `
            <li>
                <h1>${gName}<h1>
                <ul>
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

        document.addEventListener("keydown", e => e.key.length === 1 && search.focus())
    };

    return {
        init,
    };
})();

Main.init()
