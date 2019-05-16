const router = express.router();

app.get('/',(req,res)=>{
    res.render('index',{
       title:'Express App',
       message:'Hello' 
    })
});

module.exports =router;