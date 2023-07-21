import '@fortawesome/fontawesome-free/js/all';
import { Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';
import '../css/bootstrap.css';
import '../css/style.css';

class App {
    #tracker = new CalorieTracker();

    constructor() {
        document.querySelector('#meal-form').addEventListener('submit', this.#newItem.bind(this, 'meal'));
        document.querySelector('#workout-form').addEventListener('submit', this.#newItem.bind(this, 'workout'));

        document.querySelector('#meal-items').addEventListener('click', this.#removeItem.bind(this, 'meal'));
        document.querySelector('#workout-items').addEventListener('click', this.#removeItem.bind(this, 'workout'));

        document.querySelector('#filter-meals').addEventListener('input', this.#filterItems.bind(this, 'meal'));
        document.querySelector('#filter-workouts').addEventListener('input', this.#filterItems.bind(this, 'workout'));

        document.querySelector('#reset').addEventListener('click', this.#reset.bind(this));

        document.querySelector('#limit-form').addEventListener('submit', this.#setLimit.bind(this));
    };

    #newItem(type, e) {
        e.preventDefault();

        const name = document.querySelector(`#${type}-name`);
        const calories = document.querySelector(`#${type}-calories`);

        if (name.value === '' || calories.value === '') {
            alert('Please enter all fields');
            return;
        }

        type === 'meal'
            ? this.#tracker.addMeal(new Meal(name.value, +calories.value))
            : this.#tracker.addWorkout(new Workout(name.value, +calories.value));

        name.value = '';
        calories.value = '';

        const collapseMeal = document.querySelector(`#collapse-${type}`);
        new Collapse(collapseMeal, {
            toggle: true
        });
    }

    #removeItem(type, e) {
        if (e.target.classList.contains('fa-xmark') || e.target.classList.contains('delete')) {

            if (confirm('Are you sure?')) {
                const item = e.target.closest('.card');
                const id = item.getAttribute('id');

                type === 'meal'
                    ? this.#tracker.removeMeal(id)
                    : this.#tracker.removeWorkout(id);

                item.remove();
            };
        }
    }

    #filterItems(type, e) {
        const inputText = e.target.value.toLowerCase();

        const items = document.querySelectorAll(`#${type}-items .card`);

        items.forEach(item => {
            const itemName = item.querySelector('.mx-1').innerText.toLowerCase();

            if (itemName.includes(inputText)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    #reset() {
        document.querySelector('#meal-items').innerHTML = '';
        document.querySelector('#workout-items').innerHTML = '';
        document.querySelector('#filter-meals').value = '';
        document.querySelector('#filter-workouts').value = '';

        this.#tracker.resetDay();
    }

    #setLimit(e) {
        e.preventDefault();

        const limit = document.querySelector('#limit');

        if (limit.value.trim() <= 0 || isNaN(limit.value.trim())) {
            alert('Please add a limit');
            return;
        }

        this.#tracker.setLimit(limit.value);
        limit.value = '';

        document.querySelector('#limit-modal').querySelector('.btn-close').click();
    }
}

const app = new App();