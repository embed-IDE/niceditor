const React = require('react');
const ReactDom = require('react-dom');
const fs = require('fs');
const CodeMirror = require('codemirror');

require('codemirror/mode/javascript/javascript');
require('codemirror/addon/selection/active-line');
require('codemirror/addon/edit/matchbrackets');

class CodeBox extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const code = ReactDom.findDOMNode(this);

        this.doc = CodeMirror(code, {
            value: "// open a javascript file...",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            mode:  "javascript",
            theme: 'monokai'
        });
    }

    shouldComponentUpdate(props) {
        if (props.file !== this.file) {
            this.file = props.file;
            this.loadFile();
        }

        return false;
    }

    loadFile() {
        this.doc.setValue(fs.readFileSync(this.file, {encoding:'utf-8'}));
    }

    save() {
        if (!this.file) {
            return;
        }
        fs.writeFileSync(this.file, this.doc.getValue(), 'utf8');

        alert("保存成功");
    }

    render() {
        return <div className="codebox" />;
    }
}

module.exports = CodeBox;