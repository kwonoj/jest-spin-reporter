import * as chalk from 'chalk';
import * as spinners from 'cli-spinners';
import * as prettyMs from 'pretty-ms';
import { create } from 'smart-spinner';

class JestSpinReporter implements jest.Reporter {
  private static readonly charMap = {
    pass: chalk.default.green('✔'),
    skip: chalk.default.cyan('-'),
    fail: chalk.default.red('✘')
  };
  private readonly spinner: ReturnType<typeof create>;
  private testCount: number = 0;

  constructor(_globalConfig: unknown, _options: unknown) {
    const spinnersList: Array<string> = Object.keys(spinners);
    const selectedSpinner: string = spinnersList[Math.floor(Math.random() * spinnersList.length)];
    this.spinner = create(`Preparing …`, [selectedSpinner]);
  }

  public onRunComplete?(_contexts: Set<jest.Context>, results: jest.AggregatedResult): jest.Maybe<Promise<void>> {
    const { numFailedTests, numPassedTests, numPendingTests, testResults, numTotalTests, startTime } = results;
    const duration = prettyMs(Date.now() - startTime);

    return new Promise(resolve => {
      testResults
        .map(({ failureMessage }) => failureMessage)
        .filter(x => !!x)
        .forEach(x => console.log(x));

      const output = [
        numPassedTests ? `${JestSpinReporter.charMap.pass} ${numPassedTests}` : null,
        numPendingTests ? `${JestSpinReporter.charMap.skip} ${numPendingTests}` : null,
        numFailedTests ? `${JestSpinReporter.charMap.fail} ${numFailedTests}` : null
      ].filter(x => !!x);

      this.spinner(numFailedTests ? false : true, `${output.join(', ')} / ${numTotalTests}, ${duration}`);
      resolve();
    });
  }
  public onTestResult?(_test: jest.Test, _testResult: jest.TestResult, aggregatedResult: jest.AggregatedResult): void {
    const { numTotalTestSuites } = aggregatedResult;
    this.testCount += 1;

    this.spinner(`${this.testCount}/${numTotalTestSuites}`);
  }
}

module.exports = JestSpinReporter;
