<template>
  <div class="todolist">
      <div class="addTasks">
         
              <button class="btnAdd" @click="btnAddTask()">
                  <img src="../assets/Vector.svg" alt="">
              </button>
              <input v-model="inputTitle" type="text" class="input_title" placeholder="What needs to be done?">

      </div>
        <div class="tasks">
              <div class="task" v-for="task in filteredTasks" :key="task.id" >
                  <input type="checkbox" v-model="task.completed" >
                  <div class="text_task" :class="{ done : task.completed }"><span>{{task.text}}</span></div>

              </div>
          </div>
        <div class="btns_list">
            <div class="nav">

                <button @click="filterChange('All')" :class="{btnActive : filterBtns('All') }">All: <span>{{getTasks.length}}</span></button>
                <button @click="filterChange('Active')" :class="{ btnActive : filterBtns('Active')  }">Active</button>
                <button @click="filterChange('Completed')" :class="{ btnActive : filterBtns('Completed')  }">Completed</button>
            </div>
            <button @click="clearCompleted" v-if="getTasks.filter(task => task.completed == true).length > 0" class="clear" >Clear completed</button>
        </div>


  </div>
</template>

<script>
import { mapGetters, mapActions,mapMutations} from 'vuex'
export default {
    name:"Todolist",
    data(){ 
        return{
            inputTitle:'',
        }
    },
    mounted() {
        this.EnterBtn(),
        this.localStorageCheсk()
    },
    computed:{
        ...mapGetters(['filter','filteredTasks','getTasks']),
    },
    
    methods:{
        ...mapMutations(['filterChange','clearCompleted','updateTasks']),
        ...mapActions(['addTask']),

        btnAddTask(){
            if(this.inputTitle.length == 0 ){
                return
            }
            this.addTask(this.inputTitle)
            this.inputTitle = ''
        },

        filterBtns(btnType){
            if(this.filter == btnType){
                return true
            }else{
                return false
            }      
        },
        EnterBtn(){
            document.addEventListener('keydown', function(e){
                if (e.code == 'Enter') {
                    this.btnAddTask()
                }
            }.bind(this));
        },
        localStorageCheсk(){
            if(localStorage.getItem('tasks')) {
                try {
                   this.updateTasks(JSON.parse(localStorage.getItem('tasks')))
                } catch(e) {
                        localStorage.removeItem('cats');
                }
            }

            if(localStorage.getItem('filter')){
                this.filterChange(JSON.parse(localStorage.getItem('filter')))
            }
        }
    },
    watch:{
        getTasks(newTasks) {
            localStorage.tasks = JSON.stringify(newTasks);
        },
        filter(newFilter) {
            localStorage.filter = JSON.stringify(newFilter)
        }

    }
}
</script>

<style scoped>
.btnActive{
    border: 2px solid rgb(155, 155, 155) !important;
    border-radius: 3px;
}
.done{
    color: #ccc;
    text-decoration:line-through;

}
.clear{
    margin-left: 15px;

}
.btns_list{
    border-top: 1px solid #ccc;
    display: flex;
    padding: 3px;
    
}
.nav{
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-right: 70px;
}
.nav button:active, 
button:focus {
    outline: none;
}
.btns_list button{
    border:none;
    background: none;
    cursor: pointer;
}
.task{
    display: flex;
    padding: 5px;
    border: 1px solid #ccc;
}
.text_task{
    margin-left: 5px;
}
.todolist{
    border: 1px solid #ccc;
    border-radius: 3px;
    max-width: 400px;
    width: 100%;
}
.addTasks{
    display: flex;
    width: 100%;
    border-bottom: 2px solid #ccc;
}

.input_title{

    width: 100%;
    padding: 10px;
    border: none;
}
.btnAdd{
    background: none;
    border: none;
    cursor:pointer;
    border-radius: 100%;
}
.tasks{
    min-height: 20px;
}
</style>