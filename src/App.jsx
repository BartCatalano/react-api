import { useEffect, useState } from "react";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;
// creo l'object iniziale cone le chiavi vuote
const initialFormData = {
  titolo: "",
  immagine: "",
  contenuto: "",
}

function App() {

  // creo i due USESTATE, uno per la lista e l'alto per i form

  const [lista, setLista] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    getData();
  }, [])
  // creo la funzione che richiama axios
  const getData = () => {
    axios.get(`${apiurl}posts`).then((resp) => {
      console.log(resp);
      setLista(resp.data.data);

    })
  }

  // creo la funzione per i campi compilativi quando si clicca il submit
  const handArticleForm = (event) => {
    // creo il prevent default
    event.preventDefault();

    // faccio la chiamata axios per post che inserisce la ricetta del form nell object in back
    axios.post(`${apiurl}posts`, formData).then((resp) => {

      // creo oggetto del nuovo articolo,
      const newArticle = {
        ...formData,
        id: Date.now(),

      }


      // creo copia dell'array con ila nuovo articolo 
      const newArray = [...lista, newArticle];


      // aggiorno lo stato della lista
      setLista(newArray);

      // ripulisco i campi del form
      setFormData(initialFormData);

    })

  };

  // creo funzione per cancellare il post inserito
  const cancella = (id) => {
    axios.delete(`${apiurl}posts/${id}`).then((resp) => {
  const newArray = lista.filter(curArticolo => curArticolo.id !== id);

    setLista(newArray)
 }) }

  // creo la funzione generica per gli input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
          <h2 className="m-3">Ricette inserite</h2>
          <div className="row row-cols-2 rowcols-lg-3">
            {lista.length > 0 ? (
              lista.map((curItem) => (
                <div className="col" key={curItem.id}>
                  <div className="card colorcard p-3">
                    <div className="card-body">
                      <h4>{curItem.titolo}</h4>

                      <div className="row row-cols rowcols-lg-3 ">
                        <img className="immagine col" src={`${apiurl}${curItem.immagine}`} alt="" />
                        <span className="mx-2 col">{curItem.contenuto} </span>
                      </div>
                    </div>
                    <button onClick={() => cancella(curItem.id)} className="btn btn-danger mt-3">cancella</button>
                  </div>
                </div>
              ))
            ) : (<p>Nessuna Ricetta presente</p>


            )}
          </div>
        </section>


        <section>
          <h3>Aggiungi Ricetta</h3>
          <form onSubmit={handArticleForm} >
            <div className="mb-3">
              <label htmlFor="articoloName">Nome ricetta</label>
              <input type="text"
                className="form-control"
                name="titolo"
                id="articoloName"
                value={formData.titolo}
                onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="immagineInsert">Immagine</label>
              <input type="text"
                className="form-control"
                name="immagine"
                id="immagineInsert"
                value={formData.immagine}
                onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="contenutoInsert">Descrizione Ricetta</label>
              <input type="text"
                className="form-control"
                name="contenuto"
                id="contenutoneInsert"
                value={formData.contenuto}
                onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">salva</button>
          </form>
        </section>
      </div>
    </>
  );
}

export default App
