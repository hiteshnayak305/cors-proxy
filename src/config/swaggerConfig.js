export const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Node Proxy",
            description:
                "A proxy server to resolve cors issue directly accessing public rest api s",
            contact: {
                email: "hiteshnayak305@noreply.github.com",
            },
            license: {
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html",
            },
            version: "1.0.1",
        },
        servers: [
            {
                url: "/",
            }
        ],
        tags: [
            {
                name: "Public",
                description: "Public endpoints",
            },
        ],
        components: {},
        security: [],
    },
    apis: ["../**/routes/*.js"], // files containing annotations as above
};
