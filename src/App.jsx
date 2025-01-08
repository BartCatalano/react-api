import { useEffect, useState } from "react";
import axios from "axios";

// creo l'object iniziale cone le chiavi vuote
 const initialFormData = {
  titolo: "",
  immagine: "",
 }

function App() {

  // creo i due USESTATE, uno per la lista e l'alto per i form

const  [lista, setLista] = useState ([]);
const [formData, setFormData] = useState(initialFormData);

useEffect(() => { 
getData();
},[])
// creo la funzione che richiama axios
const getData = () => {
  axios.get(`http://localhost:3000/posts`).then((resp) =>{
    console.log(resp);
    setLista(resp.data.data);
    
  })
}

// creo la funzione per i campi compilativi quando si clicca il submit
const handArticleForm = (event) => {
  // creo il prevent default
  event.preventDefault ();


// creo oggetto del nuovo articolo,
  const newArticle = {
    ...formData,
    id: Date.now(),
    
  }


  // creo copia dell'array con ila nuovo articolo 
  const newArray = [...lista, newArticle];
  

  // aggiorno lo stato della lista
  setLista (newArray );
  
// ripulisco i campi del form
setFormData(initialFormData);
};
// creo funzione per cancellare il post inserito
const cancella = (idDaCancellare) => {
  const newArray = lista.filter(curArticolo => curArticolo.id !== idDaCancellare);

setLista(newArray)
}

// creo la funzione generica per gli input
const handleInputChange = (event) => {
  const {name, value} = event.target;
  const newData = {
    ...formData,
    [name]: value,
    
  };

  setFormData(newData);

}


  return (

    // creo la card che si dorvrà visualizzare
    <>
      <div className="container">
        <section>
 <h2>Articoli inseriti</h2>
 <div className="row row-cols-2 rowcols-lg-3">
 {lista.length > 0 ? (
             lista.map((curItem) =>(
        <div className="col" key={curItem.id}>
          <div className="card colorcard p-3">
            <div className="card-body">
              <h4>{curItem.titolo}</h4>

              <div ><img className="immagine" src={`http://localhost:3000/${curItem.immagine}` } alt="" /></div>
              
              <button onClick={()=> cancella(curItem.id)} className="btn btn-danger mt-3">cancella</button>
            </div>
            
          </div>
        </div>
      ))
          ) : (<p>Nessun articolo presente</p>
   
      
          )}
  </div>
  </section>

 
  <section>
    <h3>aggiungi articolo</h3>
    <form onSubmit={handArticleForm} >
      <div className="mb-3">
        <label htmlFor="articoloName">Nome articolo</label>
        <input type="text" 
        className="form-control"
        name="titolo"
        id="articoloName" 
        value={formData.titolo} 
        onChange={handleInputChange}/> 
      </div>
      <div>
      <label htmlFor="immagineInsert">Immagine</label>
        <input type="text" 
        className="form-control" 
        name="immagine"
        id="immagineInsert" 
        value={formData.immagine} 
        onChange={handleInputChange}/> 
      </div>
      <button type="submit" className="btn btn-primary">salva</button>
    </form>
  </section>
 </div>
    </>
  );
}

export default App
