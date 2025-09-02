let employees = JSON.parse(localStorage.getItem("employees")) || [];
let idCounter = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;

document.getElementById("addUserBtn").addEventListener("click", addEmployee);

// ✅ Load employees on page load
renderEmployees();

function addEmployee() {
  const name = document.getElementById("name").value.trim();
  const profession = document.getElementById("profession").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;
  const messageDiv = document.getElementById("message");

  if (!name || !profession || !age || !gender) {
    messageDiv.textContent = "Error : Please fill all the fields!";
    messageDiv.style.color = "red";
    return;
  }

  const newEmployee = {
    id: idCounter++,
    name,
    profession,
    age,
    gender
  };

  employees.push(newEmployee);
  localStorage.setItem("employees", JSON.stringify(employees)); // ✅ Save to localStorage

  messageDiv.textContent = "Success : Employee Added!";
  messageDiv.style.color = "green";

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("profession").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";

  renderEmployees();
}

function renderEmployees() {
  const employeesList = document.getElementById("employeesList");
  const dataNotFound = document.getElementById("datanotfound");

  employeesList.innerHTML = "";

  if (employees.length === 0) {
    dataNotFound.style.display = "flex";   // ✅ show "Data not found"
    return;
  } else {
    dataNotFound.style.display = "none";   // ✅ hide when employees exist
  }

  employeesList.insertAdjacentHTML("beforeend", `<p>Currently ${employees.length} Employee(s)</p>`);

  employees.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";

    const info = document.createElement("div");
    info.className = "employee-info";
    info.innerHTML = `
      <span><b>${emp.name}</b></span>
      <span>${emp.profession}</span>
      <span>${emp.age}</span>
      <span>${emp.gender}</span>
    `;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      employees = employees.filter(e => e.id !== emp.id);
      localStorage.setItem("employees", JSON.stringify(employees)); // ✅ Update localStorage
      renderEmployees();
    });

    card.appendChild(info);
    card.appendChild(delBtn);
    employeesList.appendChild(card);
  });
}
