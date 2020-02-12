let startBtn = document.getElementById('start'),

    budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    
    inpChooseIncome = document.querySelector('.choose-income'),
    inpSavings = document.querySelector('#savings'),
    inpChooseSum = document.querySelector('.choose-sum'),
    inpChoosePercent = document.querySelector('.choose-percent'),
    inpYearValue = document.querySelector('.year-value'),
    inpMonthValue = document.querySelector('.month-value'),
    inpDayValue = document.querySelector('.day-value'),
    checksavings = document.querySelector('.checksavings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent');
    
let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD","");
    money = +prompt("Ваш бюджет на месяц?","");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?","");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    inpYearValue.value = new Date (Date.parse(time)).getFullYear();
    inpMonthValue.value = new Date (Date.parse(time)).getMonth() + 1;
    inpDayValue.value = new Date (Date.parse(time)).getDate();
    
    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value;
        let b = expensesItem[++i].value;

    
        if ( (typeof(a)) === "string" && (typeof(a)) != null && (typeof(b)) != null 
            && a != '' && b != '' && a.length < 50) {
            console.log("Всё верно");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i <= optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
});

countBtn.addEventListener('click', function() {
    if (appData.budget) {
    appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
    daybudgetValue.textContent = appData.moneyPerDay;

        if(appData.moneyPerDay < 1000) {
        levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 1000 && appData.moneyPerDay < 5000) {
        levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 5000) {
        levelValue.textContent = "Высокий уровень достатка";
        } else {
        levelValue.textContent = "Произошла ошибка";
        }
    } else {
        daybudgetValue.textContent = "Нажмите кнопку 'Начать расчет' и укажите бюджет на месяц!";
    }
});

inpChooseIncome.addEventListener('input', function() {
    let items = inpChooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});

checksavings.addEventListener('click', function() {
    if(appData.savings) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    if (appData.savings) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function() {
    if (appData.savings) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money, //месячный бюджет
    timeData: time, // дата
    expenses: {}, //расходы
    optionalExpenses: {}, //дополнительные расходы
    income: [], //доп. доход
    savings: false, //экономия
};