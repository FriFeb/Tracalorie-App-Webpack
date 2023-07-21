import Storage from "./Storage";

class CalorieTracker {
    #calorieLimit = Storage.getCalorieLimit();
    #totalCalories = Storage.getTotalCalories();
    #meals = Storage.getMeals();
    #workouts = Storage.getWorkouts();

    constructor() {
        this.#loadItems();
        this.#render();
    }

    //  Public methods

    addMeal(meal) {
        Storage.addMeal(meal);
        this.#meals = Storage.getMeals();

        Storage.setTotalCalories(+Storage.getTotalCalories() + +meal.calories);
        this.#totalCalories = Storage.getTotalCalories();

        this.#displayNewItemInDOM(meal, 'meal');
        this.#render();
    }

    removeMeal(id) {
        Storage.removeMeal(id);
        this.#meals = Storage.getMeals();

        this.#totalCalories = Storage.getTotalCalories();

        this.#render();
    }

    addWorkout(workout) {
        Storage.addWorkout(workout);
        this.#workouts = Storage.getWorkouts();

        Storage.setTotalCalories(Storage.getTotalCalories() - workout.calories);
        this.#totalCalories = Storage.getTotalCalories();

        this.#displayNewItemInDOM(workout, 'workout');
        this.#render();
    }

    removeWorkout(id) {
        Storage.removeWorkout(id);
        this.#workouts = Storage.getWorkouts();

        this.#totalCalories = Storage.getTotalCalories();

        this.#render();
    }

    resetDay() {
        Storage.resetAll();

        this.#meals = Storage.getMeals();
        this.#workouts = Storage.getWorkouts();
        this.#totalCalories = Storage.getTotalCalories();

        this.#render();
    }

    setLimit(limit) {
        Storage.setCalorieLimit(limit);
        this.#calorieLimit = Storage.getCalorieLimit();
        this.#render();
    }

    //  Private methods

    #displayCaloriesLimit() {
        const calorieLimitDOM = document.querySelector('#calories-limit');
        calorieLimitDOM.innerText = this.#calorieLimit;

    }

    #displayCaloriesTotal() {
        const totalCaloriesDOM = document.querySelector('#calories-total');
        totalCaloriesDOM.innerText = this.#totalCalories;
    }

    #displayCaloriesConsumed() {
        const caloriesConsumedDOM = document.querySelector('#calories-consumed');
        const consumed = this.#meals.reduce((acc, meal) => acc + meal.calories, 0);

        caloriesConsumedDOM.innerHTML = consumed;
    }

    #displayCaloriesBurned() {
        const caloriesBurnedDOM = document.querySelector('#calories-burned');
        const burned = this.#workouts.reduce((acc, meal) => acc + meal.calories, 0);

        caloriesBurnedDOM.innerHTML = burned;
    }

    #displayCaloriesRemaining() {
        const caloriesRemainingDOM = document.querySelector('#calories-remaining');
        const caloriesProgressDOM = document.querySelector('#calorie-progress')

        const remaining = this.#calorieLimit - this.#totalCalories;
        caloriesRemainingDOM.innerHTML = remaining;

        remaining <= 0
            ? (
                caloriesRemainingDOM.parentElement.classList.add('bg-danger'),
                caloriesProgressDOM.classList.add('bg-danger')
            )
            : (
                caloriesRemainingDOM.parentElement.classList.remove('bg-danger'),
                caloriesProgressDOM.classList.remove('bg-danger')
            )
    }

    #updateCaloriesProgress() {
        const caloriesProgressDOM = document.querySelector('#calorie-progress');

        const progress = this.#totalCalories < 0
            ? 0
            : this.#totalCalories / this.#calorieLimit * 100;

        caloriesProgressDOM.style.width = `${progress}%`;
    }

    #displayNewItemInDOM(obj, type) {
        const items = document.querySelector(`#${type}-items`);

        const div = document.createElement('div');
        div.classList.add('card', 'my-2');
        div.setAttribute('id', obj.id);

        const bgType = type === 'meal'
            ? 'primary'
            : 'secondary';

        div.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${obj.name}</h4>
                    <div class="fs-1 bg-${bgType} text-white text-center rounded-2 px-2 px-sm-5">
                    ${obj.calories}</div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            `;

        items.appendChild(div);
    }

    #loadItems() {
        this.#meals.forEach(meal => this.#displayNewItemInDOM(meal, 'meal'));

        this.#workouts.forEach(workout => this.#displayNewItemInDOM(workout, 'workout'));
    }

    #render() {
        this.#displayCaloriesLimit();
        this.#displayCaloriesTotal();
        this.#displayCaloriesConsumed();
        this.#displayCaloriesBurned();
        this.#displayCaloriesRemaining();
        this.#updateCaloriesProgress();
    }
}

export default CalorieTracker;