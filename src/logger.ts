/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-console  */
import chalk from 'chalk';
import { table } from 'table';

export default {
  debug: (input: any): void => console.log(input),
  info: (input: any): void => console.log(chalk.cyanBright(input)),
  warning: (input: any): void => console.log(chalk.yellow(input)),
  error: (input: any): void => console.log(chalk.red(input)),
  success: (input: any): void => console.log(chalk.greenBright(input)),
  table: (data: number[][]): void =>
    console.log(chalk.whiteBright(table(data))),
};
