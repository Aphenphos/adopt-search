// import services and utilities
import { getDogs } from './services/adopt-service.js';

// import component creators
import createFilter from './components/Filter.js';
import createPaging from './components/Paging.js';
import createDogList from './components/DogList.js';

// declare state variables
let breed = '';
let age = 0;
let page = 1;
let pageSize = 5;
let totalPages = 0;
let dogs = [];

// handler functions
async function handlePageLoad() {
    const params = new URLSearchParams(window.location.search);

    breed = params.get('breed') || '';
    age = params.get('age') || 0;

    const pageParam = params.get('page');
    page = pageParam ? Number(pageParam) : 1;

    
    const pageSizeParam = params.get('pageSize');
    pageSize = pageSizeParam ? Number(pageSizeParam) : 5;
    
    const start = (page - 1) * pageSize;
    const end = (page * pageSize) - 1;

    const { data, count } = await getDogs(breed, age, { start, end });
    dogs = data;
    totalPages = Math.ceil(count / pageSize);


    display();
}

function handleFilter(filter) {
    const params = new URLSearchParams(window.location.search);
    // *** set breed, age, and page params based on filter
    window.location.search = params.toString();
}

function handlePaging(change, pageSize) {
    const params = new URLSearchParams(window.location.search);
    // *** set page and pageSize params based on change and PageSize
    page = Math.max(1, page + change);

    // make sure page not less than 1
    params.set('page', page);
    params.set('pageSize', Number(pageSize));
    console.log(pageSize,);
    window.location.search = params.toString();
}

// Create each component: 
const Filter = createFilter(document.querySelector('#filter'), { handleFilter });
const Paging = createPaging(document.querySelector('#paging'), { handlePaging });
const DogList = createDogList(document.querySelector('#dog-list'));

// Roll-up display function that renders (calls with state) each component
function display() {
    Filter({ breed, age });
    Paging({ page, pageSize, totalPages });
    DogList({ dogs });
}

// Call display and page load!
handlePageLoad();

// no need to display until loaded!
// display();



