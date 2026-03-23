const submit = document.querySelector("#add");
const update = document.querySelector("#update");
const content = document.querySelector("#tableBody");

// POST 
submit.addEventListener('click', () => {
    let student_id=document.querySelector("#student_id_input").value;
    let name=document.querySelector("#name").value;
    let department=document.querySelector("#department").value;
    let year_level=document.querySelector("#year_level").value;
    let email=document.querySelector("#email").value;
    let status=document.querySelector("#status").value;
    let formData={ student_id, name, department, year_level, email, status };

    fetch("https://semibackend.onrender.com/api/students", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(() => {
        alert("Student Added Successfully");
        location.reload();
    })
    .catch((error) => {
        console.log(error);
        alert("Failed to add student.");
    });
});

// GET 
window.addEventListener('load', () => {
    getStudents();
});

function getStudents() {
    let html = "";

    fetch('https://semibackend.onrender.com/api/students', { mode: 'cors' })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            html = `<tr class="state-row"><td colspan="7">No students found.</td></tr>`;
        } else {
            data.forEach(element => {
                const statusClass = element.status === 'Active' ? 'status-active' : 'status-inactive';
                html += `
                <tr>
                    <td>${element.student_id}</td>
                    <td>${element.name}</td>
                    <td>${element.department}</td>
                    <td>${element.year_level}</td>
                    <td>${element.email}</td>
                    <td><span class="status-badge ${statusClass}">${element.status}</span></td>
                    <td>
                        <div class="actions">
                            <a class="btn-update" href="javascript:void(0)" onClick="updateMember('${element.student_id}')">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a class="btn-delete" href="javascript:void(0)" onClick="deleteMember('${element.student_id}')">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </td>
                </tr>
                `;
            });
        }
        content.innerHTML = html;
    })
    .catch(error => {
        console.log(error);
        content.innerHTML = `<tr class="state-row"><td colspan="7">Could not load students.</td></tr>`;
    });
}

// DELETE
function deleteMember(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        fetch("https://semibackend.onrender.com/api/students", {
            method: 'DELETE',
            body: JSON.stringify({ student_id: id }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(() => {
            location.reload();
        })
        .catch(error => {
            console.log(error);
            alert("Failed to delete student.");
        });
    }
}

// GET by ID - fill form for editing
function updateMember(id) {
    fetch(`https://semibackend.onrender.com/api/students/${id}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector("#student_id_input").value=data[0].student_id;
        document.querySelector("#name").value=data[0].name;
        document.querySelector("#department").value=data[0].department;
        document.querySelector("#year_level").value=data[0].year_level;
        document.querySelector("#email").value= data[0].email;
        document.querySelector("#status").value=data[0].status;
        document.querySelector("#student_id_hidden").value=data[0].student_id;
    })
    .catch(error => {
        console.log(error);
        alert("Failed to load student data.");
    });
}

// PUT 
update.addEventListener('click', () => {
    let name=document.querySelector("#name").value;
    let department=document.querySelector("#department").value;
    let year_level=document.querySelector("#year_level").value;
    let email=document.querySelector("#email").value;
    let status=document.querySelector("#status").value;
    let student_id=document.querySelector("#student_id_hidden").value;
    let formData={ student_id, name, department, year_level, email, status };

    fetch("https://semibackend.onrender.com/api/students", {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(() => {
        alert("Student Updated Successfully");
        location.reload();
    })
    .catch((error) => {
        console.log(error);
        alert("Failed to update student.");
    });
});
