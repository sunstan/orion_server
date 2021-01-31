module.exports = plop => {
    plop.setGenerator('entity', {
        description: 'application entity logic',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Entity name',
            },
            {
                type: 'input',
                name: 'table',
                message: 'Table name',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/api/{{dashCase name}}/{{dashCase name}}.entity.ts',
                templateFile: 'templates/modules/template.entity.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/api/{{dashCase name}}/{{dashCase name}}.module.ts',
                templateFile: 'templates/modules/template.module.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/api/{{dashCase name}}/{{dashCase name}}.resolver.ts',
                templateFile: 'templates/modules/template.resolver.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/api/{{dashCase name}}/{{dashCase name}}.repository.ts',
                templateFile: 'templates/modules/template.repository.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/api/{{dashCase name}}/{{dashCase name}}.service.ts',
                templateFile: 'templates/modules/template.service.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/api/{{dashCase name}}/dto/create-{{dashCase name}}.dto.ts',
                templateFile: 'templates/modules/dto/create-template.dto.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/api/{{dashCase name}}/dto/update-{{dashCase name}}.dto.ts',
                templateFile: 'templates/modules/dto/update-template.dto.ts.hbs',
            },
            {
                type: 'append',
                path: 'src/api/api.module.ts',
                pattern: '// INJECT_TEMPLATE_IMPORT',
                template: 'import { {{pascalCase name}}Module } from \'./{{dashCase name}}/{{dashCase name}}.module\';',
            },
            {
                type: 'append',
                path: 'src/api/api.module.ts',
                pattern: '// INJECT_TEMPLATE_MODULE',
                template: '\t\t{{pascalCase name}}Module,',
            }
        ]
    })
}