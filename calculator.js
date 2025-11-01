const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        throw new Error('لا يمكن القسمة على صفر!');
    }
    return num1 / num2;
}

function showMenu() {
    console.log('\n=================================');
    console.log('    مرحباً بك في الآلة الحاسبة    ');
    console.log('=================================');
    console.log('\nاختر العملية:');
    console.log('1. الجمع (+)');
    console.log('2. الطرح (-)');
    console.log('3. الضرب (×)');
    console.log('4. القسمة (÷)');
    console.log('5. الخروج');
}

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function calculate() {
    showMenu();
    
    const choice = await askQuestion('\nاختيارك: ');
    
    if (choice === '5') {
        console.log('\nشكراً لاستخدامك الآلة الحاسبة!');
        rl.close();
        return;
    }
    
    if (!['1', '2', '3', '4'].includes(choice)) {
        console.log('اختيار غير صحيح! الرجاء اختيار رقم من 1 إلى 5.');
        return calculate();
    }
    
    const num1Input = await askQuestion('أدخل الرقم الأول: ');
    const num1 = parseFloat(num1Input);
    
    if (isNaN(num1)) {
        console.log('خطأ: الرجاء إدخال رقم صحيح!');
        return calculate();
    }
    
    const num2Input = await askQuestion('أدخل الرقم الثاني: ');
    const num2 = parseFloat(num2Input);
    
    if (isNaN(num2)) {
        console.log('خطأ: الرجاء إدخال رقم صحيح!');
        return calculate();
    }
    
    try {
        let result;
        let operation;
        
        switch (choice) {
            case '1':
                result = add(num1, num2);
                operation = '+';
                break;
            case '2':
                result = subtract(num1, num2);
                operation = '-';
                break;
            case '3':
                result = multiply(num1, num2);
                operation = '×';
                break;
            case '4':
                result = divide(num1, num2);
                operation = '÷';
                break;
        }
        
        console.log('\n---------------------------------');
        console.log(`النتيجة: ${num1} ${operation} ${num2} = ${result}`);
        console.log('---------------------------------');
        
    } catch (error) {
        console.log(`\nخطأ: ${error.message}`);
    }
    
    return calculate();
}

calculate();
