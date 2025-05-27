import React from 'react';
import AceEditor from 'react-ace';
import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';

// Import Ace Editor themes and modes
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-github'; // Add light theme
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-kotlin';
// Import your preferred light theme
import 'ace-builds/src-noconflict/theme-chrome'; // or any other light theme


// Import snippets for each language
import 'ace-builds/src-noconflict/snippets/java';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/c_cpp';
import 'ace-builds/src-noconflict/snippets/ruby';
import 'ace-builds/src-noconflict/snippets/golang';
import 'ace-builds/src-noconflict/snippets/rust';
import 'ace-builds/src-noconflict/snippets/kotlin';

ace.config.set("basePath", "/node_modules/ace-builds/src-noconflict");

const CodeEditor = ({ mode, theme, value, onChange, placeholder }) => {
  return (
    <div className="rounded overflow-hidden">
      <AceEditor
        width="100%"
        height="62vh"
        mode={mode}
        theme={theme}
        name="code-editor"
        onChange={onChange}
        fontSize={14}
        value={value}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        setOptions={{
          showLineNumbers: true,
          tabSize: 4,
          placeholder: placeholder || 'Start typing your code here...',
        }}
      />
    </div>
  );
};

export default CodeEditor;
