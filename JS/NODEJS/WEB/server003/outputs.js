const fs = require('fs');
const content = fs.readFileSync('content_text', 'utf-8');
const outputs = {

 html : `
	<html>
		<head> 
			<title>Server003</title>
			<link rel='stylesheet' href='style.css'/>
		</head>
		<body>
			<blockquote>${content}</blockquote>
			<script src = "script.js"></script>
		</body>
	</html>

`,
 css : `
	body {
      background-color: #180331;
      color: white;
      font-size: 23px;
    }

    a {
      color: #abbd29;
    }
`,

js : ` 
	document.body.onclick = () => console.log('script work')`
};

module.exports = outputs;
