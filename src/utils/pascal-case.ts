import { camelCase, upperFirst } from 'lodash';

export const pascalCase = (name: string): string => upperFirst(camelCase(name));
