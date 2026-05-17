import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import { getExerciseDetail } from '../../services/exerciseService';
import Header from '../../components/header';
import './exerciseDetail.css';

function ExerciseDetail() {

  const { slug, difficulty } = useParams<{slug: string; difficulty: string}>();

  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  const languages = [
    {
      name: 'JavaScript',
      id: 63,
      monaco: 'javascript',
      starter: `function solve(arr){\n  return arr.sort((a,b)=>a-b);\n}\nconsole.log(JSON.stringify(solve([5,4,3,2,1])));\n`,
    },

    {
      name: 'Python',
      id: 71,
      monaco: 'python',
      starter: `def solve(arr):\n    return sorted(arr)\nprint(solve([5,4,3,2,1]))\n`,
    },

    {
      name: 'C++',
      id: 54,
      monaco: 'cpp',
      starter: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int> solve(vector<int> arr){\n    sort(arr.begin(), arr.end());\n    return arr;\n}\nint main(){\n    vector<int> arr = {5,4,3,2,1};\n    vector<int> ans = solve(arr);\n    for(int x : ans) cout << x << " ";\n    return 0;\n}\n`,
    },

    {
      name: 'Java',
      id: 62,
      monaco: 'java',
      starter: `import java.util.*;\npublic class Main {\n    static int[] solve(int[] arr){\n        Arrays.sort(arr);\n        return arr;\n    }\n    public static void main(String[] args){\n        int[] arr = {5,4,3,2,1};\n        int[] ans = solve(arr);\n        System.out.println(Arrays.toString(ans));\n    }\n}\n`,
    },
  ];

  // =========================
  // STATES
  // =========================

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const [code, setCode] = useState(languages[0].starter);

  const [output, setOutput] = useState('');

  const [runtime, setRuntime] = useState('');

  const [memory, setMemory] = useState('');

  const [status, setStatus] = useState('');

  const [submitResult, setSubmitResult] = useState('');

  const [activeCase, setActiveCase] = useState(0);

  const [passedCount, setPassedCount] = useState(0);

  const [failedCase, setFailedCase] = useState<any>(null);

  const [isRunning, setIsRunning] = useState(false);

  const [submissionHistory, setSubmissionHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchDetailData = async () => {
      if (!slug || !difficulty) return;
      try {
        setLoading(true);
        const data = await getExerciseDetail(slug, difficulty);
        setExercise(data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError('The exercise does not exist or there is a server connection error.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetailData();
  }, [slug, difficulty]);
  
  const realTestCases = exercise?.testCases || [];
  
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

    if (realTestCases.length === 0) {
      setSubmitResult('No test cases available ❌');
      return;
    }

    setIsRunning(true);

    let passed = 0;

    setFailedCase(null);

    for (const tc of realTestCases) {
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
              stdin: tc.input,
            }),
          }
        );

        const result = await response.json();

        const userOutput = result.stdout?.trim();

        const expected = (tc.expectedOutput || tc.expected || '').trim();

        if (
          userOutput?.includes(expected)
        ) {

          passed++;

        } else {

          setFailedCase({

            input: tc.input,

            expected: tc.expected,

            output: userOutput || 'No Output / Error',

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
      passed === realTestCases.length
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

  if (loading) return <div className="loading-screen" style={{color: '#fff', padding: '50px'}}>Đang tải nội dung bài tập...</div>;
  if (error || !exercise) return <div className="error-screen" style={{color: 'red', padding: '50px'}}>{error || 'Not found exercise'}</div>;

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
            <h1>{exercise.title}</h1>
            <p className={`difficulty ${exercise.difficulty?.toLowerCase()}`}>
              {exercise.difficulty}
            </p>

            <h2>Description</h2>
            <div className='description-text' style={{ whiteSpace: 'pre-line' }}>
              {exercise.description}
            </div>
           
            {exercise.constraints && (
              <>
                <h3>Constraints</h3>
                <p><code>{exercise.constraints}</code></p>
              </>
            )}

            {realTestCases.length > 0 && (
              <div className='example-box'>
                <h3>Example 1</h3>
                <p><strong>Input:</strong></p>
                <code>{realTestCases[0].input}</code>
                <p><strong>Output:</strong></p>
                <code>{realTestCases[0].expectedOutput || realTestCases[0].expected}</code>
              </div>
            )}

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

                  {realTestCases.map(
                    (_: any, index: number) => (

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
                        {realTestCases.length}
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
