



const doc = document.body;



let rand =  0;
i = 10000;
const text = [];
const p = [];
const div = [];
while(i > 0) {
	rand = Math.floor(Math.random() * (12131217 - 0)) + 0;
	i--;
	text.push(document.createTextNode(`${rand.toString(16)}`));
	p.push(document.createElement('p'));
	div.push(document.createElement('div'));

}

while(i <= 1000) {
	i++;
	// p[i].append(text[i]);
	div[i].append(text[i]);
}

div.forEach(e => doc.append(e));

const divs = document.querySelectorAll('div');
divs.forEach(e => e.onclick = f);
function f() { 
	rand = Math.floor(Math.random() * (12131217 - 0)) + 0;
	this.style.backgroundColor = `#${rand.toString(16)}`
};


