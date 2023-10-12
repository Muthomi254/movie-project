async function searchMovies(){
  
  let searchTerm = document.getElementById("searchInput").value;
  const url =  `http://localhost:3000/movies?query=${searchTerm}`;

  try{
    const response = await fetch(url, {
      method: "GET",
      headers: {
       "Content-Type":"application/json"
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response.json()
    console.log(data)

  }catch(error){
    console.error("error from db", error)
  }
  

};

