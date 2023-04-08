/*
Language: Prisma
Author: Prismaster
Description: Language definition for Prisma schema files (.prisma)
*/

function prisma(hljs) {

    //Incluye tipos de variables, como String, Int, CustomType, etc. y palabras que siguen a palabras clave como datasource, generator, model, enum, etc.
    const PRISMA_TYPE = {
        className: 'prisma-type',
        begin: /(?<!\w)(?:Int|Float|Bool|String|DateTime|db|client|User|Todo|TodoStatus|Group)(?!\w)/
    };

    //Incluye palabras clave como datasource, generator, model, enum, etc.
    const PRISMA_KEYWORDS = {
        className: 'prisma-keyword',
        begin: /(?<!\w)(?:datasource|generator|model|enum)(?!\w)/
    };

    //Incluye strings, como por ejemplo la url del datasource
    const PRISMA_STRING = {
        className: 'prisma-string',
        variants: [
            hljs.QUOTE_STRING_MODE,
            { begin: '"""', end: '"""' }
        ]
    };

    //Incluye propiedades, como por ejemplo @id, @default, @unique, autoincrement, @relation, fields, references
    const PRISMA_PROPS = {
        className: 'prisma-prop',
        begin: /(?<!\w)(?:@id|@default|@unique|autoincrement|@relation|fields|references)(?!\w)/
    };

    //Incluye lo que serian los nombres de las columnas, por ejemplo id, name, email, password, etc.
    const PRISMA_FIELDS = {
        className: 'prisma-field',
        begin: /(?<!\w)(?:id|name|email|password|provider|url|todos|authorId|author|isFinished|description|users|title|status|groups|TODO|IN_PROGRESS|DONE)(?!\w)/
    };

    //Incluye los corchetes y parentesis
    const PRISMA_BRACKETS = {
        className: 'prisma-bracket',
        begin: /[()[\]]/,
    };

    //Incluye las llaves
    const PRISMA_BRACES = {
        className: 'prisma-brace',
        begin: /[{}]/,
    };

    //Asigna todo al nuevo lenguaje "prisma"
    return {
        name: 'Prisma',
        aliases: ['prisma'],
        case_insensitive: false,
        contains: [
            PRISMA_FIELDS,
            PRISMA_PROPS,
            PRISMA_BRACES,
            PRISMA_BRACKETS,
            PRISMA_KEYWORDS,
            PRISMA_TYPE,
            PRISMA_STRING
        ]
    };
}

module.exports = prisma;