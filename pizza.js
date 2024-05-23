const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Pizza {
  constructor() {
    this.doughIngredients = [];
    this.toppings = [];
    this.bakingTime = 0;
    this.status = "unprepared";
  }

  addDoughIngredient(ingredient, quantity) {
    this.doughIngredients.push({ ingredient, quantity });
  }

  addTopping(ingredient, quantity) {
    this.toppings.push({ ingredient, quantity });
  }

  setBakingTime(minutes) {
    this.bakingTime = minutes;
  }

  showDetails() {
    console.log(`Pizza status: ${this.status}`);
    console.log("Dough ingredients:");
    this.doughIngredients.forEach(({ ingredient, quantity }) => {
      console.log(`${quantity} grams of ${ingredient}`);
    });
    console.log("Toppings:");
    this.toppings.forEach(({ ingredient, quantity }) => {
      console.log(`${quantity} grams of ${ingredient}`);
    });
    console.log(`Baking time: ${this.bakingTime} minutes`);
  }

  setStatus(status) {
    this.status = status;
  }
}

function addIngredientsFromTerminal(pizza, type, callback) {
  function askIngredient() {
    const ingredientType = type === "dough" ? "dough ingredient" : "topping";
    rl.question(
      `Enter ${ingredientType} name (or type "done" to finish): `,
      (ingredient) => {
        if (ingredient.toLowerCase() === "done") {
          callback();
          return;
        }

        rl.question(`How many grams of ${ingredient}?: `, (quantity) => {
          if (type === "dough") {
            pizza.addDoughIngredient(ingredient, parseInt(quantity));
          } else {
            pizza.addTopping(ingredient, parseInt(quantity));
          }
          askIngredient();
        });
      }
    );
  }

  askIngredient();
}

function main() {
  const myPizza = new Pizza();

  console.log("Let's create your pizza! First, add ingredients for the dough.");

  addIngredientsFromTerminal(myPizza, "dough", () => {
    console.log("The dough is being prepared with the following ingredients:");
    myPizza.doughIngredients.forEach(({ ingredient, quantity }) => {
      console.log(`${quantity} grams of ${ingredient}`);
    });

    console.log("Now, add toppings for your pizza.");

    addIngredientsFromTerminal(myPizza, "topping", () => {
      console.log(
        "The toppings are being added with the following ingredients:"
      );
      myPizza.toppings.forEach(({ ingredient, quantity }) => {
        console.log(`${quantity} grams of ${ingredient}`);
      });

      rl.question("Enter baking time in minutes: ", (time) => {
        myPizza.setBakingTime(parseInt(time));
        console.log(
          `The pizza is being baked and will be ready in ${time} minutes.`
        );

        myPizza.setStatus("prepared");
        console.log("Pizza has been prepared:");
        myPizza.showDetails();

        myPizza.setStatus("delivered");
        console.log("Pizza has been delivered:");
        myPizza.showDetails();

        rl.close();
      });
    });
  });
}

// Run the program
main();
