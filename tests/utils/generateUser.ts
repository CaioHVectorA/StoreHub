const { faker } = require('@faker-js/faker')
function gerarCEP() {
    var cep = '';
    // Primeiros cinco dígitos do CEP
    for (var i = 0; i < 5; i++) {
      cep += Math.floor(Math.random() * 10);
    }
    // Adiciona o hífen
    cep += '-';
    // Últimos três dígitos do CEP
    for (var i = 0; i < 3; i++) {
      cep += Math.floor(Math.random() * 10);
    }
    return cep;
  }
function gerarCPF() {
    var cpf = '';
    // Primeiros nove dígitos do CPF
    for (var i = 0; i < 9; i++) {
      cpf += Math.floor(Math.random() * 10);
    }
    // Calcula o primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = soma % 11;
    var digito1 = (resto < 2) ? 0 : 11 - resto;
    cpf += digito1;
    // Calcula o segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    var digito2 = (resto < 2) ? 0 : 11 - resto;
    cpf += digito2;
    return cpf;
  }
export function getUser() {
  const username = faker.person.firstName()
  const email = faker.internet.email()
  const password = faker.internet.password()
  const CEP = gerarCEP()
  const CPF = gerarCPF()
  const picture = `https://picsum.photos/600`
  return { username, email, password, CEP, CPF, picture }
}

