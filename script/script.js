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
                [
                    "site",
                    [
                        [
                            ["link", "https://www.example.com"],
                            ["link", "https://www.example.com"]
                        ]
                    ]
                ]
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
    ],
    Links2: [{
            name: "site",
            links: [{
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "site",
                    links: [{
                            name: "link",
                            url: "https://www.example.com"
                        },
                        {
                            name: "link",
                            url: "https://www.example.com"
                        }
                    ]
                },
            ]
        },
        {
            name: "site",
            links: [{
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "link",
                    url: "https://www.example.com"
                },
            ]
        },
        {
            name: "site",
            links: [{
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "link",
                    url: "https://www.example.com"
                },
            ]
        },
        {
            name: "site",
            links: [{
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "link",
                    url: "https://www.example.com"
                },
            ]
        },

    ]
}

const Main = (() => {
    const list = document.getElementById("list");
    const names = document.querySelectorAll("[data-Name]");
    const search = document.getElementById("search");
    const main = document.getElementsByTagName("main")[0];
    const html = document.getRootNode().children[0];
    const form = document.forms[0];

    const handleClick = h1El => {
        const ulSibling = h1El.nextElementSibling;
        const areOpening = ulSibling.parentNode.classList.contains("hideChildren");

        if (areOpening) {
            let parentUl = h1El.parentNode.parentNode;
            const thisHeight = +ulSibling.style.getPropertyValue("--height").slice(0, -2);

            while (parentUl.id !== "list") {
                parentUl.style.setProperty('--height', +window.getComputedStyle(parentUl).height.slice(0, -2) + thisHeight + "px");
                parentUl = parentUl.parentNode.parentNode;
            }
        } else {
            ulSibling.style.setProperty('--height', window.getComputedStyle(ulSibling).height);
        }

        requestAnimationFrame(() => {
            ulSibling.parentNode.classList[areOpening ? "remove" : "add"]('hideChildren')
        });
    };

    const createList = ({
        name,
        links,
        url
    }) => `
        <li>
            ${url ?
            `<a href="${url}">${name}</a>` :
            `<h1 onclick="Main.handleClick(this)">${name}</h1>
            <ul class="ulWrap">
                ${links.map(createList).join("")}
            </ul>`

            }
        </li> 
    `;

    const init = () => {
        html.style.fontSize = Config.scale * 20 + "px";

        names.forEach(el => {
            el.innerText = Config.name;
        });

        list.innerHTML = Config.Links2.map(createList).join("");

        document.addEventListener("keydown", e => e.key.length === 1 && search.focus());
        search.addEventListener("keydown", () => (window.event ? event.keyCode : e.which) == 13 && form.submit());

        requestIdleCallback(() => main.style.setProperty("--listHeight", getComputedStyle(list).height))
    }

    return {
        handleClick,
        init,
    };
})();

Main.init()