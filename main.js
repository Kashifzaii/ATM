#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 20000; // Dollar
let myPin = 9090;
console.log(chalk.blueBright("\n \twelcome to code with Kashif - ATM Machine\n \t"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "entre your pin:",
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("Login Successfully!"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select operation:",
            type: "list",
            choices: ["withdraw", "deposit", "Balance inquiry"]
        }
    ]);
    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                message: "select cash withdraw",
                type: "list",
                choices: ["fast cash", "Entre Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "fast cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    message: "select amount",
                    type: "list",
                    choices: [1000, 3000, 5000, 10000, 25000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} withdraw successfully`));
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Entre Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter your amount",
                    type: "number",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount}withdraw Successfully`));
                console.log(chalk.blue(`your Remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "deposit") {
        let depositAns = await inquirer.prompt([
            {
                name: "deposit",
                message: (chalk.yellow("enter your amount")),
                type: "number",
            }
        ]);
        if (myBalance += depositAns.deposit) {
            console.log(chalk.green(`${depositAns.deposit}Transaction Completed`));
            console.log(chalk.green(`Your Current Balance is: ${myBalance}`));
        }
    }
    else if (operationAns.operation === "Balance inquiry") {
        console.log(chalk.magenta(`Your balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Pin Error, Try again!"));
}
