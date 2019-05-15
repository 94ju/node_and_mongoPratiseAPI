const Joi =require('joi');
const log=  require('./logger');
const authenticate = require('./Authenticatin');
const express=require('express');
const app = express();
app.use(express.json());
app.use(log);
app.use(authenticate);
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
    const course = courses.find(c => c.id===id);
    if(!course) return res.status(404).send('The cousres with the given id was not found');
    res.send(course);
});
app.get('/api/courses/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});

app.post('/api/courses',(req,res)=>{

    const result =validateCourse(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    const course ={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
  
    const id=parseInt(req.params.id);
    const course=courses.find(c=>c.id===id);
    if(!course) return res.status(404).send('course not found');
    const {error}=validateCourse(req.body);
    if(error) return  res.status(400).send(error.details[0].message);
    course.name=req.body.name;
    res.send(course);
});
app.delete('/api/courses/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const course=courses.find(c=>c.id===id);
    if (!course) return res.status(404).send('The course with the given id was not found');
    const index =courses.indexOf(course);
    courses.splice(index,1);
    res.send(course)
})
const validateCourse=(course)=>{
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(course ,schema); 
}
app.listen(3000);