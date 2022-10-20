const { CURSO, CODIGO_DO_CURSO, DURACAO, CARGA_HORARIA, DISCIPLINAS } = jsonData;
const body = document.body;
const table = document.getElementById('allClasses');
const modal = document.getElementById('modal');

function loadHeader() {
    let pageTitle = document.getElementById('courseName');
    pageTitle.innerHTML = CURSO;

    let information = document.getElementById('courseInformation');

    let informationContent = `<p>${CODIGO_DO_CURSO}</p>`;
    informationContent += `<p>${DURACAO}</p>`;
    informationContent += `<p>${CARGA_HORARIA}</p>`;

    information.innerHTML = informationContent;
}

function loadTableContent() {
    let tableContent = `<tr>
                            <th>Semestre</th>
                            <th>Código da Disciplina</th>
                            <th>Nome da Disciplina</th>
                            <th>Horas-aula</th>
                        </tr>`;

    for (i = 0; i < DISCIPLINAS.length; i++) {
        let { CODIGO, SEMESTRE, DISCIPLINA, HORAS } = DISCIPLINAS[i];

        tableContent += `<tr onclick="tableRowClick('${CODIGO}')">
                            <td>${SEMESTRE}</td>
                            <td>${CODIGO}</td>
                            <td>${DISCIPLINA}</td>
                            <td>${HORAS}</td>
                        </tr>`;
    }

    table.innerHTML = tableContent;
}

function loadDocument() {
    loadHeader();
    loadTableContent();
}

function getType(nat) {
    return nat === 'FBP' || nat === 'FEP' ? 'Presencial' : 'Digital';
}

function createClassLi(cod, discipline){
    let li = document.createElement('li');

    li.innerHTML = `<h2>${cod}</h2>
                    <p>${discipline}</p>
                    `;
    return li;
}

function getPreRequirementsSection(prerequirements){
    let prerequirementsSection = document.createElement('section');
    let sectionTitle = document.createElement('h3');
    let prerequirementsList = document.createElement('ul');

    sectionTitle.textContent = 'Pré-requisitos';
    prerequirementsSection.appendChild(sectionTitle);

    let prerequirementsWithoutWhiteSpace = prerequirements.replace(/\s+/g, '');

    if (prerequirements.includes('+')){
        let splittedRequirements = prerequirementsWithoutWhiteSpace.split('+'); // The first one is actually a Class and the second one is Hours so
        let discipline = DISCIPLINAS.find(element => element.ORDEM == splittedRequirements[0]) 
        prerequirementsList.appendChild(createClassLi(discipline.CODIGO, discipline.DISCIPLINA));
        
        let hoursLi = document.createElement('li');
        hoursLi.textContent = `+ ${splittedRequirements[1]}`;

        prerequirementsList.appendChild(hoursLi);
    }
    else{
        let splittedRequirements = prerequirementsWithoutWhiteSpace.split(',');

        splittedRequirements.forEach(requirement => {
            let discipline = DISCIPLINAS.find(element => element.ORDEM == requirement);
            prerequirementsList.appendChild(createClassLi(discipline.CODIGO, discipline.DISCIPLINA));
        });
    }

    prerequirementsSection.appendChild(prerequirementsList);

    return prerequirementsSection;
}

function updateModal(currentClass) {
    let { SEMESTRE, CODIGO, DISCIPLINA, EMENTA, NAT, HORAS, PREREQUISITOS } = currentClass;
    modal.innerHTML = `
        <h2>${CODIGO}</h2>
        <h3>${DISCIPLINA}</h3>
        <p>${EMENTA}</p>
        <h3>${SEMESTRE}º Semestre - Modalidade ${getType(NAT)} - Duração ${HORAS} horas</h3>
    `;

    if (PREREQUISITOS != undefined){
        modal.appendChild(getPreRequirementsSection(`${PREREQUISITOS}`));
    }

    modal.innerHTML += '<button onClick="closeModal()">OK</button>';
}

function tableRowClick(classCode) {
    let currentClass = DISCIPLINAS.find(element => element.CODIGO === classCode);
    updateModal(currentClass);
    modal.showModal();
    body.style.overflowY = 'hidden';
}

function closeModal() {
    body.removeAttribute('style');
    modal.close();
}