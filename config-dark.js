module.exports = {
  format: {
    customFormat: function({dictionary, options}) {
      return `[data-theme=dark]{\n
      ${dictionary.allTokens.map(token => {        
        if (token.name.includes('font-weight')) {
          if (!token.name.indexOf('f')) {
            return `--${token.name}: ${token.description};`
          }
          const fontWeight = dictionary
            .allTokens.find(item => {
              return item.type === 'fontWeights' && item.value === token.value
            }).description

          return `--${token.name}: ${fontWeight};`
        }
        return `--${token.name}: ${token.value};`
      }).join(`\n`)}\n } `
    }
  },

  source: ['tokens/dark/**/*.json'],
  platforms: {

    "css": {
      "transformGroup": "css",
      "buildPath": "./css/",
      "files": [{
        "destination": "variables-dark.css",
        "format": "customFormat",
        "options": {
          "outputReferences": true
        }
      },{
        "destination": "variables-dark.scss",
        "format": "scss/variables",
        "options": {
          "outputReferences": true
        }
      }]
    }
  }
};