
// 1. Az adatok lekéréséért felelős tisztán ez a függvény
async function getData(location) {
  try {
    let response = await fetch(location);
    return await response.json(); // Visszaadja az adatot a hívónak
  } catch (error) {
    console.error("Hiba az adatok lekérésekor:", error);
    return []; // Hiba esetén visszatér egy üres tömbbel
  }
}



// 2. Táblázat feltöltéséért felelő függvény (megkapja az adatot paraméterként)
function tablaFeltoltes(usersData) {
  //const tableBody = document.getElementById('usersTableBody');
  document.getElementById('usersTableBody').innerHTML = ""

  usersData.forEach(user => {
    const sor = document.createElement("tr");
    const sorTartalom = [user.id, user.name, user.email, user.city, user.phone, user.role];
    
    sorTartalom.forEach(ertek => {
      const tablacska = document.createElement('td');
      tablacska.textContent = ertek; 
      sor.appendChild(tablacska);
    });

    document.getElementById('usersTableBody').appendChild(sor);
  });
}



async function postData(){

  let location = "http://localhost:3000/users"
  

  const newUser = {  //Id-t a backend automatikussan kezeli
    name: document.getElementById('bevitelName').value,
    email: document.getElementById('bevitelEmail').value,
    city: document.getElementById('bevitelCity').value,
    phone: document.getElementById('bevitelPhone').value,
    role: document.getElementById('bevitelRole').value
  };
  console.log(newUser)
  console.log(typeof newUser)

  const response = await fetch(location, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  });

  init();
}







async function putData(){

  let location = "http://localhost:3000/users"
  location = location+"/"+document.getElementById('userId').value
  const usersData = await getData(location);
  

  if(document.getElementById('bevitelName').value=="" || document.getElementById('bevitelEmail').value=="" || document.getElementById('bevitelCity').value=="" || document.getElementById('bevitelPhone').value=="" || document.getElementById('bevitelRole').value==""){
   
    document.getElementById('bevitelName').value=usersData.name
    document.getElementById('bevitelEmail').value=usersData.email
    document.getElementById('bevitelCity').value=usersData.city
    document.getElementById('bevitelPhone').value=usersData.phone
    document.getElementById('bevitelRole').value=usersData.role
  }
  else{

  const changedUser = {  
    name: document.getElementById('bevitelName').value,
    email: document.getElementById('bevitelEmail').value,
    city: document.getElementById('bevitelCity').value,
    phone: document.getElementById('bevitelPhone').value,
    role: document.getElementById('bevitelRole').value
  };
  console.log(changedUser)
  console.log(typeof changedUser)

  const response = await fetch(location, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(changedUser)
  });


  document.getElementById('bevitelName').value=""
  document.getElementById('bevitelEmail').value=""
  document.getElementById('bevitelCity').value=""
  document.getElementById('bevitelPhone').value=""
  document.getElementById('bevitelRole').value=""
  document.getElementById('userId').value = ""
  init();
  }
}







async function deleteData(){

  let location = "http://localhost:3000/users"
  let torlendoId = Number(document.getElementById('userId').value);


  const response = await fetch(`${location}/${torlendoId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
});
document.getElementById('userId').value = ""
init()
}









// 3. Fővezérlő (Init) függvény - ez fogja össze az egészet tiszta sorrendben
async function init() {
  const usersData = await getData("http://localhost:3000/users");
  
    // Itt hívod meg a logikai blokkokat, amikor az adat már megvan
    tablaFeltoltes(usersData);
    
    // Ha lennének még további funkcióid, itt hívhatnád őket:
    // szures(usersData);
    // statisztikaKeszites(usersData);
}

// A program indítása
init();




