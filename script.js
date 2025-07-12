const app = document.getElementById("app");
const users = [
    {
        email: "joao@gmail.com",
        phone: "1234567890",
        ref: 100,
        refby: null
    },
    {
        email: "felipsantos@gmail.com",
        phone: "1234567890",
        ref: 110,
        refby: 100
    },
    {
        email: "gelsonmarques32@gmail.com",
        phone: "1234567890",
        ref: 120,
        refby: 100
    }
];

const getUser = (userData) => {
    return users.find((user) => {
        return user.email === userData.email;
    });
}

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => { return user.refby === userData.ref });
    return subs.length;
}

const showInvite = (userData) => {
    app.innerHTML = `
    <main>
      <h3>Inscrição confirmada!</h3>

      <p>
        Convide mais pessoas e concorra a prêmios! <br/>
        Compartilhe o link e acompanhe as inscrições:
      </p>

      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="Link icon">
        </label>
        <input type="text" id="link" value="https://devstage.com?ref=${userData.ref}" disabled>

      </div>
    </main>

    <section class="stats">
        <h4>
           ${getTotalSubscribers(userData)}
        </h4>

        <p>
            Inscrições feitas!
        </p>
    </section>
    `
    app.setAttribute("class", "page-invite");
    updateImageLinks();
}

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 10000), // TODO: Implementar solução para impedir que mais usuarios possuam refs iguais!
        refby: 100 // TODO: Melhorar para pegar o valor diretamente da URL do link de convite
    }
    users.push(newUser);
    return newUser;
}

const formAction = () => {
    const form = document.getElementById("form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const userData = {
            email: formData.get("email"),
            phone: formData.get("phone"),
        }
        const user = getUser(userData);
        if (user) {
            showInvite(user);
        } else {
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    }
}

const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute("src"); 
      if (src && !src.startsWith("http")) {  
        img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
      }
    });
  };

const StartApp = () => {
    const content = `
    <main>
    <section class="about">
      <div class="section-header">
        <h2>
          Sobre o evento
        </h2>
        <span class="badge">AO VIVO</span>
      </div>

      <p>
        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
        <br/><br/>
        ${
          (() => {
            const meses = [
              "janeiro", "fevereiro", "março", "abril", "maio", "junho",
              "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
            ];
            const hoje = new Date();
            let proximoMes = hoje.getMonth() + 1;
            let ano = hoje.getFullYear();
            if (proximoMes > 11) {
              proximoMes = 0;
              ano++;
            }
            const nomeMes = meses[proximoMes];
            return `Dias 15 a 17 de ${nomeMes} | Das 18h às 21h | Online & Gratuito`;
          })()
        }
      </p>
    </section>

    <section class="registration">
      <h2>Inscrição</h2>

      <form id="form">
        <div class="input-wrapper">
          <div class="input-group">
            <label for="email">
              <img src="mail.svg" alt="Email icon">
            </label>
            <input type="email" id="email" name="email" placeholder="E-mail">
          </div>

          <div class="input-group">
            <label for="phone">
              <img src="phone.svg" alt="Phone icon">
            </label>
            <input type="text" id="phone" name="phone" placeholder="Telefone">
          </div>
        </div>

        <button>
          Confirmar
          <img src="arrow.svg" alt="Arrow right">
        </button>
      </form>
    </section>
  </main>
    `
    app.innerHTML = content;
    app.setAttribute('class', 'page-start')
    updateImageLinks()
    formAction();
}

StartApp();

document.getElementById("logo").onclick = () => StartApp()