const express = require('express');
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const cors = require('cors');
app.use(cors());


//routes

//  for web 
app.get("/users",(req,res)=>{
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html);
})

//routes
//hybrid api(web + mobile) for mobile and supports search by first_name
app.get("/api/users", (req, res) => {
    const { search } = req.query;

    if (search) {
        const searchQuery = search.toLowerCase();
        const filteredUsers = users.filter(user => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            return fullName.includes(searchQuery) || user.last_name.toLowerCase().includes(searchQuery);
        });
        return res.json(filteredUsers);
    }

    return res.json(users); 
});

app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);
}).patch((req,res)=>{
    return res.json({status:"pending"});
}).delete((req,res)=>{
    return res.json({status : "pending"});
});

//post routes 
app.post("/api/users",(req,res)=>{
    //TODO : Create a new User
    return res.json({status : "pending"});
});

app.listen(PORT,()=>console.log("Server Started"));
