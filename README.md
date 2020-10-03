# MACRO: Por dentro são mais bem definidas, mas conseguimos ver como uma tela da aplicação.

# Atualização do Perfil;
# Recuperação de Senha;

# Painel do Prestador;

# Agendamento de Serviços;

# MICRO:
# RECUPERAÇÃO DE SENHA
**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES (Simple E-mail Service) para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


**Regras de Negócio**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha, ao resetá-la;

# Atualização do Perfil

**RF**

- O usário deve poder atualizar o seu perfil (name, email, password);

**RN**

- O usuário não pode alterar o seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do Prestador

**RF**

- **Deve Haver**: Um link que levará o prestador à entrar em contato diretamente com o usuário;
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache ou melhor - Real Time;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notifação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache (Só carregar a lista ao inserir novo prestador);

**RN**

- **Mudar: O usuário deve definir o tempo do seu serviço prestado** - Cada agendamento deve durar 1h exatamente;
- **Mudar: O usuário deve definir o tempo em que ele presta serviço** - Os agendamentos devem estar disponíveis entre 8h às 18:00 (Primeiro às 8h e último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

**RF que irei adicionar**

- O usuário deve ser capaz de selecionar a sua área de atuação
- O usuário deve ser capaz de selecionar o horário mínimo e máximo no qual atende;
- O usuário deve ser capaz de definir se ele atende a domicílio, estabelecimento ou ambos;

**RN que irei adicionar**

- Cada agendamento deve durar o tempo que o prestador quiser;
- Cada agendamento deve estar disponível das 5h às 23h (finalizando às 00h);
- Cada agendamento deve ter o tipo de antendimento que o prestador irá realizar;


# Nova Funcionalidade - Em Busca de Prestadores

**RF**

- O usuário deve ser capaz de encontrar prestadores de serviço para o seu negócio;
- O usuário deve ser capaz de filtrar os prestadores por categoria (ex: músico);
- O usuário deve ser capaz de filtrar os prestadores por data disponível;

**RNF**

**RN**

- Tanto lojas quanto pessoas devem ser possíveis de serem encontrados nos filtros;
