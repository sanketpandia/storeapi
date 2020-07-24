const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Store API Document',
        description: 'API for the Mo Store app',
        termsOfService: '',
        contact: {
            name: 'Marg Advisory Services',
            email: 'info@margadvisory.com',
            url: 'https://margadvisory.com'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        },
        
    },
    
    apis : ["./controllers/*.js",
            "./routes/routesMaster.js"]
}

module.exports ={
    swaggerDocument, swaggerDocument
}