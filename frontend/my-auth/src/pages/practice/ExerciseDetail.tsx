import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import './exerciseDetail.css';
import Split from 'react-split';

function ExerciseDetail() {
  const { slug, difficulty } = useParams();

  const [code, setCode] = useState(`function solve(arr) {

    return arr.sort((a,b)=>a-b)

  }
  console.log( solve([5,4,3,2,1]) );
  `);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const [submitResult, setSubmitResult] = useState('');

  const [activeCase, setActiveCase] = useState(0);

  const handleSubmit = async () => {

    if (
      output.trim() ===
      testCases[activeCase].expected
    ) {

      setSubmitResult('Accepted ✅');

    } else {

      setSubmitResult('Wrong Answer ❌');

    }
  };



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



const handleRunCode = async () => {

  try {

    setOutput('Running...');

    const wrappedCode = `

${code}

console.log(
  JSON.stringify(
    solve([5,4,3,2,1])
  )
)

`;

    const response = await fetch(
      'https://judge0-ce.p.sulu.sh/submissions?base64_encoded=false&wait=true',
      {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({

          source_code: wrappedCode,

          language_id: 63,

        }),
      }
    );

    const result = await response.json();

    console.log(result);

    if (result.stdout) {

      setOutput(result.stdout);

    } else if (result.stderr) {

      setOutput(result.stderr);

    } else if (result.compile_output) {

      setOutput(result.compile_output);

    } else {

      setOutput('No output');

    }

  } catch (error) {

    console.error(error);

    setOutput('Compile Error');

  }
};





return (

  <Split
    className='exercise-detail'
    sizes={[40, 60]}
    minSize={300}
    gutterSize={8}
  >

    {/* LEFT */}
    <div className='exercise-left'>

      <h1>{slug}</h1>

      <p className='difficulty'>
        {difficulty}
      </p>

      <h2>Description</h2>

      <p>
        Write a sorting algorithm that sorts
        numbers from smallest to largest.
      </p>

      <div className='example-box'>

        <h3>Example</h3>

        <p>Input:</p>
        <code>[5,4,3,2,1]</code>

        <p>Output:</p>
        <code>[1,2,3,4,5]</code>

      </div>

    </div>

    {/* RIGHT */}
    <div className='exercise-right'>

      {/* TOP */}
      <div className='editor-header'>

        <select>
          <option>JavaScript</option>
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

      {/* SPLIT TOP/BOTTOM */}
      <Split
        direction='vertical'
        className='editor-split'
        sizes={[70, 30]}
        minSize={100}
        gutterSize={8}
      >

        {/* EDITOR */}
        <div className='editor-container'>

          <Editor
            height='100%'
            defaultLanguage='javascript'
            value={code}
            onChange={(value) => setCode(value || '')}
            theme='vs-dark'
          />

        </div>

        {/* TESTCASE */}
        <div className='bottom-panel'>

          <div className='testcase-tabs'>

            {testCases.map((_, index) => (
              <div
                key={index}
                className={
                  activeCase === index
                    ? 'testcase-tab active'
                    : 'testcase-tab'
                }

                onClick={() => setActiveCase(index)}
              >
                Case {index + 1}
              </div>
            ))}

          </div>

          <div className='submit-result'> 
            {submitResult} 
          </div>

          <div className='console-box'>

            <p>
              <strong>Input:</strong>
            </p>

            <code>
              {testCases[activeCase].input}
            </code>

            <br />
            <br />

            <p>
              <strong>Expected:</strong>
            </p>

            <code>
              {testCases[activeCase].expected}
            </code>

            <br />
            <br />

            <p>
              <strong>Your Output:</strong>
            </p>

            <code>
              {output}
            </code>

          </div>

        </div>

      </Split>

    </div>

  </Split>


  );


}

export default ExerciseDetail;

