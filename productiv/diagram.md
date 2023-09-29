Req's: todo, list of todos, edit button, edit form, high prio, add todo form

App
    Page
        Header
        Main - State [{title,descr,prio,id}], functions-save,delete
            Column - Prop: Todos, save, delete
                TodoList - Prop: Todos, save, delete
                    Todo - Prop: Todo, save, delete
                        Form - State formdata {title,descr,prio,id}, Prop - save, delete
            Column - Prop: Todos, save, delete
                TodoList(Priority) Prop: Todos, save, delete
                Form - State formdata {title,descr,prio,id} Prop - save, delete
        Footer