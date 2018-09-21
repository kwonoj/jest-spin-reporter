import * as chalk from 'chalk';
import * as spinners from 'cli-spinners';
import * as humanize from 'humanize-duration';
import { create } from 'smart-spinner';

class JestSpinReporter implements jest.Reporter {
  private readonly spinner: ReturnType<typeof create>;
  private testCount: number = 0;

  constructor(_globalConfig: unknown, _options: unknown) {
    const spinnersList: Array<string> = Object.keys(spinners);
    const selectedSpinner: string = spinnersList[Math.floor(Math.random() * spinnersList.length)];
    this.spinner = create(`Preparing …`, [selectedSpinner]);
  }

  public onRunComplete?(_contexts: Set<jest.Context>, results: jest.AggregatedResult): jest.Maybe<Promise<void>> {
    const { numFailedTests, numPassedTests, numPendingTests, testResults, numTotalTests, startTime } = results;
    const duration = humanize(Date.now() - startTime);

    testResults
      .map(({ failureMessage }) => failureMessage)
      .filter(x => !!x)
      .forEach(x => console.log(x));

    const output = [
      numPassedTests ? `${chalk.default.green('✔')} ${numPassedTests}` : null,
      numPendingTests ? `${chalk.default.cyan('-')} ${numPendingTests}` : null,
      numFailedTests ? `${chalk.default.red('✘')} ${numFailedTests}` : null
    ].filter(x => !!x);

    this.spinner(numFailedTests ? false : true, `${output.join(', ')} / ${numTotalTests}, ${duration}`);
  }
  public onTestResult?(_test: jest.Test, _testResult: jest.TestResult, aggregatedResult: jest.AggregatedResult): void {
    const { numTotalTestSuites } = aggregatedResult;
    this.testCount += 1;

    this.spinner(`${this.testCount}/${numTotalTestSuites}`);
  }
}

module.exports = JestSpinReporter;
