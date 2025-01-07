app.post('/api/movies', async(req,res)=>{
    const{month,year}=req.body;
    try{
      //Fetch the unique ID from the given month and year
      const idResult=await pool.query(
        `SELECT id FROM month_year where month=$1 AND year=$2`,
        [month,year]
      );
      if(idResult.rows.length===0){
        return res.status(404).json({error:'Month and Year not found'});
      }
      const month_year_id=idResult.rows[0].id;
      //Fetch movie details for the retrieved month_year_id
      const movieResult=await pool.query(
        `SELECT * FROM movie_details WHERE month_year_id=$1`,
        [month_year_id]
      );
      if(movieResult.rows.length===0){
        return res.status(404).json({error: `No movies found for the given month and year`})
      }
      
  
  
  
      res.json(movieResult.rows);//send all movie details as JSON
    }catch(err){
      console.error(err.message);
      res.status(500).json({error:'server error'});
    }
  });
  