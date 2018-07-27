let componentOne = {
    data: function () {
        return {
            users: [],
        }
    },
    methods: {
        getData: function () {
            let self = this;

            $.ajax({
                    url: "https://jsonplaceholder.typicode.com/users",
                    method: "GET",
                    dataType: "JSON"
                })
                .then(function (data) {
                    let usersData = data;

                    for (let i = 0; i < usersData.length; i++) {
                        usersData[i].title = [];
                        usersData[i].body = [];
                    }

                    $.ajax({
                            url: "https://jsonplaceholder.typicode.com/posts",
                            method: "GET",
                            dataType: "JSON"
                        })
                        .then(function (data) {
                            let postsData = data;

                            for (let i = 0; i < usersData.length; i++) {
                                for (let j = 0; j < postsData.length; j++) {
                                    if (usersData[i].id === postsData[j].userId) {
                                        usersData[i].title.push(postsData[j].title);
                                        usersData[i].body.push(postsData[j].body);
                                    }
                                }
                            }

                            self.users = usersData;
                        });
                });
        }
    },
    beforeMount() {
        this.getData();
    },
    template: `
        <div>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Title</th>
                        <th>User Body</th>
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
                    </tr>
                </tbody>
            </table>
        </div>
    `
};

let app1 = new Vue({
    el: "#app1",
    components: {
        "component-one": componentOne,
    }
});
