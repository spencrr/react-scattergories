const httpProxy = require("http-proxy");

const serverPort = process.env.PORT || 5000;

const proxy = httpProxy.createServer({
    target: `http://localhost:${serverPort}/`,
});

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    buildOptions: {
        out: "../build",
    },
    mount: {
        public: "/",
        src: "/dist",
    },
    optimize: {
        bundle: true,
        splitting: true,
        treeshake: true,
        manifest: true,
        minify: true,
    },
    plugins: [
        [
            "@snowpack/plugin-babel",
            {
                input: [".js", ".mjs", ".jsx", ".ts", ".tsx"],
            },
        ],
    ],
    routes: [
        {
            src: "/api/.*",
            dest: (req, res) => proxy.web(req, res),
        },
    ],
};
