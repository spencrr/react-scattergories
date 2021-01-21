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
} ;
