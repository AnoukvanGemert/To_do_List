app.component('list-header', {
  template:
    /*html*/
    `
    <header>
      <h1> To do list</h1>
      <form @submit.prevent="onSubmit">
        <div class="input">
        <label for="task"></label>
        <input id="addNew" v-model="task" placeholder="add new to do">
        <button id="newToDo" type="submit" value="Submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path
                d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </header>`,
  data() {
    return {
      task: '',
      done: false
    }
  },
  methods: {
    onSubmit() {
      const items = JSON.parse(localStorage.getItem('items'));
      
      if (this.task === '') {
        alert('Put something into the input!');
        return
      }

      let newItem = {
        task: this.task,
        done: this.done
      }
      this.$emit('newItem-submitted', newItem);

      this.task = '';
    }
  }
})