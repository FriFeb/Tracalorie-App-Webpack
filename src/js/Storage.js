class Storage {
    static getCalorieLimit() {
        return localStorage.getItem('calorieLimit') || 2000;
    }
    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories() {
        return localStorage.getItem('totalCalories') || 0;
    }
    static setTotalCalories(totalCalories) {
        localStorage.setItem('totalCalories', totalCalories);
    }

    static getMeals() {
        return JSON.parse(localStorage.getItem('meals')) || [];
    }
    static addMeal(meal) {
        const meals = this.getMeals();
        meals.push(meal);

        localStorage.setItem('meals', JSON.stringify(meals));
    }
    static removeMeal(id) {
        const meals = this.getMeals();

        meals.forEach((meal, index) => {
            if (meal.id === id) {
                meals.splice(index, 1);
                Storage.setTotalCalories(Storage.getTotalCalories() - meal.calories);
            }
        });

        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static getWorkouts() {
        return JSON.parse(localStorage.getItem('workouts')) || [];
    }
    static addWorkout(workout) {
        const workouts = this.getWorkouts();
        workouts.push(workout);

        localStorage.setItem('workouts', JSON.stringify(workouts));
    }
    static removeWorkout(id) {
        const workouts = this.getWorkouts();

        workouts.forEach((workout, index) => {
            if (workout.id === id) {
                workouts.splice(index, 1);
                Storage.setTotalCalories(+Storage.getTotalCalories() + +workout.calories);
            }
        });

        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static resetAll() {
        localStorage.setItem('totalCalories', 0);
        localStorage.setItem('meals', JSON.stringify([]));
        localStorage.setItem('workouts', JSON.stringify([]));
    }
}

export default Storage;