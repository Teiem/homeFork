const Config = {
    name: "user",
    scale: 1,
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
            name: "site0",
            links: [{
                    name: "link",
                    url: "https://www.example.com"
                },
                {
                    name: "site1",
                    links: [{
                            name: "site2",
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
                    name: "site1",
                    links: [{
                            name: "link",
                            url: "https://www.example.com"
                        },
                        {
                            name: "link",
                            url: "https://www.example.com"
                        },
                        {
                            name: "site2",
                            links: [{
                                    name: "link",
                                    url: "https://www.example.com"
                                },
                                {
                                    name: "link",
                                    url: "https://www.example.com"
                                },
                                {
                                    name: "site3",
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
                            ]
                        },
                        {
                            name: "link",
                            url: "https://www.example.com"
                        },
                    ]
                },
                {
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
                            ]
                        },
                        {
                            name: "link",
                            url: "https://www.example.com"
                        },
                    ]
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

    const toggleExpand = h1El => {
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
            `<h1 onclick="Main.toggleExpand(this)">${name}</h1>
            <ul class="ulWrap">
                ${links.map(createList).join("")}
            </ul>`

            }
        </li> 
    `;

    const _getLevel = level => list.querySelectorAll("#list" + " > li > ul".repeat(level) + "> li > h1");

    /**
     * TODO
     * @param {Array} arr [number, index]
     * @param {number} target 
     */
    const _coverNumber = (arr, target) => {
        let resArr = [...arr];
        let remain = arr.reduce((acc, [cur]) => cur + acc, 0) - target;

        [...arr].sort(([a], [b]) => a - b).reverse().some(([el]) => {
            if (el === remain) {
                resArr.splice(resArr.indexOf(el), 1);
                return true;

            } else if (el < remain) {
                resArr.splice(resArr.indexOf(el), 1);
                remain -= el;

            }
        })

        console.log(resArr, remain + target);
        return resArr;
    };

    const collapseN = (remaining, knownStartLevel) => {
        let search;
        let level = knownStartLevel || 0;

        search = _getLevel(level);
        dance: while (!knownStartLevel) {
            const next = _getLevel(level + 1);

            if (!next.length) {
                break dance;
            }
            level++;
            search = next;
        }

        const curLevelSize = [...search].map(node => node.nextElementSibling.childElementCount).reduce((acc, cur) => cur + acc);

        if (curLevelSize === remaining || level === 0) {
            [...search].forEach(toggleExpand);

        } else if (curLevelSize < remaining) {
            [...search].forEach(toggleExpand);
            collapseN(remaining - curLevelSize, level - 1);

        } else {
            _coverNumber([...search].map(el => [el.nextElementSibling.childElementCount, el]), remaining).forEach(([, el]) => toggleExpand(el));

        }
    };

    const init = () => {
        html.style.fontSize = Config.scale * 20 + "px";

        names.forEach(el => {
            el.innerText = Config.name;
        });

        list.innerHTML = Config.Links2.map(createList).join("");

        const mainHeight = ((document.querySelectorAll("#list li").length + 4) * 1.3 + 1.8125);
        const windowHeight = window.innerHeight * 0.95 / (20 * Config.scale);
        if (windowHeight < mainHeight) collapseN(Math.ceil(mainHeight - windowHeight));

        document.addEventListener("keydown", e => e.key.length === 1 && search.focus());
        search.addEventListener("keydown", () => {
            (window.event ? event.keyCode : e.which) == 13 && form.submit();
            search.style.height = "";
            search.style.height = search.scrollHeight + "px";
        });

        main.style.setProperty("--listHeight", mainHeight * (20 * Config.scale) + "px");
        requestAnimationFrame(() =>
            requestAnimationFrame(() =>{
                main.classList.remove("noTransition");
                window.scrollTo(0, 0);
            }))
    }

    return {
        toggleExpand,
        init,
    };
})();

Main.init()