const minCaracteres = (min?: number) => `O campo deve ter pelo menos ${!!min ? min : 6} caracteres`;
const maxCaracteres = (max?: number) => `O campo deve ter no maximo ${!!max ? max : 20} caracteres`;

const message = {
   fields: {
      required: 'Campo obrigatório',
      email: 'Email inválido',
      min: minCaracteres,
      max: maxCaracteres,
      documentInvalid: 'Digite um documento válido',
      documentAlreadyExist: 'Documento ja cadastrado',
      cellInvalid: 'Digite um celular válido',
      cepInvalid: 'Digite um CEP válido',
   },
   alert: {
      loginSuccess: 'Login efetuado com sucesso!',
      loginInvalid: 'Login ou senha inválidos',
      loginError: 'Erro ao efetuar login',
      requesterFailed: 'Falha na requisição',
      requesterSuccess: 'A ação foi realizada com sucesso!',
      itemNotFound: 'Nenhum item encontrado',
      resultNotFound: 'Nenhum resultado encontrado',
   },
};

export const { fields, alert } = message;
