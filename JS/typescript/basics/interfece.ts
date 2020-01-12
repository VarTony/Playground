interface myObj {
    str: string,
    num?: number
    readonly x : number,
    readonly y : number
}

function protoInterfece(obj: { str: string, num?: number } ): void {
  console.log(obj, 'protoInterfece');
}

function protoInterfece2(obj: myObj ): void {
  console.log(obj, 'protoInterfece2');
}

const myObj = {str: 'string', num: 12};
const myObj2 = {str: 'string'};
const myObj3 = {str: 'string', x: 15, y: 25};

protoInterfece(myObj);
protoInterfece(myObj2);
protoInterfece2(myObj3);
