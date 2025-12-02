dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('pt-br');

let participantes = [
    {
        nome: "Beatriz Ramos",
        email: "beatriz@gmail.com",
        dataInscricao: new Date(2025, 2, 15), 
        dataCheckIn: new Date(2025, 2, 15) 
    },
    {
        nome: "Lucas Sousa",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2025, 7, 15), 
        dataCheckIn: new Date(2025, 7, 15) 
    },
    {
        nome: "Rafaela Mendes",
        email: "rafaela@gmail.com",
        dataInscricao: new Date(2024, 4, 15),
        dataCheckIn: null 
    },
    {
        nome: "João Silva",
        email: "joao@gmail.com", 
        dataInscricao: new Date(2025, 2, 15), 
        dataCheckIn: new Date(2025, 2, 15) 
    },
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com", 
        dataInscricao: new Date(2024, 10, 15), 
        dataCheckIn: new Date(2024, 10, 15)
    },
    {
        nome: "Gabriel Almeida",
        email: "gabriel@gmail.com",
        dataInscricao: new Date(2024, 8, 15), 
        dataCheckIn: null 
    },
    {
        nome: "Ana Souza",
        email: "ana@gmail.com",
        dataInscricao: new Date(2025, 1, 15), 
        dataCheckIn: new Date(2025, 1, 15) 
    },
    {
        nome: "Felipe Rocha",
        email: "felipe@gmail.com",
        dataInscricao: new Date(2025, 5, 15), 
        dataCheckIn: new Date(2025, 5, 15) 
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 1, 15), 
        dataCheckIn: null 
    },
    {
        nome: "Sofia Martins",
        email: "sofia@gmail.com",
        dataInscricao: new Date(2025, 6, 15), 
        dataCheckIn: new Date(2025, 6, 15)
    },
    {
        nome: "Maria Oliveira",
        email: "maria@gmail.com",
        dataInscricao: new Date(2025, 3, 15), 
        dataCheckIn: null
    },
    {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2025, 5, 15), 
        dataCheckIn: new Date(2025, 5, 15) 
    },
    {
        nome: "Renata Lima",
        email: "renata@gmail.com",
        dataInscricao: new Date(2025, 7, 15), 
        dataCheckIn: new Date(2025, 7, 15) 
    },
    {
        nome: "Carla Lima",
        email: "carla@gmail.com",
        dataInscricao: new Date(2025, 6, 15),
        dataCheckIn: new Date(2025, 6, 15) 
    },
    {
        nome: "Paula Costa",
        email: "paula@gmail.com",
        dataInscricao: new Date(2025, 7, 15), 
        dataCheckIn: null 
    }
];
    
const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button
                data-email="${participante.email}"
                onclick="fazerCheckIn(event)"
            >
                Confirmar check-in
            </button>
        `;
         
    } else {
        dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);
    }

    return `
    <tr>
        <td>
            <strong>${participante.nome}</strong>
            <br>
            <small class="text-muted">${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `;
}

const atualizarLista = (participantes) => {
    let output = "";
    for(let participante of participantes) {
        output += criarNovoParticipante(participante);
    }
    document.getElementById('tabela-participantes').innerHTML = output;
}     

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault();
    
    const dadosDoFormulario = new FormData(event.target);

    const participante ={
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(
        (p) => p.email == participante.email        
    )

    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)  
    
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
    
}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if (confirm(mensagemConfirmacao) == false){
        return 
    }    

    const participante = participantes.find((p) => p.email == 
    event.target.dataset.email
    );
    
    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}