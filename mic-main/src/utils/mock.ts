const microApps = {
    'micro-vie': {
        "name": "micro-vie",
        // "url": "http://localhost:8091",
        // "baseroute": 'vie',
        "url": "http://micro-adm.missxiaolin.com/vie",
        "inline": false,
        "destroy": false,
        "disableScopecss": true,
        "disableSandbox": false,
        "shadowDOM": false,
        "iframe": true,
        "systemCodes": [
            "vcc",
            "bba"
        ],
        "openBlank": false
    }, 
    'micro-cha': {
        "name": "micro-cha",
        // "url": "http://localhost:8092",
        // "baseroute": '/cha',
        "url": "http://micro-adm.missxiaolin.com/cha",
        "inline": false,
        "destroy": false,
        "disableScopecss": true,
        "disableSandbox": false,
        "shadowDOM": false,
        "iframe": true,
        "systemCodes": [
            "cha",
            "hba",
            "vsa"
        ],
        "openBlank": false
    },
}

export default microApps