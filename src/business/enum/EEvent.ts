export enum EEvent {
   Register = 'Register',
   PreClassified = 'PreClassified',
   Rated = 'Rated',
   Disregarded = 'Disregarded',
}

export const EventDescription = {
   [EEvent.Register]: 'Cadastro',
   [EEvent.PreClassified]: 'Pré Classificado',
   [EEvent.Rated]: 'Avaliado',
   [EEvent.Disregarded]: 'Desconsiderado',
}