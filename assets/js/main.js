const showData = (result)=>{
    for(const campo in result){
        if(document.querySelector("#"+campo)){
         document.querySelector("#"+campo).value = result[campo]
        }
    }
    const rua = result.logradouro

    const mapa = document.querySelector('#map')
    mapa.innerHTML = `<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPhQT9tVX9h1JHGb8KyfLZ9L40k6V57qQ&q=${rua},Brasil" frameborder="0"></iframe>`

    function change(){
        const search = document.querySelector('#search')
        search.disabled = true
        research.disabled = false
        cep.readOnly = true
        errorMessage.innerHTML = ''
    }
    change();
}

const cleanFields = () => {
    const allFields = document.querySelectorAll('.form-control')
    allFields.forEach(( allFields ) => {
        allFields.value = ''
    });
    cep.focus();
    function change(){
        const search = document.querySelector('#search')
        search.disabled = false
        research.disabled = true
        cep.readOnly = false
    }
    change();
}

search.addEventListener("click", (e) => {
    cepBlank()
    let search = cep.value.replace("-","")

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then(response=>{ response.json()
        .then( data => showData(data))
    })
    .catch(e => console.log('Deu erro: ' + e,message))
})

const cep = document.querySelector("#cep")

cep.addEventListener("keyup", function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        document.querySelector("#search").click();
    }
})

const cepBlank = () => {
    if( cep.value === ''){
      errorMessage.innerHTML='Campo vazio, digite um CEP válido'
    }
}

const research = document.querySelector("#research")
const errorMessage = document.querySelector(".error")
research.addEventListener("click", cleanFields)
