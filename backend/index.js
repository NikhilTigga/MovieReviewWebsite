require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors module
const { Pool } = require('pg');

const app = express();
const PORT =process.env.PORT || 5000;//use the port from the environment variable

// PostgreSQL configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database:  process.env.DB_NAME,
  password:  process.env.DB_PASSWORD,
  port:  process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // This allows self-signed certificates
  }
});
// Use CORS middleware to allow requests from specific origins
app.use(cors({
    origin: 'http://localhost:3000', // Allow only requests from your React app
    methods: ['GET', 'POST'], // Allow GET and POST requests (customize as needed)
    credentials: true // Allow cookies (if needed)
  }));
  // Middleware to parse JSON body
app.use(express.json()); // <-- Add this line


// API to get months and years
app.get('/api/months-years', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT month, year FROM month_year ORDER BY year, month');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/movies/:movieId',async(req,res)=>{
  const movieId=req.params.movieId;
  try{
    const movieDeatils=await pool.query('Select * from movie_details  where id=$1',[movieId]);
    if(movieDeatils.rows.length>0){
      res.json(movieDeatils.rows[0]);

    }else{
      res.status(404).json({error:'Movie not found'})
    }
  }catch(error){
    console.error('Error fetching movie details',error);
    res.status(500).json({error:'Internal server error'});
  }
});
app.get('/api/moviereview/:movieId',async(req,res)=>{
  const movieId=req.params.movieId;
  try{
    const query=`select ur.review_id ,
    ur.review,
    ur.review_date,
    u.user_id,
    u.user_name,
    u.user_img
    from user_review ur
    inner join users u
    on ur.user_id=u.user_id
    where ur.movie_id=$1`;
    //execute the query
    const result=await pool.query(query,[movieId]);
    res.status(200).json(result.rows);
  }catch(error){
    console.error('Error fetching movie review:',error.message);
    res.status(500).json({error:'Internal server error'});
  }
  
});
app.get('/api/like&deslike/:reviewid',async(req,res)=>{
  const {reviewid}=req.params;
  try{
    //query the database
    const result=await pool.query(
      `Select 
      Coalesce(sum(case when "likes"=true then 1 else 0 end),0)as like_count,
      coalesce(sum(case when "dislike"=true then 1 else 0 end),0)as dislike_count 
      from like_dislike
      where review_id=$1`,
      [reviewid]

    );
    //send the like and dislike count
    res.status(200).json(result.rows[0]);
  }catch(error){
    console.error('Error fetching like and dislike count:',error);
    res.status(500).json({error:'Internal Server Error'});
  }
});
app.post('/api/movies',async(req,res)=>{
  const{month ,year}=req.body;
  try{
    //Fetch uniqueid from the given month and year
    const idresult=await pool.query(
      `select id from month_year where month=$1 and year=$2`,
       [month,year]
    );
    if(idresult.rows.length===0){
      return res.status(404).json({error:'Month and year not found'});
    }
    const month_year_id=idresult.rows[0].id;

    //Fetch movie details from reterived month_year_id
    const movieResult= await pool.query(
      `select * from movie_details where month_year_id=$1`,
    [month_year_id]);
    if(movieResult.length===0){
      return res
      .status(404)
      .json({error:'No movie found for the given month and year'});
    }
    // Fetch cast data for all movies retrived
    const movieIds=movieResult.rows.map(movie=>movie.id);//extract movie ids
    const casteResult= await pool.query(
      `select * from caste where movie_id=ANY($1::int[])`,
      [movieIds]
    );
    // combine movie details with corresponding caste data

    const movieWithCaste=movieResult.rows.map(movie=>{
      const castes=casteResult.rows.filter(caste=>caste.movie_id===movie.id);
      return{
        ...movie,
        castes,
      };
    });
    res.json(movieWithCaste);//send combined data as JSON
    
  }catch(err){
    console.error(err.message);
    res.status(500).json({error:'Internal Server Error'});
  }

  
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
