app.component('display-data', {
  template:
    /*html*/
    ` <list-header @newItem-submitted = "updateItems"></list-header>
    <div class="showList">
        <div class="containerItems">
          <div class="dropdownHeader">
            <h3>Mijn to-do list:</h3>
            <div class="dropdown">
              <button class="dropbtn">filters</button>
              <div class="dropdown-content">
                <button @click="setfilter('all')">Alle</button>
                <button @click="setfilter('todo')">To-Do</button>
                <button @click="setfilter('done')">Afgevinkt</button>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in filterList"  class="item">
            <div class="name">
                <input 
                type="checkbox" 
                name="itembox" 
                v-model="item.done"
                v-bind:class = "{ 'disable' : filter !== 'all'}"
                >
                <p :class="{done: item.done}"> {{ item.task }}</p>
            </div>
              <div>
                    <img 
                    src="./svg/edit_note_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" 
                    alt="edit svg"
                    @click="editItem(index)"
                    v-bind:class = "{ 'disable' : filter !== 'all'}"
                    >
                    <img 
                    src="./svg/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" 
                    alt="delete svg"
                    @click="deleteItem(index)"
                    v-bind:class = "{ 'disable' : filter !== 'all'}"
                    >
              </div>
          </div>
        </div>
      </div>`,

  data() {
    return {
      "list": [
        {
          "task": "clean the fridge",
          "done": false
        },
        {
          "task": "clean my room",
          "done": false
        },
        {
          "task": "walk the dog",
          "done": false
        },
        {
          "task": "workout",
          "done": false
        }
      ],
      filter: 'all'
    };
  },
  // handig om te gebruiken als de data telkens verandert
  computed: {
    filterList() {
      if (this.filter === 'todo') {
        return this.list.filter(item => !item.done);
      } else if (this.filter === 'done') {
        return this.list.filter(item => item.done);
      } else {
        return this.list;
      }
    }
  },
  methods: {
    setLocalStorage() {
      localStorage.setItem("items", JSON.stringify(this.list));
    },
    loadLocalStorage() {
      const items = localStorage.getItem("items");
      if (items) {
        this.list = JSON.parse(items);
      } else {
        this.setLocalStorage();
      }
    },
    setfilter(filter) {
      this.filter = filter;
    },
    updateItems(item) {
      this.list.push(item);
    },
    deleteItem(index) {
      this.list.splice(index, 1);
    },
    editItem(index) {
      const newTask = prompt("Edit your task:", this.list[index].task);
      if (newTask !== null && newTask.trim() !== "") {
        this.list[index].task = newTask.trim();
      }
    }
  },
  // created gebruik je om data te initialiseren of om voorbereidende taken uit te voeren
  created() {
    this.loadLocalStorage();
  },
  // met watch blijft de localstorage up to date
  watch: {
    list: {
      handler() {
        this.setLocalStorage();
      },
      deep: true
    }
  }
})