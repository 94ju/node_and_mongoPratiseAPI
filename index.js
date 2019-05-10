const express=require('express');
const app = express();
const courses=[
    {id:1,name:'maths'},
    {id:2,name:'science'},
    {id:3,name:'english'},
];
app.get('/',(req,res)=>{
    res.send('welcome');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const course = courses.find(c => c.id===id).name;
    res.send(course);
});
app.get('/api/courses/posts/:year/:month',(req,res)=>{
    res.send(req.params);
})
app.listen(3000);