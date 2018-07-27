let componentOne = {
    data: function() {
        return {
            users: [],
        }
    },
    methods: {
        getData: async function() {
            let usersData = await $.ajax({
                url: "https://jsonplaceholder.typicode.com/users",
                method: "GET",
                dataType: "JSON"
            });

            let postsData = await $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                method: "GET",
                dataType: "JSON"
            });

            let albumsData = await $.ajax({
                url: "https://jsonplaceholder.typicode.com/albums",
                method: "GET",
                dataType: "JSON"
            });

            let todosData = await $.ajax({
                url: "https://jsonplaceholder.typicode.com/todos",
                method: "GET",
                dataType: "JSON"
            });

            for (let i = 0; i < usersData.length; i++) {
                usersData[i].title = [];
                usersData[i].body = [];
                usersData[i].albums = [];
                usersData[i].todos = [];
            }

            for (let i = 0; i < usersData.length; i++) {
                for (let j = 0; j < postsData.length; j++) {
                    if (usersData[i].id === postsData[j].userId) {
                        usersData[i].title.push(postsData[j].title);
                        usersData[i].body.push(postsData[j].body);
                    }
                }
            }

            for (let i = 0; i < usersData.length; i++) {
                for (let j = 0; j < albumsData.length; j++) {
                    if (usersData[i].id === albumsData[j].userId) {
                        usersData[i].albums.push(albumsData[j].title);
                    }
                }
            }

            for (let i = 0; i < usersData.length; i++) {
                for (let j = 0; j < todosData.length; j++) {
                    if (usersData[i].id === todosData[j].userId) {
                        usersData[i].todos.push({
                            todo: todosData[j].title,
                            completed: todosData[j].completed
                        });
                    }
                }
            }

            this.users = usersData;
        }
    },
    beforeMount() {
        this.getData();
    },
    template: `
        <div>
            <table class="myTable">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Title</th>
                        <th>User Body</th>
                        <th>User Albums</th>
                        <th>User Todos</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="user in users">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>
                            <ul>
                                <li v-for="title in user.title">{{ title }}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li v-for="body in user.body">{{ body }}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li v-for="album in user.albums">{{ album }}</li>
                            </ul>
                        </td>
                        <td class="lastTableRow">
                            <ul>
                                <li v-for="todo in user.todos">
                                    {{ todo.todo }}  ---  <input type="checkbox" v-model="todo.completed" />
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
};

let app1 = new Vue ({
    el: "#app1",
    components: {
        "component-one": componentOne,
    }
});
