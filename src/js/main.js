var allClasses = jsonData.DISCIPLINAS;

function loadHeader() {
    let pageTitle = document.getElementById('courseName');
    pageTitle.innerHTML = jsonData.CURSO;

    let information = document.getElementById('courseInformation');

    let informationContent = `<p>${jsonData.CODIGO_DO_CURSO}</p>`;
    informationContent += `<p>${jsonData.DURACAO}</p>`;
    informationContent += `<p>${jsonData.CARGA_HORARIA}</p>`;

    information.innerHTML = informationContent;
}

function loadTableContent() {
    let tableContent = `<tr>
                            <th>Semestre</th>
                            <th>Código da Disciplina</th>
                            <th>Nome da Disciplina</th>
                            <th>Horas-aula</th>
                        </tr>`;

    for (i = 0; i < allClasses.length; i++) {
        let currentClass = allClasses[i];
        tableContent += `<tr onclick="tableRowClick('${currentClass.CODIGO}')">
                            <td>${currentClass.SEMESTRE}</td>
                            <td>${currentClass.CODIGO}</td>
                            <td>${currentClass.DISCIPLINA}</td>
                            <td>${currentClass.HORAS}</td>
                        </tr>`;
    }

    document.getElementById('allClasses').innerHTML = tableContent;
}

function loadDocument() {
    loadHeader();
    loadTableContent();
}

function getType(nat) {
    return nat === 'FBP' || nat === 'FEP' ? 'Presencial' : 'Digital';
}

function getPreRequisites(preRequisites) {
    return preRequisites === undefined ? "" : `${preRequisites}`;
}

function updateModal(modal, currentClass) {
    modal.innerHTML = `
        <h2>${currentClass.CODIGO}</h2>
        <h3>${currentClass.DISCIPLINA}</h3>
        <p>${currentClass.EMENTA}</p>
        <h3>${currentClass.SEMESTRE}º Semestre - Modalidade ${getType(currentClass.NAT)} - Duração ${currentClass.HORAS} horas</h3>
        <section>
            <h3>Pré-requisitos</h3>
            <p>${getPreRequisites(currentClass.PREREQUISITOS)}</p>
        </section>
        <button onClick="closeModal()">OK</button>
    `;
}

function tableRowClick(classCode) {
    let modal = document.getElementById('modal');
    let currentClass = allClasses.find(element => element.CODIGO === classCode);

    updateModal(modal, currentClass);
    modal.showModal();
}

function closeModal() {
    let modal = document.getElementById('modal');
    modal.close();
}