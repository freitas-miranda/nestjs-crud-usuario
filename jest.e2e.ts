import 'reflect-metadata';
import { Config } from 'jest';
import { configBase } from './jest.config';

const config: Config = configBase;

config.testRegex = '.*\\.e2e-spec\\.ts$';
config.transform = { '^.+\\.(t|j)s$': 'ts-jest' };

export default config;
