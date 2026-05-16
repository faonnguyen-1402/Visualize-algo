import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';

import Header from '../../components/header';

import './exerciseDetail.css';

function ExerciseDetail() {

  const { slug, difficulty } = useParams();

  // =========================
  // LANGUAGES
  // =========================

  const languages = [
    {
      name: 'JavaScript',
      id: 63,
      monaco: 'javascript',
      starter: `function solve(arr){

  return arr.sort((a,b)=>a-b);

}

console.log(
  JSON.stringify(
    solve([5,4,3,2,1])
  )
);
`,
    },

    {
      name: 'Python',
      id: 71,
      monaco: 'python',
      starter: `def solve(arr):

    return sorted(arr)

print(
    solve([5,4,3,2,1])
)
`,
    },

    {
      name: 'C++',
      id: 54,
      monaco: 'cpp',
      starter: `#include <bits/stdc++.h>
using namespace std;

vector<int> solve(vector<int> arr){

    sort(arr.begin(), arr.end());

    return arr;
}

int main(){

    vector<int> arr = {5,4,3,2,1};

    vector<int> ans = solve(arr);

    for(int x : ans){
        cout << x << " ";
    }

    return 0;
}
`,
    },

    {
      name: 'Java',
      id: 62,
      monaco: 'java',
      starter: `import java.util.*;

public class Main {

    static int[] solve(int[] arr){

        Arrays.sort(arr);

        return arr;
    }

    public static void main(String[] args){

        int[] arr = {5,4,3,2,1};

        int[] ans = solve(arr);

        System.out.println(
            Arrays.toString(ans)
        );
    }
}
`,
    },
  ];

  // =========================
  // STATES
  // =========================

  const [selectedLanguage, setSelectedLanguage] =
    useState(languages[0]);

  const [code, setCode] =
    useState(languages[0].starter);

  const [output, setOutput] =
    useState('');

  const [runtime, setRuntime] =
    useState('');

  const [memory, setMemory] =
    useState('');

  const [status, setStatus] =
    useState('');

  const [submitResult, setSubmitResult] =
    useState('');

  const [activeCase, setActiveCase] =
    useState(0);

  const [passedCount, setPassedCount] =
    useState(0);

  const [failedCase, setFailedCase] =
    useState<any>(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const [submissionHistory, setSubmissionHistory] =
    useState<any[]>([]);

  // =========================
  // TESTCASES
  // =========================

  const testCases = [
    {
      input: '[5,4,3,2,1]',
      expected: '[1,2,3,4,5]',
    },

    {
      input: '[9,1,6,2]',
      expected: '[1,2,6,9]',
    },

    {
      input: '[3,7,2]',
      expected: '[2,3,7]',
    },
  ];

  // =========================
  // RUN CODE
  // =========================

  const handleRunCode = async () => {

    try {

      setIsRunning(true);

      setOutput('Running...');

      const response = await fetch(
        'https://judge0-ce.p.sulu.sh/submissions?base64_encoded=false&wait=true',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            source_code: code,

            language_id: selectedLanguage.id,

          }),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.stdout) {

        setOutput(result.stdout);

        setRuntime(
          result.time
            ? `${result.time}s`
            : 'N/A'
        );

        setMemory(
          result.memory
            ? `${result.memory} KB`
            : 'N/A'
        );

        setStatus('Accepted');

      } else if (result.stderr) {

        setOutput(result.stderr);

        setStatus('Runtime Error');

      } else if (result.compile_output) {

        setOutput(result.compile_output);

        setStatus('Compile Error');

      } else {

        setOutput('No Output');
      }

      setIsRunning(false);

    } catch (error) {

      console.error(error);

      setOutput('Compile Error');

      setIsRunning(false);
    }
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {

    setIsRunning(true);

    let passed = 0;

    setFailedCase(null);

    for (const tc of testCases) {

      try {

        const response = await fetch(
          'https://judge0-ce.p.sulu.sh/submissions?base64_encoded=false&wait=true',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({

              source_code: code,

              language_id:
                selectedLanguage.id,

            }),
          }
        );

        const result =
          await response.json();

        const userOutput =
          result.stdout?.trim();

        const expected =
          tc.expected.trim();

        if (
          userOutput?.includes(expected)
        ) {

          passed++;

        } else {

          setFailedCase({

            input: tc.input,

            expected: tc.expected,

            output: userOutput,

          });

          break;
        }

      } catch (error) {

        console.error(error);

        break;
      }
    }

    setPassedCount(passed);

    const finalResult =
      passed === testCases.length
        ? 'Accepted ✅'
        : 'Wrong Answer ❌';

    setSubmitResult(finalResult);

    setSubmissionHistory(prev => [
      {
        result: finalResult,
        runtime,
        memory,
        language: selectedLanguage.name,
        date: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    setIsRunning(false);
  };

  // =========================
  // CHANGE LANGUAGE
  // =========================

  const handleChangeLanguage = (
    languageName: string
  ) => {

    const found = languages.find(
      (lang) => lang.name === languageName
    );

    if (!found) return;

    setSelectedLanguage(found);

    setCode(found.starter);
  };

  return (

    <>

      <Header />

      <div className='leetcode-container'>

        <Split
          className='exercise-detail'
          sizes={[40, 60]}
          minSize={300}
          gutterSize={6}
        >

          {/* LEFT */}
          <div className='exercise-left'>

            <h1>{slug}</h1>

            <p className='difficulty'>
              {difficulty}
            </p>

            <h2>Description</h2>

            <p>
              Write a sorting algorithm
              that sorts numbers from
              smallest to largest.
            </p>

            <div className='example-box'>

              <h3>Example 1</h3>

              <p><strong>Input:</strong></p>

              <code>[5,4,3,2,1]</code>

              <p><strong>Output:</strong></p>

              <code>[1,2,3,4,5]</code>

            </div>

          </div>

          {/* RIGHT */}
          <div className='exercise-right'>

            {/* TOP BAR */}
            <div className='editor-header'>

              <select
                value={selectedLanguage.name}
                onChange={(e) =>
                  handleChangeLanguage(
                    e.target.value
                  )
                }
              >

                {languages.map((lang) => (

                  <option
                    key={lang.name}
                    value={lang.name}
                  >
                    {lang.name}
                  </option>

                ))}

              </select>

              <div className='editor-buttons'>

                <button
                  className='run-btn'
                  onClick={handleRunCode}
                >
                  Run
                </button>

                <button
                  className='submit-btn'
                  onClick={handleSubmit}
                >
                  Submit
                </button>

              </div>

            </div>

            {/* SPLIT */}
            <Split
              direction='vertical'
              className='editor-split'
              sizes={[70, 30]}
              minSize={100}
              gutterSize={6}
            >

              {/* EDITOR */}
              <div className='editor-container'>

                <Editor
                  height='100%'
                  language={
                    selectedLanguage.monaco
                  }
                  value={code}
                  onChange={(value) =>
                    setCode(value || '')
                  }
                  theme='vs-dark'
                />

              </div>

              {/* TEST RESULT */}
              <div className='bottom-panel'>

                <div className='testcase-tabs'>

                  {testCases.map(
                    (_, index) => (

                      <div
                        key={index}
                        className={
                          activeCase === index
                            ? 'testcase-tab active'
                            : 'testcase-tab'
                        }

                        onClick={() =>
                          setActiveCase(index)
                        }
                      >
                        Case {index + 1}
                      </div>

                    )
                  )}

                </div>

                <div className='result-panel'>

                  <h2>Test Result</h2>

                  {isRunning ? (

                    <div className='running-box'>
                      Running Testcases...
                    </div>

                  ) : (

                    <>

                      <div className='result-status'>
                        {submitResult || status}
                      </div>

                      <div className='passed-box'>

                        Passed:
                        {' '}
                        {passedCount}
                        /
                        {testCases.length}
                        {' '}
                        testcases

                      </div>

                      <div className='result-grid'>

                        <div className='result-card'>
                          <p>Runtime</p>
                          <h3>{runtime}</h3>
                        </div>

                        <div className='result-card'>
                          <p>Memory</p>
                          <h3>{memory}</h3>
                        </div>

                        <div className='result-card'>
                          <p>Language</p>
                          <h3>
                            {selectedLanguage.name}
                          </h3>
                        </div>

                      </div>

                      {failedCase && (

                        <div className='failed-case'>

                          <h3>
                            Wrong Answer Details
                          </h3>

                          <p><strong>Input:</strong></p>

                          <code>
                            {failedCase.input}
                          </code>

                          <p><strong>Expected:</strong></p>

                          <code>
                            {failedCase.expected}
                          </code>

                          <p><strong>Your Output:</strong></p>

                          <code>
                            {failedCase.output}
                          </code>

                        </div>

                      )}

                      {/* HISTORY */}
                      <div className='history-panel'>

                        <h2>Submission History</h2>

                        {submissionHistory.map(
                          (item, index) => (

                            <div
                              key={index}
                              className='history-item'
                            >

                              <span>
                                {item.result}
                              </span>

                              <span>
                                {item.language}
                              </span>

                              <span>
                                {item.runtime}
                              </span>

                              <span>
                                {item.memory}
                              </span>

                              <span>
                                {item.date}
                              </span>

                            </div>

                          )
                        )}

                      </div>

                    </>

                  )}

                </div>

              </div>

            </Split>

          </div>

        </Split>

      </div>

    </>

  );
}

export default ExerciseDetail;
