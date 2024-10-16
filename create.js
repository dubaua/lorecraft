/*
CLI Tool for creating app modules.
usage: try in terminal

for component it will create name.tsx file, name.module.css file in components folder
node create.js c name
or scoped for nested folder structure
node create.js c scope/name

for service (without service suffix)
it will create name.service.ts name.service.stub.spec.ts name.service.spec.ts files in services folder
node create.js s name

for interface (without I prefix) it will create name.interface.ts in models folder
node create.js i name

for icon it will create name.svg in icons folder
node create.js icon name

for enum (without enum suffix) it will create name.enum.ts in models folder
node create.js e name

for model it will create name.model.ts and name.model.spec.ts in models folder
node create.js m name

for hook (without use preffix) it will create use-name.ts in hooks folder
node create.js h name

for utility method it will create name.ts and name.spec.ts in utils folder
node create.js u name

for type guard it will create name.guard.ts and name.guard.spec.ts in guards folder
node create.js g name
*/

/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const fs = require('fs');
const _ = require('lodash-core');

const [, , type, name] = process.argv;

const scope = type === 'c' && name.includes('/') ? `${name.split('/')[0]}/` : '';
const _name = scope ? name.split('/')[1] : name;
const kebabName = _.kebabCase(_name);
const camelName = _.camelCase(_name);
const PascalName = _.upperFirst(camelName);

switch (type) {
  case 'c':
    const dirPath = `src/components/${scope}${kebabName}`;
    createDirRecursively(dirPath);
    createFile(`${dirPath}/index.tsx`, createComponentContents(_name));
    createFile(`${dirPath}/${kebabName}.module.css`, `.${kebabName} {}`);
    // TODO create spec
    break;
  case 's':
    createDirRecursively(`src/services/${kebabName}`);
    createFile(`src/services/${kebabName}/${kebabName}.service.ts`, `export class ${PascalName}Service {}`);
    createFile(
      `src/services/${kebabName}/${kebabName}.service.stub.spec.ts`,
      `export class ${PascalName}ServiceStub {}`,
    );
    createFile(
      `src/services/${kebabName}/${kebabName}.service.spec.ts`,
      `import { ${PascalName}Service } from './${kebabName}.service';

describe('${PascalName}Service', () => {
  let service: ${PascalName}Service;

  beforeEach(() => {
    service = new ${PascalName}Service();
  });

  it('creates a service instance', () => {
    expect(service).toBeTruthy();
  });
});
`,
    );
    break;
  case 'i':
    createFile(`src/models/${kebabName}.interface.ts`, `export interface I${PascalName} {}`);
    break;
  case 'icon':
    createFile(
      `src/icons/source/${kebabName}.svg`,
      `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="" />
  </svg>`,
    );
    break;
  case 'e':
    createFile(
      `src/models/${kebabName}.type.ts`,
      `export const ${PascalName}s = {
  key: 'value',
} as const;

type Keys = keyof typeof ${PascalName}s;

export type ${PascalName}Type = (typeof ${PascalName}s)[Keys];
`,
    );
    break;
  case 'sl':
    createFile(
      `src/slices/${kebabName}.slice.ts`,
      `import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface I${PascalName}State {
  ${camelName}: never[];
}

const initialState: I${PascalName}State = {
  ${camelName}: [],
};

const ${camelName}Slice = createSlice({
  name: '${PascalName}',
  initialState,
  reducers: {
    set${PascalName}: (state, { payload }: PayloadAction<I${PascalName}State>) => {
      state.${camelName} = payload.${camelName};
    },
  },
});

export const ${PascalName}Actions = ${camelName}Slice.actions;
export const ${camelName}Reducer = ${camelName}Slice.reducer;
export type ${PascalName}ActionsType = typeof ${PascalName}Actions;
`,
    );
    break;
  case 'm':
    createFile(`src/models/${kebabName}.model.ts`, `export class ${PascalName} {}`);
    createFile(
      `src/models/${kebabName}.model.spec.ts`,
      `import { ${PascalName} } from './${kebabName}.model';

describe('${PascalName}', () => {
  it('properly works', () => {
    expect(new ${PascalName}()).toBeTruthy();
  });
});
`,
    );
    break;
  case 'h':
    createFile(`src/hooks/use-${kebabName}.ts`, `export function use${PascalName}(): any {}`);
    createFile(
      `src/hooks/use-${kebabName}.spec.ts`,
      `import { use${PascalName} } from './use-${kebabName}';

describe('use${PascalName}', () => {
  it('properly works', () => {
    expect(use${PascalName}('foo')).toBe('bar');
  });
});
`,
    );
    break;
  case 'u':
    createFile(`src/utils/${kebabName}.ts`, `export function ${camelName}(): any {}`);
    createFile(
      `src/utils/${kebabName}.spec.ts`,
      `import { ${camelName} } from './${kebabName}';

describe('${camelName}', () => {
  it('properly works', () => {
    expect(${camelName}('foo')).toBe('bar');
  });
});
`,
    );
    break;
  case 'p':
    createFile(
      `src/features/${PascalName}.tsx`,
      `import React from 'react';

export const ${PascalName}: React.FC = () => {
  return <h1>${PascalName}</h1>;
};
`,
    );
    break;
  case 'g':
    createFile(
      `src/guards/is-${kebabName}.guard.ts`,
      `export function is${PascalName}(theOnlyArgument: unknown): theOnlyArgument is any {
  return false;
}`,
    );
    createFile(
      `src/guards/is-${kebabName}.guard.spec.ts`,
      `import { is${PascalName} } from './is-${kebabName}.guard';

describe('is${PascalName}', () => {
  it('properly works', () => {
    expect(is${PascalName}('foo')).toBe(true);
  });
});
`,
    );
    break;
}

function createFile(path, contents) {
  fs.writeFileSync(path, contents, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`${path} was successfully created!`);
  });
}

function createDirRecursively(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createComponentContents(name) {
  const PascalName = _.upperFirst(_.camelCase(name));
  const kebabName = _.kebabCase(name);
  return `import React from 'react';
import styles from './${kebabName}.module.css';

type Props = {
  nameMe: string;
};

export const ${PascalName}: React.FunctionComponent<Props> = ({ nameMe }) => (
  <div className={styles.${kebabName}}>

  </div>
);`;
}
